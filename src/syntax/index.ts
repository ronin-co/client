import type { RONIN } from '../types/codegen';
import type { QueryHandlerOptionsFactory } from '../types/utils';
import { queriesHandler, queryHandler } from './handlers';
import { batch, getSyntaxProxy } from './utils';

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
export const createSyntaxFactory = (options: QueryHandlerOptionsFactory) => ({
  create: getSyntaxProxy('create', (query) => queryHandler(query, options)) as RONIN.Creator,
  get: getSyntaxProxy('get', (query) => queryHandler(query, options)) as RONIN.Getter,
  set: getSyntaxProxy('set', (query) => queryHandler(query, options)) as RONIN.Setter,
  drop: getSyntaxProxy('drop', (query) => queryHandler(query, options)) as RONIN.Dropper,
  count: getSyntaxProxy('count', (query) => queryHandler(query, options)) as RONIN.Counter,
  batch: <T extends [Promise<any>, ...Promise<any>[]]>(operations: () => T) =>
    batch<T>(operations, (queries) => queriesHandler(queries, options)),
});
