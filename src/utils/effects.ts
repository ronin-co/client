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

interface EffectOptions {
  /** The model for which the query is being executed. */
  model?: string;
  /** The database for which the query is being executed. */
  database?: string;
}

export type FilteredEffectQuery<
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

export type BeforeEffectHandler<
  TType extends QueryType,
  TQuery extends FilteredEffectQuery<TType> = FilteredEffectQuery<TType>,
> = (
  query: TQuery,
  multipleRecords: boolean,
  options: EffectOptions,
) => Array<Query> | Promise<Array<Query>>;

export type DuringEffectHandler<
  TType extends QueryType,
  TQuery extends FilteredEffectQuery<TType> = FilteredEffectQuery<TType>,
> = (
  query: TQuery,
  multipleRecords: boolean,
  options: EffectOptions,
) => TQuery | Promise<TQuery> | Query | Promise<Query>;

export type AfterEffectHandler<
  TType extends QueryType,
  TQuery extends FilteredEffectQuery<TType> = FilteredEffectQuery<TType>,
> = (
  query: TQuery,
  multipleRecords: boolean,
  options: EffectOptions,
) => Array<Query> | Promise<Array<Query>>;

export type ResolvingEffectHandler<TType extends QueryType, TSchema = unknown> = (
  query: FilteredEffectQuery<TType>,
  multipleRecords: boolean,
  options: EffectOptions,
) => TSchema | Promise<TSchema>;

export type FollowingEffectHandler<TType extends QueryType, TSchema = unknown> = (
  query: FilteredEffectQuery<TType>,
  multipleRecords: boolean,
  beforeResult: TSchema,
  afterResult: TSchema,
  options: EffectOptions,
) => void | Promise<void>;

// The order of these types is important, as they determine the order in which
// effects are run (the "effect lifecycle").
const HOOK_TYPES = ['before', 'during', 'after', 'resolving', 'following'] as const;

type EffectType = (typeof HOOK_TYPES)[number];

type EffectKeys = (
  | { [K in QueryType]: `before${Capitalize<K>}` }
  | { [K in QueryType]: K }
  | { [K in QueryType]: `after${Capitalize<K>}` }
  | { [K in QueryType]: `resolving${Capitalize<K>}` }
  | { [K in QueryType]: `following${Capitalize<K>}` }
)[QueryType];

type Effect<
  TStage extends EffectType,
  TType extends QueryType,
  TSchema extends TStage extends 'before' | 'during' | 'after' ? never : unknown = never,
> = TStage extends 'before'
  ? BeforeEffectHandler<TType>
  : TStage extends 'during'
    ? DuringEffectHandler<TType>
    : TStage extends 'after'
      ? AfterEffectHandler<TType>
      : TStage extends 'resolving'
        ? ResolvingEffectHandler<TType, TSchema>
        : TStage extends 'following'
          ? FollowingEffectHandler<TType, TSchema>
          : never;

type EffectList<TSchema = unknown> = {
  [K in EffectKeys]?: K extends 'before' | `before${string}`
    ? BeforeEffectHandler<QueryType>
    : K extends 'after' | `after${string}`
      ? AfterEffectHandler<QueryType>
      : K extends 'resolving' | `resolving${string}`
        ? ResolvingEffectHandler<QueryType, TSchema>
        : K extends 'following' | `following${string}`
          ? FollowingEffectHandler<QueryType, TSchema>
          : DuringEffectHandler<QueryType>;
};

export type Effects<TSchema = unknown> = Record<string, EffectList<TSchema>>;

type BeforeEffect<TType extends QueryType> = Effect<'before', TType>;
type DuringEffect<TType extends QueryType> = Effect<'during', TType>;
type AfterEffect<TType extends QueryType> = Effect<'after', TType>;

type ResolvingEffect<TType extends QueryType, TSchema = unknown> = Effect<
  'resolving',
  TType,
  TSchema
>;
type FollowingEffect<TType extends QueryType, TSchema = unknown> = Effect<
  'following',
  TType,
  TSchema
>;

