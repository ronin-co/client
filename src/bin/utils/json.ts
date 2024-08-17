/**
 * Safely parses a JSON string.
 *
 * This function attempts to parse a given JSON string. If parsing fails,
 * it returns the original string instead of throwing an error.
 *
 * @param json - The JSON string to be parsed.
 * @returns The parsed object if the input is valid JSON, otherwise the original string.
 */
export const safeParseJson = (json: string) => {
  try {
    return JSON.parse(json);
  } catch {
    return json;
  }
};
