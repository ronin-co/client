import { describe, expect, test } from 'bun:test';

import { convertToReadableText } from '@/src/bin/parser/utils';
import { toDashCase } from '@/src/utils/helpers';

describe('toDashCase', () => {
  test('correctly convert camelCase to dash case', async () => {
    expect(toDashCase('superLongSlug')).toBe('super-long-slug');
  });

  test('correctly convert mixed case to dash case', async () => {
    expect(toDashCase('even-MoreWords')).toBe('even-more-words');
  });

  test('correctly convert space-separated words to dash case', async () => {
    expect(toDashCase('oh wow okay')).toBe('oh-wow-okay');
  });

  test('correctly handle empty string', async () => {
    expect(toDashCase('')).toBe('');
  });

  test('correctly handle null input', async () => {
    expect(toDashCase(null)).toBe('');
  });

  test('correctly handle undefined input', async () => {
    expect(toDashCase(undefined)).toBe('');
  });
});

describe('convertToReadableText', () => {
  test('should insert spaces before uppercase letters', () => {
    expect(convertToReadableText('helloWorld')).toBe('Hello World');
  });

  test('should insert spaces between letters and digits', () => {
    expect(convertToReadableText('hello123world')).toBe('Hello 123 World');
  });

  test('should handle strings with both letters and digits', () => {
    expect(convertToReadableText('helloWorld123')).toBe('Hello World 123');
  });

  test('should return null for null input', () => {
    expect(convertToReadableText(null)).toBeNull();
  });

  test('should return null for undefined input', () => {
    expect(convertToReadableText(undefined)).toBeNull();
  });

  test('should return an empty string for an empty string input', () => {
    expect(convertToReadableText('')).toBe('');
  });

  test('should handle strings with multiple digits together', () => {
    expect(convertToReadableText('abc123def456')).toBe('Abc 123 Def 456');
  });

  test('should handle strings with no uppercase letters or digits', () => {
    expect(convertToReadableText('helloworld')).toBe('Helloworld');
  });

  test('should handle strings with only digits', () => {
    expect(convertToReadableText('123456')).toBe('123456');
  });
});
