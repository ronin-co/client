import { runQueries } from '@/src/queries';
import type {
  FormattedResults,
  QueryHandlerOptions,
  RecursivePartial,
} from '@/src/types/utils';
import { WRITE_QUERY_TYPES } from '@/src/utils/constants';
import { toDashCase } from '@/src/utils/helpers';
import {
  type CombinedInstructions,
  DML_QUERY_TYPES_WRITE,
  QUERY_TYPES,
  type Query,
  type QuerySchemaType,
  type QueryType,
  type ResultRecord,
} from '@ronin/compiler';

const EMPTY = Symbol('empty');

export type FilteredHookQuery<
  TQuery extends CombinedInstructions,
  TType extends QueryType,
> = RecursivePartial<TQuery> &
  Pick<
    TQuery,
    TType extends 'count'
      ? never
      : TType extends 'add'
        ? 'to'
        : TType extends 'get'
          ? never
          : TType extends 'set'
            ? 'to'
            : TType extends 'remove'
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
  beforeResult: TSchema,
  afterResult: TSchema,
) => void | Promise<void>;

// The order of these types is important, as they determine the order in which
// data hooks are run (the "data hook lifecycle").
const HOOK_TYPES = ['before', 'during', 'after'] as const;

type HookType = (typeof HOOK_TYPES)[number];

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
} & { blockingAfter?: boolean };

export type Hooks<TSchema = unknown> = Record<string, HookList<TSchema>>;

type BeforeHook<TType extends QueryType> = Hook<'before', TType>;
type DuringHook<TType extends QueryType, TSchema = unknown> = Hook<
  'during',
  TType,
  TSchema
>;
type AfterHook<TType extends QueryType, TSchema = unknown> = Hook<
  'after',
  TType,
  TSchema
>;

export type BeforeGetHook = BeforeHook<'get'>;
export type BeforeSetHook = BeforeHook<'set'>;
export type BeforeAddHook = BeforeHook<'add'>;
export type BeforeRemoveHook = BeforeHook<'remove'>;
export type BeforeCountHook = BeforeHook<'count'>;
export type BeforeCreateHook = BeforeHook<'create'>;
export type BeforeAlterHook = BeforeHook<'alter'>;
export type BeforeDropHook = BeforeHook<'drop'>;

export type GetHook<TSchema = unknown> = DuringHook<'get', TSchema>;
export type SetHook<TSchema = unknown> = DuringHook<'set', TSchema>;
export type AddHook<TSchema = unknown> = DuringHook<'add', TSchema>;
export type RemoveHook<TSchema = unknown> = DuringHook<'remove', TSchema>;
export type CountHook<TSchema = unknown> = DuringHook<'count', TSchema>;
export type CreateHook<TSchema = unknown> = DuringHook<'create', TSchema>;
export type AlterHook<TSchema = unknown> = DuringHook<'alter', TSchema>;
export type DropHook<TSchema = unknown> = DuringHook<'drop', TSchema>;

export type AfterGetHook<TSchema = unknown> = AfterHook<'get', TSchema>;
export type AfterSetHook<TSchema = unknown> = AfterHook<'set', TSchema>;
export type AfterAddHook<TSchema = unknown> = AfterHook<'add', TSchema>;
export type AfterRemoveHook<TSchema = unknown> = AfterHook<'remove', TSchema>;
export type AfterCountHook<TSchema = unknown> = AfterHook<'count', TSchema>;
export type AfterCreateHook<TSchema = unknown> = AfterHook<'create', TSchema>;
export type AfterAlterHook<TSchema = unknown> = AfterHook<'alter', TSchema>;
export type AfterDropHook<TSchema = unknown> = AfterHook<'drop', TSchema>;

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
 * For example, if `hookType` is "after" and `queryType` is "add", the
 * resulting method name would be `afterAdd`.
 *
 * @param hookType - The type of hook, so "before", "during", or "after".
 * @param queryType - The type of query. For example: "get", "set", or "remove".
 *
 * @returns The method name constructed from the hook and query types.
 */
const getMethodName = (hookType: HookType, queryType: QueryType): string => {
  const capitalizedQueryType = queryType[0].toUpperCase() + queryType.slice(1);
  return hookType === 'during' ? queryType : hookType + capitalizedQueryType;
};

