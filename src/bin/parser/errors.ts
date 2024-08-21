import pluralize from 'pluralize';

const FIELD_TYPES = ['Blob', 'JSON'];
const PRIMITIVE_FIELD_TYPES = ['string', 'number', 'boolean', 'Date'];

export function createMissingSchemaError(missingSchemas: { name: string; parent: string; source: string }[]) {
  const errorMessage =
    `The following schemas were used as a reference but weren't included in ` +
    `the \`Schemas\` interface:\n\n` +
    `${missingSchemas
      .map(({ name, parent, source }) => `  - \`${name}\` in \`${parent}\` (${source})`)
      .join('\n')}\n\n` +
    `Please include them in the \`Schemas\` interface or remove their references.`;
  return errorMessage;
}

export function createMissingPluralError(
  schemaName: string,
  schemaSlug: string,
  pluralSchemaSlug: string,
  schemaRecordsAlias: string,
) {
  const pluralTypeName = pluralize(schemaName);

  const errorMessage =
    `The schema \`${schemaName}\` does not have a plural slug and name defined.\n\n` +
    `Please define them in your schema definition file and include them in the \`Schemas\` interface:\n\n` +
    `import type * as Schema from 'ronin/schema';\n\n` +
    `type ${pluralTypeName} = Schema.${schemaRecordsAlias}<${schemaName}>;\n\n` +
    `interface Schemas {\n  ${schemaSlug}: ${schemaName};\n  ${pluralize(pluralSchemaSlug)}: ${pluralTypeName};\n}`;

  return errorMessage;
}

export function createUnknownFieldError(
  unknownFields: { parent: string; name: string; type: string; source: string }[],
) {
  const errorMessage =
    'The type of the following fields could not be determined:\n\n' +
    Array.from(unknownFields)
      .map(
        ({ name, parent, type, source }) => `  - \`${parent}.${name}\` is typed as \`${type}\` (${source})`,
      )
      .join('\n') +
    '\n\nPlease make sure that the field is typed as any of the available field types:\n\n' +
    PRIMITIVE_FIELD_TYPES.map((type) => `  - \`${type}\``).join('\n') +
    '\n' +
    FIELD_TYPES.map((type) => `  - \`Schema.${type}\``).join('\n') +
    '\n  - or a reference to another schema.';
  return errorMessage;
}
