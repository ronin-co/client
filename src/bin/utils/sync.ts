import { confirm } from '@inquirer/prompts';

import { generateFieldId } from '@/src/bin/utils/schema';
import type { Schema } from '@/src/types/schema';

/**
 * Fetch the available spaces for the current session.
 *
 * @param sessionToken The session token to use for the request.
 *
 * @returns The available spaces for the current session.
 */
export const getSpaces = async (
  sessionToken: string,
): Promise<{ id: string; handle: string; name: string }[]> => {
  let res;
  try {
    res = await fetch('https://ronin.supply/-/ronin/spaces', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionToken}`,
      },
    });
  } catch (err) {
    throw new Error('Failed to fetch available spaces: ${err.message}');
  }

  const text = await res.text();

  let json;
  try {
    json = JSON.parse(text);
  } catch (err) {
    throw new Error(`Failed to parse response from server: ${text}`);
  }

  return json.spaces;
};

/**
 * Fetch the existing schemas for the configured space.
 *
 * @param token Either an App Token or a Session Token.
 * @param space The ID of the space to fetch schemas for.
 *
 * @returns The schemas of the provided space
 */
export const getSchemas = async (token: string, space: string): Promise<Schema[]> => {
  let res;
  try {
    res = await fetch(`https://ronin.supply/-/ronin/schemas?data-selector=${space}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    throw new Error('Failed to fetch available spaces: ${err.message}');
  }

  const text = await res.text();

  let json;
  try {
    json = JSON.parse(text);
  } catch (err) {
    throw new Error(`Failed to parse response from server: ${text}`);
  }

  return json.schemas;
};

/**
 * Replace the ID's of fields in the local schema with the ID's
 * of the existing fields in the remote schema.
 *
 * @param local Local schema definitions.
 * @param remote Existing remote schema definitions.
 *
 * @returns Updated local schema definitions.
 */
export const replaceFieldIdsWithExisting = async (local: Schema[], remote: Schema[]): Promise<Schema[]> => {
  return local.map((schema) => {
    const existingSchema = remote.find((s) => s.slug === schema.slug);
    if (!existingSchema) {
      return schema;
    }

    const existingFields = existingSchema.fields || [];
    const localFields = schema.fields || [];

    const fields = localFields.map((field) => {
      const existingField = existingFields.find((f) => f.slug === field.slug);

      if (!existingField) {
        return field;
      }

      return {
        ...field,
        id: existingField.id,
      };
    });

    return {
      ...schema,
      fields,
    };
  });
};

/**
 * Compare the local schema definitions with the remote schema definitions. If
 * there's a divergence, ask the user if they want to continue.
 *
 * !!Important!! This function can mutate the given local schema definitions.
 *
 * @param local Local schema definitions.
 * @param remote Existing remote schema definitions.
 * @param spinner The spinner instance to log messages.
 */
export const compareSchemas = async (local: Schema[], remote: Schema[], spinner: any) => {
  const fieldsWithDifferentTypes: string[] = [];

  local.forEach(({ slug: schemaSlug, fields }) => {
    // The fields can't be undefined, but TS doesn't know that.
    if (!fields) return;

    const existingSchema = remote.find((schema) => schema.slug === schemaSlug);
    const existingFields = existingSchema?.fields || [];
    if (!existingSchema) {
      return;
    }

    fields.forEach((field) => {
      const existingField = existingFields.find((f) => f.slug === field.slug);

      if (!existingField) {
        return;
      }

      // We can skip asking the user if the field type changed
      // between short-text and long-text.
      const canChangeType =
        ['short-text', 'long-text'].includes(existingField.type) &&
        ['short-text', 'long-text'].includes(field.type);

      if (!canChangeType && existingField.type !== field.type) {
        // It's important to change the field ID when the type changes
        // because it's essentially a new field.
        field.id = generateFieldId(field.type);

        fieldsWithDifferentTypes.push(`${schemaSlug}.${field.slug} (${existingField.type} -> ${field.type})`);
      }
    });
  });

  if (fieldsWithDifferentTypes.length === 0) {
    return;
  }

  spinner.warn(
    `The data type of the following fields have changed:\n${fieldsWithDifferentTypes
      .map((field) => `  - ${field}`)
      .join('\n')}\n\n`,
  );

  const answer = await confirm({
    message: 'The content of these fields will be lost. Do you want to continue?',
    default: false,
  });

  if (!answer) {
    spinner.stop();
    process.exit();
  }
};