export type BeforeGetEffect = BeforeEffect<'get'>;
export type BeforeSetEffect = BeforeEffect<'set'>;
export type BeforeAddEffect = BeforeEffect<'add'>;
export type BeforeRemoveEffect = BeforeEffect<'remove'>;
export type BeforeCountEffect = BeforeEffect<'count'>;
export type BeforeCreateEffect = BeforeEffect<'create'>;
export type BeforeAlterEffect = BeforeEffect<'alter'>;
export type BeforeDropEffect = BeforeEffect<'drop'>;

export type GetEffect = DuringEffect<'get'>;
export type SetEffect = DuringEffect<'set'>;
export type AddEffect = DuringEffect<'add'>;
export type RemoveEffect = DuringEffect<'remove'>;
export type CountEffect = DuringEffect<'count'>;
export type CreateEffect = DuringEffect<'create'>;
export type AlterEffect = DuringEffect<'alter'>;
export type DropEffect = DuringEffect<'drop'>;

export type AfterGetEffect = AfterEffect<'get'>;
export type AfterSetEffect = AfterEffect<'set'>;
export type AfterAddEffect = AfterEffect<'add'>;
export type AfterRemoveEffect = AfterEffect<'remove'>;
export type AfterCountEffect = AfterEffect<'count'>;
export type AfterCreateEffect = AfterEffect<'create'>;
export type AfterAlterEffect = AfterEffect<'alter'>;
export type AfterDropEffect = AfterEffect<'drop'>;

export type ResolvingGetEffect<TSchema = unknown> = ResolvingEffect<'get', TSchema>;
export type ResolvingSetEffect<TSchema = unknown> = ResolvingEffect<'set', TSchema>;
export type ResolvingAddEffect<TSchema = unknown> = ResolvingEffect<'add', TSchema>;
export type ResolvingRemoveEffect<TSchema = unknown> = ResolvingEffect<'remove', TSchema>;
export type ResolvingCountEffect<TSchema = unknown> = ResolvingEffect<'count', TSchema>;
export type ResolvingCreateEffect<TSchema = unknown> = ResolvingEffect<'create', TSchema>;
export type ResolvingAlterEffect<TSchema = unknown> = ResolvingEffect<'alter', TSchema>;
export type ResolvingDropEffect<TSchema = unknown> = ResolvingEffect<'drop', TSchema>;

export type FollowingGetEffect<TSchema = unknown> = FollowingEffect<'get', TSchema>;
export type FollowingSetEffect<TSchema = unknown> = FollowingEffect<'set', TSchema>;
export type FollowingAddEffect<TSchema = unknown> = FollowingEffect<'add', TSchema>;
export type FollowingRemoveEffect<TSchema = unknown> = FollowingEffect<'remove', TSchema>;
export type FollowingCountEffect<TSchema = unknown> = FollowingEffect<'count', TSchema>;
export type FollowingCreateEffect<TSchema = unknown> = FollowingEffect<'create', TSchema>;
export type FollowingAlterEffect<TSchema = unknown> = FollowingEffect<'alter', TSchema>;
export type FollowingDropEffect<TSchema = unknown> = FollowingEffect<'drop', TSchema>;

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
 * Constructs the method name used for a particular type of effect and query.
 * For example, if `effectType` is "following" and `queryType` is "add", the
 * resulting method name would be `followingAdd`.
 *
 * @param effectType - The type of effect.
 * @param queryType - The type of query.
 *
 * @returns The method name constructed from the effect and query types.
 */
const getMethodName = (effectType: EffectType, queryType: QueryType): string => {
  const capitalizedQueryType = queryType[0].toUpperCase() + queryType.slice(1);
  return effectType === 'during' ? queryType : effectType + capitalizedQueryType;
};

/**
 * Takes the result of a query and normalizes it to an array, to avoid
 * developers having to conditionally support both arrays and objects inside
 * the effects. Furthermore, the result is cloned to allow for modifying it
 * within effects without affecting the original query result that is being
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

interface EffectCallerOptions extends Omit<QueryHandlerOptions, 'effects'> {
  effects: NonNullable<QueryHandlerOptions['effects']>;
  /**
   * If the effects are being called for a custom database, the identifier of the database
   * would be provided here.
   */
  database?: string;
}

