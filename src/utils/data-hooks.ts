import { runQueries } from '../queries';
import type { CombinedInstructions, Query, QuerySchemaType, QueryType, Results } from '../types/query';
import type { QueryHandlerOptions, RecursivePartial } from '../types/utils';
import { toDashCase } from './helpers';

const EMPTY = Symbol('empty');

export type FilteredHookQuery<
  TQuery extends CombinedInstructions,
  TType extends QueryType,
> = RecursivePartial<TQuery> &
  Pick<
    TQuery,
    TType extends 'count'
      ? never
      : TType extends 'create'
        ? 'with'
        : TType extends 'get'
          ? never
          : TType extends 'set'
            ? 'to'
            : TType extends 'drop'
              ? never
              : never
  >;

export type BeforeHookHandler<
  TType extends QueryType,
  TQuery extends FilteredHookQuery<CombinedInstructions, TType> = FilteredHookQuery<
    CombinedInstructions,
    TType
  >,
> = (query: TQuery, multipleRecords: boolean) => TQuery | Promise<TQuery>;

export type DuringHookHandler<TType extends QueryType, TSchema = unknown> = (
  query: FilteredHookQuery<CombinedInstructions, TType>,
  multipleRecords: boolean,
) => TSchema | Promise<TSchema>;

export type AfterHookHandler<TType extends QueryType, TSchema = unknown> = (
  query: FilteredHookQuery<CombinedInstructions, TType>,
  multipleRecords: boolean,
  result: TSchema,
) => void | Promise<void>;

type HookType = 'before' | 'during' | 'after';

type HookKeys = (
  | { [K in QueryType]: K }
  | { [K in QueryType]: `before${Capitalize<K>}` }
  | { [K in QueryType]: `after${Capitalize<K>}` }
)[QueryType];

type Hook<
  TStage extends HookType,
  TType extends QueryType,
  TSchema extends TStage extends 'before' ? never : unknown = never,
> = TStage extends 'before'
  ? BeforeHookHandler<TType>
  : TStage extends 'during'
    ? DuringHookHandler<TType, TSchema>
    : TStage extends 'after'
      ? AfterHookHandler<TType, TSchema>
      : never;

type HookList<TSchema = unknown> = {
  [K in HookKeys]?: K extends 'before'
    ? BeforeHookHandler<QueryType>
    : K extends 'after' | `after${string}`
      ? AfterHookHandler<QueryType, TSchema>
      : DuringHookHandler<QueryType, TSchema>;
};

export type Hooks<TSchema = unknown> = Record<string, HookList<TSchema>>;

type BeforeHook<TType extends QueryType> = Hook<'before', TType>;
type DuringHook<TType extends QueryType, TSchema = unknown> = Hook<'during', TType, TSchema>;
type AfterHook<TType extends QueryType, TSchema = unknown> = Hook<'after', TType, TSchema>;

export type BeforeCreateHook = BeforeHook<'create'>;
export type BeforeGetHook = BeforeHook<'get'>;
export type BeforeSetHook = BeforeHook<'set'>;
export type BeforeDropHook = BeforeHook<'drop'>;
export type BeforeCountHook = BeforeHook<'count'>;

export type CreateHook<TSchema = unknown> = DuringHook<'create', TSchema>;
export type GetHook<TSchema = unknown> = DuringHook<'get', TSchema>;
export type SetHook<TSchema = unknown> = DuringHook<'set', TSchema>;
export type DropHook<TSchema = unknown> = DuringHook<'drop', TSchema>;
export type CountHook<TSchema = unknown> = DuringHook<'count', TSchema>;

export type AfterCreateHook<TSchema = unknown> = AfterHook<'create', TSchema>;
export type AfterGetHook<TSchema = unknown> = AfterHook<'get', TSchema>;
export type AfterSetHook<TSchema = unknown> = AfterHook<'set', TSchema>;
export type AfterDropHook<TSchema = unknown> = AfterHook<'drop', TSchema>;
export type AfterCountHook<TSchema = unknown> = AfterHook<'count', TSchema>;

