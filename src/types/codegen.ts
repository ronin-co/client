import type { Schemas } from 'ronin';

import type { RoninRecords, SchemaRecords } from '@/src/schema';
import type { StoredObject } from '@/src/types/storage';
import type { ReducedFunction, Replace, ReplaceForSetter } from '@/src/types/utils';

export namespace RONIN {
  export interface RoninRecord<TId extends string = string> {
    id: TId;
    ronin: RoninMetadata;
  }

  export interface RoninMetadata {
    createdAt: Date;
    createdBy: string | Record<string, any>;
    deletedAt: Date | null;
    deletedBy: string | Record<string, any> | null;
    locked: boolean;
    status: 'draft' | 'published' | 'archived';
    updatedAt: Date;
    updatedBy: string | Record<string, any>;
  }

  export interface Blob extends StoredObject {}

  interface StringFilterFunction<T, R, O> extends ReducedFunction {
    (value: T | T[], options?: O): Promise<R>;
    /**
     * Returns records where the field is not equal to the provided value.
     */
    notBeing: (value: T | T[], options?: O) => Promise<R>;
    /**
     * Returns records where the field starts with the provided value.
     */
    startingWith: (value: T | T[], options?: O) => Promise<R>;
    /**
     * Returns records where the field ends with the provided value.
     */
    endingWith: (value: T | T[], options?: O) => Promise<R>;
    /**
     * Returns records where the field contains the provided value.
     */
    containing: (value: T | T[], options?: O) => Promise<R>;
  }

  interface NumberFilterFunction<T, R, O> extends ReducedFunction {
    (value: T | T[], options?: O): Promise<R>;
    /**
     * Returns records where the field is not equal to the provided value.
     */
    notBeing: (value: T | T[], options?: O) => Promise<R>;
    /**
     * Returns records where the field is greater than the provided value.
     */
    greaterThan: (value: T | T[], options?: O) => Promise<R>;
    /**
     * Returns records where the field is less than the provided value.
     */
    lessThan: (value: T | T[], options?: O) => Promise<R>;
  }

  interface DateFilterFunction<T, R, O> extends ReducedFunction {
    (value: T | T[], options?: O): Promise<R>;
    /**
     * Returns records where the field is not equal to the provided value.
     */
    notBeing: (value: T | T[], options?: O) => Promise<R>;
    /**
     * Returns records where the field is greater than the provided value.
     */
    greaterThan: (value: T | T[], options?: O) => Promise<R>;
    /**
     * Returns records where the field is less than the provided value.
     */
    lessThan: (value: T | T[], options?: O) => Promise<R>;
  }

  interface BooleanFilterFunction<T, R, O> extends ReducedFunction {
    (value: T, options?: O): Promise<R>;
  }

  type RecordFilterFunction<T, R, O> = Omit<ReducedFunction, keyof T> & {
    (value: string | string[], options?: O): Promise<R>;
  };
  type RecordFilterObject<T, R, O> = {
    [K in keyof T]: FilterFunction<T[K], R, O>;
  };
  type RecordFilter<T, R, O> = RecordFilterFunction<T, R, O> & RecordFilterObject<T, R, O>;

  type FilterFunction<T, R, O> = T extends string
    ? StringFilterFunction<T, R, O>
    : T extends number
      ? NumberFilterFunction<T, R, O>
      : T extends boolean
        ? BooleanFilterFunction<T, R, O>
        : T extends Date
          ? DateFilterFunction<T, R, O>
          : T extends RONIN.RoninRecord<string>
            ? RecordFilter<T, R, O>
            : T extends Record<string, any>
              ? RecordFilterObject<T, R, O>
              : never;

