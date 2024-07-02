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

export interface SchemaRecord<T extends Record<string, any>, TSchema = RoninRecord<T>> {
  getter: RONIN.IGetterSingular<TSchema>;
  dropper: RONIN.IDropper<TSchema>;
  counter: RONIN.ICounter<TSchema, never, undefined>;
  setter: RONIN.ISetter<TSchema>;
  creator: RONIN.ICreator<TSchema>;
  base: T;
  _record: true;
}

export interface SchemaRecords<T extends SchemaRecord<T>, TSchema = RoninRecord<T['base']>> {
  getter: RONIN.IGetterPlural<TSchema>;
  dropper: RONIN.IDropper<TSchema>;
  counter: RONIN.ICounter<TSchema>;
  setter: RONIN.ISetter<TSchema>;
  creator: RONIN.ICreator<TSchema>;
}