const getSchema = (
  instruction: QuerySchemaType,
): {
  key: string;
  schema: string;
  multipleRecords: boolean;
} => {
  const key = Object.keys(instruction)[0];

  let schema = String(key);
  let multipleRecords = false;

  if (schema.endsWith('s')) {
    schema = schema.substring(0, schema.length - 1);
    multipleRecords = true;
  }

  return {
    key,
    // Convert camel case (e.g. `subscriptionItems`) into slugs
    // (e.g. `subscription-items`).
    schema: toDashCase(schema),
    multipleRecords,
  };
};

/**
 * Constructs the method name used for a particular type of hook and query.
 * For example, if `hookType` is "after" and `queryType` is "create", the
 * resulting method name would be `afterCreate`.
 *
 * @param hookType - The type of hook, so "before", "during", or "after".
 * @param queryType - The type of query. For example: "get", "set", or "drop".
 *
 * @returns The method name constructed from the hook and query types.
 */
const getMethodName = (hookType: HookType, queryType: string): string => {
  const capitalizedQueryType = queryType[0].toUpperCase() + queryType.slice(1);
  return hookType === 'during' ? queryType : hookType + capitalizedQueryType;
};

/**
 * Based on which type of query is being executed (e.g. "get" or "create"),
 * this function checks if a hook is defined for the affected schema and runs
 * said hook with several arguments (such as the query that was run).
 * For example, if `create.account.with.id('1234');` is run and the `hookType`
 * is `before`, then the `beforeCreate` hook would be invoked if one is defined
 * for the "account" schema in the list of hooks.
 *
 * @param hooks - A map of all schemas with their respective hooks.
 * @param hookType - The type of hook, so "before", "during", or "after".
 * @param query - A deconstructed query for which the hook should be run.
 *
 * @returns Information about whether a hook was run, and its potential output.
 */
const invokeHook = async (
  hooks: Hooks,
  hookType: HookType,
  query: {
    type: string;
    schema: string;
    plural: boolean;
    instruction: unknown;
    result: object | null;
  },
): Promise<{ ran: boolean; result: Query | Results<unknown> | void | null | unknown }> => {
  const hooksForSchema = hooks?.[query.schema];
  const hookName = getMethodName(hookType, query.type);

  // If `oldInstruction` is falsy (e.g. `null`), we want to default to `{}`.
  // This would happen in cases where all records of a particular schema are
  // retrieved. For example, the query `get.members();` would trigger this.
  // It's important to provide an object to hooks, as people might otherwise
  // try to set properties on a value that's not an object, which would cause
  // the hook to crash with an exception.
  // It's also extremely important to clone both of the variables below, as the
  // hooks will otherwise modify the original that was passed from the outside.
  const queryInstruction = query.instruction
    ? structuredClone<CombinedInstructions>(query.instruction as CombinedInstructions)
    : ({} as CombinedInstructions);

  // A list of function arguments that will be passed to every data hook,
  // regardless of its type or schema.
  // The first argument is the query instructions, the second argument is a
  // boolean that indicates whether the query is plural (e.g. `get.members();`),
  // and the third argument is the result of the query (if any).
  const hookArguments: [CombinedInstructions, boolean, object | null | undefined] = [
    queryInstruction,
    query.plural,
    undefined,
  ];

  // For data hooks of type "after" (such as `afterCreate`), we want to pass
  // a special function argument that contains the result of the query.
  if (hookType === 'after') {
    const queryResult = structuredClone<object | null | Array<object | null>>(query.result);
    hookArguments[2] = queryResult;
  }

  if (hooksForSchema && hookName in hooksForSchema) {
    const [instructions, isMultiple, queryResults] = hookArguments;

    const hook = hooksForSchema[hookName as keyof typeof hooksForSchema];

    const result =
      hookType === 'after'
        ? await (hook as AfterHook<QueryType, unknown>)(instructions, isMultiple, queryResults)
        : await (hook as BeforeHook<QueryType> | DuringHook<QueryType>)(instructions, isMultiple);

    return { ran: true, result };
  }

  return { ran: false, result: null };
};