export interface EffectContext {
  effectType: EffectType;
  queryType: QueryType;
  queryModel: string;
}

/**
 * Invokes a particular effect (such as `followingAdd`) and handles its output.
 * In the case of an "before" effect, a query is returned from the effect, which
 * must replace the original query in the list of queries. For a "resolving" effect,
 * the results of the query are returned and must therefore be merged into the
 * final list of results. In the case of an "following" effect, nothing must be done
 * because no output is returned by the effect.
 *
 * @param effectType - The type of effect.
 * @param definition - The definition and other details of a query that is being run.
 * @param options - A list of options to change how the queries are executed.
 *
 * @returns The modified query and its results, if any are available.
 */
const invokeEffects = async (
  effectType: EffectType,
  definition: {
    query: Query;
    resultBefore?: unknown;
    resultAfter?: unknown;
  },
  options: EffectCallerOptions,
): Promise<{
  /** A list of queries provided by the effect. */
  queries?: Array<Query>;
  /** The result of a query provided by the effect. */
  result?: FormattedResults<unknown>[number] | symbol;
}> => {
  const { effects } = options;
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

  // If the effects are being executed for a custom database, all effects must be located
  // inside a file named `sink.ts`, which catches the queries for all other databases.
  //
  // If the effects are *not* being executed for a custom database, the effect file name
  // matches the model that is being addressed by the query.
  const effectFile = options.database ? 'sink' : queryModelDashed;
  const effectsForModel = effects[effectFile];
  const effectName = getMethodName(effectType, queryType);

  // If `oldInstruction` is falsy (e.g. `null`), we want to default to `{}`.
  // This would happen in cases where all records of a particular model are
  // retrieved. For example, the query `get.members();` would trigger this.
  //
  // It's important to provide an object to effects, as people might otherwise
  // try to set properties on a value that's not an object, which would cause
  // the effect to crash with an exception.
  //
  // It's also extremely important to clone both of the variables below, as the
  // effects will otherwise modify the original that was passed from the outside.
  const queryInstruction = oldInstruction
    ? structuredClone<CombinedInstructions>(oldInstruction as CombinedInstructions)
    : ({} as CombinedInstructions);

  if (effectsForModel && effectName in effectsForModel) {
    const effect = effectsForModel[effectName as keyof typeof effectsForModel];
    const effectOptions =
      effectFile === 'sink' ? { model: queryModel, database: options.database } : {};

    // For effects of type "following" (such as `followingAdd`), we want to pass
    // special function arguments that contain the value of the affected records
    // before and after the query was executed.
    const effectResult = await (effectType === 'following'
      ? (effect as FollowingEffect<QueryType, unknown>)(
          queryInstruction,
          multipleRecords,
          normalizeResults(definition.resultBefore),
          normalizeResults(definition.resultAfter),
          effectOptions,
        )
      : (effect as DuringEffect<QueryType> | ResolvingEffect<QueryType>)(
          queryInstruction,
          multipleRecords,
          effectOptions,
        ));

    // If the effect returned multiple queries that should be run before the original query,
    // we want to return those queries.
    if (effectType === 'before') {
      return { queries: effectResult as Array<Query> };
    }

    // If the effect returned a query, we want to replace the original query with
    // the one returned by the effect.
    if (effectType === 'during') {
      const result = effectResult as null | Query | CombinedInstructions;
      let newQuery: Query = query;

      // If a full query was returned by the "before" effect, use the query as-is.
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

    // If the effect returned multiple queries that should be run after the original query,
    // we want to return those queries.
    if (effectType === 'after') {
      return { queries: effectResult as Array<Query> };
    }

    // If the effect returned a record (or multiple), we want to set the query's
    // result to the value returned by the effect.
    if (effectType === 'resolving') {
      const result = effectResult as FormattedResults<unknown>[number];
      return { queries: [], result };
    }

    // In the case of "following" effects, we don't need to do anything, because they
    // are run asynchronously and aren't expected to return anything.
  }

  return { queries: [], result: EMPTY };
};

/**
 * Executes queries and also invokes any potential effects (such as `followingAdd`)
 * that might have been provided as part of `options.effects`.
 *
 * @param queries - A list of queries to execute.
 * @param options - A list of options to change how the queries are executed. To
 * run effects, the `options.effects` property must contain a map of effects.
 *
 * @returns The results of the queries that were passed.
 */
export const runQueriesWithEffects = async <T extends ResultRecord>(
  queries: QueriesPerDatabase,
  options: QueryHandlerOptions = {},
): Promise<ResultsPerDatabase<T>> => {
  const { effects, waitUntil } = options;

  // If no effects were provided, we can just run all the queries and return the results.
  if (!effects) return runQueries<T>(queries, options);

  if (typeof process === 'undefined' && !waitUntil) {
    let message = 'In the case that the "ronin" package receives a value for';
    message += ' its `effects` option, it must also receive a value for its';
    message += ' `waitUntil` option. This requirement only applies when using';
    message += ' an edge runtime and ensures that the edge worker continues to';
    message += ' execute until all "following" effects have been executed.';

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
      const effectResults = await invokeEffects(
        'before',
        { query },
        { effects, database },
      );

      const queriesToInsert = effectResults.queries!.map((query) => ({
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
      const effectResults = await invokeEffects(
        'during',
        { query },
        { effects, database },
      );

      if (effectResults.queries && effectResults.queries.length > 0) {
        queryList[index].query = effectResults.queries[0];
      }
    }),
  );

  // Invoke `afterAdd`, `afterGet`, `afterSet`, `afterRemove`, and `afterCount`.
  await Promise.all(
    queryList.map(async ({ query, database }, index) => {
      const effectResults = await invokeEffects(
        'after',
        { query },
        { effects, database },
      );

      const queriesToInsert = effectResults.queries!.map((query) => ({
        query,
        result: EMPTY,
        database,
        auxiliaryForIndex: index,
      }));

      queryList.splice(index + 1, 0, ...queriesToInsert);
    }),
  );

  // If effects are enabled, we want to send a separate `get` query for every `set`
  // and `alter` query (in the same transaction), so that we can provide the effects
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
      const effectResults = await invokeEffects(
        'resolving',
        { query },
        { effects, database },
      );
      queryList[index].result = effectResults.result as FormattedResults<T>[number];
    }),
  );

  const queriesWithoutResults = queryList
    .map((query, index) => ({ ...query, index }))
    .filter((query) => query.result === EMPTY);

  // If queries are remaining that don't have any results that were provided by above by
  // effects, we need to run those queries against the database.
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

    // "following" effects should only fire for writes — not reads.
    if (!(WRITE_QUERY_TYPES as ReadonlyArray<string>).includes(queryType)) continue;

    const diffMatch = queryList.find((item) => item.diffForIndex === index);

    let resultBefore = diffMatch ? diffMatch.result : EMPTY;
    let resultAfter = result;

    // For queries of type "remove" and "drop", we want to set `resultBefore` to the
    // result of the query (which contains the record), because the record will no longer
    // exist after the query has been executed, so it wouldn't make sense to expose the
    // record as `resultAfter` in the effects.
    if (queryType === 'remove' || queryType === 'drop') {
      resultBefore = result;
      resultAfter = EMPTY;
    }

    // Run the actual effect functions.
    const promise = invokeEffects(
      'following',
      { query, resultBefore, resultAfter },
      { effects, database },
    );

    // The result of the effect should not be made available, otherwise
    // developers might start relying on it. Only errors should be propagated.
    const clearPromise = promise.then(
      () => {},
      (error) => Promise.reject(error),
    );

    // If the configuration option for extending the lifetime of the edge
    // worker invocation was passed, provide it with the resulting promise of
    // the effect invocation above. This will ensure that the worker will
    // continue to be executed until all of the asynchronous actions
    // (non-awaited promises) have been resolved.
    if (waitUntil) waitUntil(clearPromise);
  }

  // Filter the list of queries to remove any potential queries used for "diffing"
  // (retrieving the previous value of a record) and any potential queries resulting from
  // "before" or "after" effects. Then return only the results of the queries.
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
