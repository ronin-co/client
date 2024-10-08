import pluralize from 'pluralize';

// Advanced fields types exported from 'ronin/schema'.
const ADVANCED_FIELD_TYPES = ['Blob', 'JSON'];
// Basic field types supported in defining schemas.
const BASIC_FIELD_TYPES = ['string', 'number', 'boolean', 'Date'];

export function createMissingSchemaError(
  missingSchemas: Array<{ name: string; parent: string; source: string }>,
) {
  return `The following schemas were used as a reference but weren't included in the \`Schemas\` interface:\n\n${missingSchemas
    .map(({ name, parent, source }) => `  - \`${name}\` in \`${parent}\` (${source})`)
    .join(
      '\n',
    )}\n\nPlease include them in the \`Schemas\` interface or remove their references.`;
}

export function createMissingPluralError(
  schemaName: string,
  schemaSlug: string,
  pluralSchemaSlug: string,
  schemaRecordsAlias: string,
) {
  const pluralTypeName = pluralize(schemaName);

  return (
    // biome-ignore lint/style/useTemplate: We do this because we don't want to have too long lines.
    `The schema \`${schemaName}\` does not have a plural slug and name defined.\n\n` +
    'Please define them in your schema definition file and include them in the `Schemas` interface:\n\n' +
    `import type * as Schema from 'ronin/schema';\n\n` +
    `type ${pluralTypeName} = Schema.${schemaRecordsAlias}<${schemaName}>;\n\n` +
    `interface Schemas {\n  ${schemaSlug}: ${schemaName};\n  ${pluralize(pluralSchemaSlug)}: ${pluralTypeName};\n}`
  );
}

export function createUnknownFieldError(
  unknownFields: Array<{
    parent: string;
    name: string;
    type: string;
    source: string;
  }>,
) {
  return (
    // biome-ignore lint/style/useTemplate: We do this because we don't want to have too long lines.
    'The type of the following fields could not be determined:\n\n' +
    `${unknownFields
      .map(
        ({ name, parent, type, source }) =>
          `  - \`${parent}.${name}\` is typed as \`${type}\` (${source})`,
      )
      .join('\n')}\n\n` +
    'Please make sure that the field is typed as any of the available field types:\n\n' +
    `${BASIC_FIELD_TYPES.map((type) => `  - \`${type}\``).join('\n')}\n` +
    `${ADVANCED_FIELD_TYPES.map((type) => `  - \`Schema.${type}\``).join('\n')}\n` +
    '  - or a reference to another schema.'
  );
}