/**
 * Invokes a particular hook (such as `afterCreate`) and handles its output.
 * In the case of an "before" hook, a query is returned from the hook, which
 * must replace the original query in the list of queries. For a "during" hook,
 * the results of the query are returned and must therefore be merged into the
 * final list of results. In the case of an "after" hook, nothing must be done
 * because no output is returned by the hook.
 *
 * @param hooks - A map of all schemas with their respective hooks.
 * @param hookType - The type of hook, so "before", "during", or "after".
 * @param modifiableQueries - The final list of queries.
 * @param modifiableResults - The final list of query results.
 * @param query - The definition and other details of a query that is being run.
 *
 * @returns Nothing, because `modifiableQueries` and `modifiableResults` are
 * directly modified instead.
 */
const invokeHooks = async (
  hooks: Hooks,
  hookType: HookType,
  modifiableQueries: (RecursivePartial<Query> | typeof EMPTY)[],
  modifiableResults: unknown[],
  query: {
    definition: Query;
    index: number;
    result: object | null | Array<unknown | null>;
  },
): Promise<void> => {
  const queryType = Object.keys(query.definition)[0] as QueryType;
  const queryInstructions = query.definition[queryType] as QuerySchemaType;
  const { key, schema, multipleRecords } = getSchema(queryInstructions);
  const oldInstruction = queryInstructions[key];

  const executedHookResults = await invokeHook(hooks, hookType, {
    type: queryType,
    schema,
    plural: multipleRecords,
    instruction: oldInstruction,

    // For "after" hooks, we want to pass the final result associated with a
    // particular query, so that the hook can read it.
    result: hookType === 'after' ? query.result : null,
  });

  // We can't assert based on what the hook returned, only based on whether the
  // hook ran or not. That's because a hook might return any falsy value and
  // then we would be mislead into thinking that the hook didn't run.
  const { ran, result: hookResult } = executedHookResults;

  switch (hookType) {
    case 'before':
      if (!ran) break;
      // If the hook returned a query, we want to replace the original query
      // with the one returned by the hook.
      queryInstructions[key] = hookResult as CombinedInstructions;
      modifiableQueries[query.index] = { [queryType]: queryInstructions };
      break;

    case 'during':
      if (ran) {
        // In the case of "during" hooks, we don't want to keep the query
        // that's responsible for querying a particular schema, because queries
        // of that schema would be entirely handled by the "during" hooks.
        // That's why we're deleting the query here. We can't use `splice`, as
        // that would change the array position of future items that we haven't
        // yet iterated over, so they would not be able to splice themselves
        // correctly, as their index in the iterator would not match their
        // actual index.
        modifiableQueries[query.index] = EMPTY;

        // The hook returned a record (or multiple), so we'd like to add those
        // records to the list of final results.
        (modifiableResults as unknown[])[query.index] = hookResult;
      } else {
        // In the case that the hook didn't run and we're dealing with "during"
        // hooks, we still want to add an empty item to the list, so that the
        // indexes of results being added afterwards are correct. We have to
        // use a symbol instead of something like `undefined`, because a hook
        // might return `undefined` so we wouldn't know whether the array item
        // is a result or just an empty placeholder.
        (modifiableResults as unknown[])[query.index] = EMPTY;
      }
      break;

    case 'after':
      // In the case of "after" hooks, we don't need to do anything, because
      // they are run asynchronously and aren't expected to return anything.
      break;
  }
};

/**
 * Executes queries and also invokes any potential hooks (such as `afterCreate`)
 * that might have been provided as part of `options.hooks`.
 *
 * @param queries - A list of queries to execute.
 * @param options - A list of options to change how the queries are executed. To
 * run hooks, the `options.hooks` property must contain a map of hooks.
 *
 * @returns The results of the queries that were passed.
 */
