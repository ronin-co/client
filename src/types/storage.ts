export type StoredObject = {
  key: string;
  src: string;
  name: string | null;
  placeholder: {
    base64: string | null;
  } | null;
  meta: {
    size: number;
    type: string;
    width?: number;
    height?: number;
  };
};

export type StorableObject = {
  query: {
    index: number;
    type: 'set' | 'create';
  };
  name?: string;
  schema: string;
  field: string;
  value?: any;
  contentType: string;
  reference: StoredObject | null;
};

export type StorableObjectValue = File | ReadableStream | Buffer | ArrayBuffer | Blob;
