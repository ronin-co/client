import fs from 'fs/promises';
import path from 'path';
import ts from 'typescript';

import {
  createMissingPluralError,
  createMissingSchemaError,
  createUnknownFieldError,
} from '@/src/bin/parser/errors';
import {
  convertToReadableText,
  generateFieldId,
  getLineAndColumnsNumber,
  parseJsDoc,
} from '@/src/bin/parser/utils';
import { isTest } from '@/src/bin/utils/env';
import { exists } from '@/src/bin/utils/file';
import type { Schema, SchemaField } from '@/src/types/schema';

export type ParsedSchema = Omit<
  Schema,
  'id' | 'description' | 'summary' | 'identifiers' | 'idPrefix' | 'preview' | 'version' | 'fields'
> & {
  fields: NonNullable<Schema['fields']>;
};

type ParsedTypeArgument =
  | {
      name?: string;
      type: string;
      required?: boolean;
      value?: string[];
      // If a type is a type alias and has type arguments, this will contain
      // the type arguments.
      meta?: ParsedTypeArguments;
      // In a type is an object, this will contains its properties.
      children?: ParsedTypeArguments | ParsedTypeArguments[];
    }
  | ParsedTypeArguments[];

type ParsedTypeArguments = ParsedTypeArgument | ParsedTypeArgument[];

// Experimental features.
const EXPERIMENTAL = {
  TSDOC_TAGS: isTest(),
  JSON_FIELD_STRUCTURE: isTest(),
};

const RONIN_MODULE = 'ronin';
// The name of the interface to define the schemas in
const SCHEMAS_INTERFACE = 'Schemas';

/**
 * Parses the schema definition file and returns an array of `Schema` objects.
 *
 * @param filePath - The path to the schema definition file.
 *
 * @returns A promise that resolves to an array of `Schema` objects.
 */
export async function parseSchemaDefinitionFile(
  filePath: string = './schemas/index.ts',
): Promise<ParsedSchema[]> {
  // Used for displaying the source line in error messages.
  const relativePath = path.relative(process.cwd(), filePath);
  const fullPath = path.resolve(process.cwd(), filePath);

  const schemaFileExists = await exists(filePath);

  if (!schemaFileExists) {
    throw new Error(`The given path to the schema definition file does not exist: ${fullPath}`);
  }

  const fileContent = await fs.readFile(fullPath, 'utf-8');

  return parseSchemaDefinitions(fileContent, relativePath);
}

/**
 * Parses the schema definitions from the file content and returns an array
 * of `Schema` objects.
 *
 * @param content - The content of the schema definition file.
 * @param relativePath - The relative path to the schema definition file.
 * @param onError - A callback function that is called when an error occurs.
 *
 * @returns An array of `Schema` objects.
 */
