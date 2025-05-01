import { AsyncLocalStorage } from 'node:async_hooks';

import { describe, expect, spyOn, test } from 'bun:test';

import createSyntaxFactory from '@/src/index';
import { runQueriesWithEffects } from '@/src/utils/effects';

describe('edge runtime', () => {
  test('invoke `ronin` from an edge runtime without passing a token', async () => {
    let error: Error | undefined;

    // Simulate a web runtime.
    const oldProcess = global.process;
    global.process = undefined as unknown as NodeJS.Process;

    try {
      const factory = createSyntaxFactory({});

      await factory.get.account();
    } catch (err) {
      error = err as Error;
    }

    // Restore the old runtime.
    global.process = oldProcess;

    expect(error?.message).toMatch(
      'When invoking RONIN from an edge runtime, the `token` option must be set.',
    );
  });

  test('invoke `ronin` from an edge runtime without `waitUntil` set', async () => {
    let error: Error | undefined;

    // Simulate a web runtime.
    const oldProcess = global.process;
    global.process = undefined as unknown as NodeJS.Process;

    try {
      const factory = createSyntaxFactory({
        token: 'supertoken',
        effects: {
          // @ts-expect-error - We are deliberately causing an error.
          add: () => undefined,
        },
        asyncContext: new AsyncLocalStorage(),
      });

      await factory.add.account({ with: { handle: 'leo' } });
    } catch (err) {
      error = err as Error;
    }

    // Restore the old runtime.
    global.process = oldProcess;

    expect(error?.message).toMatch(
      `In the case that the "ronin" package receives a value for its \`effects\` option, it must also receive a value for its \`waitUntil\` option. This requirement only applies when using an edge runtime and ensures that the edge worker continues to execute until all "following" effects have been executed.`,
    );
  });

  test('invoke `ronin` from an edge runtime with `waitUntil` set', async () => {
    const queries = [
      {
        add: { account: { with: { handle: 'leo' } } },
      },
    ];

    const effectInvocation = { happened: () => true };
    const effectInvocationHappened = spyOn(effectInvocation, 'happened');

    const promisesToAwait: Array<Promise<unknown>> = [];

    // Simulate a web runtime.
    const oldProcess = global.process;
    global.process = undefined as unknown as NodeJS.Process;

    await runQueriesWithEffects(
      queries.map((query) => ({ query })),
      {
        fetch: async () => {
          return Response.json({
            results: [
              {
                record: {
                  id: '1',
                  handle: 'leo',
                  firstName: 'Leo',
                  lastName: 'Lamprecht',
                },
              },
            ],
          });
        },
        effects: {
          account: {
            followingAdd: async () => {
              // Sleep for 50 milliseconds to simulate an asynchronous action.
              await new Promise((resolve) => setTimeout(resolve, 50));

              effectInvocation.happened();
            },
          },
        },
        waitUntil: (promise) => {
          promisesToAwait.push(promise);
        },
        asyncContext: new AsyncLocalStorage(),
      },
    );

    // Restore the old runtime.
    global.process = oldProcess;

    expect(promisesToAwait.length).toBeGreaterThan(0);

    // Wait for asynchronous "following" effects to finish.
    expect(effectInvocationHappened).not.toHaveBeenCalled();
    await Promise.all(promisesToAwait);
    expect(effectInvocationHappened).toHaveBeenCalled();
  });

  test('invoke `ronin` from an edge runtime with `waitUntil` set and error being thrown', async () => {
    const queries = [
      {
        add: { account: { with: { handle: 'leo' } } },
      },
    ];

    const errorText = 'I am an error';
    const promisesToAwait: Array<Promise<unknown>> = [];

    // Simulate a web runtime.
    const oldProcess = global.process;
    global.process = undefined as unknown as NodeJS.Process;

    await runQueriesWithEffects(
      queries.map((query) => ({ query })),
      {
        fetch: async () => {
          return Response.json({
            results: [
              {
                record: {
                  id: '1',
                  handle: 'leo',
                  firstName: 'Leo',
                  lastName: 'Lamprecht',
                },
              },
            ],
          });
        },
        effects: {
          account: {
            followingAdd: () => {
              throw new Error(errorText);
            },
          },
        },
        waitUntil: (promise) => {
          promisesToAwait.push(promise);
        },
        asyncContext: new AsyncLocalStorage(),
      },
    );

    // Restore the old runtime.
    global.process = oldProcess;

    // Wait for asynchronous "following" effects to finish.
    expect(promisesToAwait[0]).rejects.toThrow(errorText);
  });

  test('invoke `ronin` from an edge runtime with `waitUntil` set and ensure hidden result', async () => {
    const queries = [
      {
        add: { account: { with: { handle: 'leo' } } },
      },
    ];

    const promisesToAwait: Array<Promise<unknown>> = [];

    // Simulate a web runtime.
    const oldProcess = global.process;
    global.process = undefined as unknown as NodeJS.Process;

    await runQueriesWithEffects(
      queries.map((query) => ({ query })),
      {
        fetch: async () => {
          return Response.json({
            results: [
              {
                record: {
                  id: '1',
                  handle: 'leo',
                  firstName: 'Leo',
                  lastName: 'Lamprecht',
                },
              },
            ],
          });
        },
        effects: {
          account: {
            followingAdd: async () => {
              // Sleep for 50 milliseconds to simulate an asynchronous action.
              await new Promise((resolve) => setTimeout(resolve, 50));
            },
          },
        },
        waitUntil: (promise) => {
          promisesToAwait.push(promise);
        },
        asyncContext: new AsyncLocalStorage(),
      },
    );

    // Restore the old runtime.
    global.process = oldProcess;

    // Wait for asynchronous "following" effects to finish.
    const result = await Promise.all(promisesToAwait);

    // Ensure that the internal results of the effect run are not being exposed.
    // In other words, the promises handed to `waitUntil` must not resolve with
    // any value, since their purpose is to run asynchronous "following" effects.
    expect(result).toMatchObject([undefined]);
  });
});