export const runQueriesWithHooks = async <T>(
  queries: Query[],
  options: QueryHandlerOptions = {},
): Promise<Results<T>> => {
  let modifiableQueries = Array.from(queries);
  const modifiableResults = new Array<T>();

  const { hooks, waitUntil } = options;

  // If no hooks were provided, we can just run the queries and return
  // the results.
  if (!hooks) return runQueries<T>(modifiableQueries, options);

  // We're intentionally considering the entire `hooks` option here, instead of
  // searching for "after" hooks inside of it, because the latter would increase
  // the error surface and make the logic less reliable.
  if (typeof process === 'undefined' && hooks && !waitUntil) {
    let message = 'In the case that the "ronin" package receives a value for';
    message += ' its `hooks` option, it must also receive a value for its';
    message += ' `waitUntil` option. This requirement only applies when using';
    message += ' an edge runtime and ensures that the edge worker continues to';
    message += ' execute until all "after" hooks have been executed.';

    throw new Error(message);
  }

  // Invoke `beforeCreate`, `beforeGet`, `beforeSet`, `beforeDrop`, and
  // also `beforeCount`.
  await Promise.all(
    queries.map((query, index) => {
      return invokeHooks(hooks, 'before', modifiableQueries, modifiableResults, {
        definition: query,
        index,
        result: null,
      });
    }),
  );

  // Invoke `create`, `get`, `set`, `drop`, and `count`.
  await Promise.all(
    queries.map((query, index) => {
      return invokeHooks(hooks, 'during', modifiableQueries, modifiableResults, {
        definition: query,
        index,
        result: null,
      });
    }),
  );

  // Filter out queries that were marked as removable by the `invokeHooks`
  // calls above. We can't just filter by something like `undefined`, because
  // hooks might be returning those values as successful results.
  modifiableQueries = modifiableQueries.filter((query: Query | typeof EMPTY) => query !== EMPTY);

  // If no queries are remaining, that means all the queries were handled by
  // "during" hooks above, so there are none remaining to send for execution.
  if (modifiableQueries.length === 0) return modifiableResults as Results<T>;

  const results = await runQueries<T>(modifiableQueries, options);

  for (let index = 0; index < modifiableResults.length; index++) {
    const existingResult = modifiableResults[index];

    // If there isn't an existing result for the current index, that means
    // `results` will contain the result for that index. However, note that
    // the indexes in `results` are different because they don't consider the
    // results that weren't retrieved from RONIN and only retrieved from
    // "during" hooks.
    if (existingResult === EMPTY) continue;

    (results as Array<T>).splice(index, 0, existingResult);
  }

  // Invoke `afterCreate`, `afterGet`, `afterSet`, `afterDrop` and `afterCount`
  // (asynchronously, since they shouldn't block).
  for (let queryIndex = 0; queryIndex < queries.length; queryIndex++) {
    const query = queries[queryIndex];
    const queryType = Object.keys(query)[0];

    // "after" hooks should only fire for writes — not reads.
    if (queryType !== 'set' && queryType !== 'drop' && queryType !== 'create') {
      continue;
    }

    // Select the results that are associated with the current query. Also
    // ensure an array, to avoid people having to conditionally support both
    // arrays and objects inside the data hook.
    const queryResult = (
      Array.isArray(results?.[queryIndex]) ? results?.[queryIndex] : [results?.[queryIndex]]
    ) as Array<unknown | null>;

    // Run the actual hook functions.
    const promise = invokeHooks(hooks, 'after', queries, [], {
      definition: query,
      index: queryIndex,
      result: queryResult,
    });

    // If the configuration option for extending the lifetime of the edge
    // worker invocation was passed, provide it with the resulting promise of
    // the hook invocation above. This will ensure that the worker will
    // continue to be executed until all of the asynchronous actions
    // (non-awaited promises) have been resolved.
    if (waitUntil) waitUntil(promise);
  }

  return results;
};
