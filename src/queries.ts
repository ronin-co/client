import { processStorableObjects, uploadStorableObjects } from '@/src/storage';
import type {
  ExpandedFormattedResult,
  FormattedResults,
  QueryHandlerOptions,
  QueryResponse,
  RegularFormattedResult,
} from '@/src/types/utils';
import { WRITE_QUERY_TYPES } from '@/src/utils/constants';
import { runQueriesWithHooks } from '@/src/utils/data-hooks';
import { getResponseBody } from '@/src/utils/errors';
import { formatDateFields } from '@/src/utils/helpers';
import {
  type Model,
  type Query,
  type RegularResult,
  type ResultRecord,
  type Statement,
  Transaction,
} from '@ronin/compiler';

/**
 * Run a set of given queries.
 *
 * @param queries - A list of RONIN queries or SQL statements to execute.
 * @param options - `QueryHandlerOptions` object containing options passed to
 * the internal `fetch` function.
 *
 * @returns Promise resolving the queried data.
 */
export const runQueries = async <T extends ResultRecord>(
  queries: Array<Query> | { statements: Array<Statement> },
  options: QueryHandlerOptions = {},
): Promise<FormattedResults<T>> => {
  let hasWriteQuery: boolean | null = null;

  const requestBody: {
    queries?: Array<Query>;
    nativeQueries?: Array<{ query: string; values: Array<unknown> }>;
  } = {};

  let transaction: InstanceType<typeof Transaction> | null = null;

  if ('statements' in queries) {
    requestBody.nativeQueries = queries.statements.map((statement) => ({
      query: statement.statement,
      values: statement.params,
    }));
  } else {
    hasWriteQuery = queries.some((query) =>
      WRITE_QUERY_TYPES.includes(Object.keys(query)[0]),
    );

    if (options.models) {
      // If a list of models was provided to the client and the list is an array, we can
      // pass it to the compiler directly. If it's an object instead, that means a list of
      // models defined in code (in a dedicated TypeScript file) was provided, so we need
      // to convert it to an array before passing it to the compiler.
      const models = Array.isArray(options.models)
        ? options.models
        : (Object.values(options.models) as unknown as Array<Model>);

      transaction = new Transaction(queries, { models, inlineParams: true });

      requestBody.nativeQueries = transaction.statements.map((statement) => ({
        query: statement.statement,
        values: statement.params,
      }));
    } else {
      requestBody.queries = queries;
    }
  }

  // Runtimes like Cloudflare Workers don't support `cache` yet.
  const hasCachingSupport = 'cache' in new Request('https://ronin.co');

  const request = new Request('https://data.ronin.co/?latest=true', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${options.token}`,
    },
    body: JSON.stringify(requestBody),

    // Disable cache if write queries are performed, as those must be
    // guaranteed to reach RONIN.
    ...(hasWriteQuery && hasCachingSupport ? { cache: 'no-store' } : {}),

    // Allow for passing custom `fetch` options (e.g. in Next.js).
    ...(typeof options?.fetch === 'object' ? options.fetch : {}),
  });

  const fetcher = typeof options?.fetch === 'function' ? options.fetch : fetch;
  const response = await fetcher(request);

  const responseResults = await getResponseBody<QueryResponse<T>>(response);

  let results: QueryResponse<T>['results'] = [];

  if (transaction) {
    const rawResults = responseResults.results.map((result) => {
      return 'records' in result ? result.records : [];
    });

    results = transaction.formatResults(rawResults, false);
  } else {
    results = responseResults.results;
  }

  const startFormatting = performance.now();
  const formattedResults: FormattedResults<T> = [];

  for (const result of results) {
    // If a `models` property is present in the result, that means the result combines
    // the results of multiple different queries.
    if ('models' in result) {
      formattedResults.push(
        Object.fromEntries(
          Object.entries(result.models).map(([model, result]) => {
            return [model, formatResult(result)];
          }),
        ) as ExpandedFormattedResult<T>,
      );

      continue;
    }

    formattedResults.push(formatResult(result));
  }

  const endFormatting = performance.now();

  const VERBOSE_LOGGING =
    (typeof process !== 'undefined' &&
      process?.env &&
      process.env.__RENDER_DEBUG_LEVEL === 'verbose') ||
    (typeof import.meta?.env !== 'undefined' &&
      import.meta.env.__RENDER_DEBUG_LEVEL === 'verbose');

  if (VERBOSE_LOGGING) {
    console.log(`Formatting took ${endFormatting - startFormatting}ms`);
  }

  return formattedResults;
};

/**
 * Runs a list of `Query`s.
 *
 * @param queries - A list of RONIN queries to execute.
 * @param options - A list of options to change how the queries are executed.
 *
 * @returns The results of the queries that were passed.
 */
export const runQueriesWithStorageAndHooks = async <T extends ResultRecord>(
  queries: Array<Query>,
  options: QueryHandlerOptions = {},
): Promise<FormattedResults<T>> => {
  // Extract and process `StorableObject`s, if any are present.
  // `queriesPopulatedWithReferences` are the given `queries`, just that any
  // `StorableObject` they might contain has been processed and the value of the
  // field has been replaced with the reference to the `StoredObject`.
  // This way, we only store the `reference` of the `StoredObject` inside the
  // database for better performance.
  const queriesPopulatedWithReferences = await processStorableObjects(
    queries,
    (objects) => {
      return uploadStorableObjects(objects, options);
    },
  );

  return runQueriesWithHooks<T>(queriesPopulatedWithReferences, options);
};

/**
 * Formats the result objects provided by the query compiler.
 *
 * @param result - The result to format, as received from the query compiler.
 *
 * @returns The formatted result, for use in a JavaScript environment.
 */
const formatResult = <T extends ResultRecord>(
  result: RegularResult<T>,
): RegularFormattedResult<T> => {
  // Handle `count` query result.
  if (
    'amount' in result &&
    typeof result.amount !== 'undefined' &&
    result.amount !== null
  ) {
    return Number(result.amount);
  }

  const dateFields =
    'modelFields' in result
      ? Object.entries(result.modelFields)
          .filter(([, type]) => type === 'date')
          .map(([slug]) => slug)
      : [];

  // Handle single record result.
  if ('record' in result) {
    // This happens if no matching record was found for a singular query,
    // such as `get.account.with.handle('leo')`.
    if (result.record === null) return null;

    formatDateFields(result.record, dateFields);

    return result.record;
  }

  // Handle result with multiple records.
  if ('records' in result) {
    for (const record of result.records) {
      formatDateFields(record, dateFields);
    }

    const formattedRecords = result.records as Array<T & ResultRecord> & {
      moreBefore?: string;
      moreAfter?: string;
    };

    // Expose the pagination cursors in order to allow for retrieving the
    // previous or next page.
    //
    // This value is already available on `result`, but since we're only
    // returning `result.records`, we want it to be set on that array.
    if (typeof result.moreBefore !== 'undefined')
      formattedRecords.moreBefore = result.moreBefore;
    if (typeof result.moreAfter !== 'undefined')
      formattedRecords.moreAfter = result.moreAfter;

    return formattedRecords;
  }

  return result as unknown as RegularFormattedResult<T>;
};
