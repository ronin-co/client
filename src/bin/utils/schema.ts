import fs from 'fs/promises';
import path from 'path';
import ts from 'typescript';

import { generateUniqueId } from '@/src/utils/id';

export async function parseSchemaDefinitionFile(filePath: string = './schemas/index.d.ts') {
  const fullPath = path.resolve(process.cwd(), filePath);
  const fileContent = await fs.readFile(fullPath, 'utf-8');
  const sourceFile = ts.createSourceFile('temp.d.ts', fileContent, ts.ScriptTarget.Latest, true);

  const results: any[] = [];
  const typeMapping: Record<string, string> = {};
  const schemaProperties: Record<string, string> = {};

  let schemaRecordAlias = 'SchemaRecord';
  let schemaRecordsAlias = 'SchemaRecords';

  function getFieldType(type: string): string {
    const originalType = typeMapping[type] || type;
    switch (originalType) {
      case 'ShortText':
        return 'short-text';
      case 'LongText':
        return 'long-text';
      case 'RichText':
        return 'rich-text';
      case 'Time':
        return 'time';
      case 'Blob':
        return 'blob';
      case 'Toggle':
        return 'toggle';
      case 'Number':
        return 'number';
      case 'Token':
        return 'token';
      case 'JSON':
        return 'json';
      default:
        return 'unknown';
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

  function resolveTypeAlias(typeName: string): { resolvedTypeName: string; typeArguments: ts.TypeNode[] } {
    let resolvedTypeName = typeName;
    let typeArguments: ts.TypeNode[] = [];

    function typeAliasVisitor(node: ts.Node) {
      if (ts.isTypeAliasDeclaration(node) && node.name.text === typeName) {
        if (ts.isTypeReferenceNode(node.type) && node.type.typeName) {
          resolvedTypeName = node.type.typeName.getText();
          if (node.type.typeArguments) {
            typeArguments = Array.from(node.type.typeArguments);
          }
        }
      }
      ts.forEachChild(node, typeAliasVisitor);
    }
    ts.forEachChild(sourceFile, typeAliasVisitor);

    return { resolvedTypeName, typeArguments };
  }

  function parseTypeAlias(typeName: string, propertyName: string): any {
    const result: any = {
      name: typeName,
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
        result.pluralName = schemaPropertyType;
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
                let fieldType = getFieldType(member.type!.getText());
                const { name, description, details } = parseJsDoc(member);
                if (
                  fieldType === 'unknown' &&
                  resolveTypeAlias(member.type!.getText()).resolvedTypeName === schemaRecordAlias
                ) {
                  fieldType = 'record';
                }
                const field = {
                  type: fieldType,
                  id: `${fieldType}-${generateUniqueId()}`,
                  slug: fieldName,
                  name: name || fieldName.charAt(0).toUpperCase() + fieldName.slice(1),
                  description: description || undefined,
                  details: details,
                  unique: false,
                };
                result.fields.push(field);
              }
            });
          }
        }
      }

      ts.forEachChild(node, typeAliasVisitor);
    }

    ts.forEachChild(sourceFile, typeAliasVisitor);

    if (!result.pluralName) {
      result.pluralName = typeName + 's';
      result.pluralSlug = propertyName + 's';
    }

    return result.fields.length ? result : null;
  }

  function visit(node: ts.Node) {
    visitImports(node);
    visitModule(node);
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  return results;
}
