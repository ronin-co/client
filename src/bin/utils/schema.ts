import fs from 'fs/promises';
import path from 'path';
import pluralize from 'pluralize';
import ts from 'typescript';

import { exists } from '@/src/bin/utils/file';
import type { Schema } from '@/src/types/schema';
import { generateUniqueId } from '@/src/utils/id';

const FIELD_TYPES = ['Text', 'RichText', 'Time', 'Blob', 'Toggle', 'Number', 'Token', 'JSON'];

/**
 * Generates a unique field ID.
 *
 * @param type The type of the field.
 */
export const generateFieldId = (type: string): string => {
  return `${type}-${generateUniqueId()}`;
};

/**
 * Converts a given string into a readable text format.
 * Inserts spaces before each uppercase letter (except the first letter)
 * and capitalizes the first letter of each word.
 *
 * @param str - The string to be converted.
 * @returns - The formatted readable text or null if input is invalid.
 */
function convertToReadableText(str: null): null;
function convertToReadableText(str: undefined): null;
function convertToReadableText(str: string): string;
function convertToReadableText(str: undefined | null | string): string | null {
  if (!str || typeof str !== 'string') return null;

  // Insert spaces before each uppercase letter (except the first letter).
  const spacedStr = str.replace(/([a-z])([A-Z])/g, '$1 $2');

  // Split the string into words.
  const words = spacedStr.split(' ');

  // Capitalize the first letter of each word.
  const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));

  // Join the words back into a single string with spaces.
  return capitalizedWords.join(' ');
}

/**
 * Parses the schema definition file and returns an array of `Schema` objects.
 *
 * @param filePath The path to the schema definition file.
 *
 * @returns A promise that resolves to an array of `Schema` objects.
 */
