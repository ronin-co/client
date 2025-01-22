import type { Schemas } from 'ronin';

import type * as Schema from '@/src/types/schema';
import type { ReducedFunction, Replace, ReplaceForSetter } from '@/src/types/utils';
import type { StoredObject } from '@ronin/compiler';

export namespace RONIN {
  export interface RoninRecord {
    id: string;
    ronin: RoninMetadata;
  }

  export type RoninRecords<TSchema> = TSchema[] & {
    moreBefore?: string;
    moreAfter?: string;
  };

  export interface RoninMetadata {
    createdAt: Date;
    createdBy: string | Record<string, any>;

    updatedAt: Date;
    updatedBy: string | Record<string, any>;

    locked: boolean;
  }

  export interface Blob extends StoredObject {}

  interface StringFilterFunction<T, R, O> extends ReducedFunction {
    (value: null | T | T[], options?: O): Promise<R>;
    /**
     * Returns records where the field is not equal to the provided value.
     */
    notBeing: (value: null | T | T[], options?: O) => Promise<R>;
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
    (value: null | T | T[], options?: O): Promise<R>;
    /**
     * Returns records where the field is not equal to the provided value.
     */
    notBeing: (value: null | T | T[], options?: O) => Promise<R>;
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
    (value: null | T | T[], options?: O): Promise<R>;
    /**
     * Returns records where the field is not equal to the provided value.
     */
    notBeing: (value: null | T | T[], options?: O) => Promise<R>;
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

  type RecordFilterFunction<T, R, O> = Omit<ReducedFunction, keyof T> &
    ((value: null | string | string[], options?: O) => Promise<R>);
  type RecordFilterObject<T, R, O> = {
    [K in keyof T]: FilterFunction<T[K], R, O>;
  };
  type RecordFilter<T, R, O> = RecordFilterFunction<T, R, O> &
    RecordFilterObject<T, R, O>;

  type FilterFunction<T, R, O> = T extends string
    ? StringFilterFunction<T, R, O>
    : T extends number
      ? NumberFilterFunction<T, R, O>
      : T extends boolean
        ? BooleanFilterFunction<T, R, O>
        : T extends Date
          ? DateFilterFunction<T, R, O>
          : T extends RONIN.RoninRecord
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
            being: null | string | string[];
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
            notBeing: null | string | string[];
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
              being: null | number | number[];
              notBeing: never;
              greaterThan: never;
              lessThan: never;
            }
          | {
              /**
               * `notBeing` instruction can't be used in combination with other
               * search instructions.
               */
              notBeing: null | number | number[];
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
                being: null | Date | Date[];
                notBeing: never;
                greaterThan: never;
                lessThan: never;
              }
            | {
                /**
                 * `notBeing` instruction can't be used in combination with other
                 * search instructions.
                 */
                notBeing: null | Date | Date[];
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
          : T extends RONIN.RoninRecord
            ?
                | null
                | string
                | string[]
                | {
                    [K in keyof T]: null | T[K] | Partial<FilterObject<T[K]>>;
                  }
            : T extends Record<string, any>
              ? { [K in keyof T]: null | T[K] | Partial<FilterObject<T[K]>> }
              : never;

  export type WithObject<TSchema> = {
    [K in keyof TSchema]:
      | null
      | TSchema[K]
      | Array<TSchema[K]>
      | Partial<FilterObject<TSchema[K]>>;
  };

  export type WithFilterFunctions<TSchema, R, O = undefined> = {
    [K in keyof TSchema]: FilterFunction<TSchema[K], R, O>;
  };

  type WithFunction<TSchema, TReturn, TOptions> = Omit<ReducedFunction, keyof TSchema> &
    ((
      filter: Partial<WithObject<TSchema> | Array<WithObject<TSchema>>>,
      options?: TOptions,
    ) => Promise<TReturn>);

  type With<TSchema, R, O> = WithFunction<TSchema, R, O> &
    WithFilterFunctions<TSchema, R>;

  type AllFields<TSchema> =
    | `ronin.${keyof RoninMetadata}`
    | Exclude<keyof TSchema, 'ronin'>;

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
    [K in keyof T]: T[K] extends RONIN.RoninRecord
      ? K extends string
        ? K
        : never
      : never;
  }[keyof T];

  export type Including<T> = RelatedFieldKeys<T>[] | 'all';

