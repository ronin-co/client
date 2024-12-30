import type { AsyncLocalStorage } from 'node:async_hooks';

import type { PromiseTuple, QueryHandlerOptions, QueryItem } from '@/src/types/utils';
import { RONIN_EXPRESSION_SEPARATOR } from '@/src/utils/constants';
import { setProperty } from '@/src/utils/helpers';
import { QUERY_SYMBOLS, type Query } from '@ronin/compiler';

interface BatchDetails {
  query: Query;
  options?: Record<string, unknown>;
}

/**
 * Used to track whether queries run in batches if `AsyncLocalStorage` is
 * available for use.
 */
let IN_BATCH_ASYNC: AsyncLocalStorage<boolean>;

/**
 * Used to track whether queries run in batches if `AsyncLocalStorage` is not
 * available for use.
 */
let IN_BATCH_SYNC = false;

/**
 * A utility function that creates a Proxy object to handle dynamic property
 * access and function calls. It is used to create a syntax that allows for
 * dynamic query generation.
 *
 * @param queryType - The type of the query. This will be used as the key in
 * the generated query object.
 * @param queryHandler - A function that handles the execution of the query.
 *
 * @returns A Proxy object that intercepts property access and function
 * calls to generate and execute queries.
 *
 * ### Usage
 * ```typescript
 * const proxy = getSyntaxProxy('get', async (query) => {
 *   // Execute the query and return the result
 * });
 *
 * const result = await get.account();
 *
 * const result = await get.account.with.email('mike@gmail.com');
 * ```
 */
export const getSyntaxProxy = (
  queryType: string,
  queryHandler: (query: Query, options?: Record<string, unknown>) => Promise<any> | any,
) => {
  function createProxy(path: Array<string>, targetProps?: BatchDetails) {
    const proxyTargetFunction = () => undefined;

    // This is workaround to avoid "uncalled functions" in the test
    // coverage report. Test coverage tools fail to recognize that the
    // function is called when it's called via a Proxy.
    proxyTargetFunction();

    // Since the proxy target must always be a function (so that it can be called),
    // we need to assign properties to the function itself.
    if (targetProps) Object.assign(proxyTargetFunction, targetProps);

    // @ts-expect-error Deleting this property is required for fields called `name`.
    delete proxyTargetFunction.name;

    return new Proxy(proxyTargetFunction, {
      apply(target: any, _thisArg: any, args: Array<any>) {
        let value = args[0];
        const options = args[1];

        // If a function is provided as the argument for the query, call it and make
        // all queries within it think they are running inside a batch transaction,
        // in order to retrieve their serialized values.
        if (typeof value === 'function') {
          // Since `value()` is synchronous, `IN_BATCH_SYNC` should not affect any
          // other queries somewhere else in the app, even if those are run inside
          // an asynchronous function, so we don't need to use `IN_BATCH_ASYNC`,
          // which avoids the need to pass it as an option to the client.
          IN_BATCH_SYNC = true;

          // A proxy object providing a property for every field of the model. It allows
          // for referencing fields inside of an expression.
          const fieldProxy = new Proxy(
            {},
            {
              get(_target, property) {
                const name = property.toString();
                const split = RONIN_EXPRESSION_SEPARATOR;

                return `${split}${QUERY_SYMBOLS.FIELD}${name}${split}`;
              },
            },
          );

          const instructions = value(fieldProxy);

          if (instructions.query) {
            value = { [QUERY_SYMBOLS.QUERY]: instructions.query };
          } else {
            value = instructions;
          }

          if (isExpression(value)) {
            value = wrapExpression(value as string);
          } else if (typeof value === 'object') {
            value = wrapExpressions(value);
          }

          IN_BATCH_SYNC = false;
        }

        // If the function call is happening after an existing function call in the
        // same query, the existing query will be available as `target.query`, and
        // we should extend it. If none is available, we should create a new query.
        const query = target.query || {};
        const targetValue = typeof value === 'undefined' ? {} : value;

        setProperty(query, `${queryType}.${path.join('.')}`, targetValue);

        // If the function call is happening inside a batch, return a new proxy, to
        // allow for continuing to chain `get` accessors and function calls after
        // existing function calls in the same query.
        if (IN_BATCH_ASYNC?.getStore() || IN_BATCH_SYNC) {
          // To ensure that `get` accessor calls are mounted to the same level as
          // the function after which they are called, we need to remove the last
          // path segment.
          const newPath = path.slice(0, -1);
          const details: BatchDetails = { query };

          // Only add options if any are available, to avoid adding a property that
          // holds an `undefined` value.
          if (options) details.options = options;

          return createProxy(newPath, details);
        }

        return queryHandler(query, options);
      },

      get(target: any, nextProp: string, receiver: any): any {
        // If the target object of the proxy has a static property that matches the
        // provided property name, return its value.
        if (Object.hasOwn(target, nextProp)) {
          return Reflect.get(target, nextProp, receiver);
        }

        // If the target object does not have a matching static property, return a
        // new proxy, to allow for chaining `get` accessors.
        return createProxy(path.concat([nextProp]), target);
      },
    });
  }

  return createProxy([]);
};

