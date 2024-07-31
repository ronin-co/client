export type Schema = {
  id: string;
  summary: string;
  fields:
    | (
        | {
            id: string;
            slug: string;
            name: string;
            type: 'group' | 'text' | 'rich-text' | 'time' | 'blob' | 'toggle' | 'number' | 'json' | 'token';
            required?: boolean | undefined;
            unique?: boolean | undefined;
            displayAs?: 'single-line' | 'multi-line' | undefined;
          }
        | {
            id: string;
            slug: string;
            name: string;
            required?: boolean | undefined;
            unique?: boolean | undefined;
            type: 'list';
            shape: (
              | {
                  id: string;
                  slug: string;
                  name: string;
                  type:
                    | 'group'
                    | 'text'
                    | 'rich-text'
                    | 'time'
                    | 'blob'
                    | 'toggle'
                    | 'number'
                    | 'json'
                    | 'token';
                  required?: boolean | undefined;
                  unique?: boolean | undefined;
                }
              | {
                  id: string;
                  slug: string;
                  name: string;
                  required?: boolean | undefined;
                  unique?: boolean | undefined;
                  type: 'record';
                  schema: string | null;
                  space?: string | undefined;
                  action?:
                    | {
                        onDelete: ('cascade' | 'clear' | 'restrict') | null;
                        onUpdate: ('cascade' | 'clear' | 'restrict') | null;
                      }
                    | undefined;
                }
            )[];
          }
        | {
            id: string;
            slug: string;
            name: string;
            required?: boolean | undefined;
            unique?: boolean | undefined;
            type: 'record';
            schema: string | null;
            space?: string | undefined;
            action?:
              | {
                  onDelete: ('cascade' | 'clear' | 'restrict') | null;
                  onUpdate: ('cascade' | 'clear' | 'restrict') | null;
                }
              | undefined;
          }
      )[]
    | null;
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
