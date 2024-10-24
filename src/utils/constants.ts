/**
 * A list of placeholders that can be located inside queries after those queries were
 * serialized into JSON objects.
 *
 * These placeholders are used to represent special keys and values. For example, if a
 * query is nested into a query, the nested query will be marked with `__RONIN_QUERY`,
 * which allows for distinguishing that nested query from an object of instructions.
 */
export const RONIN_SCHEMA_SYMBOLS = {
  QUERY: '__RONIN_QUERY',
  FIELD: '__RONIN_FIELD_',
  VALUE: '__RONIN_VALUE',
} as const;
