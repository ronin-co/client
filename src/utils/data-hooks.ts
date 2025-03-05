import {
  type QueriesPerDatabase,
  type ResultsPerDatabase,
  runQueries,
} from '@/src/queries';
import type {
  FormattedResults,
  QueryHandlerOptions,
  RecursivePartial,
} from '@/src/types/utils';
import { WRITE_QUERY_TYPES } from '@/src/utils/constants';
import { toDashCase } from '@/src/utils/helpers';
import {
  type CombinedInstructions,
  QUERY_TYPES,
  type Query,
  type QuerySchemaType,
  type QueryType,
  type ResultRecord,
} from '@ronin/compiler';

const EMPTY = Symbol('empty');

interface DataHookOptions {
  /** The model for which the query is being executed. */
  model?: string;
  /** The database for which the query is being executed. */
  database?: string;
}

export type FilteredHookQuery<
  TType extends QueryType,
  TQuery extends CombinedInstructions = CombinedInstructions,
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
  TQuery extends FilteredHookQuery<TType> = FilteredHookQuery<TType>,
> = (
  query: TQuery,
  multipleRecords: boolean,
  options: DataHookOptions,
) => TQuery | Promise<TQuery> | Query;

export type DuringHookHandler<TType extends QueryType, TSchema = unknown> = (
  query: FilteredHookQuery<TType>,
  multipleRecords: boolean,
  options: DataHookOptions,
) => TSchema | Promise<TSchema>;

