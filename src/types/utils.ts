import type { AsyncLocalStorage } from 'node:async_hooks';

import type { Query } from '@/src/types/query';
import type { StorableObjectValue } from '@/src/types/storage';
import type { Hooks } from '@/src/utils/data-hooks';

import type { RONIN } from './codegen';

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

  /**
   * By default, the client tries to intelligently prevent recursions in data
   * hooks by only executing data hooks that come after the lifecycle level of
   * the current data hook.
   *
   * Additionally, no data hooks will be called for queries inside data hooks
   * that are addressing the same schema as the surrounding data hook.
   *
   * To disable this intelligent recursion prevention, you can disable the
   * option right here.
   *
   * **EXAMPLES**
   *
   * - If a query targeting the `customer` schema is executed in the
   * `beforeCreate` data hook of the `account` schema, only data hooks after
   * the "before" lifecycle level (such as `set`, `afterSet`, `create`,
   * `afterCreate` etc.) will be executed for the `customer` query.
   *
   * - If a query targeting the `customer` schema is executed in the
   * `beforeCreate` data hook of the `customer` schema, no data hooks will be
   * executed for the `customer` query.
   *
   * @default true
   */
  autoSkipHooks?: boolean;
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
export type PromiseTuple<T extends [Promise<any>, ...Promise<any>[]] | Promise<any>[]> = {
  [P in keyof T]: Awaited<T[P]>;
};

/**
 * Utility type to mark all Function.prototype methods as "deprecated" which
 * deranks them in the IDE suggestion popup.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export interface ReducedFunction extends Function {
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

/**
 * Utility type to replace all instances of a type within a given object.
 */
export type Replace<TValue, TType, TReplacement> = {
  [K in keyof TValue]: TValue[K] extends TType ? TReplacement : TValue[K];
  // `NonNullable<unknown>` is needed here in order to "flatten" the output type.
} & NonNullable<unknown>;

/**
 * Utility type that takes a given schema type and adjusts it to
 * be used when updating a record.
 */
export type ReplaceForSetter<TValue> = {
  // Replace `RoninRecord` with `string`.
  [K in keyof TValue]: TValue[K] extends RONIN.RoninRecord
    ? string | Partial<TValue[K]>
    : K extends 'ronin'
      ? Partial<TValue[K]>
      : // Replace `Blob` with `StorableObjectValue`.
        TValue[K] extends RONIN.Blob
        ? StorableObjectValue
        : TValue[K];
  // `NonNullable<unknown>` is needed here in order to "flatten" the output type.
} & NonNullable<unknown>;

/**
 * Utility type that represents a particular query and any options that should
 * be used when executing it.
 */
export interface QueryItem {
  query: Query;
  options: Record<string, unknown>;
}
