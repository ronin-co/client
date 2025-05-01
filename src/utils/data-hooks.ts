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
  DDL_QUERY_TYPES,
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
) => Array<Query> | Promise<Array<Query>>;

export type DuringHookHandler<
  TType extends QueryType,
  TQuery extends FilteredHookQuery<TType> = FilteredHookQuery<TType>,
> = (
  query: TQuery,
  multipleRecords: boolean,
  options: DataHookOptions,
) => TQuery | Promise<TQuery> | Query | Promise<Query>;

export type AfterHookHandler<
  TType extends QueryType,
  TQuery extends FilteredHookQuery<TType> = FilteredHookQuery<TType>,
> = (
  query: TQuery,
  multipleRecords: boolean,
  options: DataHookOptions,
) => Array<Query> | Promise<Array<Query>>;

export type ResolvingHookHandler<TType extends QueryType, TSchema = unknown> = (
  query: FilteredHookQuery<TType>,
  multipleRecords: boolean,
  options: DataHookOptions,
) => TSchema | Promise<TSchema>;

export type FollowingHookHandler<TType extends QueryType, TSchema = unknown> = (
  query: FilteredHookQuery<TType>,
  multipleRecords: boolean,
  beforeResult: TSchema,
  afterResult: TSchema,
  options: DataHookOptions,
) => void | Promise<void>;

// The order of these types is important, as they determine the order in which
// data hooks are run (the "data hook lifecycle").
const HOOK_TYPES = ['before', 'during', 'after', 'resolving', 'following'] as const;

type HookType = (typeof HOOK_TYPES)[number];

type HookKeys = (
  | { [K in QueryType]: `before${Capitalize<K>}` }
  | { [K in QueryType]: K }
  | { [K in QueryType]: `after${Capitalize<K>}` }
  | { [K in QueryType]: `resolving${Capitalize<K>}` }
  | { [K in QueryType]: `following${Capitalize<K>}` }
)[QueryType];

type Hook<
  TStage extends HookType,
  TType extends QueryType,
  TSchema extends TStage extends 'before' | 'during' | 'after' ? never : unknown = never,
> = TStage extends 'before'
  ? BeforeHookHandler<TType>
  : TStage extends 'during'
    ? DuringHookHandler<TType>
    : TStage extends 'after'
      ? AfterHookHandler<TType>
      : TStage extends 'resolving'
        ? ResolvingHookHandler<TType, TSchema>
        : TStage extends 'following'
          ? FollowingHookHandler<TType, TSchema>
          : never;

type HookList<TSchema = unknown> = {
  [K in HookKeys]?: K extends 'before' | `before${string}`
    ? BeforeHookHandler<QueryType>
    : K extends 'after' | `after${string}`
      ? AfterHookHandler<QueryType>
      : K extends 'resolving' | `resolving${string}`
        ? ResolvingHookHandler<QueryType, TSchema>
        : K extends 'following' | `following${string}`
          ? FollowingHookHandler<QueryType, TSchema>
          : DuringHookHandler<QueryType>;
};

export type Hooks<TSchema = unknown> = Record<string, HookList<TSchema>>;

type BeforeHook<TType extends QueryType> = Hook<'before', TType>;
type DuringHook<TType extends QueryType> = Hook<'during', TType>;
type AfterHook<TType extends QueryType> = Hook<'after', TType>;

type ResolvingHook<TType extends QueryType, TSchema = unknown> = Hook<
  'resolving',
  TType,
  TSchema
>;
type FollowingHook<TType extends QueryType, TSchema = unknown> = Hook<
  'following',
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

export type GetHook = DuringHook<'get'>;
export type SetHook = DuringHook<'set'>;
export type AddHook = DuringHook<'add'>;
export type RemoveHook = DuringHook<'remove'>;
export type CountHook = DuringHook<'count'>;
export type CreateHook = DuringHook<'create'>;
export type AlterHook = DuringHook<'alter'>;
export type DropHook = DuringHook<'drop'>;

