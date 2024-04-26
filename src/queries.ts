import { processStorableObjects, uploadStorableObjects } from './storage';
import type { Query, Results } from './types/query';
import type { QueryHandlerOptions } from './types/utils';
import { runQueriesWithHooks } from './utils/data-hooks';
import { getDotNotatedPath, InvalidQueryError } from './utils/errors';
import { formatTimeFields, getProperty } from './utils/helpers';

type QueryResponse<T> = {
  results: Result<T>[];
  error?: any;
};

type SchemaFieldType =
  | 'list'
  | 'group'
  | 'record'
  | 'short-text'
  | 'long-text'
  | 'rich-text'
  | 'time'
  | 'media'
  | 'toggle'
  | 'number'
  | 'json'
  | 'token'
  | 'record-filter'
  | 'markdown'
  | 'file'
  | 'checklist'
  | 'location'
  | 'color';

type Result<T> =
  | {
      record: T | any;
      schema: Record<string, SchemaFieldType>;
    }
  | {
      records: (T | any)[] & { moreBefore?: string; moreAfter?: string };
      moreBefore: string;
      moreAfter: string;
      schema: Record<string, SchemaFieldType>;
    }
  | {
      amount: number;
    }
  | {
      error: any;
    };

/**
 * Run a set of given queries.
 *
 * @param queries - `Query` array containing the queries to run. These may
 * contain objects to be stored inside object storage.
 * @param options - `QueryHandlerOptions` object containing options passed to
 * the internal `fetch` function.
 *
 * @returns Promise resolving the queried data.
 */
export const runQueries = async <T>(
  queries: Query[],
  options: QueryHandlerOptions = {}
): Promise<Results<T>> => {
  const hasWriteQuery = queries.some((query) => ['create', 'set', 'drop'].includes(Object.keys(query)[0]));

  // Runtimes like Cloudflare Workers don't support `cache` yet.
  const hasCachingSupport = 'cache' in new Request('https://ronin.co');

  const request = new Request('https://data.ronin.co/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${options.token}`,
    },
    body: JSON.stringify({ queries }),

    // Disable cache if write queries are performed, as those must be
    // guaranteed to reach RONIN.
    ...(hasWriteQuery && hasCachingSupport ? { cache: 'no-store' } : {}),

    // Allow for passing custom `fetch` options (e.g. in Next.js).
    ...(typeof options?.fetch === 'object' ? options.fetch : {}),
  });

  const fetcher = typeof options?.fetch === 'function' ? options.fetch : fetch;
  const response = await fetcher(request);
  const { results, error } = (await response.json()) as QueryResponse<T>;

  // Throw errors that happened during the execution of the queries.
  if (error) {
    const exposedError: Error & { code?: string } = new Error(error.message);
    if (error.code) exposedError.code = error.code;
    throw exposedError;
  }

  const startFormatting = performance.now();

  for (let i = 0; i < results.length; i++) {
    const result = results[i];

    if ('error' in result && result.error) {
      const message = result.error.code === 'BAD_REQUEST' ? 'Invalid query provided.' : result.error.message;

      // Get a dot-notated path to the field that caused the error.
      const path = result.error.issues?.[0]?.path ? getDotNotatedPath(result.error.issues[0].path) : null;

      // If a path is given, try resolving the query that caused the error.
      const query =
        path && typeof result.error.issues[0].path[1] === 'number'
          ? queries[result.error.issues[0].path[1]]
          : null;

      // Get the last part of the instruction that is invalid.
      const instruction = query && path ? getProperty(query, path.replace(/queries\[\d+\]\./, '')) : null;

      // Get potential details about the error. These contain instructions how
      // the issue might be resolved.
      const details = result.error.issues?.[0] ? result.error.issues[0].message : null;

      throw new InvalidQueryError({
        message,
        query:
          query && path ? `${path.replace(/queries\[\d+\]\./, '')} = ${JSON.stringify(instruction)}` : null,
        path: path,
        details,
      });
    }

    // Handle `count` query result.
    if ('amount' in result && typeof result.amount !== 'undefined' && result.amount !== null) {
      results[i] = Number(result.amount) as unknown as Result<T>;
      continue;
    }

    const timeFields =
      'schema' in result
        ? Object.entries(result.schema)
            .filter(([, type]) => type === 'time')
            .map(([name]) => name)
        : [];
        
    // Handle single record result.
    if ('record' in result) {
      // This happens if no matching record was found for a singular query,
      // such as `get.account.with.handle('leo')`.
      if (result.record === null) {
        results[i] = null as unknown as QueryResponse<T>['results'][number];
        continue;
      }

      formatTimeFields(result.record, timeFields);

      results[i] = result.record;
      continue;
    }

    // Handle result with multiple records.
    if ('records' in result) {
      for (const record of result.records) {
        formatTimeFields(record, timeFields);
      }

      // Expose the pagination cursors in order to allow for retrieving the
      // previous or next page.
      //
      // This value is already available on `result`, but since we're only
      // returning `result.records`, we want it to be set on that array.
      if (typeof result.moreBefore !== 'undefined') result.records.moreBefore = result.moreBefore;
      if (typeof result.moreAfter !== 'undefined') result.records.moreAfter = result.moreAfter;

      results[i] = result.records as unknown as Result<T>;
      continue;
    }
  }

  const endFormatting = performance.now();

  const VERBOSE_LOGGING =
    (typeof process?.env !== 'undefined' && process.env.__RENDER_DEBUG_LEVEL === 'verbose') ||
    (typeof import.meta?.env !== 'undefined' && import.meta.env.__RENDER_DEBUG_LEVEL === 'verbose');

  if (VERBOSE_LOGGING) {
    console.log(`Formatting took ${endFormatting - startFormatting}ms`);
  }

  return results as Results<T>;
};

/**
 * Runs a list of `Query`s.
 *
 * @param queries - A list of queries to execute.
 * @param options - A list of options to change how the queries are executed.
 *
 * @returns The results of the queries that were passed.
 */
export const runQueriesWithStorageAndHooks = async <T>(
  queries: Query[],
  options: QueryHandlerOptions = {}
): Promise<Results<T>> => {
  // Extract and process `StorableObject`s, if any are present.
  // `queriesPopulatedWithReferences` are the given `queries`, just that any
  // `StorableObject` they might contain has been processed and the value of the
  // field has been replaced with the reference to the `StoredObject`.
  // This way, we only store the `reference` of the `StoredObject` inside the
  // database for better performance.
  const queriesPopulatedWithReferences = await processStorableObjects(queries, (objects) => {
    return uploadStorableObjects(objects, options);
  });

  return runQueriesWithHooks<T>(queriesPopulatedWithReferences, options);
};
