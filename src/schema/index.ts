import type { RONIN } from '@/src/types/codegen';

type ValidJSON =
  | string
  | number
  | boolean
  | null
  | Array<ValidJSON>
  | { [key: string]: ValidJSON };

type Blob = RONIN.Blob;
type JSONField<T extends ValidJSON | undefined = undefined> = T extends undefined
  ? ValidJSON
  : T;

type SchemaRecord<TSchema extends Record<string, any>> = Required<TSchema> &
  RONIN.RoninRecord;

type SchemaRecords<TSchema extends SchemaRecord<TSchema>> = RONIN.RoninRecords<TSchema>;

export type { SchemaRecord as Record, SchemaRecords as Records, Blob, JSONField as JSON };
