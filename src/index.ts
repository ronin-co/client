import { isStorableObject } from '@/src/storage';
import type { PromiseTuple, QueryHandlerOptions } from '@/src/types/utils';
import { queriesHandler, queryHandler } from '@/src/utils/handlers';
import { mergeOptions } from '@/src/utils/helpers';
import type {
  AddQuery,
  AlterQuery,
  CountQuery,
  CreateQuery,
  DropQuery,
  GetQuery,
  ModelField,
  ModelIndex,
  ModelPreset,
  ModelTrigger,
  Query,
  RemoveQuery,
  SetQuery,
} from '@ronin/compiler';
import {
  type DeepCallable,
  type SyntaxItem,
  getBatchProxy,
  getSyntaxProxy,
} from '@ronin/syntax/queries';
import type { Model } from '@ronin/syntax/schema';

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
): {
  get: DeepCallable<GetQuery>;
  set: DeepCallable<SetQuery>;
  add: DeepCallable<AddQuery>;
  remove: DeepCallable<RemoveQuery>;
  count: DeepCallable<CountQuery, number>;

  create: DeepCallable<CreateQuery, Model>;
  alter: DeepCallable<
    AlterQuery,
    Model | ModelField | ModelIndex | ModelTrigger | ModelPreset
  >;
  drop: DeepCallable<DropQuery, Model>;

  batch: <T extends [Promise<any>, ...Array<Promise<any>>] | Array<Promise<any>>>(
    operations: () => T,
    queryOptions?: Record<string, unknown>,
  ) => Promise<PromiseTuple<T>>;

  sql: (strings: TemplateStringsArray, ...values: Array<unknown>) => unknown;
} => {
  const callback = (query: Query, queryOptions?: QueryHandlerOptions) =>
    queryHandler(query, mergeOptions(options, queryOptions));

  const replacer = (value: unknown) => {
    return isStorableObject(value) ? value : JSON.parse(JSON.stringify(value));
  };

  return {
    // Query types for interacting with records.
    get: getSyntaxProxy({ rootProperty: 'get', callback, replacer }),
    set: getSyntaxProxy({ rootProperty: 'set', callback, replacer }),
    add: getSyntaxProxy({ rootProperty: 'add', callback, replacer }),
    remove: getSyntaxProxy({ rootProperty: 'remove', callback, replacer }),
    count: getSyntaxProxy({ rootProperty: 'count', callback, replacer }),

    // Query types for interacting with the database schema.
    create: getSyntaxProxy({
      rootProperty: 'create',
      callback,
      replacer,
    }) as DeepCallable<CreateQuery, Model>,
    alter: getSyntaxProxy({ rootProperty: 'alter', callback, replacer }),
    drop: getSyntaxProxy({ rootProperty: 'drop', callback, replacer }),

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

    sql: (strings: TemplateStringsArray, ...values: Array<unknown>) => {
      let text = '';
      const params: Array<unknown> = [];

      strings.forEach((string, i) => {
        text += string;

        if (i < values.length) {
          text += `$${i + 1}`;
          params.push(values[i]);
        }
      });

      const statement = {
        statement: text,
        params,
      };

      return queryHandler({ statement }, mergeOptions(options, {}));
    },
  };
};

const factory = createSyntaxFactory({});

export const get = factory.get as DeepCallable<GetQuery>;
export const set = factory.set as DeepCallable<SetQuery>;
export const add = factory.add as DeepCallable<AddQuery>;
export const remove = factory.remove as DeepCallable<RemoveQuery>;
export const count = factory.count as DeepCallable<CountQuery, number>;

export const create = factory.create as DeepCallable<CreateQuery, Model>;
export const alter = factory.alter as DeepCallable<
  AlterQuery,
  Model | ModelField | ModelIndex | ModelTrigger | ModelPreset
>;
export const drop = factory.drop as DeepCallable<DropQuery, Model>;

export const batch = factory.batch as <
  T extends [Promise<any>, ...Array<Promise<any>>] | Array<Promise<any>>,
>(
  operations: () => T,
  queryOptions?: Record<string, unknown>,
) => Promise<PromiseTuple<T>>;

export default createSyntaxFactory;
