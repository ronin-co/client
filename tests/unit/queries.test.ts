import { beforeEach, describe, expect, mock, spyOn, test } from 'bun:test';
import { queriesHandler } from 'src/syntax/handlers';

let mockRequestResolvedValue: Request | undefined;

const mockFetch = mock(async (request) => {
  mockRequestResolvedValue = request;

  return Response.json({
    results: [],
  });
});

global.fetch = mockFetch;

describe('queries handler', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  test('throw if called without token', async () => {
    const originalToken = import.meta.env.RONIN_TOKEN;

    import.meta.env.RONIN_TOKEN = undefined;

    expect(queriesHandler([], {})).rejects.toThrow(
      'Please specify the `RONIN_TOKEN` environment variable or set the `token` option when invoking RONIN.',
    );

    // Restore the original token.
    import.meta.env.RONIN_TOKEN = originalToken;
  });

  test('derive the token from env if not expilicty passed down', async () => {
    const originalToken = import.meta.env.RONIN_TOKEN;

    import.meta.env.RONIN_TOKEN = 'supertoken';

    await queriesHandler([], {});

    // Restore the original token.
    import.meta.env.RONIN_TOKEN = originalToken;

    expect(mockRequestResolvedValue?.headers.get('Authorization')).toBe('Bearer supertoken');
  });

  test('run in an "process"-less environment', async () => {
    const env = process.env;
    const originalToken = import.meta.env.RONIN_TOKEN;

    // @ts-expect-error We're intentionally modifying the runtime environment.
    process.env = undefined;
    import.meta.env.RONIN_TOKEN = 'mytoken';

    await queriesHandler([], {});

    // Restore original values.
    process.env = env;
    import.meta.env.RONIN_TOKEN = originalToken;

    expect(mockRequestResolvedValue?.headers.get('Authorization')).toBe('Bearer mytoken');
  });

  test('correctly use the passed down token', async () => {
    await queriesHandler([], { token: 'takashitoken' });

    expect(mockRequestResolvedValue?.headers.get('Authorization')).toBe('Bearer takashitoken');
  });

  test('use the custom fetcher', async () => {
    const mockFetchNew = mock((request) => {
      mockRequestResolvedValue = request;

      return Response.json({
        results: [],
      });
    });

    await queriesHandler([], {
      fetch: async (request) => mockFetchNew(request),
      token: 'takashitoken',
    });

    expect(mockFetchNew).toHaveBeenCalledTimes(1);
    expect(mockRequestResolvedValue?.headers.get('Authorization')).toBe('Bearer takashitoken');
  });

  test('handle BAD_REQUEST response', async () => {
    const requestPromise = queriesHandler([], {
      token: 'takashitoken',
      fetch: async (request) => {
        mockRequestResolvedValue = request as Request;

        return Response.json({
          results: [],
          error: {
            message: 'Invalid query provided.',
            code: 'BAD_REQUEST',
          },
        });
      },
    });

    expect(requestPromise).rejects.toThrow('Invalid query provided.');
  });

  test('handle error inside results', async () => {
    const requestPromise = queriesHandler(
      [
        {
          get: {
            accounts: {},
          },
        },
      ],
      {
        token: 'takashitoken',
        fetch: async (request) => {
          mockRequestResolvedValue = request as Request;

          return Response.json({
            results: [
              {
                error: {
                  message: 'Invalid query provided.',
                  code: 'BAD_REQUEST',
                  issues: [
                    {
                      path: ['queries', 0, 'get', 'accounts'],
                    },
                  ],
                },
              },
            ],
          });
        },
      },
    );

    expect(requestPromise).rejects.toThrow('Invalid query provided.');
  });

  test('enable verbose logging', async () => {
    const logSpy = spyOn(console, 'log').mockImplementation(() => {});

    await queriesHandler([]);

    // Make sure that no logs were printed without the verbose flag.
    expect(logSpy).not.toHaveBeenCalled();

    const originalDebugLevel = import.meta.env.__RENDER_DEBUG_LEVEL;
    import.meta.env.__RENDER_DEBUG_LEVEL = 'verbose';

    await queriesHandler([]);

    import.meta.env.__RENDER_DEBUG_LEVEL = originalDebugLevel;

    // Make sure that the logs were printed with the verbose flag.
    expect(logSpy).toHaveBeenCalled();

    // Restore the global console.log() function.
    logSpy.mockRestore();
  });
});
