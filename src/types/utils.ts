import type { AsyncLocalStorage } from 'node:async_hooks';

import type { Hooks } from '@/src/utils/data-hooks';

import type { Model } from '@ronin/compiler';

export interface QueryHandlerOptions {
  /**
   * Object containing data hooks for defined schemas.
   */
  hooks?: Hooks;

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
   * provided promise has been resolved. If the `hooks` option is provided on
   * an edge runtime, this option is required.
   */
  waitUntil?: (promise: Promise<unknown>) => void;

  /**
   * Allows for preventing recursions when running queries from data hooks
   * provided with the `hooks` option. If the `hooks` option is provided, this
   * option is required.
   */
  asyncContext?: AsyncLocalStorage<any>;

  /** A list of models defined during development. */
  models?: Record<string, Record<string, unknown>> | Array<Model>;
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

/**
 * Utility type to mark all Function.prototype methods as "deprecated" which
 * deranks them in the IDE suggestion popup.
 */
export interface ReducedFunction {
  /**
   * @deprecated
   */
  name: never;
  /**
   * @deprecated
   */
  length: never;
  /**
   * @deprecated
   */
  apply: never;
  /**
   * @deprecated
   */
  call: never;
  /**
   * @deprecated
   */
  bind: never;
  /**
   * @deprecated
   */
  toString: never;
  /**
   * @deprecated
   */
  caller: never;
  /**
   * @deprecated
   */
  prototype: never;
  /**
   * @deprecated
   */
  arguments: never;
  /**
   * @deprecated
   */
  unify: never;
}

type QueryPaginationOptions = {
  moreBefore?: (string | null) | undefined;
  moreAfter?: (string | null) | undefined;
};

/**
 * Utility type that merges extra properties `R` into each element of array-type
 * properties in a type `T`; non-array properties are left unchanged.
 */
type BindToArray<T, R> = {
  [K in keyof T]: T[K] extends Array<infer U> ? Array<U> & R : T[K];
};

/**
 * Utility type used to type the results of a query.
 *
 * It unwraps the promised type if `T` is an array of Promises, adds `moreBefore?`
 * and `moreAfter?` fields to an array's items if `T` is an array. Otherwise it
 * wraps non-array and non-Promise types in an array.
 */
export type Results<T> = T extends never | Array<never>
  ? T
  : T extends []
    ? []
    : T extends [infer First, ...infer Rest]
      ? Rest extends unknown
        ? First extends Promise<infer U>
          ? [U]
          : BindToArray<[First, ...Rest], QueryPaginationOptions>
        : Array<First>
      : T extends Promise<infer U>
        ? [U]
        : [T];
