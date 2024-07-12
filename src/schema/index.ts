import type { RONIN } from '@/src/types/codegen';

type LongText = string;
type Blob = RONIN.Blob;
type Token = string;
type Toggle = boolean;
type RichText = string;

type SchemaRecord<TSchema extends Record<string, any>> = Required<TSchema> & RONIN.RoninRecord;

type SchemaRecords<TSchema extends SchemaRecord<TSchema>> = RONIN.RoninRecords<TSchema>;

export type { SchemaRecord as Record, SchemaRecords as Records, LongText, Blob, Token, Toggle, RichText };