export function parseSchemaDefinitions(
  /** The content of the schema definitions file */
  content: string,
  /** Used for creating a source link in error message */
  relativePath: string,
): ParsedSchema[] {
  const sourceFile = ts.createSourceFile('temp.ts', content, ts.ScriptTarget.Latest, true);

  const schemas: ParsedSchema[] = [];

  /**
   * Mapping of imported type aliases to their original names.
   *
   * ```typescript
   * import { Record as SchemaRecord } from 'ronin/schema';
   * ```
   */
  const typeMapping: Record<string, string> = {};

  /**
   * Mapping of imported namespace aliases to their module specifiers.
   *
   * ```typescript
   * import * as Schema from 'ronin/schema';
   * ```
   */
  const namespaces: Record<string, string> = {};

  /**
   * Mapping of the registered schema slugs to their type aliases (inside the
   * `Schemas` interface).
   *
   * ```typescript
   * interface Schemas {
   *  account: Account;
   * }
   * ```
   */
  const registeredSchemas: Record<string, string> = {};

  const missingSchemas: { name: string; parent: string; source: string }[] = [];
  const unknownFields: { parent: string; name: string; type: string; source: string }[] = [];

  // Used to keeping track of the aliases for `Schema.Record` and `Schema.Records.
  // For example, if they're imported with a name alias as such:
  // import { Record as SchemaRecord } from 'ronin/schema'
  let schemaRecordAlias = 'Record';
  let schemaRecordsAlias = 'Records';

  function getFieldType(type: string): SchemaField['type'] | 'unknown' {
    const originalType = typeMapping[type] || type;

    switch (originalType) {
      case 'string':
      case 'number':
      case 'boolean':
        return originalType;
      case 'Date':
        return 'date';
      case 'Blob':
        return 'blob';
      case 'JSON':
        return 'json';
      default: {
        const { resolvedTypeName } = resolveTypeAlias(originalType);

        if (resolvedTypeName === schemaRecordAlias) {
          return 'reference';
        }

        return 'unknown';
      }
    }
  }

  /**
   * Visits the import declarations in a TypeScript AST node and processes them.
   *
   * This function identifies named imports and namespace imports, mapping them
   * to their original names or module specifiers. It also specifically tracks
   * aliases for `SchemaRecord` and `SchemaRecords`.
   *
   * @param node - The TypeScript AST node to visit.
   */
  function visitImports(node: ts.Node) {
    if (ts.isImportDeclaration(node) && node.importClause && node.importClause.namedBindings) {
      const namedBindings = node.importClause.namedBindings;

      if (ts.isNamedImports(namedBindings)) {
        for (const element of namedBindings.elements) {
          const importedName = element.name.text;
          const originalName = element.propertyName ? element.propertyName.text : importedName;
          typeMapping[importedName] = originalName;

          if (originalName === 'Record') {
            schemaRecordAlias = importedName;
          } else if (originalName === 'Records') {
            schemaRecordsAlias = importedName;
          }
        }
      } else if (ts.isNamespaceImport(namedBindings)) {
        namespaces[namedBindings.name.text] = node.moduleSpecifier.getText().replace(/['"]/g, '');
      }
    }
  }

  /**
   * Visits a TypeScript module node and processes it if it matches specific criteria.
   *
   * This function checks if the provided node is a module declaration with the name 'ronin'.
   * If the module contains a body that is a module block, it iterates over its statements.
   * For each statement, if it is an interface declaration with the name 'Schemas', it calls
   * the `visitInterface` function on that statement.
   *
   * @param node - The TypeScript node to visit.
   */
  function visitRoninModuleDeclaration(node: ts.Node) {
    if (ts.isModuleDeclaration(node) && node.name.text === RONIN_MODULE) {
      if (node.body && ts.isModuleBlock(node.body)) {
        for (const statement of node.body.statements) {
          if (ts.isInterfaceDeclaration(statement) && statement.name.text === SCHEMAS_INTERFACE) {
            visitInterface(statement);
          }
        }
      }
    }
  }

  /**
   * Visits an interface declaration node and processes its property signatures.
   *
   * @param node - The TypeScript interface declaration node to visit.
   */
  function visitInterface(node: ts.InterfaceDeclaration) {
    for (const member of node.members) {
      if (ts.isPropertySignature(member)) {
        const propertyName = member.name.getText();
        const typeName =
          member.type && ts.isTypeReferenceNode(member.type) ? member.type.typeName.getText() : '';

        if (typeName) {
          registeredSchemas[propertyName] = typeName;
        }
      }
    }

    for (const propertyName of Object.keys(registeredSchemas)) {
      const typeAlias = registeredSchemas[propertyName];
      const parsedType = parseSchemaProperty(propertyName, typeAlias);

      if (parsedType) {
        schemas.push(parsedType);
      }
    }
  }

  /**
   * Resolves a TypeScript type alias to its fully qualified name, type arguments, and namespace.
   *
   * @param typeName - The name of the type alias to resolve.
   *
   * @returns An object containing the resolved type name, type arguments, and namespace.
   */
  function resolveTypeAlias(typeName: string): {
    resolvedTypeName: string;
    typeArguments: ts.TypeNode[];
    namespace: string | null;
  } {
    let resolvedTypeName = typeName;
    let typeArguments: ts.TypeNode[] = [];
    let namespace: string | null = null;

    function typeAliasVisitor(node: ts.Node) {
      if (ts.isTypeAliasDeclaration(node) && node.name.text === typeName) {
        if (ts.isTypeReferenceNode(node.type) && node.type.typeName) {
          const fullTypeName = node.type.typeName.getText();

          const parts = fullTypeName.split('.');

          if (parts.length > 1) {
            namespace = parts.slice(0, -1).join('.');
            resolvedTypeName = parts[parts.length - 1];
          } else {
            resolvedTypeName = fullTypeName;
          }

          if (node.type.typeArguments) {
            typeArguments = Array.from(node.type.typeArguments);
          }
        }
      }

      ts.forEachChild(node, typeAliasVisitor);
    }

    ts.forEachChild(sourceFile, typeAliasVisitor);

    return { resolvedTypeName, typeArguments, namespace };
  }

  /**
   * Parses type arguments of a type alias.
   *
   * @param typeNode - The type arguments node to parse.
   *
   * @returns A structured representation of the type information.
   *
   * @example
   *
   * A sample type alias:
   *
   * ```typescript
   * Schema.Record<{
   *   metadata: Schema.JSON<{
   *    name: string;
   *    status?: "active" | "inactive";
   *    metadata: {
   *      device: string;
   *      likes?: number;
   *      active: boolean;
   *      dates: {
   *        createdAt: Date;
   *      }
   *    };
   *    users: {
   *      name: string;
   *      count?: number;
   *    }[];
   * }>;
   * ```
   */

  function parseTypeNode(typeNode: ts.TypeNode): ParsedTypeArguments {
    if (ts.isTypeLiteralNode(typeNode)) {
      return typeNode.members.map((member) => {
        if (ts.isPropertySignature(member)) {
          if (!member.type) {
            throw new Error(
              `Property signature \`${member.getText()}\` in ${typeNode.parent.getText()} is missing a type`,
            );
          }

          const fieldName = member.name.getText();
          const isRequired = !member.questionToken;

          let fieldType = getFieldType(member.type.getText());

          const parsedField: ParsedTypeArgument = {
            name: fieldName,
            type: fieldType,
            required: isRequired,
          };

          if (ts.isArrayTypeNode(member.type)) {
            parsedField.type = 'array';
            parsedField.children = parseTypeNode(member.type.elementType);
          } else if (ts.isUnionTypeNode(member.type)) {
            parsedField.type = 'enum';
            parsedField.value = member.type.types.map((t) => t.getText().replace(/"/g, ''));
          } else if (ts.isTypeReferenceNode(member.type)) {
            const typeName = member.type.typeName.getText();
            if (typeName === 'Array') {
              parsedField.type = 'array';
              parsedField.children = parseTypeNode(member.type.typeArguments![0]);
            } else {
              fieldType = getFieldType(typeName);
              parsedField.type = fieldType;
              if (member.type.typeArguments) {
                parsedField.meta = parseTypeNode(member.type.typeArguments[0]);
              }
            }
          } else if (ts.isTypeLiteralNode(member.type)) {
            parsedField.type = 'object';
            parsedField.children = parseTypeNode(member.type);
          } else if (ts.isLiteralTypeNode(member.type)) {
            parsedField.type = 'enum';
            parsedField.value = [member.type.literal.getText().replace(/"/g, '')];
          } else {
            parsedField.type = fieldType;
          }

          return parsedField;
        }

        throw new Error(`Unsupported property type \`${member.getText()}\` in ${typeNode.parent.getText()}`);
      });
    } else if (ts.isUnionTypeNode(typeNode)) {
      return {
        type: 'enum',
        value: typeNode.types.map((t) => t.getText().replace(/"/g, '')),
      };
    } else if (ts.isArrayTypeNode(typeNode)) {
      return {
        type: 'array',
        children: parseTypeNode(typeNode.elementType),
      };
    } else if (ts.isTypeReferenceNode(typeNode)) {
      const typeName = typeNode.typeName.getText();
      return {
        name: typeName,
        type: getFieldType(typeName),
        ...(typeNode.typeArguments ? { meta: parseTypeNode(typeNode.typeArguments[0]) } : {}),
      };
    } else if (ts.isLiteralTypeNode(typeNode)) {
      return {
        type: 'enum',
        value: [typeNode.literal.getText().replace(/"/g, '')],
      };
    } else {
      return { type: typeNode.getText() };
    }
  }

  /**
   * Checks if a given type is included in the schema mappings.
   * If the type is found, returns the corresponding schema slug.
   * If not found, logs the missing schema information and returns null.
   *
   * @param node - The TypeScript node to check.
   * @param parent - The name of the parent node.
   *
   * @returns The name of the schema property if found, otherwise null.
   */
  function checkSchemaInclusion(node: ts.PropertySignature, parent: string): string | null {
    // `node.type` cannot be `undefined` here because the function is only called
    // when `node.type` is equal to a defined value.
    const nodeType = node.type!;
    const typeName = nodeType.getText();

    const schemaSlug = Object.keys(registeredSchemas).find((key) => registeredSchemas[key] === typeName);

    if (schemaSlug) {
      return schemaSlug;
    } else {
      const source = getLineAndColumnsNumber(node, sourceFile);

      missingSchemas.push({
        name: typeName,
        parent: parent,
        source: `${relativePath}:${source.start.line}:${source.start.character}`,
      });

      return null;
    }
  }

  function getTypeFromNamespace(typeName: string): string {
    const [namespace, type] = typeName.split('.');

    if (namespaces[namespace]) {
      return typeMapping[type] || type;
    }

    return typeName;
  }

  /**
   * Parses a schema field definitions
   *
   * @param node - The schema property node to parse.
   * @param parent - The name of the type that contains (schema) this property.
   *
   * @returns The parsed schema field or `null` if the field type cannot be
   * determined.
   */
  function parseFieldDefinition(node: ts.PropertySignature, parent: string): SchemaField | null {
    if (!node.type) {
      throw new Error(`Property signature \`${node.getText()}\` in ${parent} is missing a type`);
    }

    const fieldName = node.name.getText();

    const memberType = ts.isTypeReferenceNode(node.type) ? node.type.typeName.getText() : node.type.getText();

    const memberTypeText = getTypeFromNamespace(memberType);
    const fieldType = getFieldType(memberTypeText);

    const { name, description, details } = parseJsDoc(node);

    if (fieldType === 'unknown') {
      const source = getLineAndColumnsNumber(node, sourceFile);

      unknownFields.push({
        parent,
        name: fieldName,
        type: memberTypeText,
        source: `${relativePath}:${source.start.line}:${source.start.character}`,
      });

      return null;
    }

    // @ts-expect-error TS is being too strict here.
    const field: SchemaField = {
      id: generateFieldId(fieldType),
      type: fieldType,
      slug: fieldName,
      name: name || fieldName.charAt(0).toUpperCase() + fieldName.slice(1),
      unique: false,
      required: !node.questionToken,
    };

    if (description) {
      field.description = description;
    }

    if (field.type === 'string') {
      field.displayAs = 'single-line';
    }

    if (field.type === 'reference') {
      let schema: string | null = null;
      schema = checkSchemaInclusion(node, parent);

      if (schema) {
        field.schema = schema;
      }
    }

    // This feature is not yet official.
    if (EXPERIMENTAL.TSDOC_TAGS && Object.keys(details).length > 0) {
      // @ts-expect-error This property is not yet defined in the schema field, but it soon will be.
      field.details = details;
    }

    // This feature is not yet official.
    if (
      EXPERIMENTAL.JSON_FIELD_STRUCTURE &&
      field.type === 'json' &&
      node.type &&
      ts.isTypeReferenceNode(node.type) &&
      node.type.typeArguments
    ) {
      // @ts-expect-error This property is not yet defined in the schema field, but it soon will be.
      field.meta = parseTypeNode(node.type.typeArguments[0]);
    }

    return field;
  }

  /**
   * Used for parsing the properties of the `Schemas` interface.
   *
   * @param typeAlias - Schema type alias.
   * @param propertyName - Schema property name (i.e. schema slug).
   *
   * @returns The parsed schema or `null` if no fields were found for the schema.
   */
  function parseSchemaProperty(propertyName: string, typeAlias: string): ParsedSchema | null {
    const result: ParsedSchema = {
      name: convertToReadableText(typeAlias),
      slug: propertyName,
      pluralName: '',
      pluralSlug: '',
      fields: [],
    };

    for (const schemaSlug of Object.keys(registeredSchemas)) {
      const schemaType = registeredSchemas[schemaSlug];

      const { resolvedTypeName, typeArguments } = resolveTypeAlias(schemaType);
      const firstTypeArgument = typeArguments[0]?.getText();

      if (resolvedTypeName === schemaRecordsAlias && typeAlias === firstTypeArgument) {
        result.pluralName = convertToReadableText(schemaType);
        result.pluralSlug = schemaSlug;
      }
    }

    function typeAliasVisitor(node: ts.Node) {
      if (ts.isTypeAliasDeclaration(node) && node.name.text === typeAlias) {
        if (ts.isTypeReferenceNode(node.type) && node.type.typeArguments) {
          const typeLiteral = node.type.typeArguments[0];

          if (ts.isTypeLiteralNode(typeLiteral)) {
            for (const member of typeLiteral.members) {
              if (ts.isPropertySignature(member)) {
                const parsedField = parseFieldDefinition(member, typeAlias);

                if (parsedField) {
                  result.fields.push(parsedField);
                }
              }
            }
          }
        }
      }

      ts.forEachChild(node, typeAliasVisitor);
    }

    ts.forEachChild(sourceFile, typeAliasVisitor);

    if (!result.pluralName && result.fields.length) {
      throw new Error(
        createMissingPluralError(typeAlias, propertyName, result.slug as string, schemaRecordsAlias),
      );
    }

    return result.fields.length ? result : null;
  }

  function visit(node: ts.Node) {
    visitImports(node);
    visitRoninModuleDeclaration(node);
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  if (missingSchemas.length > 0) {
    throw new Error(createMissingSchemaError(missingSchemas));
  }

  if (unknownFields.length > 0) {
    throw new Error(createUnknownFieldError(unknownFields));
  }

  return schemas;
}
