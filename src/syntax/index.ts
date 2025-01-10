import { queriesHandler, queryHandler } from '@/src/syntax/handlers';
import type { RONIN } from '@/src/types/codegen';
import type { PromiseTuple, QueryHandlerOptions } from '@/src/types/utils';
import { mergeOptions } from '@/src/utils/helpers';
import type { Query } from '@ronin/compiler';
import { type SyntaxItem, getBatchProxy, getSyntaxProxy } from '@ronin/syntax/queries';

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
 * const { get, set, add, remove, count } = createSyntaxFactory({
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
 * await add.account({ to: { email: 'mike@gmail.com' } });
 *
 * await remove.accounts.with.emailVerified.notBeing(true);
 *
 * await count.accounts();
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
) => {
  const callback = (query: Query, queryOptions?: QueryHandlerOptions) =>
    queryHandler(query, mergeOptions(options, queryOptions));

  return {
    // Query types for interacting with records.
    get: getSyntaxProxy({ rootProperty: 'get', callback }) as RONIN.Getter,
    set: getSyntaxProxy({ rootProperty: 'set', callback }) as RONIN.Setter,
    add: getSyntaxProxy({ rootProperty: 'add', callback }) as RONIN.Adder,
    remove: getSyntaxProxy({ rootProperty: 'remove', callback }) as RONIN.Remover,
    count: getSyntaxProxy({ rootProperty: 'count', callback }) as RONIN.Counter,

    // Query types for interacting with the database schema.
    create: getSyntaxProxy({ rootProperty: 'create', callback }) as RONIN.Creator,
    alter: getSyntaxProxy({ rootProperty: 'alter', callback }) as RONIN.Alterer,
    drop: getSyntaxProxy({ rootProperty: 'drop', callback }) as RONIN.Dropper,

    // Function for executing a transaction containing multiple queries.
    batch: <T extends [Promise<any>, ...Array<Promise<any>>] | Array<Promise<any>>>(
      operations: () => T,
      queryOptions?: Record<string, unknown>,
    ): Promise<PromiseTuple<T>> => {
      const batchOperations = operations as unknown as () => Array<SyntaxItem<Query>>;
      const queries = getBatchProxy(batchOperations).map(({ structure }) => structure);
      const finalOptions = mergeOptions(options, queryOptions);

      return queriesHandler(queries, finalOptions) as Promise<PromiseTuple<T>>;
    },
  };
};
