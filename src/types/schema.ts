export type Schema = {
  id: string;
  summary: string;
  fields:
    | (
        | {
            id: string;
            slug: string;
            name: string;
            description?: string | undefined;
            type: 'group' | 'time' | 'blob' | 'boolean' | 'number';
            required?: boolean | undefined;
            unique?: boolean | undefined;
          }
        | {
            id: string;
            slug: string;
            name: string;
            description?: string | undefined;
            required?: boolean | undefined;
            unique?: boolean | undefined;
            type: 'string';
            displayAs?: 'single-line' | 'multi-line' | 'secret';
          }
        | {
            id: string;
            slug: string;
            name: string;
            description?: string | undefined;
            required?: boolean | undefined;
            unique?: boolean | undefined;
            type: 'list';
            shape: (
              | {
                  id: string;
                  slug: string;
                  name: string;
                  description?: string | undefined;
                  type: 'group' | 'time' | 'blob' | 'boolean' | 'number';
                  required?: boolean | undefined;
                  unique?: boolean | undefined;
                }
              | {
                  id: string;
                  slug: string;
                  name: string;
                  description?: string | undefined;
                  required?: boolean | undefined;
                  unique?: boolean | undefined;
                  type: 'string';
                  displayAs?: 'single-line' | 'multi-line' | 'secret';
                }
              | {
                  id: string;
                  slug: string;
                  name: string;
                  description?: string | undefined;
                  required?: boolean | undefined;
                  unique?: boolean | undefined;
                  type: 'reference';
                  schema: string | null;
                  space?: string | undefined;
                  action?:
                    | {
                        onDelete: ('cascade' | 'clear' | 'restrict' | 'reset') | null;
                        onUpdate: ('cascade' | 'clear' | 'restrict' | 'reset') | null;
                      }
                    | undefined;
                }
              | {
                  id: string;
                  slug: string;
                  name: string;
                  description?: string | undefined;
                  required?: boolean | undefined;
                  unique?: boolean | undefined;
                  type: 'json';
                  displayAs?: 'rich-text' | undefined;
                }
            )[];
          }
        | {
            id: string;
            slug: string;
            name: string;
            description?: string | undefined;
            required?: boolean | undefined;
            unique?: boolean | undefined;
            type: 'reference';
            schema: string | null;
            space?: string | undefined;
            action?:
              | {
                  onDelete: ('cascade' | 'clear' | 'restrict' | 'reset') | null;
                  onUpdate: ('cascade' | 'clear' | 'restrict' | 'reset') | null;
                }
              | undefined;
          }
        | {
            id: string;
            slug: string;
            name: string;
            description?: string | undefined;
            required?: boolean | undefined;
            unique?: boolean | undefined;
            type: 'json';
            displayAs?: 'rich-text' | undefined;
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