export type AfterGetHook = AfterHook<'get'>;
export type AfterSetHook = AfterHook<'set'>;
export type AfterAddHook = AfterHook<'add'>;
export type AfterRemoveHook = AfterHook<'remove'>;
export type AfterCountHook = AfterHook<'count'>;
export type AfterCreateHook = AfterHook<'create'>;
export type AfterAlterHook = AfterHook<'alter'>;
export type AfterDropHook = AfterHook<'drop'>;

export type ResolvingGetHook<TSchema = unknown> = ResolvingHook<'get', TSchema>;
export type ResolvingSetHook<TSchema = unknown> = ResolvingHook<'set', TSchema>;
export type ResolvingAddHook<TSchema = unknown> = ResolvingHook<'add', TSchema>;
export type ResolvingRemoveHook<TSchema = unknown> = ResolvingHook<'remove', TSchema>;
export type ResolvingCountHook<TSchema = unknown> = ResolvingHook<'count', TSchema>;
export type ResolvingCreateHook<TSchema = unknown> = ResolvingHook<'create', TSchema>;
export type ResolvingAlterHook<TSchema = unknown> = ResolvingHook<'alter', TSchema>;
export type ResolvingDropHook<TSchema = unknown> = ResolvingHook<'drop', TSchema>;

export type FollowingGetHook<TSchema = unknown> = FollowingHook<'get', TSchema>;
export type FollowingSetHook<TSchema = unknown> = FollowingHook<'set', TSchema>;
export type FollowingAddHook<TSchema = unknown> = FollowingHook<'add', TSchema>;
export type FollowingRemoveHook<TSchema = unknown> = FollowingHook<'remove', TSchema>;
export type FollowingCountHook<TSchema = unknown> = FollowingHook<'count', TSchema>;
export type FollowingCreateHook<TSchema = unknown> = FollowingHook<'create', TSchema>;
export type FollowingAlterHook<TSchema = unknown> = FollowingHook<'alter', TSchema>;
export type FollowingDropHook<TSchema = unknown> = FollowingHook<'drop', TSchema>;

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
 * For example, if `hookType` is "following" and `queryType` is "add", the
 * resulting method name would be `followingAdd`.
 *
 * @param hookType - The type of hook.
 * @param queryType - The type of query.
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

