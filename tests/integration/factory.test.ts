import { beforeEach, describe, expect, mock, test } from 'bun:test';
import { createSyntaxFactory } from 'src/syntax';
import type { StoredObject } from 'src/types/storage';

let mockRequestResolvedValue: Request | undefined = undefined;
let mockResolvedRequestText: any = undefined;

const mockFetch = mock(async (request) => {
  mockRequestResolvedValue = request;
  mockResolvedRequestText = await request.text();

  if (request.url === 'https://data.ronin.co/writable') {
    return Response.json({
      results: [],
    });
  }

  return Response.json({
    results: [],
  });
});

global.fetch = mockFetch;

describe('factory', () => {
  let { get, set, create, drop, count, batch } = {} as ReturnType<typeof createSyntaxFactory>;

  beforeEach(() => {
    ({ get, set, create, drop, count, batch } = createSyntaxFactory());

    mockFetch.mockClear();
    mockRequestResolvedValue = undefined;
    mockResolvedRequestText = undefined;
  });

  test('can create multiple factories with different configurations', async () => {
    const factory1 = createSyntaxFactory({ token: 'takashitoken' });

    await factory1.get.accounts();

    expect(mockRequestResolvedValue?.headers.get('Authorization')).toBe('Bearer takashitoken');
    expect(mockResolvedRequestText).toEqual('{"queries":[{"get":{"accounts":{}}}]}');

    const factory2 = createSyntaxFactory({ token: 'supatokken' });

    await factory2.get.members();

    expect(mockRequestResolvedValue?.headers.get('Authorization')).toBe('Bearer supatokken');
    expect(mockResolvedRequestText).toEqual('{"queries":[{"get":{"members":{}}}]}');
  });

  test('can use the custom fetcher', async () => {
    const mockFetchNew = mock((request) => {
      mockRequestResolvedValue = request;

      return Response.json({
        results: [],
      });
    });

    const factory = createSyntaxFactory({
      fetch: async (request) => mockFetchNew(request),
      token: 'takashitoken',
    });

    await factory.get.accounts();

    expect(mockFetchNew).toHaveBeenCalledTimes(1);
    expect(mockRequestResolvedValue?.headers.get('Authorization')).toBe('Bearer takashitoken');
  });

  test('send correct `queries` for single `get` request', async () => {
    await get.accounts();

    expect(mockResolvedRequestText).toEqual('{"queries":[{"get":{"accounts":{}}}]}');
  });

  test('send correct `queries` for consecutive mixed requests', async () => {
    await get.accounts();

    expect(mockResolvedRequestText).toEqual('{"queries":[{"get":{"accounts":{}}}]}');

    await get.spaces({
      with: {
        createdAt: {
          lessThan: new Date('2024-04-16T15:02:12.710Z'),
        },
      },
      including: ['members'],
      orderedBy: {
        ascending: ['createdAt'],
      },
    });

    expect(mockResolvedRequestText).toEqual(
      '{"queries":[{"get":{"spaces":{"with":{"createdAt":{"lessThan":"2024-04-16T15:02:12.710Z"}},"including":["members"],"orderedBy":{"ascending":["createdAt"]}}}}]}'
    );

    // @ts-expect-error `emailVerified` is undefined due not not having the schema types.
    await drop.accounts.with.emailVerified(false);

    expect(mockResolvedRequestText).toEqual(
      '{"queries":[{"drop":{"accounts":{"with":{"emailVerified":false}}}}]}'
    );

    // @ts-expect-error `greaterThan` is undefined due not not having the schema types.
    await count.spaces.with.membersCount.greaterThan(10);

    expect(mockResolvedRequestText).toEqual(
      '{"queries":[{"count":{"spaces":{"with":{"membersCount":{"greaterThan":10}}}}}]}'
    );

    await set.members({
      with: {
        createdAt: {
          lessThan: new Date('2024-04-16T15:02:12.710Z'),
        },
        paid: true,
      },
      to: {
        status: 'active',
        activeFrom: new Date('2024-04-16T15:02:12.710Z'),
      },
    });

    expect(mockResolvedRequestText).toEqual(
      '{"queries":[{"set":{"members":{"with":{"createdAt":{"lessThan":"2024-04-16T15:02:12.710Z"},"paid":true},"to":{"status":"active","activeFrom":"2024-04-16T15:02:12.710Z"}}}}]}'
    );
  });

  test('send correct `queries` for `get` only `batch` request', async () => {
    await batch((() => [
      get.accounts(),
      // @ts-expect-error `startingWith` is undefined due not not having the
      // schema types.
      get.members.with.handle.startingWith('ronin'),
      get.spaces({
        with: {
          createdAt: {
            lessThan: new Date('2024-04-16T15:02:12.710Z'),
          },
        },
        including: ['members'],
        orderedBy: {
          ascending: ['createdAt'],
        },
      }),
      get.members.limitedTo(100),
      get.spaces.orderedBy.descending(['handle']),
      // @ts-expect-error `id` is undefined due not not having the schema types.
      get.member.with.id('123'),
    ]) as Parameters<typeof batch>[0]);

    expect(mockResolvedRequestText).toEqual(
      '{"queries":[{"get":{"accounts":{}}},{"get":{"members":{"with":{"handle":{"startingWith":"ronin"}}}}},{"get":{"spaces":{"with":{"createdAt":{"lessThan":"2024-04-16T15:02:12.710Z"}},"including":["members"],"orderedBy":{"ascending":["createdAt"]}}}},{"get":{"members":{"limitedTo":100}}},{"get":{"spaces":{"orderedBy":{"descending":["handle"]}}}},{"get":{"member":{"with":{"id":"123"}}}}]}'
    );
  });

  test('send correct `queries` for mixed `batch` request', async () => {
    await batch((() => [
      set.members({
        with: {
          createdAt: {
            lessThan: new Date('2024-04-16T15:02:12.710Z'),
          },
          paid: true,
        },
        to: {
          status: 'active',
          activeFrom: new Date('2024-04-16T15:02:12.710Z'),
        },
      }),
      get.accounts(),
      // @ts-expect-error `notBeing` is undefined due not not having the
      // schema types.
      count.spaces.with.membersCount.notBeing(0),
      // @ts-expect-error `emailVerified` is undefined due not not having the
      // schema types.
      drop.accounts.with.emailVerified(false),
      create.spaces({
        with: { handle: 'test-space', members: ['member1', 'member2'] },
      }),
    ]) as Parameters<typeof batch>[0]);

    expect(mockResolvedRequestText).toEqual(
      '{"queries":[{"set":{"members":{"with":{"createdAt":{"lessThan":"2024-04-16T15:02:12.710Z"},"paid":true},"to":{"status":"active","activeFrom":"2024-04-16T15:02:12.710Z"}}}},{"get":{"accounts":{}}},{"count":{"spaces":{"with":{"membersCount":{"notBeing":0}}}}},{"drop":{"accounts":{"with":{"emailVerified":false}}}},{"create":{"spaces":{"with":{"handle":"test-space","members":["member1","member2"]}}}}]}'
    );
  });

  test('send correct `queries` for single `get` request using `with`', async () => {
    // @ts-expect-error `startingWith` is undefined due not not having the schema types.
    await get.accounts.with.handle.startingWith('a');

    expect(mockResolvedRequestText).toEqual(
      '{"queries":[{"get":{"accounts":{"with":{"handle":{"startingWith":"a"}}}}}]}'
    );
  });

  test('send correct `queries` for consecutive mixed requests using `with`', async () => {
    await get.accounts();

    expect(mockResolvedRequestText).toEqual('{"queries":[{"get":{"accounts":{}}}]}');

    await get.spaces({
      with: {
        createdAt: {
          lessThan: new Date('2024-04-16T15:02:12.710Z'),
        },
      },
      including: ['members'],
      orderedBy: {
        ascending: ['createdAt'],
      },
    });

    expect(mockResolvedRequestText).toEqual(
      '{"queries":[{"get":{"spaces":{"with":{"createdAt":{"lessThan":"2024-04-16T15:02:12.710Z"}},"including":["members"],"orderedBy":{"ascending":["createdAt"]}}}}]}'
    );

    // @ts-expect-error `emailVerified` is undefined due not not having the schema types.
    await drop.accounts.with.emailVerified(false);

    expect(mockResolvedRequestText).toEqual(
      '{"queries":[{"drop":{"accounts":{"with":{"emailVerified":false}}}}]}'
    );

    // @ts-expect-error `greaterThan` is undefined due not not having the schema types.
    await count.spaces.with.membersCount.greaterThan(10);

    expect(mockResolvedRequestText).toEqual(
      '{"queries":[{"count":{"spaces":{"with":{"membersCount":{"greaterThan":10}}}}}]}'
    );

    await set.members({
      with: {
        createdAt: {
          lessThan: new Date('2024-04-16T15:02:12.710Z'),
        },
        paid: true,
      },
      to: {
        status: 'active',
        activeFrom: new Date('2024-04-16T15:02:12.710Z'),
      },
    });

    expect(mockResolvedRequestText).toEqual(
      '{"queries":[{"set":{"members":{"with":{"createdAt":{"lessThan":"2024-04-16T15:02:12.710Z"},"paid":true},"to":{"status":"active","activeFrom":"2024-04-16T15:02:12.710Z"}}}}]}'
    );
  });

  test('send correct `queries` for mixed `batch` request using `with`', async () => {
    await batch((() => [
      set.members({
        with: {
          createdAt: {
            lessThan: new Date('2024-04-16T15:02:12.710Z'),
          },
          paid: true,
        },
        to: {
          status: 'active',
          activeFrom: new Date('2024-04-16T15:02:12.710Z'),
        },
      }),
      get.accounts(),
      // @ts-expect-error `notBeing` is undefined due not not having the
      // schema types.
      count.spaces.with.membersCount.notBeing(0),
      // @ts-expect-error `emailVerified` is undefined due not not having the
      // schema types.
      drop.accounts.with.emailVerified(false),
      create.spaces({
        with: { handle: 'test-space', members: ['member1', 'member2'] },
      }),
    ]) as Parameters<typeof batch>[0]);

    expect(mockResolvedRequestText).toEqual(
      '{"queries":[{"set":{"members":{"with":{"createdAt":{"lessThan":"2024-04-16T15:02:12.710Z"},"paid":true},"to":{"status":"active","activeFrom":"2024-04-16T15:02:12.710Z"}}}},{"get":{"accounts":{}}},{"count":{"spaces":{"with":{"membersCount":{"notBeing":0}}}}},{"drop":{"accounts":{"with":{"emailVerified":false}}}},{"create":{"spaces":{"with":{"handle":"test-space","members":["member1","member2"]}}}}]}'
    );
  });

  test('correctly format `amount`', async () => {
    const factory = createSyntaxFactory({
      fetch: async (request) => {
        mockRequestResolvedValue = request;

        return Response.json({
          results: [
            {
              amount: 10,
            },
          ],
        });
      },
    });

    const result = await factory.count.accounts();

    expect(result).toBe(10);
  });

  test('correctly format not found result', async () => {
    const factory = createSyntaxFactory({
      fetch: async (request) => {
        mockRequestResolvedValue = request;

        return Response.json({
          results: [{ record: null }],
        });
      },
    });

    const result = await factory.count.accounts();

    expect(result).toBeNull();
  });

  test('upload image', async () => {
    const bunFile = Bun.file('tests/assets/example.jpeg');
    const file = new File([await bunFile.arrayBuffer()], 'example.jpeg', { type: 'image/jpeg' });

    let mockResolvedStorageRequest: Request | undefined = undefined;

    const factory = createSyntaxFactory({
      fetch: async (request) => {
        if (request.url === 'https://data.ronin.co/writable') {
          mockResolvedStorageRequest = request;

          const responseBody: StoredObject = {
            key: 'test-key',
            src: 'https://media.ronin.co/test-key',
            meta: {
              height: 100,
              width: 100,
              size: 100,
              type: 'image/jpeg',
            },
            placeholder: {
              base64: '',
            },
          };

          return Response.json(responseBody);
        }

        return mockFetch(request);
      },
    });

    await factory.create.account({
      with: {
        avatar: file,
      },
    });

    const body = await (mockResolvedStorageRequest as Request | undefined)?.text();

    expect((mockResolvedStorageRequest as Request | undefined)?.headers.get('Content-Type')).toBe(
      'image/jpeg'
    );
    expect(body).toBe(await file.text());

    expect(mockResolvedRequestText).toEqual(
      '{"queries":[{"create":{"account":{"with":{"avatar":{"key":"test-key","src":"https://media.ronin.co/test-key","meta":{"height":100,"width":100,"size":100,"type":"image/jpeg"},"placeholder":{"base64":""}}}}}}]}'
    );
  });

  test('handle storage service error', async () => {
    const factory = createSyntaxFactory({
      fetch: async (request) => {
        if (request.url === 'https://data.ronin.co/writable') {
          return Response.error();
        }
        return mockFetch(request);
      },
    });

    const promise = factory.create.account({
      with: {
        avatar: new File([''], 'example.jpeg', { type: 'image/jpeg' }),
      },
    });

    expect(promise).rejects.toThrow('An unexpected error occurred while uploading the object.');
  });

  test('format time fields', async () => {
    const mockFetchNew = mock(async (request) => {
      mockRequestResolvedValue = request;

      return Response.json({
        results: [
          {
            record: {
              name: 'Tim',
              createdAt: '2024-04-16T15:02:12.710Z',
              ronin: {
                updatedAt: '2024-05-16T15:02:12.710Z',
              },
            },
            schema: {
              name: 'string',
              createdAt: 'time',
              'ronin.updatedAt': 'time',
            },
          },
          {
            records: [
              {
                name: 'Leo',
                createdAt: '2024-04-16T15:02:12.710Z',
                ronin: {
                  updatedAt: '2024-05-16T15:02:12.710Z',
                },
              },
              {
                name: 'Juri',
                createdAt: '2024-04-16T15:02:12.710Z',
                ronin: {
                  updatedAt: '2024-05-16T15:02:12.710Z',
                },
              },
            ],
            schema: {
              createdAt: 'time',
              'ronin.updatedAt': 'time',
              name: 'string',
            },
          },
        ],
      });
    });

    const factory = createSyntaxFactory({
      fetch: async (request) => mockFetchNew(request),
    });

    const [account, accounts] = (await factory.batch(() => [
      factory.get.account(),
      factory.get.accounts(),
    ])) as [Record<string, any>, Record<string, any>[]];

    expect(account.createdAt).toBeInstanceOf(Date);
    expect(account.ronin.updatedAt).toBeInstanceOf(Date);

    expect(account.createdAt.toISOString()).toBe('2024-04-16T15:02:12.710Z');
    expect(account.ronin.updatedAt.toISOString()).toBe('2024-05-16T15:02:12.710Z');

    expect(accounts[0].createdAt).toBeInstanceOf(Date);
    expect(accounts[0].ronin.updatedAt).toBeInstanceOf(Date);

    expect(accounts[0].createdAt.toISOString()).toBe('2024-04-16T15:02:12.710Z');
    expect(accounts[0].ronin.updatedAt.toISOString()).toBe('2024-05-16T15:02:12.710Z');
  });
});
