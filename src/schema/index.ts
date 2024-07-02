import type { RONIN } from '@/src/types/codegen';

export type ShortText = string;
export type LongText = string;
export type Number = number;
export type Blob = RONIN.Blob;
export type Token = string;
export type Toggle = boolean;
export type RichText = string;
export type Time = Date;

export type RoninRecord<TSchema> = Required<TSchema> & RONIN.RoninRecord;

export type RoninRecords<TSchema> = TSchema[] & {
  moreBefore?: string;
  moreAfter?: string;
};

export type SchemaRecord<TSchema extends Record<string, any>> = Required<TSchema> & RONIN.RoninRecord;

export type SchemaRecords<TSchema extends SchemaRecord<TSchema>> = RoninRecords<TSchema>;