interface HookCallerOptions extends Omit<QueryHandlerOptions, 'hooks'> {
  hooks: NonNullable<QueryHandlerOptions['hooks']>;
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
 * Invokes a particular hook (such as `followingAdd`) and handles its output.
 * In the case of an "before" hook, a query is returned from the hook, which
 * must replace the original query in the list of queries. For a "resolving" hook,
 * the results of the query are returned and must therefore be merged into the
 * final list of results. In the case of an "following" hook, nothing must be done
 * because no output is returned by the hook.
 *
 * @param hookType - The type of hook.
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
  /** A list of queries provided by the data hook. */
  queries?: Array<Query>;
  /** The result of a query provided by the data hook. */
  result?: FormattedResults<unknown>[number] | symbol;
}> => {
  const { hooks } = options;
  const { query } = definition;

  const queryType = Object.keys(query)[0] as QueryType;

  let queryModel: string;
  let queryModelDashed: string;
  let multipleRecords: boolean;

  let oldInstruction: CombinedInstructions | undefined;

  // If the provided query interacts with a model, the query instructions must be
  // determined in a special way, since Data Definition Language (DDL) queries have a
  // different structure than regular Data Manipulation Language (DML) queries.
  if (DDL_QUERY_TYPES.includes(queryType as (typeof DDL_QUERY_TYPES)[number])) {
    queryModel = queryModelDashed = 'model';
    multipleRecords = false;
    oldInstruction = query[queryType] as CombinedInstructions;
  } else {
    const queryInstructions = query[queryType] as QuerySchemaType;
    ({
      key: queryModel,
      model: queryModelDashed,
      multipleRecords,
    } = getModel(queryInstructions));

    oldInstruction = queryInstructions[queryModel];
  }

  // If the hooks are being executed for a custom database, all hooks must be located
  // inside a file named `sink.ts`, which catches the queries for all other databases.
  //
  // If the hooks are *not* being executed for a custom database, the hook file name
  // matches the model that is being addressed by the query.
  const hookFile = options.database ? 'sink' : queryModelDashed;
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

  if (hooksForModel && hookName in hooksForModel) {
    const hook = hooksForModel[hookName as keyof typeof hooksForModel];
    const hookOptions =
      hookFile === 'sink' ? { model: queryModel, database: options.database } : {};

    // For data hooks of type "following" (such as `followingAdd`), we want to pass
    // special function arguments that contain the value of the affected records
    // before and after the query was executed.
    const hookResult =
      hookType === 'following'
        ? (hook as FollowingHook<QueryType, unknown>)(
            queryInstruction,
            multipleRecords,
            normalizeResults(definition.resultBefore),
            normalizeResults(definition.resultAfter),
            hookOptions,
          )
        : (hook as DuringHook<QueryType> | ResolvingHook<QueryType>)(
            queryInstruction,
            multipleRecords,
            hookOptions,
          );

    // If the hook returned multiple queries that should be run before the original query,
    // we want to return those queries.
    if (hookType === 'before') {
      return { queries: hookResult as Array<Query> };
    }

    // If the hook returned a query, we want to replace the original query with
    // the one returned by the hook.
    if (hookType === 'during') {
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
            [queryModel]: result as CombinedInstructions,
          },
        };
      }

      return { queries: [newQuery] };
    }

    // If the hook returned multiple queries that should be run after the original query,
    // we want to return those queries.
    if (hookType === 'after') {
      return { queries: hookResult as Array<Query> };
    }

    // If the hook returned a record (or multiple), we want to set the query's
    // result to the value returned by the hook.
    if (hookType === 'resolving') {
      const result = hookResult as FormattedResults<unknown>[number];
      return { queries: [], result };
    }

    // In the case of "following" hooks, we don't need to do anything, because they
    // are run asynchronously and aren't expected to return anything.
  }

  return { queries: [], result: EMPTY };
};