/**
 * Takes the result of a query and normalizes it to an array, to avoid
 * developers having to conditionally support both arrays and objects inside
 * the data hooks. Furthermore, the result is cloned to allow for modifying it
 * within data hooks without affecting the original query result that is being
 * returned from the client.
 *
 * @param result - The result of a query.
 *
 * @returns The normalized result of a query.
 */
const normalizeResults = (result: unknown) => {
  const value = Array.isArray(result) ? result : result === EMPTY ? [] : [result];
  return structuredClone(value);
};

interface HookCallerOptions extends Omit<QueryHandlerOptions, 'hooks' | 'asyncContext'> {
  hooks: NonNullable<QueryHandlerOptions['hooks']>;
  asyncContext: NonNullable<QueryHandlerOptions['asyncContext']>;
}

export interface HookContext {
  hookType: HookType;
  queryType: QueryType;
  querySchema: string;
}

/**
 * Invokes a particular hook (such as `afterAdd`) and handles its output.
 * In the case of an "before" hook, a query is returned from the hook, which
 * must replace the original query in the list of queries. For a "during" hook,
 * the results of the query are returned and must therefore be merged into the
 * final list of results. In the case of an "after" hook, nothing must be done
 * because no output is returned by the hook.
 *
 * @param hookType - The type of hook, so "before", "during", or "after".
 * @param query - The definition and other details of a query that is being run.
 * @param options - A list of options to change how the queries are executed.
 *
 * @returns The modified query and its results, if any are available.
 */
const invokeHooks = async (
  hookType: HookType,
  query: {
    definition: Query;
    resultBefore?: unknown;
    resultAfter?: unknown;
  },
  options: HookCallerOptions,
): Promise<{
  definition: Query;
  result?: unknown;
}> => {
  const { hooks, asyncContext } = options;

  const queryType = Object.keys(query.definition)[0] as QueryType;
  const queryInstructions = query.definition[queryType] as QuerySchemaType;
  const { key, schema: querySchema, multipleRecords } = getSchema(queryInstructions);
  const oldInstruction = queryInstructions[key];

  const hooksForSchema = hooks[querySchema];
  const hookName = getMethodName(hookType, queryType);

  // If `oldInstruction` is falsy (e.g. `null`), we want to default to `{}`.
  // This would happen in cases where all records of a particular schema are
  // retrieved. For example, the query `get.members();` would trigger this.
  //
  // It's important to provide an object to hooks, as people might otherwise
  // try to set properties on a value that's not an object, which would cause
  // the hook to crash with an exception.
  //
  // It's also extremely important to clone both of the variables below, as the
  // hooks will otherwise modify the original that was passed from the outside.
  const queryInstruction = oldInstruction
    ? structuredClone<CombinedInstructions>(oldInstruction as CombinedInstructions)
    : ({} as CombinedInstructions);

  // To prevent recursions in data hooks, we have to only execute data hooks
  // that come after the lifecycle level of the current data hook (1).
  //
  // Additionally, no data hooks should be called for queries inside data hooks
  // that are addressing the same schema as the surrounding data hook (2).
  //
  // For queries that target a schema that has "during" data hooks defined,
  // however, this behavior should not apply (3).
  //
  // **EXAMPLES**
  //
  // 1. If a query targeting the `customer` schema is executed in the
  // `beforeAdd` data hook of the `account` schema, only data hooks after
  // the "before" lifecycle level (such as `set`, `afterSet`, `add`,
  // `afterAdd` etc.) will be executed for the `customer` query.
  //
  // 2. If a query targeting the `customer` schema is executed in the
  // `beforeAdd` data hook of the `customer` schema, no data hooks will be
  // executed for the `customer` query.
  //
  // 3. If a query targeting the `customer` schema is executed and that schema
  // contains data hooks of the "during" lifecycle level, all data hooks of
  // that target schema will be executed and none will be skipped.
  const parentHook = asyncContext.getStore();
  const shouldSkip =
    hooksForSchema &&
    QUERY_TYPES.some((type) => type in hooksForSchema) &&
    parentHook &&
    querySchema !== parentHook.querySchema
      ? false
      : parentHook &&
        (HOOK_TYPES.indexOf(hookType) <= HOOK_TYPES.indexOf(parentHook.hookType) ||
          (querySchema === parentHook.querySchema &&
            HOOK_TYPES.indexOf(hookType) > HOOK_TYPES.indexOf(parentHook.hookType)));

  if (hooksForSchema && hookName in hooksForSchema && !shouldSkip) {
    const hook = hooksForSchema[hookName as keyof typeof hooksForSchema];

    const hookResult = await asyncContext.run(
      {
        hookType,
        queryType,
        querySchema,
      },
      async () => {
        // For data hooks of type "after" (such as `afterAdd`), we want to
        // pass special function arguments that contain the value of the
        // affected records before and after the query was executed.
        if (hookType === 'after') {
          return (hook as AfterHook<QueryType, unknown>)(
            queryInstruction,
            multipleRecords,

            normalizeResults(query.resultBefore),
            normalizeResults(query.resultAfter),
          );
        }

        return (hook as BeforeHook<QueryType> | DuringHook<QueryType>)(
          queryInstruction,
          multipleRecords,
        );
      },
    );

    // If the hook returned a query, we want to replace the original query with
    // the one returned by the hook.
    if (hookType === 'before') {
      queryInstructions[key] = hookResult as CombinedInstructions;
      return { definition: { [queryType]: queryInstructions }, result: EMPTY };
    }

    // If the hook returned a record (or multiple), we want to set the query's
    // result to the value returned by the hook.
    if (hookType === 'during') {
      return { definition: query.definition, result: hookResult };
    }

    // In the case of "after" hooks, we don't need to do anything, because they
    // are run asynchronously and aren't expected to return anything.
  }

  return { definition: query.definition, result: EMPTY };
};