/**
 * Executes a batch of operations and handles their results. It is used to
 * execute multiple queries at once and return their results at once.
 *
 * @param operations - A function that returns an array of Promises. Each
 * Promise should resolve with a Query object.
 * @param queriesHandler - A function that handles the execution of the queries.
 * This function is expected to receive an array of Query objects and return a
 * Promise that resolves with the results of the queries.
 *
 * @returns A Promise that resolves with a tuple of the results of the queries.
 *
 * ### Usage
 * ```typescript
 * const results = await batch(() => [
 *   get.accounts(),
 *   get.account.with.email('mike@gmail.com')
 * ], async (queries) => {
 *   // Execute the queries and return their results
 * });
 * ```
 */
export const getBatchProxy = <
  // biome-ignore lint/style/useConsistentArrayType: <explanation>
  T extends [Promise<any> | any, ...Array<Promise<any> | any>] | (Promise<any> | any)[],
>(
  operations: () => T,
  // biome-ignore lint/style/useDefaultParameterLast:
  options: QueryHandlerOptions = {},
  queriesHandler: (
    queries: Array<QueryItem>,
    options?: Record<string, unknown>,
  ) => Promise<any> | any,
): Promise<PromiseTuple<T>> | T => {
  let queries: Array<QueryItem> = [];

  if (options.asyncContext) {
    IN_BATCH_ASYNC = options.asyncContext;
    queries = IN_BATCH_ASYNC.run(true, () => operations());
  } else {
    IN_BATCH_SYNC = true;
    queries = operations();
    IN_BATCH_SYNC = false;
  }

  // Within a batch, every query item is a JavaScript `Proxy`, in order to allow for
  // function chaining within every query. Returning the query items directly would
  // therefore return the respective `Proxy` instances, which wouldn't be logged as plain
  // objects, thereby making development more difficult. To avoid this, we are creating a
  // plain object containing the same properties as the `Proxy` instances.
  const cleanQueries = queries.map((details) => ({ ...details }));

  return queriesHandler(cleanQueries) as PromiseTuple<T> | T;
};

type NestedObject = {
  [key: string]: unknown | NestedObject;
};

const isExpression = (value: unknown): boolean => {
  return typeof value === 'string' && value.includes(RONIN_EXPRESSION_SEPARATOR);
};

const wrapExpression = (
  value: string,
): Record<typeof QUERY_SYMBOLS.EXPRESSION, string> => {
  const components = value
    .split(RONIN_EXPRESSION_SEPARATOR)
    .filter((part) => part.length > 0)
    .map((part) => {
      return part.startsWith(QUERY_SYMBOLS.FIELD) ? part : `'${part}'`;
    })
    .join(' || ');

  return { [QUERY_SYMBOLS.EXPRESSION]: components };
};

const wrapExpressions = (obj: NestedObject): NestedObject =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (isExpression(value)) return [key, wrapExpression(value as string)];

      return [
        key,
        value && typeof value === 'object'
          ? wrapExpressions(value as NestedObject)
          : value,
      ];
    }),
  );
