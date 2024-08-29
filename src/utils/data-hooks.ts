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
 * Based on which type of query is being executed (e.g. "get" or "create"),
 * this function checks if a hook is defined for the affected schema and runs
 * said hook with several arguments (such as the query that was run).
 * For example, if `create.account.with.id('1234');` is run and the `hookType`
 * is `before`, then the `beforeCreate` hook would be invoked if one is defined
 * for the "account" schema in the list of hooks.
 *
 * @param hookType - The type of hook, so "before", "during", or "after".
 * @param query - A deconstructed query for which the hook should be run.
 * @param options - A list of options to change how the queries are executed.
 *
 * @returns Information about whether a hook was run, and its potential output.
 */
const invokeHook = async (
  hookType: HookType,
  query: {
    type: QueryType;
    schema: string;
    plural: boolean;
    instruction: unknown;
    resultBefore: object | null;
    result: object | null;
  },
  options: HookCallerOptions,
): Promise<{ ran: boolean; result: Query | Results<unknown> | void | null | unknown }> => {
  const { hooks, asyncContext } = options;

  const hooksForSchema = hooks[query.schema];
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

  // Learn more about this behavior in the comment of the `autoSkipHooks` option.
  const parentHook = asyncContext.getStore();
  const shouldSkip =
    options.autoSkipHooks === false
      ? false
      : parentHook &&
        (HOOK_TYPES.indexOf(hookType) <= HOOK_TYPES.indexOf(parentHook.hookType) ||
          (query.schema === parentHook.querySchema &&
            HOOK_TYPES.indexOf(hookType) > HOOK_TYPES.indexOf(parentHook.hookType)));

  if (hooksForSchema && hookName in hooksForSchema && !shouldSkip) {
    const hook = hooksForSchema[hookName as keyof typeof hooksForSchema];

    const result = await asyncContext.run(
      {
        hookType,
        queryType: query.type,
        querySchema: query.schema,
      },
      async () => {
        // For data hooks of type "after" (such as `afterCreate`), we want to pass
        // a special function argument that contains the result of the query.
        if (hookType === 'after') {
          const resultBefore = structuredClone<object | null | Array<object | null>>(query.resultBefore);
          const result = structuredClone<object | null | Array<object | null>>(query.result);

          return (hook as AfterHook<QueryType, unknown>)(
            queryInstruction,
            query.plural,
            resultBefore,
            result,
          );
        }

        return (hook as BeforeHook<QueryType> | DuringHook<QueryType>)(queryInstruction, query.plural);
      },
    );

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
    resultBefore: unknown;
    result: unknown;
    diffForIndex?: number;
  },
  options: HookCallerOptions,
): Promise<void> => {
  const queryType = Object.keys(query.definition)[0] as QueryType;
  const queryInstructions = query.definition[queryType] as QuerySchemaType;
  const { key, schema, multipleRecords } = getSchema(queryInstructions);
  const oldInstruction = queryInstructions[key];

  const executedHookResults = await invokeHook(
    hookType,
    {
      type: queryType,
      schema,
      plural: multipleRecords,
      instruction: oldInstruction,

      // For "after" hooks, we want to pass the final result associated with a
      // particular query, so that the hook can read it.
      result: hookType === 'after' ? { resultBefore: query.resultBefore, result: query.result } : null,
    },
    options,
  );

  // We can't assert based on what the hook returned, only based on whether the
  // hook ran or not. That's because a hook might return any falsy value and
  // then we would be mislead into thinking that the hook didn't run.
  const { ran, result: hookResult } = executedHookResults;

  if (!ran) return;

  switch (hookType) {
    case 'before':
      // If the hook returned a query, we want to replace the original query
      // with the one returned by the hook.
      queryInstructions[key] = hookResult as CombinedInstructions;
      query.definition = { [queryType]: queryInstructions };
      break;

    case 'during':
      // The hook returned a record (or multiple), so we'd like to add those
      // records to the list of final results.
      query.result = hookResult;
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
          diffForIndex: index,
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
    queryList.map((query) => {
      // For diff queries, we don't want to run "before" hooks.
      if (typeof query.diffForIndex !== 'undefined') return;

      return invokeHooks('before', query, hookCallerOptions);
    }),
  );

  // Invoke `create`, `get`, `set`, `drop`, and `count`.
  await Promise.all(queryList.map((query) => invokeHooks('during', query, hookCallerOptions)));

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

  for (let index = 0; index < resultsFromDatabase.length; index++) {
    const query = queriesWithoutResults[index];
    const result = resultsFromDatabase[index];

    queryList[query.index].result = result;
  }

  const queriesWithDiffs = queryList
    .filter((query) => typeof query.diffForIndex === 'undefined')
    .map((query, index) => {
      const diff = queryList.find((item) => item.diffForIndex === index);
      return { definition: query.definition, resultBefore: diff, result: query.result };
    });

  // Invoke `afterCreate`, `afterGet`, `afterSet`, `afterDrop` and `afterCount`
  // (asynchronously, since they shouldn't block).
  await Promise.all(
    queriesWithDiffs.map((query) => {
      const queryType = Object.keys(query.definition)[0];

      // "after" hooks should only fire for writes — not reads.
      if (queryType !== 'set' && queryType !== 'drop' && queryType !== 'create') {
        return;
      }

      // Run the actual hook functions.
      const promise = invokeHooks('after', query, hookCallerOptions);

      // If the configuration option for extending the lifetime of the edge
      // worker invocation was passed, provide it with the resulting promise of
      // the hook invocation above. This will ensure that the worker will
      // continue to be executed until all of the asynchronous actions
      // (non-awaited promises) have been resolved.
      if (waitUntil) {
        waitUntil(promise);
        return;
      }

      return promise;
    }),
  );

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
    const promise = invokeHooks(
      'after',
      queries,
      [],
      {
        definition: query,
        index: queryIndex,
        result: queryResult,
      },
      hookCallerOptions,
    );

    // If the configuration option for extending the lifetime of the edge
    // worker invocation was passed, provide it with the resulting promise of
    // the hook invocation above. This will ensure that the worker will
    // continue to be executed until all of the asynchronous actions
    // (non-awaited promises) have been resolved.
    if (waitUntil) waitUntil(promise);
  }

  return results;
};
