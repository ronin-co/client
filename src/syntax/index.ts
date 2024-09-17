import { queriesHandler, queryHandler } from '@/src/syntax/handlers';
import { getBatchProxy, getSyntaxProxy } from '@/src/syntax/utils';
import type { RONIN } from '@/src/types/codegen';
import type { PromiseTuple, QueryHandlerOptions } from '@/src/types/utils';
import { mergeOptions } from '@/src/utils/helpers';

/**
 * Creates a syntax factory for generating and executing queries.
 *
 * @param options - An optional object of options for the query execution.
 *
 * Alternatively, a function that returns the object may be provided instead,
 * which is useful for cases in which the config must be generated dynamically
 * whenever a query is executed.
 *
 * @returns An object with methods for generating and executing different types
 * of queries.
 *
 * ### Usage
 * ```typescript
 * const { get, set, create, count, drop } = createSyntaxFactory({
 *   token: '...'
 * });
 *
 * await get.accounts();
 *
 * await set.account({
 *   with: {
 *     email: 'mike@gmail.com',
 *   },
 *   to: {
 *     status: 'active',
 *   },
 * });
 *
 *
 * await create.account({ with: { email: 'mike@gmail.com' } });
 *
 * await count.accounts();
 *
 * await drop.accounts.with.emailVerified.notBeing(true);
 *
 * // Execute a batch of operations
 * const batchResult = await batch(() => [
 *   get.accounts(),
 *   get.account.with.email('mike@gmail.com')
 * ]);
 * ```
 */
export const createSyntaxFactory = (
  options: QueryHandlerOptions | (() => QueryHandlerOptions),
) => ({
  create: getSyntaxProxy('create', (query, queryOptions) =>
    queryHandler(query, mergeOptions(options, queryOptions)),
  ) as RONIN.Creator,
  get: getSyntaxProxy('get', (query, queryOptions) =>
    queryHandler(query, mergeOptions(options, queryOptions)),
  ) as RONIN.Getter,
  set: getSyntaxProxy('set', (query, queryOptions) =>
    queryHandler(query, mergeOptions(options, queryOptions)),
  ) as RONIN.Setter,
  drop: getSyntaxProxy('drop', (query, queryOptions) =>
    queryHandler(query, mergeOptions(options, queryOptions)),
  ) as RONIN.Dropper,
  count: getSyntaxProxy('count', (query, queryOptions) =>
    queryHandler(query, mergeOptions(options, queryOptions)),
  ) as RONIN.Counter,
  batch: <T extends [Promise<any>, ...Array<Promise<any>>] | Array<Promise<any>>>(
    operations: () => T,
    batchQueryOptions?: Record<string, unknown>,
  ) =>
    getBatchProxy<T>(operations, batchQueryOptions, (queries, queryOptions) =>
      queriesHandler(
        queries.map(({ query }) => query),
        mergeOptions(options, batchQueryOptions, queryOptions),
      ),
    ) as Promise<PromiseTuple<T>>,
});
