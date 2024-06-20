import type { RONIN } from '@/src/types/codegen';

export type ShortText = string;
export type LongText = string;
export type Number = number;
export type Blob = RONIN.Blob;
export type Token = string;
export type Toggle = boolean;
export type RichText = string;
export type Time = Date;

export type RoninRecord<T> = Required<T> & RONIN.RoninRecord;

export type RoninRecords<T> = T[] & {
  moreBefore?: string;
  moreAfter?: string;
};

// Type that extract only properties keys as union that are Record from given object
type ExtractRecordKeys<T extends Record<string, any>> = {
  [K in keyof T]: T[K]['_record'] extends true ? (K extends string ? K : never) : never;
}[keyof T];

export interface SchemaRecord<T extends Record<string, any>, TSchema = RoninRecord<T>, TReturn = T> {
  getter: RONIN.IGetterSingular<
    TSchema,
    TReturn,
    never,
    never,
    undefined,
    RONIN.EnrichProvidedIncluding<ExtractRecordKeys<Required<T>>>
  >;
  dropper: RONIN.IDropper<TSchema, TReturn, never, undefined>;
  counter: RONIN.ICounter<TSchema, never, undefined>;
  setter: RONIN.ISetter<TSchema, TReturn, never>;
  creator: RONIN.ICreator<TSchema, TReturn, never>;
  base: T;
  _record: true;
}

export interface SchemaRecords<
  T extends SchemaRecord<T>,
  TSchema = RoninRecord<T['base']>,
  TReturn = RoninRecords<T['base']>,
> {
  getter: RONIN.IGetterPlural<
    TSchema,
    TReturn,
    never,
    never,
    undefined,
    RONIN.EnrichProvidedIncluding<ExtractRecordKeys<Required<T['base']>>>
  >;
  dropper: RONIN.IDropper<TSchema, TReturn, never, undefined>;
  counter: RONIN.ICounter<TSchema, never, undefined>;
  setter: RONIN.ISetter<TSchema, TReturn, never>;
  creator: RONIN.ICreator<TSchema, TReturn, never>;
}