  type FilterObject<T> = T extends string
    ?
        | {
            /**
             * `being` instruction can't be used in combination with other
             * search instructions.
             */
            being: string | string[];
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
            notBeing: string | string[];
            being: never;
            startingWith: never;
            endingWith: never;
            containing: never;
          }
        | {
            being: never;
            notBeing: never;
            /**
             * Matches records where the field starts with the provided value.
             */
            startingWith?: string | string[];
            /**
             * Matches records where the field ends with the provided value.
             */
            endingWith?: string | string[];
            /**
             * Matches records where the field contains the provided value.
             */
            containing?: string | string[];
          }
    : T extends number
      ?
          | {
              /**
               * `being` instruction can't be used in combination with other
               * search instructions.
               */
              being: number | number[];
              notBeing: never;
              greaterThan: never;
              lessThan: never;
            }
          | {
              /**
               * `notBeing` instruction can't be used in combination with other
               * search instructions.
               */
              notBeing: number | number[];
              being: never;
              greaterThan: never;
              lessThan: never;
            }
          | {
              being: never;
              notBeing: never;
              /**
               * Matches records where the field is greater than the provided value.
               */
              greaterThan?: number;
              /**
               * Matches records where the field is less than the provided value.
               */
              lessThan?: number;
            }
      : T extends Date
        ?
            | {
                /**
                 * `being` instruction can't be used in combination with other
                 * search instructions.
                 */
                being: Date | Date[];
                notBeing: never;
                greaterThan: never;
                lessThan: never;
              }
            | {
                /**
                 * `notBeing` instruction can't be used in combination with other
                 * search instructions.
                 */
                notBeing: Date | Date[];
                being: never;
                greaterThan: never;
                lessThan: never;
              }
            | {
                being: never;
                notBeing: never;

                /**
                 * Matches records where the field is greater than the provided value.
                 */
                greaterThan?: Date;
                /**
                 * Matches records where the field is less than the provided value.
                 */
                lessThan?: Date;
              }
        : T extends boolean
          ? {
              /**
               * Matches records where the field is equal to the provided value.
               */
              being: boolean;
            }
          : T extends RONIN.RoninRecord<string>
            ?
                | string
                | string[]
                | {
                    [K in keyof T]: T[K] | Partial<FilterObject<T[K]>>;
                  }
            : T extends Record<string, any>
              ? { [K in keyof T]: T[K] | Partial<FilterObject<T[K]>> }
              : never;

  export type WithObject<TSchema> = {
    [K in keyof TSchema]: TSchema[K] | Array<TSchema[K]> | Partial<FilterObject<TSchema[K]>>;
  };

  export type WithFilterFunctions<TSchema, R, O = undefined> = {
    [K in keyof TSchema]: FilterFunction<TSchema[K], R, O>;
  };

  type WithFunction<TSchema, TReturn, TOptions> = Omit<ReducedFunction, keyof TSchema> & {
    (filter: Partial<WithObject<TSchema>>, options?: TOptions): Promise<TReturn>;
  };

  type With<TSchema, R, O> = WithFunction<TSchema, R, O> & WithFilterFunctions<TSchema, R>;

  type AllFields<TSchema> = `ronin.${keyof RoninMetadata}` | Exclude<keyof TSchema, 'ronin'>;

  type OrderedByObject<TSchema> = {
    /**
     * Order the resulting records in descending order using a specific field.
     */
    descending?: Array<AllFields<TSchema>>;
    /**
     * Order the resulting records in ascending order using a specific field.
     */
    ascending?: Array<AllFields<TSchema>>;
  };

  interface OrderedByFunction<TSchema, R, O> extends ReducedFunction {
    (order: OrderedByObject<TSchema>, options?: O): Promise<R>;

    /**
     * Returns records in descending order using a specific field.
     */
    descending: (order: Array<AllFields<TSchema>>, options?: O) => Promise<R>;

    /**
     * Returns records in ascending order using a specific field.
     */
    ascending: (order: Array<AllFields<TSchema>>, options?: O) => Promise<R>;
  }

  type RelatedFieldKeys<T> = {
    [K in keyof T]: T[K] extends RONIN.RoninRecord<string> ? (K extends string ? K : never) : never;
  }[keyof T];

  export type Including<T> = RelatedFieldKeys<T>[] | 'all';

  // TODO: Modify this type to return a static schema type which already
  // has the record fields as `string` instead of `RONIN.RoninRecord` IF
  // the `including` is empty. This improved the debugging experience and
  // makes the types easier to work with in general, because we don't have to
  // programatically modify the schema type.
  export type ReturnBasedOnIncluding<T, Keys extends string[] | 'all'> = Keys extends 'all'
    ? T
    : {
        [K in keyof T]: K extends 'ronin'
          ? T[K]
          : K extends Keys[number]
            ? T[K]
            : T[K] extends RONIN.RoninRecord
              ? string
              : T[K];
      };

  export interface IGetterSingular<TSchema, TVariant extends string = string, TOptions = undefined>
    extends ReducedFunction {
    <TIncluding extends Including<TSchema> = []>(
      filter?: {
        with?: Partial<WithObject<TSchema>>;
        in?: TVariant;
        including?: TIncluding;
      },
      options?: TOptions,
    ): Promise<ReturnBasedOnIncluding<TSchema, TIncluding> | null>;
    with: With<TSchema, Replace<TSchema, RONIN.RoninRecord, string> | null, TOptions>;
  }

