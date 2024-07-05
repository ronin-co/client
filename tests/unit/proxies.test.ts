import { AsyncLocalStorage } from 'node:async_hooks';

import { describe, expect, test } from 'bun:test';

import { get } from '@/src/index';
import { getBatchProxy } from '@/src/utils';

describe('syntax proxy', () => {
  test('using async context', async () => {
    const details = await getBatchProxy(
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
});
