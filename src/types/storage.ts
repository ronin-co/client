export type StorableObject = {
  query: {
    index: number;
    type: 'set' | 'create';
  };
  schema: string;
  field: string;
  value?: any;
  contentType: string;
  reference: {
    key: string;
    src: string;
    placeholder: {
      base64: string | null;
    } | null;
    meta: {
      width: number;
      height: number;
      size: number;
      type: string;
    };
  } | null;
};

export type StoredObject = {
  key: string;
  src: string;
  placeholder: {
    base64: string | null;
  } | null;
  meta:
    | {
        size: number;
        type: string;
      }
    | {
        size: number;
        type: string;
        width: number;
        height: number;
      };
};

export type StorableObjectValue = File | ReadableStream | Buffer;