export async function parseSchemaDefinitionFile(
  filePath: string = './schemas/index.ts',
  onError: (error: string) => void,
): Promise<Schema[]> {
  // Used for displaying the source line in error messages.
  const relativePath = path.relative(process.cwd(), filePath);
  const fullPath = path.resolve(process.cwd(), filePath);

  const schemaFileExists = await exists(filePath);

  if (!schemaFileExists) {
    throw new Error(`The given path to the schema definition file does not exist: ${fullPath}`);
  }

  const fileContent = await fs.readFile(fullPath, 'utf-8');
  const sourceFile = ts.createSourceFile('temp.ts', fileContent, ts.ScriptTarget.Latest, true);

  const results: any[] = [];
  const typeMapping: Record<string, string> = {};
  const namespaceMapping: Record<string, string> = {};
  const schemaProperties: Record<string, string> = {};
  const missingSchemas: { name: string; parent: string; source: string }[] = [];
  const unknownFields: { parent: string; name: string; type: string; source: string }[] = [];

  let schemaRecordAlias = 'Record';
  let schemaRecordsAlias = 'Records';

  function getFieldType(type: string): string {
    const originalType = typeMapping[type] || type;
    switch (originalType) {
      case 'string':
      case 'Text':
        return 'text';
      case 'RichText':
        return 'rich-text';
      case 'Date':
      case 'Time':
        return 'time';
      case 'Blob':
        return 'blob';
      case 'boolean':
      case 'Toggle':
        return 'toggle';
      case 'number':
      case 'Number':
        return 'number';
      case 'Token':
        return 'token';
      case 'JSON':
        return 'json';
      default: {
        const { resolvedTypeName } = resolveTypeAlias(originalType);

        if (resolvedTypeName === schemaRecordAlias) {
          return 'record';
        }

        return 'unknown';
      }
    }
  }

  function parseJsDoc(node: ts.Node): { name: string; description: string; details: Record<string, string> } {
    let name = '';
    let description = '';
    const details: Record<string, string> = {};

    const commentsAndTags = ts.getJSDocCommentsAndTags(node);

    if (commentsAndTags.length > 0) {
      const jsDoc = commentsAndTags[0];
      const commentText = jsDoc.comment ? ts.getTextOfJSDocComment(jsDoc.comment) : undefined;

      if (commentText) {
        const lines = commentText
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line);
        if (lines.length > 0) {
          name = lines[0];
          description = lines.slice(1).join(' ');
        }
      }

      if ('tags' in jsDoc && jsDoc.tags) {
        jsDoc.tags.forEach((tag) => {
          const tagName = tag.tagName.getText();
          const tagComment = ts.getTextOfJSDocComment(tag.comment);
          if (tagComment) {
            details[tagName] = tagComment;
          }
        });
      }
    }

    return { name, description, details };
  }

  function visitImports(node: ts.Node) {
    if (ts.isImportDeclaration(node) && node.importClause && node.importClause.namedBindings) {
      const namedBindings = node.importClause.namedBindings;
      if (ts.isNamedImports(namedBindings)) {
        namedBindings.elements.forEach((element) => {
          const importedName = element.name.text;
          const originalName = element.propertyName ? element.propertyName.text : importedName;
          typeMapping[importedName] = originalName;

          if (originalName === 'SchemaRecord') {
            schemaRecordAlias = importedName;
          } else if (originalName === 'SchemaRecords') {
            schemaRecordsAlias = importedName;
          }
        });
      } else if (ts.isNamespaceImport(namedBindings)) {
        namespaceMapping[namedBindings.name.text] = node.moduleSpecifier.getText().replace(/['"]/g, '');
      }
    }
  }

  function visitModule(node: ts.Node) {
    if (ts.isModuleDeclaration(node) && node.name.text === 'ronin') {
      if (node.body && ts.isModuleBlock(node.body)) {
        node.body.statements.forEach((statement) => {
          if (ts.isInterfaceDeclaration(statement) && statement.name.text === 'Schemas') {
            visitInterface(statement);
          }
        });
      }
    }
  }

  function visitInterface(node: ts.InterfaceDeclaration) {
    node.members.forEach((member) => {
      if (ts.isPropertySignature(member)) {
        const propertyName = member.name.getText();
        const typeName =
          member.type && ts.isTypeReferenceNode(member.type) ? member.type.typeName.getText() : '';
        if (typeName) {
          schemaProperties[propertyName] = typeName;
        }
      }
    });

    Object.keys(schemaProperties).forEach((propertyName) => {
      const typeName = schemaProperties[propertyName];
      const parsedType = parseTypeAlias(typeName, propertyName);
      if (parsedType) {
        results.push(parsedType);
      }
    });
  }

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

  function getLineAndColumnsNumber(node: ts.Node) {
    const start = node.getStart();
    const { line: startLine, character: startCharacter } = sourceFile.getLineAndCharacterOfPosition(start);

    const end = node.getEnd();
    const { line: endLine, character: endCharacter } = sourceFile.getLineAndCharacterOfPosition(end);

    return {
      start: { line: startLine + 1, character: startCharacter + 1 },
      end: { line: endLine + 1, character: endCharacter + 1 },
    };
  }

  function checkSchemaInclusion(node: ts.PropertySignature, parent: string): string | null {
    const typeName = node.type!.getText();
    const schemaProperty = Object.keys(schemaProperties).find((key) => schemaProperties[key] === typeName);

    if (schemaProperty) {
      return schemaProperty;
    } else {
      const source = getLineAndColumnsNumber(node);
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
    if (namespaceMapping[namespace]) {
      return typeMapping[type] || type;
    }
    return typeName;
  }

  function parseTypeAlias(typeName: string, propertyName: string): any {
    const result: Partial<Omit<Schema, 'fields'>> & { fields: NonNullable<Schema['fields']> } = {
      name: convertToReadableText(typeName),
      slug: propertyName,
      pluralName: '',
      pluralSlug: '',
      fields: [],
    };

    Object.keys(schemaProperties).forEach((schemaPropertyName) => {
      const schemaPropertyType = schemaProperties[schemaPropertyName];
      const { resolvedTypeName, typeArguments } = resolveTypeAlias(schemaPropertyType);
      const firstTypeArgument = typeArguments[0]?.getText();

      if (resolvedTypeName === schemaRecordsAlias && typeName === firstTypeArgument) {
        result.pluralName = convertToReadableText(schemaPropertyType);
        result.pluralSlug = schemaPropertyName;
      }
    });

    function typeAliasVisitor(node: ts.Node) {
      if (ts.isTypeAliasDeclaration(node) && node.name.text === typeName) {
        if (ts.isTypeReferenceNode(node.type) && node.type.typeArguments) {
          const typeLiteral = node.type.typeArguments[0];
          if (ts.isTypeLiteralNode(typeLiteral)) {
            typeLiteral.members.forEach((member) => {
              if (ts.isPropertySignature(member)) {
                const fieldName = member.name.getText();
                const memberTypeText = getTypeFromNamespace(member.type!.getText());
                const fieldType = getFieldType(memberTypeText);

                const { name, description, details } = parseJsDoc(member);

                let schema: string | null = null;
                if (fieldType === 'record') {
                  schema = checkSchemaInclusion(member, typeName);
                }
                if (fieldType === 'unknown') {
                  const source = getLineAndColumnsNumber(member);

                  unknownFields.push({
                    parent: typeName,
                    name: fieldName,
                    type: memberTypeText,
                    source: `${relativePath}:${source.start.line}:${source.start.character}`,
                  });
                }

                const field: Record<string, unknown> = {
                  id: generateFieldId(fieldType),
                  type: fieldType,
                  slug: fieldName,
                  name: name || fieldName.charAt(0).toUpperCase() + fieldName.slice(1),
                  unique: false,
                  required: !member.questionToken,
                };

                if (description) {
                  field.description = description;
                }

                if (fieldType === 'text') {
                  field.displayAs = 'single-line';
                }

                if (Object.keys(details).length > 0) {
                  field.details = details;
                }

                if (schema) {
                  field.schema = schema;
                }

                result.fields.push(field as (typeof result.fields)[0]);
              }
            });
          }
        }
      }

      ts.forEachChild(node, typeAliasVisitor);
    }

    ts.forEachChild(sourceFile, typeAliasVisitor);

    if (!result.pluralName && result.fields.length) {
      const pluralTypeName = pluralize(typeName);
      onError(
        `The schema \`${typeName}\` does not have a plural slug and name defined.\n\n` +
          `Please define them in your schema definition file and include them in the \`Schemas\` interface:\n\n` +
          `import type * as Schema from 'ronin/schema';\n\n` +
          `type ${pluralTypeName} = Schema.${schemaRecordsAlias}<${typeName}>;\n\n` +
          `interface Schemas {\n  ${propertyName}: ${typeName};\n  ${pluralize(result.slug as string)}: ${pluralTypeName};\n}`,
      );
    }

    return result.fields.length ? result : null;
  }

  function visit(node: ts.Node) {
    visitImports(node);
    visitModule(node);
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  if (missingSchemas.length > 0) {
    const errorMessage =
      `The following schemas were used as a reference but weren't included in ` +
      `the \`Schemas\` interface:\n\n` +
      `${missingSchemas
        .map(({ name, parent, source }) => `  - \`${name}\` in \`${parent}\` (${source})`)
        .join('\n')}\n\n` +
      `Please include them in the \`Schemas\` interface or remove their references.`;

    onError(errorMessage);
  }

  if (unknownFields.length > 0) {
    const errorMessage =
      'The type of the following fields could not be determined:\n\n' +
      Array.from(unknownFields)
        .map(
          ({ name, parent, type, source }) => `  - \`${parent}.${name}\` is typed as \`${type}\` (${source})`,
        )
        .join('\n') +
      '\n\nPlease make sure that the field is typed as any of the available field ' +
      'types exported from the `ronin/schema` module:\n\n' +
      FIELD_TYPES.map((type) => `  - ${type}`).join('\n') +
      '\n  - or a reference to another schema.';

    onError(errorMessage);
  }

  return results;
}