export type AfterHookHandler<TType extends QueryType, TSchema = unknown> = (
  query: FilteredHookQuery<TType>,
  multipleRecords: boolean,
  beforeResult: TSchema,
  afterResult: TSchema,
  options: DataHookOptions,
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
  [K in HookKeys]?: K extends 'before' | `before${string}`
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

const getModel = (
  instruction: QuerySchemaType,
): {
  key: string;
  model: string;
  multipleRecords: boolean;
} => {
  const key = Object.keys(instruction)[0];

  let model = String(key);
  let multipleRecords = false;

  if (model.endsWith('s')) {
    model = model.substring(0, model.length - 1);
    multipleRecords = true;
  }

  return {
    key,
    // Convert camel case (e.g. `subscriptionItems`) into slugs
    // (e.g. `subscription-items`).
    model: toDashCase(model),
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
  /**
   * If the hooks are being called for a custom database, the identifier of the database
   * would be provided here.
   */
  database?: string;
}

export interface HookContext {
  hookType: HookType;
  queryType: QueryType;
  queryModel: string;
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
 * @param definition - The definition and other details of a query that is being run.
 * @param options - A list of options to change how the queries are executed.
 *
 * @returns The modified query and its results, if any are available.
 */
const invokeHooks = async (
  hookType: HookType,
  definition: {
    query: Query;
    resultBefore?: unknown;
    resultAfter?: unknown;
  },
  options: HookCallerOptions,
): Promise<{
  query: Query;
  result?: FormattedResults<unknown>[number] | symbol;
}> => {
  const { hooks, asyncContext } = options;
  const { query } = definition;

  const queryType = Object.keys(query)[0] as QueryType;
  const queryInstructions = query[queryType] as QuerySchemaType;
  const { key, model: queryModel, multipleRecords } = getModel(queryInstructions);
  const oldInstruction = queryInstructions[key];

  // If the hooks are being executed for a custom database, all hooks must be located
  // inside a file named `sink.ts`, which catches the queries for all other databases.
  //
  // If the hooks are *not* being executed for a custom database, the hook file name
  // matches the model that is being addressed by the query.
  const hookFile = options.database ? 'sink' : queryModel;
  const hooksForModel = hooks[hookFile];
  const hookName = getMethodName(hookType, queryType);

  // If `oldInstruction` is falsy (e.g. `null`), we want to default to `{}`.
  // This would happen in cases where all records of a particular model are
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
  // that are addressing the same model as the surrounding data hook (2).
  //
  // For queries that target a model that has "during" data hooks defined,
  // however, this behavior should not apply (3).
  //
  // **EXAMPLES**
  //
  // 1. If a query targeting the `customer` model is executed in the
  // `beforeAdd` data hook of the `account` model, only data hooks after
  // the "before" lifecycle level (such as `set`, `afterSet`, `add`,
  // `afterAdd` etc.) will be executed for the `customer` query.
  //
  // 2. If a query targeting the `customer` model is executed in the
  // `beforeAdd` data hook of the `customer` model, no data hooks will be
  // executed for the `customer` query.
  //
  // 3. If a query targeting the `customer` model is executed and that model
  // contains data hooks of the "during" lifecycle level, all data hooks of
  // that target model will be executed and none will be skipped.
  const parentHook = asyncContext.getStore();
  const shouldSkip =
    hooksForModel &&
    QUERY_TYPES.some((type) => type in hooksForModel) &&
    parentHook &&
    hookFile !== parentHook.hookFile
      ? false
      : parentHook &&
        (HOOK_TYPES.indexOf(hookType) <= HOOK_TYPES.indexOf(parentHook.hookType) ||
          (hookFile === parentHook.hookFile &&
            HOOK_TYPES.indexOf(hookType) > HOOK_TYPES.indexOf(parentHook.hookType)));

  if (hooksForModel && hookName in hooksForModel && !shouldSkip) {
    const hook = hooksForModel[hookName as keyof typeof hooksForModel];
    const hookOptions =
      hookFile === 'sink' ? { model: queryModel, database: options.database } : {};

    const hookResult = await asyncContext.run(
      {
        hookType,
        queryType,
        hookFile,
      },
      () => {
        // For data hooks of type "after" (such as `afterAdd`), we want to
        // pass special function arguments that contain the value of the
        // affected records before and after the query was executed.
        if (hookType === 'after') {
          return (hook as AfterHook<QueryType, unknown>)(
            queryInstruction,
            multipleRecords,
            normalizeResults(definition.resultBefore),
            normalizeResults(definition.resultAfter),
            hookOptions,
          );
        }

        return (hook as BeforeHook<QueryType> | DuringHook<QueryType>)(
          queryInstruction,
          multipleRecords,
          hookOptions,
        );
      },
    );

    // If the hook returned a query, we want to replace the original query with
    // the one returned by the hook.
    if (hookType === 'before') {
      const result = hookResult as null | Query | CombinedInstructions;
      let newQuery: Query = query;

      // If a full query was returned by the "before" hook, use the query as-is.
      if (result && QUERY_TYPES.some((type) => type in result)) {
        newQuery = result as Query;
      }
      // In the majority of cases, however, only the query instructions are returned, in
      // which case we need to construct a new query with those instructions.
      else {
        newQuery = {
          [queryType]: {
            [key]: result as CombinedInstructions,
          },
        };
      }

      return { query: newQuery, result: EMPTY };
    }

    // If the hook returned a record (or multiple), we want to set the query's
    // result to the value returned by the hook.
    if (hookType === 'during') {
      const result = hookResult as FormattedResults<unknown>[number];
      return { query, result };
    }

    // In the case of "after" hooks, we don't need to do anything, because they
    // are run asynchronously and aren't expected to return anything.
  }

  return { query, result: EMPTY };
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
  queries: QueriesPerDatabase,
  options: QueryHandlerOptions = {},
): Promise<ResultsPerDatabase<T>> => {
  const { hooks, waitUntil, asyncContext } = options;

  // If no hooks were provided, we can just run all the queries and return the results.
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

  const queryList: Array<
    QueriesPerDatabase[number] & {
      result: FormattedResults<T>[number] | symbol;
      diffForIndex?: number;
    }
  > = queries.flatMap(({ query, database }, index) => {
    const details = { query, result: EMPTY, database };

    // If data hooks are enabled, we want to send a separate `get` query for
    // every `set` query (in the same transaction), so that we can provide the
    // data hooks with a "before and after" of the modified records.
    //
    // The version of the record *after* the modification is already available
    // without the extra `get` query, since `set` queries return the modified
    // record afterward, but in order to get the version of the record
    // *before* the modification, we need a separate `get` query.
    if (query.set) {
      const modelSlug = Object.keys(query.set)[0];

      const diffQuery = {
        query: {
          get: {
            [modelSlug]: {
              with: query.set[modelSlug].with,
            },
          },
        },
        diffForIndex: index + 1,
        result: EMPTY,
        database,
      };

      return [diffQuery, details];
    }

    return [details];
  });

  const hookCallerOptions = { hooks, asyncContext };

  // Invoke `beforeAdd`, `beforeGet`, `beforeSet`, `beforeRemove`, and `beforeCount`.
  await Promise.all(
    queryList.map(async ({ query, diffForIndex, database }, index) => {
      // For diff queries, we don't want to run "before" hooks.
      if (typeof diffForIndex !== 'undefined') return;

      const hookResults = await invokeHooks(
        'before',
        { query },
        { ...hookCallerOptions, database },
      );
      queryList[index].query = hookResults.query;
    }),
  );

  // Invoke `get`, `set`, `add`, `remove`, and `count`.
  await Promise.all(
    queryList.map(async ({ query, database }, index) => {
      const hookResults = await invokeHooks(
        'during',
        { query },
        { ...hookCallerOptions, database },
      );
      queryList[index].result = hookResults.result as FormattedResults<T>[number];
    }),
  );

  const queriesWithoutResults = queryList
    .map((query, index) => ({ ...query, index }))
    .filter((query) => query.result === EMPTY);

  // If no queries are remaining, that means all the queries were handled by
  // "during" hooks above, so there are none remaining to send for execution.
  if (queriesWithoutResults.length === 0) {
    return queryList.map(({ result, database }) => ({
      result: result as FormattedResults<T>[number],
      database,
    }));
  }

  const resultsFromDatabase = await runQueries<T>(queriesWithoutResults, options);

  // Assign the results from the database to the list of queries.
  for (let index = 0; index < resultsFromDatabase.length; index++) {
    const query = queriesWithoutResults[index];
    const result = resultsFromDatabase[index].result;

    queryList[query.index].result = result;
  }

  // Asynchronously invoke `afterAdd`, `afterSet`, `afterRemove`, `afterCreate`,
  // `afterAlter`, and `afterDrop`.
  for (let index = 0; index < queryList.length; index++) {
    const { query, result, database } = queryList[index];
    const queryType = Object.keys(query)[0] as QueryType;

    // "after" hooks should only fire for writes — not reads.
    if (!(WRITE_QUERY_TYPES as ReadonlyArray<string>).includes(queryType)) continue;

    const diffMatch = queryList.find((item) => item.diffForIndex === index);

    let resultBefore = diffMatch ? diffMatch.result : EMPTY;
    let resultAfter = result;

    // For queries of type "remove" and "drop", we want to set `resultBefore` to the
    // result of the query (which contains the record), because the record will no longer
    // exist after the query has been executed, so it wouldn't make sense to expose the
    // record as `resultAfter` in the data hooks.
    if (queryType === 'remove' || queryType === 'drop') {
      resultBefore = result;
      resultAfter = EMPTY;
    }

    // Run the actual hook functions.
    const promise = invokeHooks(
      'after',
      { query, resultBefore, resultAfter },
      { ...hookCallerOptions, database },
    );

    const queryInstructions = query[queryType] as QuerySchemaType;
    const { model: queryModel } = getModel(queryInstructions);
    const hooksForModel = hooks[queryModel];
    const isBlocking = hooksForModel?.blockingAfter;

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
    .map(({ result, database }) => ({
      result: result as FormattedResults<T>[number],
      database,
    }));
};
