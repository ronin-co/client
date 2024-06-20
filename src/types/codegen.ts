import type { Schemas } from 'ronin';

import type { StorableObjectValue, StoredObject } from '@/src/types/storage';
import type { ReducedFunction, ReplaceRecursively } from '@/src/types/utils';

export namespace RONIN {
  export interface RoninRecord<TId extends string = string> {
    id: TId;
    ronin: RoninMetadata;
  }

  export interface RoninMetadata {
    createdAt: Date;
    createdBy: Record<string, any>;
    deletedAt: Date | null;
    deletedBy: Record<string, any> | null;
    locked: boolean;
    status: 'draft' | 'published' | 'archived';
    updatedAt: Date;
    updatedBy: Record<string, any>;
  }

  export interface Blob extends StoredObject {}

  interface StringFilterFunction<T, R, O> extends ReducedFunction {
    (value: T, options?: O): Promise<R>;
    notBeing: (value: T, options?: O) => Promise<R>;
    startingWith: (value: T, options?: O) => Promise<R>;
    endingWith: (value: T, options?: O) => Promise<R>;
    containing: (value: T, options?: O) => Promise<R>;
  }

  interface NumberFilterFunction<T, R, O> extends ReducedFunction {
    (value: T, options?: O): Promise<R>;
    notBeing: (value: T, options?: O) => Promise<R>;
    greaterThan: (value: T, options?: O) => Promise<R>;
    lessThan: (value: T, options?: O) => Promise<R>;
  }

  interface DateFilterFunction<T, R, O> extends ReducedFunction {
    (value: T, options?: O): Promise<R>;
    notBeing: (value: T, options?: O) => Promise<R>;
    greaterThan: (value: T, options?: O) => Promise<R>;
    lessThan: (value: T, options?: O) => Promise<R>;
  }

  interface BooleanFilterFunction<T, R, O> extends ReducedFunction {
    (value: T, options?: O): Promise<R>;
  }

  type FilterFunction<T, R, O> = T extends string
    ? StringFilterFunction<T, R, O>
    : T extends number
      ? NumberFilterFunction<T, R, O>
      : T extends boolean
        ? BooleanFilterFunction<T, R, O>
        : T extends Date
          ? DateFilterFunction<T, R, O>
          : T extends Record<string, any>
            ? { [K in keyof T]: FilterFunction<T[K], R, O> }
            : never;

  type FilterObject<T> = T extends string
    ?
        | {
            /**
             * `being` instruction can't be used in combination with other
             * search instructions.
             */
            being: string;
            notBeing: never;
            startingWith: never;
            endingWith: never;
            containing: never;
          }
        | {
            /**
             * `notBeing` instruction can't be used in combination with other
             * search instructions.
             */
            notBeing: string;
            being: never;
            startingWith: never;
            endingWith: never;
            containing: never;
          }
        | {
            being: never;
            notBeing: never;
            startingWith?: string;
            endingWith?: string;
            containing?: string;
          }
    : T extends number
      ?
          | {
              /**
               * `being` instruction can't be used in combination with other
               * search instructions.
               */
              being: number;
              notBeing: never;
              greaterThan: never;
              lessThan: never;
            }
          | {
              /**
               * `notBeing` instruction can't be used in combination with other
               * search instructions.
               */
              notBeing: number;
              being: never;
              greaterThan: never;
              lessThan: never;
            }
          | {
              being: never;
              notBeing: never;
              greaterThan?: number;
              lessThan?: number;
            }
      : T extends Date
        ?
            | {
                /**
                 * `being` instruction can't be used in combination with other
                 * search instructions.
                 */
                being: Date;
                notBeing: never;
                greaterThan: never;
                lessThan: never;
              }
            | {
                /**
                 * `notBeing` instruction can't be used in combination with other
                 * search instructions.
                 */
                notBeing: Date;
                being: never;
                greaterThan: never;
                lessThan: never;
              }
            | {
                being: never;
                notBeing: never;
                greaterThan?: Date;
                lessThan?: Date;
              }
        : T extends boolean
          ? { being: boolean }
          : T extends Record<string, any>
            ? { [K in keyof T]: T[K] | Partial<FilterObject<T[K]>> }
            : never;

  export type WithObject<TSchema, R, P = undefined, O = undefined> = {
    [K in keyof TSchema]: P extends undefined
      ? FilterFunction<TSchema[K], R, O>
      : TSchema[K] | Partial<FilterObject<TSchema[K]>>;
  };

  type WithFunction<TSchema, TReturn, TOptions> = Omit<ReducedFunction, keyof TSchema> & {
    (filter: Partial<RONIN.WithObject<TSchema, TReturn, true>>, options?: TOptions): Promise<TReturn>;
  };

  type With<TSchema, R, O> = WithFunction<TSchema, R, O> & WithObject<TSchema, R>;

  type AllFields<TSchema> = `ronin.${keyof RoninMetadata}` | Exclude<keyof TSchema, 'ronin'>;

  type OrderedByObject<TSchema, R, P = undefined, O = undefined> = {
    /**
     * Order the resulting records in descending order using a specific field.
     */
    descending: P extends undefined
      ? (order: Array<AllFields<TSchema>>, options?: O) => Promise<R>
      : Array<AllFields<TSchema>>;
    /**
     * Order the resulting records in ascending order using a specific field.
     */
    ascending: P extends undefined
      ? (order: Array<AllFields<TSchema>>, options?: O) => Promise<R>
      : Array<AllFields<TSchema>>;
  };

  interface OrderedByFunction<TSchema, R, O> extends ReducedFunction {
    (order: Partial<OrderedByObject<TSchema, R, true, O>>, options?: O): Promise<R>;
  }

