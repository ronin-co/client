import { AsyncLocalStorage } from 'node:async_hooks';

import { beforeEach, describe, expect, mock, test } from 'bun:test';

import { createSyntaxFactory } from '@/src/index';
import { type FilteredHookQuery, runQueriesWithHooks } from '@/src/utils/data-hooks';
import type { CombinedInstructions, QueryType } from '@ronin/compiler';

let mockResolvedRequestText: any;

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
      asyncContext: new AsyncLocalStorage(),
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
      asyncContext: new AsyncLocalStorage(),
    });

    // @ts-expect-error `handle` is undefined due not not having the schema types.
    await get.account.with.handle('juri');
    // Make sure `leo` is resolved as the account handle.
    expect(mockResolvedRequestText).toEqual(
      '{"queries":[{"get":{"account":{"with":{"handle":"leo"}}}}]}',
    );

    await get.accounts();
    // Make sure the email address of all resolved accounts ends with the
    // `@ronin.co` domain name.
    expect(mockResolvedRequestText).toEqual(
      '{"queries":[{"get":{"accounts":{"with":{"email":{"endingWith":"@ronin.co"}}}}}]}',
    );
  });

  test('run `get` query through factory with dynamically generated config', async () => {
    const { get } = createSyntaxFactory(() => ({
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
      asyncContext: new AsyncLocalStorage(),
    }));

    // @ts-expect-error `handle` is undefined due not not having the schema types.
    await get.account.with.handle('juri');
    // Make sure `leo` is resolved as the account handle.
    expect(mockResolvedRequestText).toEqual(
      '{"queries":[{"get":{"account":{"with":{"handle":"leo"}}}}]}',
    );

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
      asyncContext: new AsyncLocalStorage(),
    });

    // @ts-expect-error `id` is undefined due not not having the schema types.
    const schema = await get.schema.with.id('1');
    // Make sure a single schema is resolved.
    expect(schema.id).toBe('1');

    const schemas = await get.schemas();
    // Make sure multiple schemas are resolved.
    expect(schemas.length).toBe(2);

    // @ts-expect-error `handle` is undefined due not not having the schema types.
    await get.account.with.handle('juri');
    expect(mockResolvedRequestText).toEqual(
      '{"queries":[{"get":{"account":{"with":{"handle":"juri"}}}}]}',
    );
  });

  test('run `create` query through factory containing `after` data hook', async () => {
    let finalQuery: FilteredHookQuery<CombinedInstructions, QueryType> | undefined;
    let finalMultiple: boolean | undefined;
    let finalBeforeResult: unknown;
    let finalAfterResult: unknown;

    const { create } = createSyntaxFactory({
      fetch: async () => {
        return Response.json({
          results: [
            {
              record: {
                id: '1',
                slug: 'account',
                pluralSlug: 'accounts',
                name: 'Account',
                pluralName: 'Accounts',
              },
            },
          ],
        });
      },
      hooks: {
        model: {
          afterCreate(query, multiple, beforeResult, afterResult) {
            finalQuery = query;
            finalMultiple = multiple;
            finalBeforeResult = beforeResult;
            finalAfterResult = afterResult;
          },
        },
      },
      asyncContext: new AsyncLocalStorage(),
    });

    const model = await create.model({
      slug: 'account',
    } as Parameters<typeof create.model>[0]);

    // Make sure `finalQuery` matches the initial query.
    expect(finalQuery).toMatchObject({
      slug: 'account',
    });

    // Make sure `finalBeforeResult` is empty, since the record is being
    // created and didn't exist before.
    //
    // We must use `toMatchObject` here, to ensure that the array is really
    // empty and doesn't contain any `undefined` items.
    expect(finalBeforeResult).toMatchObject([]);

    // Make sure `finalAfterResult` matches the resolved account.
    expect(finalAfterResult).toEqual([model]);

    expect(finalMultiple).toBe(false);
  });

  test('run `alter` query through factory containing `after` data hook', async () => {
    let finalQuery: FilteredHookQuery<CombinedInstructions, QueryType> | undefined;
    let finalMultiple: boolean | undefined;
    let finalBeforeResult: unknown;
    let finalAfterResult: unknown;

    const { alter } = createSyntaxFactory({
      fetch: async () => {
        return Response.json({
          results: [
            {
              record: {
                id: '1',
                slug: 'account',
                pluralSlug: 'accounts',
                name: 'Account',
                pluralName: 'Accounts',
              },
            },
          ],
        });
      },
      hooks: {
        model: {
          afterAlter(query, multiple, beforeResult, afterResult) {
            finalQuery = query;
            finalMultiple = multiple;
            finalBeforeResult = beforeResult;
            finalAfterResult = afterResult;
          },
        },
      },
      asyncContext: new AsyncLocalStorage(),
    });

    const model = await (alter as unknown as (details: object) => unknown)({
      model: 'account',
      to: {
        slug: 'user',
      },
    });

    // Make sure `finalQuery` matches the initial query payload.
    expect(finalQuery).toMatch('account');

    // Make sure `finalBeforeResult` is empty, since the record is being
    // created and didn't exist before.
    //
    // We must use `toMatchObject` here, to ensure that the array is really
    // empty and doesn't contain any `undefined` items.
    expect(finalBeforeResult).toMatchObject([]);

    // Make sure `finalAfterResult` matches the resolved account.
    expect(finalAfterResult).toEqual([model]);

    expect(finalMultiple).toBe(false);
  });

  test('run `drop` query through factory containing `after` data hook', async () => {
    let finalBeforeResult: unknown;
    let finalAfterResult: unknown;

    const { drop } = createSyntaxFactory({
      fetch: async () => {
        return Response.json({
          results: [
            {
              record: {
                id: '1',
                slug: 'account',
                pluralSlug: 'accounts',
                name: 'Account',
                pluralName: 'Accounts',
              },
            },
          ],
        });
      },
      hooks: {
        model: {
          afterDrop(_query, _multiple, beforeResult, afterResult) {
            finalBeforeResult = beforeResult;
            finalAfterResult = afterResult;
          },
        },
      },
      asyncContext: new AsyncLocalStorage(),
    });

    const model = await drop.model('account' as Parameters<typeof drop.model>[0]);

    // Make sure `finalBeforeResult` is defined and contains the value of the record
    // before it was removed.
    expect(finalBeforeResult).toEqual([model]);

    // Make sure `finalAfterResult` is empty, since the record was removed from the DB.
    //
    // We must use `toMatchObject` here, to ensure that the array is really
    // empty and doesn't contain any `undefined` items.
    expect(finalAfterResult).toMatchObject([]);
  });

  test('run `remove` query through factory containing `after` data hook', async () => {
    let finalBeforeResult: unknown;
    let finalAfterResult: unknown;

    const { remove } = createSyntaxFactory({
      fetch: async () => {
        return Response.json({
          results: [
            {
              record: {
                id: '1',
                handle: 'juri',
                firstName: 'Juri',
                lastName: 'Adams',
              },
            },
          ],
        });
      },
      hooks: {
        account: {
          afterRemove(_query, _multiple, beforeResult, afterResult) {
            finalBeforeResult = beforeResult;
            finalAfterResult = afterResult;
          },
        },
      },
      asyncContext: new AsyncLocalStorage(),
    });

    const account = await remove.account({
      with: {
        handle: 'juri',
      },
    });

    // Make sure `finalBeforeResult` is defined and contains the value of the record
    // before it was removed.
    expect(finalBeforeResult).toEqual([account]);

    // Make sure `finalAfterResult` is empty, since the record was removed from the DB.
    //
    // We must use `toMatchObject` here, to ensure that the array is really
    // empty and doesn't contain any `undefined` items.
    expect(finalAfterResult).toMatchObject([]);
  });

  test('run `set` query affecting multiple accounts through factory containing `after` data hook', async () => {
    let finalQuery: FilteredHookQuery<CombinedInstructions, QueryType> | undefined;
    let finalMultiple: boolean | undefined;
    let finalBeforeResult: unknown;
    let finalAfterResult: unknown;

    const previousAccounts = [
      {
        id: '1',
        email: 'prev@ronin.co',
      },
      {
        id: '2',
        email: 'prev@ronin.co',
      },
    ];

    const nextAccounts = [
      {
        id: '1',
        email: 'test@ronin.co',
      },
      {
        id: '2',
        email: 'test@ronin.co',
      },
    ];

    const { set } = createSyntaxFactory({
      fetch: async () => {
        return Response.json({
          results: [{ records: previousAccounts }, { records: nextAccounts }],
        });
      },
      hooks: {
        account: {
          afterSet(query, multiple, beforeResult, afterResult) {
            finalQuery = query;
            finalMultiple = multiple;
            finalBeforeResult = beforeResult;
            finalAfterResult = afterResult;
          },
        },
      },
      asyncContext: new AsyncLocalStorage(),
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
    })) as unknown as Array<Record<string, unknown>>;

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

    // Make sure `finalBeforeResult` matches the previous accounts.
    expect(finalBeforeResult).toEqual(previousAccounts);

    // Make sure `finalAfterResult` matches the resolved accounts.
    expect(finalAfterResult).toEqual(accounts);

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
      asyncContext: new AsyncLocalStorage(),
    });

    const result = await batch(() => [
      get.account.with({
        handle: 'juri',
        firstName: 'Juri',
        lastName: 'Adams',
      }),
      get.members(),
    ]);

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

  test('run a query inside a data hook and avoid recursion', async () => {
    let hookInvoked = false;

    const { add } = createSyntaxFactory({
      fetch: async () => {
        return Response.json({
          results: [
            {
              record: {
                id: '1234',
                firstName: 'Juri',
                handle: 'juri',
              },
            },
          ],
        });
      },
      hooks: {
        account: {
          async add() {
            // If an infinite recursion is detected, we need to exit
            // immediately instead of performing a test assertion, because the
            // code will otherwise run forever (until memory is exceeded).
            if (hookInvoked) {
              console.error(
                'Infinite recursion detected in test. Exiting (search for this message).',
              );
              process.exit(1);
            }

            hookInvoked = true;

            await add.account.to({
              handle: 'not-juri',
            });

            return { handle: 'juri' };
          },
        },
      },
      asyncContext: new AsyncLocalStorage(),
    });

    const result = await add.account.to({
      handle: 'juri',
    });

    expect(result).toMatchObject({ handle: 'juri' });
  });
});

test('invoke `ronin` with `hooks` defined, but no `asyncContext` defined', async () => {
  let error: Error | undefined;

  try {
    const factory = createSyntaxFactory({
      token: 'supertoken',
      hooks: {
        // @ts-expect-error - We are deliberately causing an error.
        beforeAdd: () => undefined,
      },
    });

    await factory.add.account({ to: { handle: 'leo' } });
  } catch (err) {
    error = err as Error;
  }

  expect(error?.message).toMatch(
    `In the case that the "ronin" package receives a value for its \`hooks\` option, it must also receive a value for its \`asyncContext\` option.`,
  );
});
