import { runQueries, runQueriesWithStorageAndTriggers } from '@/src/queries';
import type { QueryHandlerOptions } from '@/src/types/utils';
import type { Query, Statement } from '@ronin/compiler';

/**
 * Executes an array of queries and handles their results. It is used to execute
 * multiple queries at once and return their results in a single promise.
 *
 * @param queries - A list of RONIN queries or SQL statements to execute.
 * @param options - An optional object of options for the query execution.
 *
 * @returns A Promise that resolves with the query results.
 *
 * ### Usage
 * ```typescript
 * const results = await queriesHandler([
 *   { get: { accounts: {} } },
 *   { get: { account: { with: { email: 'mike@gmail.com' } } } }
 * ], { token: 'your-ronin-app-token' });
 * ```
 *
 * The `RONIN_TOKEN` environment variable will be used (if available) to
 * authenticate requests if the `token` option is not provided.
 */
export const queriesHandler = async (
  queries: Array<Query> | { statements: Array<Statement> },
  options: QueryHandlerOptions = {},
) => {
  if (!options.token && typeof process !== 'undefined') {
    const token =
      typeof process?.env !== 'undefined'
        ? process.env.RONIN_TOKEN
        : typeof import.meta?.env !== 'undefined'
          ? import.meta.env.RONIN_TOKEN
          : undefined;

    if (!token || token === 'undefined') {
      const message =
        'Please specify the `RONIN_TOKEN` environment variable' +
        ' or set the `token` option when invoking RONIN.';

      throw new Error(message);
    }

    options.token = token;
  }

  const token = options.token;

  if (!token) {
    let message = 'When invoking RONIN from an edge runtime, the';
    message += ' `token` option must be set.';

    throw new Error(message);
  }

  if ('statements' in queries) {
    const results = await runQueries(
      queries.statements.map((statement) => ({ statement })),
      options,
    );
    return results.map(({ result }) => result);
  }

  if (options.database) {
    const queryList = { [options.database]: queries };
    const result = await runQueriesWithStorageAndTriggers(queryList, options);

    return result[options.database];
  }

  return runQueriesWithStorageAndTriggers(queries, options);
};

/**
 * Executes a query and returns the result.
 *
 * @param query - A RONIN query or SQL statement to execute.
 * @param options - An optional object of options for the query execution.
 *
 * @returns A Promise that resolves with the query result.
 *
 * ### Usage
 * ```typescript
 * const result = await queryHandler(
 *   { get: { accounts: {} } },
 *   { token: 'your-token' }
 * );
 * ```
 */
export const queryHandler = async (
  query: Query | { statement: Statement },
  options: QueryHandlerOptions,
) => {
  const input = 'statement' in query ? { statements: [query.statement] } : [query];
  const results = await queriesHandler(input, options);

  return results[0];
};
