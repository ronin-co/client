interface InvalidQueryErrorDetails {
  message: string;
  query: string | null;
  path: string | null;
  details: string;
  code: string;
  fields: Array<string>;
}

export class InvalidQueryError extends Error {
  message: InvalidQueryErrorDetails['message'];
  query: InvalidQueryErrorDetails['query'];
  path: InvalidQueryErrorDetails['path'];
  details: InvalidQueryErrorDetails['details'];
  code: InvalidQueryErrorDetails['code'];
  fields: InvalidQueryErrorDetails['fields'];

  constructor(details: InvalidQueryErrorDetails) {
    super(details.message);

    this.name = 'InvalidQueryError';
    this.message = details.message;
    this.query = details.query;
    this.path = details.path;
    this.details = details.details;
    this.code = details.code;
    this.fields = details.fields;
  }
}

interface InvalidResponseErrorDetails {
  message: string;
  code: string;
}

export class InvalidResponseError extends Error {
  message: InvalidResponseErrorDetails['message'];
  code: InvalidResponseErrorDetails['code'];

  constructor(details: InvalidResponseErrorDetails) {
    super(details.message);

    this.name = 'InvalidResponseError';
    this.message = details.message;
    this.code = details.code;
  }
}

/**
 * Parses the response as JSON or, alternatively, throws an error containing
 * potential error details that might have been included in the response.
 *
 * @param response The response of a fetch request.
 *
 * @returns The response body as a JSON object.
 */
export const getResponseBody = async <T>(
  response: Response,
  options?: { errorPrefix?: string },
): Promise<T> => {
  // If the response is okay, we want to parse the JSON asynchronously.
  if (response.ok) return response.json() as T;

  const text = await response.text();

  let json: T & {
    error?: InvalidResponseErrorDetails;
  };

  try {
    json = JSON.parse(text);
  } catch (_err) {
    throw new InvalidResponseError({
      message: `${options?.errorPrefix ? `${options.errorPrefix} ` : ''}${text}`,
      code: 'JSON_PARSE_ERROR',
    });
  }

  if (json.error) {
    json.error.message = `${options?.errorPrefix ? `${options.errorPrefix} ` : ''}${json.error.message}`;
    throw new InvalidResponseError(json.error);
  }

  return json;
};

/**
 * Utility function to generate a dot-notated string of the given path.
 *
 * Example:
 *
 * `['queries', 0, 'get', 'account', 'with', 'handle']`
 * =\>
 * `queries[0].get.account.with.handle`
 *
 * @param path - An array of path segments to combine.
 *
 * @returns The dot-notated string.
 */
export const getDotNotatedPath = (
  segments: Array<string | number> = [],
): string | null =>
  segments.length > 0
    ? (segments.reduce((path, segment, index) => {
        if (typeof segment === 'number') return `${path}[${segment}]`;
        if (index === 0) return `${segment}`;
        return `${path}.${segment}`;
      }, '') as string)
    : null;
