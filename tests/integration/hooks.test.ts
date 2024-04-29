import { beforeEach, describe, expect, mock, test } from 'bun:test';
import { createSyntaxFactory } from 'src/syntax';
import type { CombinedInstructions, QueryType } from 'src/types/query';
import { type FilteredHookQuery, runQueriesWithHooks } from 'src/utils/data-hooks';

let mockResolvedRequestText: any = undefined;

const mockFetch = mock(async (request) => {
  mockResolvedRequestText = await request.text();

  return Response.json({
    results: [],
  });
});

global.fetch = mockFetch;

describe('hooks', () => {
  beforeEach(() => {
    mockFetch.mockClear();

    mockResolvedRequestText = undefined;
  });

  test('run `get` query with a hook and ensure the hook does not modify the original query', async () => {
    const query = {
      get: {
        accounts: {
          with: {
            email: {
              endingWith: 'ronin.co',
            },
          },
        },
      },
    };

    const mockHook = mock((query: CombinedInstructions) => {
      query.with = {
        handle: 'juri',
      };
      return {};
    });

    await runQueriesWithHooks([query], {
      hooks: {
        account: {
          get: mockHook as any,
        },
      },
    });

    expect(mockHook).toHaveBeenCalled();
    expect(query.get.accounts.with).not.toHaveProperty('handle');
  });

  test('run `get` query through factory containing `before` data hook', async () => {
    const { get } = createSyntaxFactory({
      hooks: {
        account: {
          beforeGet(query, multiple) {
            if (multiple) {
              query.with = {
                email: {
                  endingWith: '@ronin.co',
                },
              };
            } else {
              query.with = {
                handle: 'leo',
              };
            }

            return query;
          },
        },
      },
    });

    // @ts-expect-error `handle` is undefined due not not having the schema types.
    await get.account.with.handle('juri');
    // Make sure `leo` is resolved as the account handle.
    expect(mockResolvedRequestText).toEqual('{"queries":[{"get":{"account":{"with":{"handle":"leo"}}}}]}');

    await get.accounts();
    // Make sure the email address of all resolved accounts ends with the
    // `@ronin.co` domain name.
    expect(mockResolvedRequestText).toEqual(
      '{"queries":[{"get":{"accounts":{"with":{"email":{"endingWith":"@ronin.co"}}}}}]}',
    );
  });

  test('run `get` query through factory containing `during` data hook', async () => {
    const { get } = createSyntaxFactory({
      hooks: {
        schema: {
          get(_query, multiple) {
            if (multiple)
              return [
                {
                  id: '1',
                },
                {
                  id: '2',
                },
              ];

            if (!multiple)
              return {
                id: '1',
              };
          },
        },
      },
    });

    // @ts-expect-error `id` is undefined due not not having the schema types.
    const schema = await get.schema.with.id('1');
    // Make sure a single schema is resolved.
    expect(schema.id).toBe('1');

    const schemas = (await get.schemas()) as Array<object>;
    // Make sure multiple schemas are resolved.
    expect(schemas.length).toBe(2);

    // @ts-expect-error `handle` is undefined due not not having the schema types.
    await get.account.with.handle('juri');
    expect(mockResolvedRequestText).toEqual('{"queries":[{"get":{"account":{"with":{"handle":"juri"}}}}]}');
  });

  test('run `create` query through factory containing `after` data hook', async () => {
    let finalQuery: FilteredHookQuery<CombinedInstructions, QueryType> | undefined;
    let finalMultiple: boolean | undefined;
    let finalResult: unknown;

    const { create } = createSyntaxFactory({
      fetch: async () => {
        return Response.json({
          results: [
            {
              id: '1',
              handle: 'juri',
              firstName: 'Juri',
              lastName: 'Adams',
            },
          ],
        });
      },
      hooks: {
        account: {
          afterCreate(query, multiple, results) {
            finalQuery = query;
            finalMultiple = multiple;
            finalResult = results;
          },
        },
      },
    });

    const account = await create.account({
      with: {
        handle: 'juri',
        firstName: 'Juri',
        lastName: 'Adams',
      },
    });

    // Make sure `finalQuery` matches the initial query.
    expect(finalQuery).toMatchObject({
      with: {
        handle: 'juri',
        firstName: 'Juri',
        lastName: 'Adams',
      },
    });

    // Make sure `finalResult` matches the resolved account.
    expect(finalResult).toMatchObject([account]);

    expect(finalMultiple).toBe(false);
  });

  test('run `set` query affecting multiple accounts through factory containing `after` data hook', async () => {
    let finalQuery: FilteredHookQuery<CombinedInstructions, QueryType> | undefined;
    let finalMultiple: boolean | undefined;
    let finalResult: unknown;

    const { set } = createSyntaxFactory({
      fetch: async () => {
        return Response.json({
          results: [
            [
              {
                id: '1',
                email: 'test@ronin.co',
              },
              {
                id: '2',
                email: 'test@ronin.co',
              },
            ],
          ],
        });
      },
      hooks: {
        account: {
          afterSet(query, multiple, results) {
            finalQuery = query;
            finalMultiple = multiple;
            finalResult = results;
          },
        },
      },
    });

    const accounts = (await set.accounts({
      with: {
        email: {
          endingWith: '@ronin.co',
        },
      },
      to: {
        email: 'test@ronin.co',
      },
    })) as Array<Record<string, unknown>>;

    // Make sure all accounts were updated successfully.
    expect(accounts.every(({ email }) => email === 'test@ronin.co')).toBe(true);

    // Make sure `finalQuery` matches the initial query.
    expect(finalQuery).toMatchObject({
      with: {
        email: {
          endingWith: '@ronin.co',
        },
      },
      to: {
        email: 'test@ronin.co',
      },
    });

    // Make sure `finalResult` matches the resolved accounts.
    expect(finalResult).toEqual(accounts);

    expect(finalMultiple).toBe(true);
  });

  test('run normal queries alongside queries that are handled by `during` hook', async () => {
    let finalQuery: FilteredHookQuery<CombinedInstructions, QueryType> | undefined;
    let finalMultiple: boolean | undefined;
    let mockResolvedRequestText: string | undefined;

    const { get, batch } = createSyntaxFactory({
      fetch: async (request) => {
        mockResolvedRequestText = await (request as Request).text();

        return Response.json({
          results: [
            {
              records: [{ id: 'mem_1' }, { id: 'mem_2' }],
            },
          ],
        });
      },
      hooks: {
        account: {
          get(query, multiple) {
            finalQuery = query;
            finalMultiple = multiple;

            return { id: 'juri' };
          },
        },
      },
    });

    const result = (await batch(() => [
      get.account.with({
        handle: 'juri',
        firstName: 'Juri',
        lastName: 'Adams',
      }),
      get.members(),
    ])) as [Record<string, unknown>, Record<string, unknown>[]];

    // Make sure only one request is sent to the server and the request which
    // was handled by the "during" "get" hook is dropped out.
    expect(mockResolvedRequestText).toEqual('{"queries":[{"get":{"members":{}}}]}');

    expect(result.length).toBe(2);

    expect(result[0]).toMatchObject({ id: 'juri' });

    expect(result[1]).toMatchObject([{ id: 'mem_1' }, { id: 'mem_2' }]);

    expect(finalQuery).toMatchObject({
      with: {
        handle: 'juri',
        firstName: 'Juri',
        lastName: 'Adams',
      },
    });
    expect(finalMultiple).toBe(false);
  });
});