/**
 * Executes queries and also invokes any potential hooks (such as `followingAdd`)
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
  const { hooks, waitUntil } = options;

  // If no hooks were provided, we can just run all the queries and return the results.
  if (!hooks) return runQueries<T>(queries, options);

  if (typeof process === 'undefined' && !waitUntil) {
    let message = 'In the case that the "ronin" package receives a value for';
    message += ' its `hooks` option, it must also receive a value for its';
    message += ' `waitUntil` option. This requirement only applies when using';
    message += ' an edge runtime and ensures that the edge worker continues to';
    message += ' execute until all "following" hooks have been executed.';

    throw new Error(message);
  }

  let queryList: Array<
    QueriesPerDatabase[number] & {
      result: FormattedResults<T>[number] | symbol;
      /** Whether the query is a diff query for another query. */
      diffForIndex?: number;
      /** Whether the query is an auxiliary query for another query. */
      auxiliaryForIndex?: number;
    }
  > = queries.map(({ query, database }) => ({ query, result: EMPTY, database }));

  // Invoke `beforeAdd`, `beforeGet`, `beforeSet`, `beforeRemove`, and `beforeCount`.
  await Promise.all(
    queryList.map(async ({ query, database }, index) => {
      const hookResults = await invokeHooks('before', { query }, { hooks, database });

      const queriesToInsert = hookResults.queries!.map((query) => ({
        query,
        result: EMPTY,
        database,
        auxiliaryForIndex: index,
      }));

      queryList.splice(index, 0, ...queriesToInsert);
    }),
  );

  // Invoke `add`, `get`, `set`, `remove`, and `count`.
  await Promise.all(
    queryList.map(async ({ query, database }, index) => {
      const hookResults = await invokeHooks('during', { query }, { hooks, database });

      if (hookResults.queries && hookResults.queries.length > 0) {
        queryList[index].query = hookResults.queries[0];
      }
    }),
  );

  // Invoke `afterAdd`, `afterGet`, `afterSet`, `afterRemove`, and `afterCount`.
  await Promise.all(
    queryList.map(async ({ query, database }, index) => {
      const hookResults = await invokeHooks('after', { query }, { hooks, database });

      const queriesToInsert = hookResults.queries!.map((query) => ({
        query,
        result: EMPTY,
        database,
        auxiliaryForIndex: index,
      }));

      queryList.splice(index + 1, 0, ...queriesToInsert);
    }),
  );

  // If data hooks are enabled, we want to send a separate `get` query for every `set`
  // and `alter` query (in the same transaction), so that we can provide the data hooks
  // with a "before and after" of the modified records.
  //
  // The version of the record *after* the modification is already available without the
  // extra `get` query, since `set` queries return the modified record afterward, but in
  // order to get the version of the record *before* the modification, we need a separate
  // query of type `get`.
  queryList = queryList.flatMap((details, index) => {
    const { query, database } = details;

    if (query.set || query.alter) {
      let newQuery: Query | undefined;

      if (query.set) {
        const modelSlug = Object.keys(query.set!)[0];

        newQuery = {
          get: {
            [modelSlug]: {
              with: query.set![modelSlug].with,
            },
          },
        };
      } else {
        newQuery = {
          list: {
            model: query.alter!.model,
          },
        };
      }

      const diffQuery = {
        query: newQuery,
        diffForIndex: index + 1,
        result: EMPTY,
        database,
      };

      return [diffQuery, details];
    }

    return [details];
  });

  // Invoke `resolvingGet`, `resolvingSet`, `resolvingAdd`, `resolvingRemove`,
  // and `resolvingCount`.
  await Promise.all(
    queryList.map(async ({ query, database }, index) => {
      const hookResults = await invokeHooks('resolving', { query }, { hooks, database });
      queryList[index].result = hookResults.result as FormattedResults<T>[number];
    }),
  );

  const queriesWithoutResults = queryList
    .map((query, index) => ({ ...query, index }))
    .filter((query) => query.result === EMPTY);

  // If queries are remaining that don't have any results that were provided by above by
  // data hooks, we need to run those queries against the database.
  if (queriesWithoutResults.length > 0) {
    const resultsFromDatabase = await runQueries<T>(queriesWithoutResults, options);

    // Assign the results from the database to the list of queries.
    for (let index = 0; index < resultsFromDatabase.length; index++) {
      const query = queriesWithoutResults[index];
      const result = resultsFromDatabase[index].result;

      queryList[query.index].result = result;
    }
  }

  // Asynchronously invoke `followingAdd`, `followingSet`, `followingRemove`,
  // `followingCreate`, `followingAlter`, and `followingDrop`.
  for (let index = 0; index < queryList.length; index++) {
    const { query, result, database } = queryList[index];
    const queryType = Object.keys(query)[0] as QueryType;

    // "following" hooks should only fire for writes — not reads.
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
      'following',
      { query, resultBefore, resultAfter },
      { hooks, database },
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

  // Filter the list of queries to remove any potential queries used for "diffing"
  // (retrieving the previous value of a record) and any potential queries resulting from
  // "before" or "after" hooks. Then return only the results of the queries.
  return queryList
    .filter(
      (query) =>
        typeof query.diffForIndex === 'undefined' &&
        typeof query.auxiliaryForIndex === 'undefined',
    )
    .map(({ result, database }) => ({
      result: result as FormattedResults<T>[number],
      database,
    }));
};
