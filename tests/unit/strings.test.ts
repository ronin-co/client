import { expect, test } from 'bun:test';

import { toDashCase } from '@/src/utils/helpers';

test('correctly convert strings to dash case', async () => {
  expect(toDashCase('superLongSlug')).toBe('super-long-slug');
  expect(toDashCase('even-MoreWords')).toBe('even-more-words');
  expect(toDashCase('oh wow okay')).toBe('oh-wow-okay');
  expect(toDashCase('')).toBe('');
  expect(toDashCase(null)).toBe('');
  expect(toDashCase(undefined)).toBe('');
});
