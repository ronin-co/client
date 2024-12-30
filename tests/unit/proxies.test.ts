import { AsyncLocalStorage } from 'node:async_hooks';

import { describe, expect, spyOn, test } from 'bun:test';

import { get } from '@/src/index';
import type { QueryItem } from '@/src/types/utils';
import { getBatchProxy, getSyntaxProxy } from '@/src/utils';
import { QUERY_SYMBOLS } from '@ronin/compiler';

describe('syntax proxy', () => {
  test('using sub query', async () => {
    const getQueryHandler = { callback: () => undefined };
    const getQueryHandlerSpy = spyOn(getQueryHandler, 'callback');
    const addQueryHandler = { callback: () => undefined };
    const addQueryHandlerSpy = spyOn(addQueryHandler, 'callback');

    const getProxy = getSyntaxProxy('get', getQueryHandlerSpy);
    const addProxy = getSyntaxProxy('add', addQueryHandlerSpy);

    addProxy.accounts.to(() => getProxy.oldAccounts());

    const finalQuery = {
      add: {
        accounts: {
          to: {
            __RONIN_QUERY: {
              get: { oldAccounts: {} },
            },
          },
        },
      },
    };

    expect(getQueryHandlerSpy).not.toHaveBeenCalled();
    expect(addQueryHandlerSpy).toHaveBeenCalledWith(finalQuery, undefined);
  });

  test('using field with expression', async () => {
    const setQueryHandler = { callback: () => undefined };
    const setQueryHandlerSpy = spyOn(setQueryHandler, 'callback');

    const setProxy = getSyntaxProxy('set', setQueryHandlerSpy);

    setProxy.accounts.to.name((f) => `${f.firstName} || ' ' || ${f.lastName}`);

    const finalQuery = {
      set: {
        accounts: {
          to: {
            name: {
              [QUERY_SYMBOLS.EXPRESSION]: `${QUERY_SYMBOLS.FIELD}firstName || ' ' || ${QUERY_SYMBOLS.FIELD}lastName`,
            },
          },
        },
      },
    };

    expect(setQueryHandlerSpy).toHaveBeenCalledWith(finalQuery, undefined);
  });

  // Since `name` is a native property of functions and queries contain function calls,
  // we have to explicitly assert whether it can be used as a field slug.
  test('using field with slug `name`', async () => {
    const getQueryHandler = { callback: () => undefined };
    const getQueryHandlerSpy = spyOn(getQueryHandler, 'callback');

    const getProxy = getSyntaxProxy('get', getQueryHandlerSpy);

    getProxy.accounts.with.name('test');

    const finalQuery = {
      get: {
        accounts: {
          with: {
            name: 'test',
          },
        },
      },
    };

    expect(getQueryHandlerSpy).toHaveBeenCalledWith(finalQuery, undefined);
  });

  test('using async context', async () => {
    const details = getBatchProxy(
      () => [get.account()],
      {
        asyncContext: new AsyncLocalStorage(),
      },
      (queries) => (queries.length === 1 ? { result: true } : null),
    );

    expect(details).toMatchObject({
      result: true,
    });
  });

  test('using options for query in batch', async () => {
    const queryList: Array<QueryItem> = [];

    getBatchProxy(
      () => [
        get.account(
          {
            with: { handle: 'juri' },
          },
          // @ts-expect-error This option does not exist.
          { randomOption: true },
        ),
      ],
      {
        asyncContext: new AsyncLocalStorage(),
      },
      (queries) => queryList.push(...queries),
    );

    expect(queryList).toEqual([
      {
        query: {
          get: {
            account: {
              with: {
                handle: 'juri',
              },
            },
          },
        },
        options: {
          randomOption: true,
        },
      },
    ]);
  });

  test('using function chaining in batch', async () => {
    const getProxy = getSyntaxProxy('get', () => undefined);

    const queryList: Array<QueryItem> = [];

    getBatchProxy(
      () => [
        // Test queries where the second function is called right after the first one.
        getProxy.members
          .with({ team: 'red' })
          .selecting(['name']),
        // Test queries where the second function is not called right after the first one.
        getProxy.members
          .with({ team: 'blue' })
          .orderedBy.ascending(['joinedAt']),
      ],
      {
        asyncContext: new AsyncLocalStorage(),
      },
      (queries) => queryList.push(...queries),
    );

    expect(queryList).toEqual([
      {
        query: {
          get: {
            members: {
              with: {
                team: 'red',
              },
              selecting: ['name'],
            },
          },
        },
      },
      {
        query: {
          get: {
            members: {
              with: {
                team: 'blue',
              },
              orderedBy: {
                ascending: ['joinedAt'],
              },
            },
          },
        },
      },
    ]);
  });

  test('using schema query types', async () => {
    const callback = () => undefined;

    const createProxy = getSyntaxProxy('create', callback);
    const alterProxy = getSyntaxProxy('alter', callback);
    const dropProxy = getSyntaxProxy('drop', callback);

    const queryList: Array<QueryItem> = [];

    getBatchProxy(
      () => [
        createProxy.model({
          slug: 'account',
        }),
        alterProxy.model('account').to({
          slug: 'users',
        }),
        alterProxy.model('users').create.field({
          slug: 'handle',
        }),
        alterProxy.model('users').alter.field('handle').to({
          name: 'User Handle',
        }),
        alterProxy.model('users').drop.field('handle'),
        dropProxy.model('users'),
      ],
      {
        asyncContext: new AsyncLocalStorage(),
      },
      (queries) => queryList.push(...queries),
    );

    expect(queryList).toEqual([
      {
        query: {
          create: {
            model: {
              slug: 'account',
            },
          },
        },
      },
      {
        query: {
          alter: {
            model: 'account',
            to: {
              slug: 'users',
            },
          },
        },
      },
      {
        query: {
          alter: {
            create: {
              field: {
                slug: 'handle',
              },
            },
            model: 'users',
          },
        },
      },
      {
        query: {
          alter: {
            alter: {
              field: 'handle',
              to: {
                name: 'User Handle',
              },
            },
            model: 'users',
          },
        },
      },
      {
        query: {
          alter: {
            drop: {
              field: 'handle',
            },
            model: 'users',
          },
        },
      },
      {
        query: {
          drop: {
            model: 'users',
          },
        },
      },
    ]);
  });
});
