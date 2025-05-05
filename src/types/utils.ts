import type { AsyncLocalStorage } from 'node:async_hooks';

import type { Triggers } from '@/src/utils/triggers';

import type { Model, Result, ResultRecord } from '@ronin/compiler';

export interface QueryHandlerOptions {
  /**
   * Object containing triggers for defined schemas.
   */
  triggers?: Triggers;

  /**
   * Token used to authenticate against RONIN. By default,
   * `process.env.RONIN_TOKEN` will be used.
   */
  token?: string;

  /**
   * Allows for specifying custom options that should be passed to the `fetch`
   * function used to make network requests.
   *
   * Alternatively, an entire `fetch` replacement function may be passed.
   */
  fetch?: Parameters<typeof fetch>[1] | typeof fetch;

  /**
   * Allows for extending the lifetime of the edge worker invocation until the
   * provided promise has been resolved. If the `triggers` option is provided on
   * an edge runtime, this option is required.
   */
  waitUntil?: (promise: Promise<unknown>) => void;

  /**
   * Allows for preventing recursions when running queries from triggers
   * provided with the `triggers` option. If the `triggers` option is provided, this
   * option is required.
   */
  asyncContext?: AsyncLocalStorage<any>;

  /**
   * If the query should be run for a specific database within your space, you may
   * provide the desired database name here.
   */
  database?: string;
}

/**
 * Utility type to make all properties of an object optional.
 */
export type RecursivePartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer U>
    ? Array<RecursivePartial<U>>
    : T[K] extends object
      ? RecursivePartial<T[K]>
      : T[K];
};

/**
 * Utility type to convert a tuple of promises into a tuple of their resolved types.
 */
export type PromiseTuple<
  T extends [Promise<any>, ...Array<Promise<any>>] | Array<Promise<any>>,
> = {
  [P in keyof T]: Awaited<T[P]>;
};

export type QueryResponse<T> =
  | { results: Array<Result<T>> }
  | Record<string, { results: Array<Result<T>> }>
  | {
      error: any;
    };

export type RegularFormattedResult<T> =
  | number
  | (T & ResultRecord)
  | (Array<T & ResultRecord> & { moreBefore?: string; moreAfter?: string })
  | null;

export type ExpandedFormattedResult<T> = Record<Model['slug'], RegularFormattedResult<T>>;

type FormattedResult<T> = RegularFormattedResult<T> | ExpandedFormattedResult<T>;

export type FormattedResults<T> = Array<FormattedResult<T>>;
