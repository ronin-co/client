import type { StorableObject, StoredObject } from '@/src/types/storage';
import type { QueryHandlerOptions } from '@/src/types/utils';
import { getResponseBody } from '@/src/utils/errors';
import type { Query, SetInstructions } from '@ronin/compiler';

/**
 * Extract `StorableObject`s from queries. These will be uploaded separately
 * before being added back to the queries and then finally stored.
 *
 * @param queries - Array of queries that might contain `StorableObject`s.
 *
 * @returns Array of `StorableObject`s that will be saved to RONIN.
 */
export const extractStorableObjects = (queries: Array<Query>): Array<StorableObject> =>
  queries.reduce(
    (references, query, queryIndex) => {
      return [
        // biome-ignore lint/performance/noAccumulatingSpread: This code is too complex to refactor.
        ...references,
        ...Object.entries(query).reduce(
          (references, [queryType, query]) => {
            // Abort if the `queryType` is not one of `set` or `add`.
            if (!['set', 'add'].includes(queryType)) return references;

            return [
              // biome-ignore lint/performance/noAccumulatingSpread: This code is too complex to refactor.
              ...references,
              ...Object.entries(query as Query).reduce(
                (references, [schema, instructions]) => {
                  // Access the query instructions according to the query type.
                  const fields = (instructions as SetInstructions).to;

                  return [
                    // biome-ignore lint/performance/noAccumulatingSpread: This code is too complex to refactor.
                    ...references,
                    ...Object.entries(fields).reduce(
                      (references, [name, value]) => {
                        // Values such as `File`, `ReadableStream` and `Buffer` will be
                        // uploaded and stored before being processed further.
                        const isStorableObject =
                          (typeof File !== 'undefined' && value instanceof File) ||
                          (typeof ReadableStream !== 'undefined' &&
                            value instanceof ReadableStream) ||
                          (typeof Blob !== 'undefined' && value instanceof Blob) ||
                          (typeof ArrayBuffer !== 'undefined' &&
                            value instanceof ArrayBuffer) ||
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
                        // biome-ignore lint/performance/noAccumulatingSpread: This code is too complex to refactor.
                        return [...references, storarableObject];
                      },
                      [] as Array<any>,
                    ),
                  ];
                },
                [] as Array<StorableObject>,
              ),
            ];
          },
          [] as Array<StorableObject>,
        ),
      ];
    },
    [] as Array<StorableObject>,
  );

/**
 * Upload `StorableObjectValue`s contained in queries.
 *
 * @param storableObjects - Array of `StorableObject`s to upload.
 * @param options - Optional object containing options for the upload request.
 *
 * @returns Array of `StoredObject`s.
 */
export const uploadStorableObjects = (
  storableObjects: Array<StorableObject>,
  options: QueryHandlerOptions = {},
): Promise<Array<StoredObject>> => {
  const fetcher = typeof options?.fetch === 'function' ? options.fetch : fetch;

  const requests: Array<Promise<StoredObject>> = storableObjects.map(
    async ({ name, value, contentType }) => {
      const headers = new Headers();
      headers.set('Authorization', `Bearer ${options.token}`);

      if (contentType) {
        headers.set('Content-Type', contentType);
      }

      if (name) {
        headers.set(
          'Content-Disposition',
          `form-data; filename="${encodeURIComponent(name)}"`,
        );
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
    },
  );

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
  queries: Array<Query>,
  upload: (
    objects: Array<StorableObject>,
  ) => Promise<Array<StoredObject>> | Array<StoredObject>,
): Promise<Array<Query>> => {
  const objects = extractStorableObjects(queries);

  if (objects.length > 0) {
    const storedObjects = await upload(objects);

    for (let index = 0; index < objects.length; index++) {
      const { query, schema, field } = objects[index];
      const reference = storedObjects[index];

      // @ts-expect-error It is guaranteed that these keys exist.
      queries[query.index][query.type][schema].to[field] = reference;
    }
  }

  return queries;
};
