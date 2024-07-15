interface InvalidQueryErrorDetails {
  message: string;
  query: string | null;
  path: string | null;
  details: string;
}

export class InvalidQueryError extends Error {
  message: InvalidQueryErrorDetails['message'];
  query: InvalidQueryErrorDetails['query'];
  path: InvalidQueryErrorDetails['path'];
  details: InvalidQueryErrorDetails['details'];

  constructor(details: InvalidQueryErrorDetails) {
    super(details.message);

    this.name = 'InvalidQueryError';
    this.message = details.message;
    this.query = details.query;
    this.path = details.path;
    this.details = details.details;
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

    this.name = 'InvalidQueryRequest';
    this.message = details.message;
    this.code = details.code;
  }
}

/**
 * Parses the response as JSON or, alternatively, throws an error containing
 * potential error details that might have been included in the response.
 *
 * @param response The response of a fetch request.
 * @returns The response body as a JSON object.
 */
export const getResponseBody = async <T>(response: Response): Promise<T> => {
  if (response.ok) return response.json() as T;

  const text = await response.text();

  let error: InvalidResponseErrorDetails = {
    message: text,
    code: 'UNKNOWN_ERROR',
  };

  try {
    ({ error } = JSON.parse(text));
  } catch (err) {
    // Ignore parsing errors
  }

  throw new InvalidResponseError(error);
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
export const getDotNotatedPath = (segments: (string | number)[] = []): string | null =>
  segments.length > 0
    ? (segments.reduce((path, segment, index) => {
        if (typeof segment === 'number') return `${path}[${segment}]`;
        if (index === 0) return `${segment}`;
        return `${path}.${segment}`;
      }, '') as string)
    : null;
