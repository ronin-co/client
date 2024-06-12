import type { StorableObjectValue, StoredObject } from './storage';
import type { QueryHandlerOptionsFactory, ReducedFunction, ReplaceRecursively } from './utils';

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
    (value: T, options: O): Promise<R>;
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

  interface WithFunction<TSchema, R, O> extends ReducedFunction {
    (filter: Partial<WithObject<TSchema, R, true>>, options?: O): Promise<R>;
  }

  type With<TSchema, R, O> = WithFunction<TSchema, R, O> & WithObject<TSchema, R>;

  type AllFields<TSchema> = `ronin.${keyof RoninMetadata}` | Exclude<keyof TSchema, 'ronin'>;

  type OrderedByObject<TSchema, R, P = undefined> = {
    /**
     * Order the resulting records in descending order using a specific field.
     */
    descending: P extends undefined
      ? (order: Array<AllFields<TSchema>>) => Promise<R>
      : Array<AllFields<TSchema>>;
    /**
     * Order the resulting records in ascending order using a specific field.
     */
    ascending: P extends undefined
      ? (order: Array<AllFields<TSchema>>) => Promise<R>
      : Array<AllFields<TSchema>>;
  };

  interface OrderedByFunction<TSchema, R> extends ReducedFunction {
    (order: Partial<OrderedByObject<TSchema, R, true>>): Promise<R>;
  }

  type OrderedBy<TSchema, R> = OrderedByObject<TSchema, R> & OrderedByFunction<TSchema, R>;

  export type SchemaSlugKey =
    | keyof RONIN.Creator
    | keyof RONIN.Getter
    | keyof RONIN.Setter
    | keyof RONIN.Dropper
    | keyof RONIN.Counter;

  export interface Includes extends Record<SchemaSlugKey, string> {}

  type Including<TSlug extends SchemaSlugKey> =
    | 'all'
    | Array<RONIN.Includes[TSlug] | `ronin.${keyof Pick<RoninMetadata, 'createdBy' | 'updatedBy'>}`>;

  export interface IGetterSingular<
    TSchema,
    TReturn,
    TSlug extends SchemaSlugKey,
    TVariant extends string = string,
    TOptions = QueryHandlerOptionsFactory,
    TWith = With<TSchema, TReturn | null, TOptions>,
  > extends ReducedFunction {
    (
      filter?: {
        with?: Partial<WithObject<TSchema, TReturn, true>>;
        in?: TVariant;
        including?: Including<TSlug>;
      },
      options?: TOptions,
    ): Promise<TReturn | null>;
    with: TWith;
  }

  export interface IGetterPlural<
    TSchema,
    TReturn,
    TSlug extends SchemaSlugKey,
    TVariant extends string = string,
    TOptions = QueryHandlerOptionsFactory,
    TWith = With<TSchema, TReturn, TOptions>,
  > extends ReducedFunction {
    (
      filter?: {
        with?: Partial<WithObject<TSchema, TReturn, true>>;
        orderedBy?: Partial<OrderedByObject<TSchema, TReturn, true>>;
        limitedTo?: number;
        in?: TVariant;
        including?: Including<TSlug>;
        after?: string;
        before?: string;
      },
      options?: TOptions,
    ): Promise<TReturn>;
    with: TWith;
    orderedBy: OrderedBy<TSchema, TReturn>;
    limitedTo: (limit: number) => Promise<TReturn>;
    in: (variant: TVariant) => Promise<TReturn>;
    including: (values: Including<TSlug>) => Promise<TReturn>;
    after: (cursor: string) => Promise<TReturn>;
    before: (cursor: string) => Promise<TReturn>;
  }

  export interface ISetter<
    TSchema,
    TReturn,
    TVariant extends string = string,
    TOptions = QueryHandlerOptionsFactory,
  > extends ReducedFunction {
    (
      filter: {
        with: Partial<WithObject<TSchema, TReturn, true>>;
        to: Partial<ReplaceRecursively<TSchema, RONIN.Blob, StorableObjectValue>>;
        in?: TVariant;
      },
      options?: TOptions,
    ): Promise<TReturn>;
  }

  export interface ICreator<
    TSchema,
    TReturn,
    TVariant extends string = string,
    TOptions = QueryHandlerOptionsFactory,
  > extends ReducedFunction {
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
    TOptions = QueryHandlerOptionsFactory,
    TWith = With<TSchema, number, TOptions>,
  > extends ReducedFunction {
    (filter?: { with?: Partial<WithObject<TSchema, number, true>>; in?: TVariant }): Promise<number>;
    with: TWith;
    in: (variant: TVariant) => Promise<number>;
  }

  export interface IDropper<
    TSchema,
    TReturn,
    TVariant extends string = string,
    TOptions = QueryHandlerOptionsFactory,
    TWith = With<TSchema, TReturn, TOptions>,
  > extends ReducedFunction {
    (
      filter?: { with?: Partial<WithObject<TSchema, TReturn, true>>; in?: TVariant },
      options?: TOptions,
    ): Promise<TReturn>;
    with: TWith;
    in: (variant: TVariant, options?: TOptions) => Promise<TReturn>;
  }

  export interface Creator<TOptions = QueryHandlerOptionsFactory>
    extends Record<string, ICreator<Record<string, unknown>, unknown, string, TOptions>> {}

  export interface Getter<TOptions = QueryHandlerOptionsFactory>
    extends Record<string, IGetterPlural<Record<string, unknown>, unknown, string, string, TOptions>> {}

  export interface Setter<TOptions = QueryHandlerOptionsFactory>
    extends Record<string, ISetter<Record<string, unknown>, unknown, string, TOptions>> {}

  export interface Dropper<TOptions = QueryHandlerOptionsFactory>
    extends Record<string, IDropper<Record<string, unknown>, unknown, string, TOptions>> {}

  export interface Counter<TOptions = QueryHandlerOptionsFactory>
    extends Record<string, ICounter<Record<string, unknown>, string, TOptions>> {}
}
