import type { QueryHandlerOptions } from '@/src/types/utils';

/**
 * Splits the given path into an array of so-called segments. This is done by
 * splitting the path on the `.` character, but only if it's not preceded by a
 * `\` character. This is done to allow for setting values on nested records,
 * such as `invoice.companyName`.
 *
 * @param path - Dot-separated path to split into segments.
 *
 * @returns Array of path segments.
 */
const getPathSegments = (path: string): Array<string> => {
  const segments = path
    // Split path on property and array accessors (`.` and `[]`). By using a
    // non-printable unicode character (u200B), we can achieve the same result
    // as when using a negative lookbehind to filter out preceding backslashes,
    // but with support for Safari, because negative lookbehinds don't work
    // in Safari at the time of writing.
    .replace(/\\\./g, '\u200B')
    .split(/[[.]/g)
    .map((s) => s.replace(/\u200B/g, '.'))
    // Filter out empty values. (`foo..bar` would otherwise result in
    // `['foo', '', 'bar']`).
    .filter((x) => !!x.trim())
    // Remove the escaping character (`\`) before escaped segments.
    // `foo\.bar,baz` will result in `['foo.bar', 'baz']`.
    .map((x) => x.replaceAll('\\.', '.'));

  return segments;
};

/**
 * Set the property at the given path to the given value.
 *
 * @param obj - Object to set the property on.
 * @param pathSegments - An array of property keys leading up to the final
 * property to set.
 * @param value - Value to set at the given path.
 *
 * @returns Object with the updated property.
 */
const setPropertyViaPathSegments = (
  obj: object,
  pathSegments: Array<string>,
  value: any | ((value: any) => any),
) => {
  let current = obj as Record<string, object>;

  for (let i = 0; i < pathSegments.length; i++) {
    const key = pathSegments[i];
    const isLastKey = i === pathSegments.length - 1;

    if (isLastKey) {
      current[key] = typeof value === 'function' ? value(current[key]) : value;
    } else {
      // Only create a new object if the current key does not exist, or if it
      // exists but is not of the correct type.
      if (
        !Object.prototype.hasOwnProperty.call(current, key) ||
        typeof current[key] !== 'object'
      ) {
        current[key] = {};
      }
      current = current[key] as Record<string, object>;
    }
  }
};

export const setProperty = <T extends object, K>(obj: T, path: string, value: K): T => {
  const segments = getPathSegments(path);
  setPropertyViaPathSegments(obj, segments, value);
  return obj;
};

/**
 * Gets the property value of an object based on the given path segments
 * of the property.
 *
 * @param obj - The object to get the property value from.
 * @param pathSegments - An array of property keys leading up to the final
 * property at the end.
 *
 * @returns The property value at the specified path or `undefined` if the path
 * does not exist.
 *
 * @example
 * const exampleObject = \{
 *   user: \{
 *     name: \{
 *       first: 'John',
 *       last: 'Doe'
 *     \},
 *     age: 30
 *   \}
 * \};
 * console.log(getProperty(exampleObject, ['user', 'name', 'first'])); // Output: 'John'
 * console.log(getProperty(exampleObject, ['user', 'age'])); // Output: 30
 * console.log(getProperty(exampleObject, ['user', 'non', 'existing'])); // Output: undefined
 */
export const getProperty = (obj: object, path: string): unknown => {
  const pathSegments = getPathSegments(path);

  let current = obj as Record<string, object>;

  for (const key of pathSegments) {
    if (current[key] === null || current[key] === undefined) return undefined;
    current = current[key] as Record<string, object>;
  }

  return current;
};

/**
 * Turn the given string into "dash-case", which we use for slugs.
 *
 * @param string - String to turn into dash-case.
 *
 * @returns String compatible with "dash-case".
 *
 * Originally from https://github.com/rayepps/radash/blob/7c6b986d19c68f19ccf5863d518eb19ec9aa4ab8/src/string.ts#L60-L71.
 */
export const toDashCase = (string?: string | null): string => {
  const capitalize = (str: string) => {
    const lower = str.toLowerCase();
    return lower.substring(0, 1).toUpperCase() + lower.substring(1, lower.length);
  };

  const parts =
    string
      ?.replace(/([A-Z])+/g, capitalize)
      ?.split(/(?=[A-Z])|[.\-\s_]/)
      .map((x) => x.toLowerCase()) ?? [];

  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0];

  return parts.reduce((acc, part) => `${acc}-${part.toLowerCase()}`);
};

/**
 * Convert Date fields in a record to JavaScript `Date` objects.
 *
 * @param record - A record to format the Date fields of.
 * @param dateFields - An array of property keys for the date fields.
 */
export const formatDateFields = (record: object, dateFields: Array<string>) => {
  for (const field of dateFields) {
    const value = getProperty(record, field);
    if (typeof value === 'undefined' || value === null) continue;

    setProperty(record, field, new Date(value as string));
  }
};

/**
 * Merges a list of option objects and option factories into a single object.
 *
 * @param options - An array of option objects or option factories.
 *
 * @returns A single option object.
 */
export const mergeOptions = (
  ...options: Array<undefined | QueryHandlerOptions | (() => QueryHandlerOptions)>
): QueryHandlerOptions => {
  return options.reduce((acc: QueryHandlerOptions, opt) => {
    const resolvedOpt = typeof opt === 'function' ? opt() : opt;
    Object.assign(acc, resolvedOpt);
    return acc;
  }, {});
};