  export type ReturnBasedOnIncluding<
    T,
    Keys extends string[] | 'all',
  > = Keys extends 'all'
    ? T
    : {
        [K in keyof T]: K extends 'ronin'
          ? T[K]
          : K extends Keys[number]
            ? T[K]
            : T[K] extends RONIN.RoninRecord
              ? string
              : T[K];
        // `NonNullable<unknown>` is needed here in order to "flatten" the output type.
      } & NonNullable<unknown>;

  export interface IGetterSingular<TSchema, TOptions = undefined>
    extends ReducedFunction {
    <TIncluding extends Including<TSchema> = []>(
      filter?: {
        with?: Partial<WithObject<TSchema> | Array<WithObject<TSchema>>>;
        including?: TIncluding;
        selecting?: Array<string>;
        for?: Array<string>;
      },
      options?: TOptions,
    ): Promise<ReturnBasedOnIncluding<TSchema, TIncluding> | null>;
    with: With<TSchema, Replace<TSchema, RONIN.RoninRecord, string> | null, TOptions>;
    including: <TIncluding extends Including<TSchema> = []>(
      values: TIncluding,
      options?: TOptions,
    ) => Promise<ReturnBasedOnIncluding<TSchema, TIncluding> | null>;
    selecting: Array<string>;
    for: Array<string>;
  }

  export interface IGetterPlural<
    TSchema,
    TOptions = undefined,
    TModifiedReturn = RoninRecords<Replace<TSchema, RONIN.RoninRecord, string>>,
  > extends ReducedFunction {
    <TIncluding extends Including<TSchema> = []>(
      filter?: {
        with?: Partial<WithObject<TSchema> | Array<WithObject<TSchema>>>;
        orderedBy?: OrderedByObject<TSchema>;
        limitedTo?: number;
        including?: TIncluding;
        after?: string;
        before?: string;
        selecting?: Array<string>;
        for?: Array<string>;
      },
      options?: TOptions,
    ): Promise<RoninRecords<ReturnBasedOnIncluding<TSchema, TIncluding>>>;
    with: With<TSchema, TModifiedReturn, TOptions>;
    orderedBy: OrderedByFunction<TSchema, TModifiedReturn, TOptions>;
    limitedTo: (limit: number, options?: TOptions) => Promise<TModifiedReturn>;
    including: <TIncluding extends Including<TSchema> = []>(
      values: TIncluding,
      options?: TOptions,
    ) => Promise<RoninRecords<ReturnBasedOnIncluding<TSchema, TIncluding>>>;
    after: (cursor: string, options?: TOptions) => Promise<TModifiedReturn>;
    before: (cursor: string, options?: TOptions) => Promise<TModifiedReturn>;
    selecting: Array<string>;
    for: Array<string>;
  }

  export interface ISetter<TSchema, TOptions = undefined> extends ReducedFunction {
    <TIncluding extends Including<TSchema> = []>(
      filter: {
        with: Partial<WithObject<TSchema> | Array<WithObject<TSchema>>>;
        to: Partial<ReplaceForSetter<TSchema>>;
        including?: TIncluding;
      },
      options?: TOptions,
    ): Promise<ReturnBasedOnIncluding<TSchema, TIncluding>>;
  }

  export interface IAdder<TSchema, TOptions = undefined> extends ReducedFunction {
    <TIncluding extends Including<TSchema> = []>(
      filter?: {
        to: Partial<ReplaceForSetter<TSchema> | Array<ReplaceForSetter<TSchema>>>;
        including?: TIncluding;
      },
      options?: TOptions,
    ): Promise<ReturnBasedOnIncluding<TSchema, TIncluding>>;
    to: (
      values: Partial<ReplaceForSetter<TSchema>>,
      options?: TOptions,
    ) => Promise<Replace<TSchema, RONIN.RoninRecord, string>>;
  }

  export interface ICounter<TSchema, TOptions = undefined> extends ReducedFunction {
    (filter?: {
      with?: Partial<WithObject<TSchema> | Array<WithObject<TSchema>>>;
    }): Promise<number>;
    with: With<TSchema, number, TOptions>;
  }

