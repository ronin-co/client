import type { QueryHandlerOptions } from '@/src/types/utils';
import { getProperty, setProperty } from '@ronin/syntax/queries';

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
