import { runQueries } from '@/src/queries';
import type { CombinedInstructions, Query, QuerySchemaType, QueryType, Results } from '@/src/types/query';
import type { QueryHandlerOptions, RecursivePartial } from '@/src/types/utils';
import { toDashCase } from '@/src/utils/helpers';

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
const getMethodName = (hookType: HookType, queryType: QueryType): string => {
  const capitalizedQueryType = queryType[0].toUpperCase() + queryType.slice(1);
  return hookType === 'during' ? queryType : hookType + capitalizedQueryType;
};

interface HookCallerOptions extends Omit<QueryHandlerOptions, 'hooks' | 'asyncContext' | 'autoSkipHooks'> {
  hooks: NonNullable<QueryHandlerOptions['hooks']>;
  asyncContext: NonNullable<QueryHandlerOptions['asyncContext']>;
  autoSkipHooks: NonNullable<QueryHandlerOptions['autoSkipHooks']>;
}

export interface HookContext {
  hookType: HookType;
  queryType: QueryType;
  querySchema: string;
}

/**
 * Invokes a particular hook (such as `afterCreate`) and handles its output.
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
 * @returns Nothing, because `modifiableQueries` and `modifiableResults` are
 * directly modified instead.
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
  const queryType = Object.keys(query.definition)[0] as QueryType;
  const queryInstructions = query.definition[queryType] as QuerySchemaType;
  const { key, schema, multipleRecords } = getSchema(queryInstructions);
  const oldInstruction = queryInstructions[key];

  const hooksForSchema = options.hooks[schema];
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

  // Learn more about this behavior in the comment of the `autoSkipHooks` option.
  const parentHook = options.asyncContext.getStore();
  const shouldSkip =
    options.autoSkipHooks === false
      ? false
      : parentHook &&
        (HOOK_TYPES.indexOf(hookType) <= HOOK_TYPES.indexOf(parentHook.hookType) ||
          (schema === parentHook.querySchema &&
            HOOK_TYPES.indexOf(hookType) > HOOK_TYPES.indexOf(parentHook.hookType)));

  if (hooksForSchema && hookName in hooksForSchema && !shouldSkip) {
    const hook = hooksForSchema[hookName as keyof typeof hooksForSchema];

    const hookResult = await options.asyncContext.run(
      {
        hookType,
        queryType: queryType,
        querySchema: schema,
      },
      async () => {
        // For data hooks of type "after" (such as `afterCreate`), we want to
        // pass special function arguments that contain the value of the
        // affected records before and after the query was executed.
        if (hookType === 'after') {
          const resultBefore = structuredClone(query.resultBefore);
          const result = structuredClone(query.resultAfter);

          return (hook as AfterHook<QueryType, unknown>)(
            queryInstruction,
            multipleRecords,
            resultBefore,
            result,
          );
        }

        return (hook as BeforeHook<QueryType> | DuringHook<QueryType>)(queryInstruction, multipleRecords);
      },
    );

    // If the hook returned a query, we want to replace the original query with
    // the one returned by the hook.
    if (hookType === 'before') {
      queryInstructions[key] = hookResult as CombinedInstructions;
      return { definition: { [queryType]: queryInstructions }, result: EMPTY };
    }

    // If the hook record (or multiple), we'd like to add those records to the
    // list of final results.
    if (hookType === 'during') {
      return { definition: query.definition, result: hookResult };
    }

    // In the case of "after" hooks, we don't need to do anything, because they
    // are run asynchronously and aren't expected to return anything.
  }

  return { definition: query.definition, result: EMPTY };
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
  const { hooks, waitUntil, asyncContext, autoSkipHooks = true } = options;

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

  const queryList: {
    definition: Query;
    result: unknown;
    diffForIndex?: number;
  }[] = queries
    .map((query, index) => {
      const details = { definition: query, result: EMPTY };

      // If data hooks are enabled, we want to send a separate `get` query for
      // every `set` query (in the same transaction), so that we can provide the
      // data hooks with a "before and after" of the modified records.
      //
      // The version of the record *after* the modification is already available
      // without the extra `get` query, since `set` queries return the modified
      // record afterward, but in order to get the version of the record
      // *before* the modification, we need a separate `get` query.
      //
      // That latter version of the record is then provided exclusively to
      // `afterSet` hooks, since it doesn't make sense for data hooks of other
      // write queries like `afterCreate` or `afterDrop`, since, in the case of
      // "create", the record doesn't even exist before the creation, and in
      // the case of "drop", the record doesn't exist after the drop. So the
      // only case in which the diff is needed is for queries of type "set".
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
    })
    .flat();

  const hookCallerOptions = { hooks, asyncContext, autoSkipHooks };

  // Invoke `beforeCreate`, `beforeGet`, `beforeSet`, `beforeDrop`, and
  // also `beforeCount`.
  await Promise.all(
    queryList.map(async ({ definition, diffForIndex }, index) => {
      // For diff queries, we don't want to run "before" hooks.
      if (typeof diffForIndex !== 'undefined') return;

      const modifiedQuery = await invokeHooks('before', { definition }, hookCallerOptions);
      queryList[index].definition = modifiedQuery.definition;
    }),
  );

  // Invoke `create`, `get`, `set`, `drop`, and `count`.
  await Promise.all(
    queryList.map(async ({ definition }, index) => {
      const modifiedQuery = await invokeHooks('during', { definition }, hookCallerOptions);
      queryList[index].result = modifiedQuery.result;
    }),
  );

  const queriesWithoutResults = queryList
    .map((query, index) => ({ ...query, index }))
    .filter((query) => query.result === EMPTY);

  // If no queries are remaining, that means all the queries were handled by
  // "during" hooks above, so there are none remaining to send for execution.
  if (queriesWithoutResults.length === 0) return queryList.map(({ result }) => result) as Results<T>;

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

  // Invoke `afterCreate`, `afterGet`, `afterSet`, `afterDrop` and `afterCount`
  // (asynchronously, since they shouldn't block).
  for (let index = 0; index < queryList.length; index++) {
    const query = queryList[index];
    const queryType = Object.keys(query.definition)[0];

    // "after" hooks should only fire for writes — not reads.
    if (queryType !== 'set' && queryType !== 'drop' && queryType !== 'create') {
      continue;
    }

    const diff = queryList.find((item) => item.diffForIndex === index);

    // Run the actual hook functions.
    const promise = invokeHooks(
      'after',
      { definition: query.definition, resultBefore: diff?.result, resultAfter: query.result },
      hookCallerOptions,
    );

    // The result of the hook should not be made available, otherwise
    // developers might start relying on it. Only errors should be propagated.
    const clearPromise = promise.then(
      () => {},
      (error) => Promise.reject(error),
    );

    // If the configuration option for extending the lifetime of the edge
    // worker invocation was passed, provide it with the resulting promise of
    // the hook invocation above. This will ensure that the worker will
    // continue to be executed until all of the asynchronous actions
    // (non-awaited promises) have been resolved.
    if (waitUntil) waitUntil(clearPromise);
  }

  return queryList
    .filter((query) => typeof query.diffForIndex === 'undefined')
    .map(({ result }) => result) as Results<T>;
};
