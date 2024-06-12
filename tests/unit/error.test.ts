import { describe, expect, test } from 'bun:test';

import { getDotNotatedPath } from '@/src/utils/errors';

describe('generate dot notation', () => {
  test('generate path from segments containing only strings', () => {
    const segments = ['get', 'account', 'with', 'handle'];
    const path = getDotNotatedPath(segments);

    expect(path).toBe('get.account.with.handle');
  });

  test('generate path from segments containing number', () => {
    const segments = ['queries', 0, 'get', 'account', 'with', 'handle'];
    const path = getDotNotatedPath(segments);

    expect(path).toBe('queries[0].get.account.with.handle');
  });

  test('generate path from empty array of segments', () => {
    const segments: string[] = [];
    const path = getDotNotatedPath(segments);

    expect(path).toBe(null);
  });
});
