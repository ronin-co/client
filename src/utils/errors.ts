interface Details {
  message: string;
  query: string | null;
  path: string | null;
  details: string;
}

export class InvalidQueryError extends Error {
  message: Details['message'];
  query: Details['query'];
  path: Details['path'];
  details: Details['details'];

  constructor(details: Details) {
    super(details.message);

    this.name = 'InvalidQueryError';
    this.message = details.message;
    this.query = details.query;
    this.path = details.path;
    this.details = details.details;
  }
}

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
