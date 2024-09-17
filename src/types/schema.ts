export type BasicSchemaField = {
  id: string;
  slug: string;
  name: string;
  description?: string | undefined;
  type: 'group' | 'date' | 'blob' | 'boolean' | 'number';
  required?: boolean | undefined;
  unique?: boolean | undefined;
};

export type StringSchemaField = Omit<BasicSchemaField, 'type'> & {
  type: 'string';
  displayAs?: 'single-line' | 'multi-line' | 'secret';
};

export type ListSchemaField = Omit<BasicSchemaField, 'type'> & {
  type: 'list';
  shape: Array<
    BasicSchemaField | StringSchemaField | ReferenceSchemaField | JSONSchemaField
  >;
};

export type ReferenceSchemaField = Omit<BasicSchemaField, 'type'> & {
  type: 'reference';
  schema: string | null;
  space?: string | undefined;
  action?:
    | {
        onDelete: ('cascade' | 'clear' | 'restrict' | 'reset') | null;
        onUpdate: ('cascade' | 'clear' | 'restrict' | 'reset') | null;
      }
    | undefined;
};

export type JSONSchemaField = Omit<BasicSchemaField, 'type'> & {
  type: 'json';
  displayAs?: 'rich-text' | undefined;
};

export type SchemaField =
  | BasicSchemaField
  | StringSchemaField
  | ListSchemaField
  | ReferenceSchemaField
  | JSONSchemaField;

export type Schema = {
  id: string;
  summary: string;
  fields: Array<SchemaField> | null;
  identifiers: {
    title: string | null;
    slug: string | null;
  } | null;
  idPrefix: string | null;
  name: string;
  pluralName: string;
  slug: string;
  pluralSlug: string;
  preview: string | null;
  space?: string | any;
  description: string | null;
  version: number | null;
};
