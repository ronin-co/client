import { AsyncLocalStorage } from 'node:async_hooks';

import { describe, expect, spyOn, test } from 'bun:test';

import { alter, drop, get } from '@/src/index';
import type { QueryItem } from '@/src/types/utils';
import { getBatchProxy, getSyntaxProxy } from '@/src/utils';

describe('syntax proxy', () => {
  test('using sub query', async () => {
    const getQueryHandler = { callback: () => undefined };
    const getQueryHandlerSpy = spyOn(getQueryHandler, 'callback');
    const addQueryHandler = { callback: () => undefined };
    const addQueryHandlerSpy = spyOn(addQueryHandler, 'callback');

    const getProxy = getSyntaxProxy('get', getQueryHandlerSpy);
    const addProxy = getSyntaxProxy('add', addQueryHandlerSpy);

    addProxy.accounts.with(() => getProxy.oldAccounts());

    const finalQuery = {
      add: {
        accounts: {
          with: {
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

    expect(queryList).toMatchObject([
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
          .excluding(['name']),
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

    expect(queryList[0].query).toMatchObject({
      get: {
        members: {
          with: {
            team: 'red',
          },
          excluding: ['name'],
        },
      },
    });

    expect(queryList[1].query).toMatchObject({
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
    });
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

    expect(queryList[0].query).toMatchObject({
      create: {
        model: {
          slug: 'account',
        },
      },
    });

    expect(queryList[1].query).toMatchObject({
      alter: {
        model: 'account',
        to: {
          slug: 'users',
        },
      },
    });

    expect(queryList[2].query).toMatchObject({
      alter: {
        model: 'users',
        create: {
          field: {
            slug: 'handle',
          },
        },
      },
    });

    expect(queryList[3].query).toMatchObject({
      alter: {
        model: 'users',
        alter: {
          field: 'handle',
          to: {
            name: 'User Handle',
          },
        },
      },
    });

    expect(queryList[4].query).toMatchObject({
      alter: {
        model: 'users',
        drop: {
          field: 'handle',
        },
      },
    });

    expect(queryList[5].query).toMatchObject({
      drop: {
        model: 'users',
      },
    });
  });
});