/**
 * Executes queries and also invokes any potential hooks (such as `afterAdd`)
 * that might have been provided as part of `options.hooks`.
 *
 * @param queries - A list of queries to execute.
 * @param options - A list of options to change how the queries are executed. To
 * run hooks, the `options.hooks` property must contain a map of hooks.
 *
 * @returns The results of the queries that were passed.
 */
export const runQueriesWithHooks = async <T extends ResultRecord>(
  queries: Array<Query>,
  options: QueryHandlerOptions = {},
): Promise<FormattedResults<T>> => {
  const { hooks, waitUntil, asyncContext } = options;

  // If no hooks were provided, we can just run the queries and return
  // the results.
  if (!hooks) return runQueries<T>(queries, options);

  if (typeof process === 'undefined' && !waitUntil) {
    let message = 'In the case that the "ronin" package receives a value for';
    message += ' its `hooks` option, it must also receive a value for its';
    message += ' `waitUntil` option. This requirement only applies when using';
    message += ' an edge runtime and ensures that the edge worker continues to';
    message += ' execute until all "after" hooks have been executed.';

    throw new Error(message);
  }

  // We can't import `AsyncLocalStorage` directly inside the package, because
  // that would require either importing it from a separate entrypoint of the
  // package (in which case people would need to import that separate
  // entrypoint, making the import statement longer) or importing it
  // conditionally from the top-level, which would require top-level `await`,
  // which, at the time of writing, doesn't work in certain ESM environments,
  // like Next.js Server Actions. We could also import it from inside a
  // function, but then the module would be booted the first time that function
  // is called, thereby slowing down the function.
  if (!asyncContext) {
    let message = 'In the case that the "ronin" package receives a value for';
    message += ' its `hooks` option, it must also receive a value for its';
    message += ' `asyncContext` option.';

    throw new Error(message);
  }

  const queryList: Array<{
    definition: Query;
    result: unknown;
    diffForIndex?: number;
  }> = queries.flatMap((query, index) => {
    const details = { definition: query, result: EMPTY };

    // If data hooks are enabled, we want to send a separate `get` query for
    // every `set` query (in the same transaction), so that we can provide the
    // data hooks with a "before and after" of the modified records.
    //
    // The version of the record *after* the modification is already available
    // without the extra `get` query, since `set` queries return the modified
    // record afterward, but in order to get the version of the record
    // *before* the modification, we need a separate `get` query.
    if (query.set) {
      const schemaSlug = Object.keys(query.set)[0];

      const diffQuery = {
        definition: {
          get: {
            [schemaSlug]: {
              with: query.set[schemaSlug].with,
            },
          },
        },
        diffForIndex: index + 1,
        result: EMPTY,
      };

      return [diffQuery, details];
    }

    return [details];
  });

  const hookCallerOptions = { hooks, asyncContext };

  // Invoke `beforeAdd`, `beforeGet`, `beforeSet`, `beforeRemove`, and
  // also `beforeCount`.
  await Promise.all(
    queryList.map(async ({ definition, diffForIndex }, index) => {
      // For diff queries, we don't want to run "before" hooks.
      if (typeof diffForIndex !== 'undefined') return;

      const modifiedQuery = await invokeHooks(
        'before',
        { definition },
        hookCallerOptions,
      );
      queryList[index].definition = modifiedQuery.definition;
    }),
  );

  // Invoke `get`, `set`, `add`, `remove`, and `count`.
  await Promise.all(
    queryList.map(async ({ definition }, index) => {
      const modifiedQuery = await invokeHooks(
        'during',
        { definition },
        hookCallerOptions,
      );
      queryList[index].result = modifiedQuery.result;
    }),
  );

  const queriesWithoutResults = queryList
    .map((query, index) => ({ ...query, index }))
    .filter((query) => query.result === EMPTY);

  // If no queries are remaining, that means all the queries were handled by
  // "during" hooks above, so there are none remaining to send for execution.
  if (queriesWithoutResults.length === 0)
    return queryList.map(({ result }) => result) as FormattedResults<T>;

  const resultsFromDatabase = await runQueries<T>(
    queriesWithoutResults.map(({ definition }) => definition),
    options,
  );

  // Assign the results from the database to the list of queries.
  for (let index = 0; index < resultsFromDatabase.length; index++) {
    const query = queriesWithoutResults[index];
    const result = resultsFromDatabase[index];

    queryList[query.index].result = result;
  }

  // Asynchronously invoke `afterAdd`, `afterSet`, `afterRemove`, `afterCreate`,
  // `afterAlter`, and `afterDrop`.
  for (let index = 0; index < queryList.length; index++) {
    const query = queryList[index];
    const queryType = Object.keys(query.definition)[0] as QueryType;

    // "after" hooks should only fire for writes — not reads.
    if (!WRITE_QUERY_TYPES.includes(queryType)) continue;

    const diffMatch = queryList.find((item) => item.diffForIndex === index);

    let resultBefore = diffMatch ? diffMatch.result : EMPTY;
    let resultAfter = query.result;

    // For queries of type "remove" and "drop", we want to set `resultBefore` to the
    // result of the query (which contains the record), because the record will no longer
    // exist after the query has been executed, so it wouldn't make sense to expose the
    // record as `resultAfter` in the data hooks.
    if (queryType === 'remove' || queryType === 'drop') {
      resultBefore = query.result;
      resultAfter = EMPTY;
    }

    // Run the actual hook functions.
    const promise = invokeHooks(
      'after',
      { definition: query.definition, resultBefore, resultAfter },
      hookCallerOptions,
    );

    const queryInstructions = query.definition[queryType] as QuerySchemaType;
    const { schema: querySchema } = getSchema(queryInstructions);
    const hooksForSchema = hooks[querySchema];
    const isBlocking = hooksForSchema?.blockingAfter;

    // The result of the hook should not be made available, otherwise
    // developers might start relying on it. Only errors should be propagated.
    const clearPromise = promise.then(
      () => {},
      (error) => Promise.reject(error),
    );

    if (isBlocking) await clearPromise;

    // If the configuration option for extending the lifetime of the edge
    // worker invocation was passed, provide it with the resulting promise of
    // the hook invocation above. This will ensure that the worker will
    // continue to be executed until all of the asynchronous actions
    // (non-awaited promises) have been resolved.
    if (waitUntil) waitUntil(clearPromise);
  }

  // Filter the list of queries to remove any potential queries used for
  // "diffing" (retrieving the previous value of a record) and return only the
  // results of the queries.
  return queryList
    .filter((query) => typeof query.diffForIndex === 'undefined')
    .map(({ result }) => result) as FormattedResults<T>;
};