  export interface IGetterPlural<
    TSchema,
    TVariant extends string = string,
    TOptions = undefined,
    TModifiedReturn = RoninRecords<Replace<TSchema, RONIN.RoninRecord, string>>,
  > extends ReducedFunction {
    <TIncluding extends Including<TSchema> = []>(
      filter?: {
        with?: Partial<WithObject<TSchema>>;
        orderedBy?: OrderedByObject<TSchema>;
        limitedTo?: number;
        in?: TVariant;
        including?: TIncluding;
        after?: string;
        before?: string;
      },
      options?: TOptions,
    ): Promise<RoninRecords<ReturnBasedOnIncluding<TSchema, TIncluding>>>;
    with: With<TSchema, TModifiedReturn, TOptions>;
    orderedBy: OrderedByFunction<TSchema, TModifiedReturn, TOptions>;
    limitedTo: (limit: number, options?: TOptions) => Promise<TModifiedReturn>;
    in: (variant: TVariant, options?: TOptions) => Promise<TModifiedReturn>;
    including: <TIncluding extends Including<TSchema> = []>(
      values: TIncluding,
      options?: TOptions,
    ) => Promise<RoninRecords<ReturnBasedOnIncluding<TSchema, TIncluding>>>;
    after: (cursor: string, options?: TOptions) => Promise<TModifiedReturn>;
    before: (cursor: string, options?: TOptions) => Promise<TModifiedReturn>;
  }

  export interface ISetter<
    TSchema,
    TVariant extends string = string,
    TOptions = undefined,
    TModifiedReturn = Replace<TSchema, RONIN.RoninRecord, string>,
  > extends ReducedFunction {
    (
      filter: {
        with: Partial<WithObject<TSchema>>;
        to: Partial<ReplaceForSetter<TSchema>>;
        in?: TVariant;
      },
      options?: TOptions,
    ): Promise<TModifiedReturn>;
  }

  export interface ICreator<
    TSchema,
    TVariant extends string = string,
    TOptions = undefined,
    TModifiedReturn = Replace<TSchema, RONIN.RoninRecord, string>,
  > extends ReducedFunction {
    (
      filter?: {
        with: Partial<ReplaceForSetter<TSchema>>;
        in?: TVariant;
      },
      options?: TOptions,
    ): Promise<TModifiedReturn>;
    with: (values: Partial<ReplaceForSetter<TSchema>>, options?: TOptions) => Promise<TModifiedReturn>;
  }

  export interface ICounter<TSchema, TVariant extends string = string, TOptions = undefined>
    extends ReducedFunction {
    (filter?: { with?: Partial<WithObject<TSchema>>; in?: TVariant }): Promise<number>;
    with: With<TSchema, number, TOptions>;
    in: (variant: TVariant, options?: TOptions) => Promise<number>;
  }

  export interface IDropper<
    TSchema,
    TVariant extends string = string,
    TOptions = undefined,
    TModifiedReturn = Replace<TSchema, RONIN.RoninRecord, string>,
  > extends ReducedFunction {
    (
      filter?: { with?: Partial<WithObject<TSchema>>; in?: TVariant },
      options?: TOptions,
    ): Promise<TModifiedReturn>;
    with: With<TSchema, TSchema, TOptions>;
    in: (variant: TVariant, options?: TOptions) => Promise<TModifiedReturn>;
  }

  export interface ExtendedCreator<TOptions = undefined>
    extends Record<string, ICreator<Record<string, unknown>, string, TOptions>> {}

  export interface ExtendedGetter<TOptions = undefined>
    extends Record<string, IGetterPlural<Record<string, unknown>, string, TOptions>> {}

  export interface ExtendedSetter<TOptions = undefined>
    extends Record<string, ISetter<Record<string, unknown>, string, TOptions>> {}

  export interface ExtendedDropper<TOptions = undefined>
    extends Record<string, IDropper<Record<string, unknown>, string, TOptions>> {}

  export interface ExtendedCounter<TOptions = undefined>
    extends Record<string, ICounter<Record<string, unknown>, string, TOptions>> {}

  export type Creator<TOptions = undefined> = {
    [K in keyof Schemas]: ICreator<Schemas[K]>;
  } & RONIN.ExtendedCreator<TOptions>;

  export type Getter<TOptions = undefined> = {
    [K in keyof Schemas]: Schemas[K] extends SchemaRecords<any>
      ? IGetterPlural<Schemas[K][number]>
      : IGetterSingular<Schemas[K]>;
  } & RONIN.ExtendedGetter<TOptions>;

  export type Setter<TOptions = undefined> = {
    [K in keyof Schemas]: ISetter<Schemas[K]>;
  } & RONIN.ExtendedSetter<TOptions>;

  export type Dropper<TOptions = undefined> = {
    [K in keyof Schemas]: IDropper<Schemas[K]>;
  } & RONIN.ExtendedDropper<TOptions>;

  export type Counter<TOptions = undefined> = {
    [K in keyof Schemas]: ICounter<Schemas[K]>;
  } & RONIN.ExtendedCounter<TOptions>;
}
