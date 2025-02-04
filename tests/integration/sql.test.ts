import { expect, mock, test } from 'bun:test';
import createSyntaxFactory from '@/src/index';

test('run SQL statements', async () => {
  let mockRequestResolvedValue: Request | undefined;

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

  const accountHandle = 'elaine';
  await factory.sql`SELECT * FROM accounts WHERE handle = ${accountHandle} AND active = true AND name = ${'dsaads'}`;

  expect(mockFetchNew).toHaveBeenCalledTimes(1);
  expect(await mockRequestResolvedValue?.text()).toEqual(
    '{"nativeQueries":[{"query":"SELECT * FROM accounts WHERE handle = $1 AND active = true AND name = $2","values":["elaine","dsaads"]}]}',
  );
});
