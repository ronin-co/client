import type { Query } from '../types/query';
import type { PromiseTuple } from '../types/utils';
import { objectFromAccessor } from '../utils/helpers';

let inBatch = false;

/**
 * A utility function that creates a Proxy object to handle dynamic property
 * access and function calls. It is used to create a syntax that allows for
 * dynamic query generation.
 *
 * @param queryType - The type of the query. This will be used as the key in
 * the generated query object.
 * @param queryHandler - A function that handles the execution of the query.
 *
 * @returns A Proxy object that intercepts property access and function
 * calls to generate and execute queries.
 *
 * ### Usage
 * ```typescript
 * const proxy = getSyntaxProxy('get', async (query) => {
 *   // Execute the query and return the result
 * });
 *
 * const result = await get.account();
 *
 * const result = await get.account.with.email('mike@gmail.com');
 * ```
 */
export const getSyntaxProxy = (queryType: string, queryHandler: (query: Query) => Promise<any>) => {
  return new Proxy(
    {},
    {
      get(_target: any, prop: string) {
        function createProxy(path: string[]) {
          const proxyTargetFunction = () => {};

          // This is workaround to avoid "uncalled functions" in the test
          // coverage report. Test coverage tools fail to recognize that the
          // function is called when it's called via a Proxy.
          proxyTargetFunction();

          return new Proxy(proxyTargetFunction, {
            async apply(_target: any, _thisArg: any, args: any[]) {
              const value = args[0];
              const expanded = objectFromAccessor(path.join('.'), typeof value === 'undefined' ? {} : value);

              const query = { [queryType]: expanded };

              if (inBatch) {
                return query;
              }

              return queryHandler(query);
            },

            get(_target: any, nextProp: string): any {
              return createProxy(path.concat([nextProp]));
            },
          });
        }

        return createProxy([prop]);
      },
    },
  );
};

/**
 * Executes a batch of operations and handles their results. It is used to
 * execute multiple queries at once and return their results at once.
 *
 * @param operations - A function that returns an array of Promises. Each
 * Promise should resolve with a Query object.
 * @param queriesHandler - A function that handles the execution of the queries.
 * This function is expected to receive an array of Query objects and return a
 * Promise that resolves with the results of the queries.
 *
 * @returns A Promise that resolves with a tuple of the results of the queries.
 *
 * ### Usage
 * ```typescript
 * const results = await batch(() => [
 *   get.accounts(),
 *   get.account.with.email('mike@gmail.com')
 * ], async (queries) => {
 *   // Execute the queries and return their results
 * });
 * ```
 */
export const getBatchProxy = async <T extends [Promise<any>, ...Promise<any>[]]>(
  operations: () => T,
  queriesHandler: (queries: Query[]) => Promise<any>,
): Promise<PromiseTuple<T>> => {
  inBatch = true;
  const queries = (await Promise.all(operations())) as Query[];
  inBatch = false;

  return queriesHandler(queries) as PromiseTuple<T>;
};
