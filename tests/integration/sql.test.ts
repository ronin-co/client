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

  await factory.sql`SELECT * FROM accounts`;

  expect(mockFetchNew).toHaveBeenCalledTimes(1);
  expect(await mockRequestResolvedValue?.text()).toEqual(
    '{"queries":[{"count":{"spaces":{"with":{"membersCount":{"greaterThan":10}}}}}]}',
  );
});
