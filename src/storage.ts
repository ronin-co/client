import type { CombinedInstructions, Query } from '@/src/types/query';
import type { StorableObject, StoredObject } from '@/src/types/storage';
import type { QueryHandlerOptions } from '@/src/types/utils';
import { getResponseBody } from '@/src/utils/errors';

/**
 * Extract `StorableObject`s from queries. These will be uploaded separately
 * before being added back to the queries and then finally stored.
 *
 * @param queries - Array of queries that might contain `StorableObject`s.
 *
 * @returns Array of `StorableObject`s that will be saved to RONIN.
 */
export const extractStorableObjects = (queries: Query[]): StorableObject[] =>
  queries.reduce((references, query, queryIndex) => {
    return [
      ...references,
      ...Object.entries(query).reduce((references, [queryType, query]) => {
        // Abort if the `queryType` is not one of `set` or `create`.
        if (!['set', 'create'].includes(queryType)) return references;

        return [
          ...references,
          ...Object.entries(query).reduce((references, [schema, instructions]) => {
            // Access the query instructions according to the query type.
            const fields = (instructions as CombinedInstructions)[queryType === 'set' ? 'to' : 'with'];

            return [
              ...references,
              ...Object.entries(fields).reduce((references, [name, value]) => {
                // Values such as `File`, `ReadableStream` and `Buffer` will be
                // uploaded and stored before being processed further.
                const isStorableObject =
                  (typeof File !== 'undefined' && value instanceof File) ||
                  (typeof ReadableStream !== 'undefined' && value instanceof ReadableStream) ||
                  (typeof Blob !== 'undefined' && value instanceof Blob) ||
                  (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) ||
                  (typeof Buffer !== 'undefined' && Buffer.isBuffer(value));

                if (!isStorableObject) return references;

                const storarableObject = {
                  query: {
                    index: queryIndex,
                    type: queryType,
                  },
                  schema,
                  field: name,
                  value,
                } as StorableObject;

                if ('type' in value) {
                  storarableObject.contentType = value.type;
                }

                if ('name' in value) {
                  storarableObject.name = value.name as string;
                }

                return [...references, storarableObject];
              }, [] as any[]),
            ];
          }, [] as StorableObject[]),
        ];
      }, [] as StorableObject[]),
    ];
  }, [] as StorableObject[]);

/**
 * Upload `StorableObjectValue`s contained in queries.
 *
 * @param storableObjects - Array of `StorableObject`s to upload.
 * @param options - Optional object containing options for the upload request.
 *
 * @returns Array of `StoredObject`s.
 */
export const uploadStorableObjects = async (
  storableObjects: StorableObject[],
  options: QueryHandlerOptions = {},
): Promise<StoredObject[]> => {
  const fetcher = typeof options?.fetch === 'function' ? options.fetch : fetch;

  const requests: Promise<StoredObject>[] = storableObjects.map(async ({ name, value, contentType }) => {
    const headers = new Headers();
    headers.set('Authorization', `Bearer ${options.token}`);

    if (contentType) {
      headers.set('Content-Type', contentType);
    }

    if (name) {
      headers.set('Content-Disposition', `form-data; filename="${encodeURIComponent(name)}"`);
    }

    const request = new Request('https://storage.ronin.co/', {
      method: 'PUT',
      body: value,
      headers,
    });

    const response = await fetcher(request);
    return getResponseBody<StoredObject>(response, {
      errorPrefix:
        'An error occurred while uploading the binary objects included in the provided queries. Error:',
    });
  });

  return Promise.all(requests);
};

/**
 * ## 🚧 For internal use only! 🚧
 *
 * Process `StorableObjectValue`s contained in queries.
 *
 * @param queries - Array of queries that contain `StorableObjectValue`s.
 * @param upload - A function that receives `StorableObject`s and uploads them.
 *
 * @returns Queries with `StorableObjectValue`s replaced by `StoredObject`s.
 */
export const processStorableObjects = async (
  queries: Query[],
  upload: (objects: StorableObject[]) => Promise<StoredObject[]> | StoredObject[],
): Promise<Query[]> => {
  const objects = extractStorableObjects(queries);

  if (objects.length > 0) {
    const storedObjects = await upload(objects);

    for (let index = 0; index < objects.length; index++) {
      const { query, schema, field } = objects[index];
      const reference = storedObjects[index];

      // @ts-expect-error It is guaranteed that these keys exist.
      queries[query.index][query.type][schema][query.type === 'set' ? 'to' : 'with'][field] = reference;
    }
  }

  return queries;
};