  type OrderedBy<TSchema, R, O> = OrderedByObject<TSchema, R, undefined, O> &
    OrderedByFunction<TSchema, R, O>;

  export type SchemaSlugKey =
    | keyof RONIN.Creator
    | keyof RONIN.Getter
    | keyof RONIN.Setter
    | keyof RONIN.Dropper
    | keyof RONIN.Counter;

  export interface Includes extends Record<SchemaSlugKey, string> {}

  export type EnrichProvidedIncluding<T extends string> =
    | 'all'
    | Array<T | 'ronin.createdBy' | 'ronin.updatedBy'>;

  type Including<TSlug extends SchemaSlugKey> = EnrichProvidedIncluding<RONIN.Includes[TSlug]>;

  export interface IGetterSingular<
    TSchema,
    TReturn,
    TSlug extends SchemaSlugKey,
    TVariant extends string = string,
    TOptions = undefined,
    TIncluding = undefined,
  > extends ReducedFunction {
    (
      filter?: {
        with?: Partial<WithObject<TSchema, TReturn, true>>;
        in?: TVariant;
        including?: TIncluding extends undefined ? Including<TSlug> : TIncluding;
      },
      options?: TOptions,
    ): Promise<TReturn | null>;
    with: With<TSchema, TReturn | null, TOptions>;
  }

  export interface IGetterPlural<
    TSchema,
    TReturn,
    TSlug extends SchemaSlugKey,
    TVariant extends string = string,
    TOptions = undefined,
    TIncluding = undefined,
  > extends ReducedFunction {
    (
      filter?: {
        with?: Partial<WithObject<TSchema, TReturn, true>>;
        orderedBy?: Partial<OrderedByObject<TSchema, TReturn, true>>;
        limitedTo?: number;
        in?: TVariant;
        including?: TIncluding extends undefined ? Including<TSlug> : TIncluding;
        after?: string;
        before?: string;
      },
      options?: TOptions,
    ): Promise<TReturn>;
    with: With<TSchema, TReturn | null, TOptions>;
    orderedBy: OrderedBy<TSchema, TReturn, TOptions>;
    limitedTo: (limit: number, options?: TOptions) => Promise<TReturn>;
    in: (variant: TVariant, options?: TOptions) => Promise<TReturn>;
    including: (
      values: TIncluding extends undefined ? Including<TSlug> : TIncluding,
      options?: TOptions,
    ) => Promise<TReturn>;
    after: (cursor: string, options?: TOptions) => Promise<TReturn>;
    before: (cursor: string, options?: TOptions) => Promise<TReturn>;
  }

  export interface ISetter<TSchema, TReturn, TVariant extends string = string, TOptions = undefined>
    extends ReducedFunction {
    (
      filter: {
        with: Partial<WithObject<TSchema, TReturn, true>>;
        to: Partial<ReplaceRecursively<TSchema, RONIN.Blob, StorableObjectValue>>;
        in?: TVariant;
      },
      options?: TOptions,
    ): Promise<TReturn>;
  }

  export interface ICreator<TSchema, TReturn, TVariant extends string = string, TOptions = undefined>
    extends ReducedFunction {
    (
      filter?: {
        with: Partial<ReplaceRecursively<TSchema, RONIN.Blob, StorableObjectValue>>;
        in?: TVariant;
      },
      options?: TOptions,
    ): Promise<TReturn>;
    with: (
      values: Partial<ReplaceRecursively<TSchema, RONIN.Blob, StorableObjectValue>>,
      options?: TOptions,
    ) => Promise<TReturn>;
  }

  export interface ICounter<
    TSchema,
    TVariant extends string = string,
    TOptions = undefined,
    TWith = With<TSchema, number, TOptions>,
  > extends ReducedFunction {
    (filter?: { with?: Partial<WithObject<TSchema, number, true>>; in?: TVariant }): Promise<number>;
    with: TWith;
    in: (variant: TVariant, options?: TOptions) => Promise<number>;
  }

  export interface IDropper<
    TSchema,
    TReturn,
    TVariant extends string = string,
    TOptions = undefined,
    TWith = With<TSchema, TReturn, TOptions>,
  > extends ReducedFunction {
    (
      filter?: { with?: Partial<WithObject<TSchema, TReturn, true>>; in?: TVariant },
      options?: TOptions,
    ): Promise<TReturn>;
    with: TWith;
    in: (variant: TVariant, options?: TOptions) => Promise<TReturn>;
  }

  export type Creator<TOptions = undefined> = Schemas extends undefined
    ? Record<string, ICreator<Record<string, unknown>, unknown, string, TOptions>>
    : {
        [K in keyof Schemas]: Schemas[K]['creator'];
      };

  export type Getter<TOptions = undefined> = Schemas extends undefined
    ? Record<string, IGetterPlural<Record<string, unknown>, unknown, string, string, TOptions>>
    : {
        [K in keyof Schemas]: Schemas[K]['getter'];
      };

  export type Setter<TOptions = undefined> = Schemas extends undefined
    ? Record<string, ISetter<Record<string, unknown>, unknown, string, TOptions>>
    : {
        [K in keyof Schemas]: Schemas[K]['setter'];
      };

  export type Dropper<TOptions = undefined> = Schemas extends undefined
    ? Record<string, IDropper<Record<string, unknown>, unknown, string, TOptions>>
    : {
        [K in keyof Schemas]: Schemas[K]['dropper'];
      };

  export type Counter<TOptions = undefined> = Schemas extends undefined
    ? Record<string, ICounter<Record<string, unknown>, string, TOptions>>
    : {
        [K in keyof Schemas]: Schemas[K]['counter'];
      };
}
