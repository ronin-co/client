import type { RONIN } from '@/src/types/codegen';

type Blob = RONIN.Blob;
type Token = string;
type RichText = string;
type JSONField = JSON;

type SchemaRecord<TSchema extends Record<string, any>> = Required<TSchema> & RONIN.RoninRecord;

type SchemaRecords<TSchema extends SchemaRecord<TSchema>> = RONIN.RoninRecords<TSchema>;

export type { SchemaRecord as Record, SchemaRecords as Records, Blob, Token, RichText, JSONField as JSON };