  export interface IRemover<
    TSchema,
    TOptions = undefined,
    TModifiedReturn = Replace<TSchema, RONIN.RoninRecord, string>,
  > extends ReducedFunction {
    (
      filter?: {
        with?: Partial<WithObject<TSchema> | Array<WithObject<TSchema>>>;
      },
      options?: TOptions,
    ): Promise<TModifiedReturn>;
    with: With<TSchema, TSchema, TOptions>;
  }

  export interface ICreator<
    TSchema,
    TOptions = undefined,
    TModifiedReturn = Replace<TSchema, RONIN.RoninRecord, string>,
  > extends ReducedFunction {
    (
      filter?: {
        with?: Partial<WithObject<TSchema> | Array<WithObject<TSchema>>>;
      },
      options?: TOptions,
    ): Promise<TModifiedReturn>;
    with: With<TSchema, TSchema, TOptions>;
  }

  export interface IAlterer<
    TSchema,
    TOptions = undefined,
    TModifiedReturn = Replace<TSchema, RONIN.RoninRecord, string>,
  > extends ReducedFunction {
    (
      filter?: {
        with?: Partial<WithObject<TSchema> | Array<WithObject<TSchema>>>;
      },
      options?: TOptions,
    ): Promise<TModifiedReturn>;
    with: With<TSchema, TSchema, TOptions>;
  }

  export interface IDropper<
    TSchema,
    TOptions = undefined,
    TModifiedReturn = Replace<TSchema, RONIN.RoninRecord, string>,
  > extends ReducedFunction {
    (
      filter?: {
        with?: Partial<WithObject<TSchema> | Array<WithObject<TSchema>>>;
      },
      options?: TOptions,
    ): Promise<TModifiedReturn>;
    with: With<TSchema, TSchema, TOptions>;
  }

  export interface ExtendedAdder<TOptions = undefined>
    extends Record<string, IAdder<Record<string, unknown>, TOptions>> {}

  export interface ExtendedGetter<TOptions = undefined>
    extends Record<string, IGetterPlural<Record<string, unknown>, TOptions>> {}

  export interface ExtendedSetter<TOptions = undefined>
    extends Record<string, ISetter<Record<string, unknown>, TOptions>> {}

  export interface ExtendedRemover<TOptions = undefined>
    extends Record<string, IRemover<Record<string, unknown>, TOptions>> {}

  export interface ExtendedCounter<TOptions = undefined>
    extends Record<string, ICounter<Record<string, unknown>, TOptions>> {}

  export interface ExtendedCreator<TOptions = undefined>
    extends Record<string, ICreator<Record<string, unknown>, TOptions>> {}

  export interface ExtendedAlterer<TOptions = undefined>
    extends Record<string, IAlterer<Record<string, unknown>, TOptions>> {}

  export interface ExtendedDropper<TOptions = undefined>
    extends Record<string, IDropper<Record<string, unknown>, TOptions>> {}

  export type Adder<TOptions = undefined> = {
    [K in keyof Schemas]: IAdder<Schemas[K]>;
  } & RONIN.ExtendedAdder<TOptions>;

  export type Getter<TOptions = undefined> = {
    [K in keyof Schemas]: Schemas[K] extends Schema.Records<any>
      ? IGetterPlural<Schemas[K][number]>
      : IGetterSingular<Schemas[K]>;
  } & RONIN.ExtendedGetter<TOptions>;

  export type Setter<TOptions = undefined> = {
    [K in keyof Schemas]: ISetter<Schemas[K]>;
  } & RONIN.ExtendedSetter<TOptions>;

  export type Remover<TOptions = undefined> = {
    [K in keyof Schemas]: IRemover<Schemas[K]>;
  } & RONIN.ExtendedRemover<TOptions>;

  export type Counter<TOptions = undefined> = {
    [K in keyof Schemas]: ICounter<Schemas[K]>;
  } & RONIN.ExtendedCounter<TOptions>;

  export type Creator<TOptions = undefined> = {
    [K in keyof Schemas]: ICreator<Schemas[K]>;
  } & RONIN.ExtendedCreator<TOptions>;

  export type Alterer<TOptions = undefined> = {
    [K in keyof Schemas]: IAlterer<Schemas[K]>;
  } & RONIN.ExtendedAlterer<TOptions>;

  export type Dropper<TOptions = undefined> = {
    [K in keyof Schemas]: IDropper<Schemas[K]>;
  } & RONIN.ExtendedDropper<TOptions>;
}
