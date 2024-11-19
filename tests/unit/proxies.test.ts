import { AsyncLocalStorage } from 'node:async_hooks';

import { describe, expect, spyOn, test } from 'bun:test';

import { get } from '@/src/index';
import type { QueryItem } from '@/src/types/utils';
import { getBatchProxy, getSyntaxProxy } from '@/src/utils';

describe('syntax proxy', () => {
  test('using sub query', async () => {
    const getQueryHandler = { callback: () => undefined };
    const getQueryHandlerSpy = spyOn(getQueryHandler, 'callback');
    const createQueryHandler = { callback: () => undefined };
    const createQueryHandlerSpy = spyOn(createQueryHandler, 'callback');

    const getProxy = getSyntaxProxy('get', getQueryHandlerSpy);
    const createProxy = getSyntaxProxy('create', createQueryHandlerSpy);

    createProxy.accounts.with(() => getProxy.oldAccounts());

    const finalQuery = {
      create: {
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
    expect(createQueryHandlerSpy).toHaveBeenCalledWith(finalQuery, undefined);
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
    const getQueryHandler = { callback: () => undefined };
    const getQueryHandlerSpy = spyOn(getQueryHandler, 'callback');

    const getProxy = getSyntaxProxy('get', getQueryHandlerSpy);

    const queryList: Array<QueryItem> = [];

    getBatchProxy(
      () => [getProxy.members.with({ team: 'blue' }).orderedBy(['joinedAt'])],
      {
        asyncContext: new AsyncLocalStorage(),
      },
      (queries) => queryList.push(...queries),
    );

    expect(queryList).toMatchObject([
      {
        query: {
          get: {
            members: {
              with: {
                team: 'blue',
              },
              orderedBy: ['joinedAt'],
            },
          },
        },
      },
    ]);
  });
});
