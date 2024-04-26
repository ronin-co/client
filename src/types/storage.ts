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
  meta: {
    width: number;
    height: number;
    size: number;
    type: string;
  };
};

export type StorableObjectValue = File | ReadableStream | Buffer;
