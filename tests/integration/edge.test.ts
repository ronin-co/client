import { AsyncLocalStorage } from 'node:async_hooks';

import { beforeEach, describe, expect, mock, spyOn, test } from 'bun:test';

import createSyntaxFactory from '@/src/index';
import { runQueriesWithHooks } from '@/src/utils/data-hooks';

const mockFetch = mock(async () => {
  return Response.json({
    results: [],
  });
});

global.fetch = mockFetch;

describe('edge runtime', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

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
        hooks: {
          // @ts-expect-error - We are deliberately causing an error.
          beforeCreate: () => undefined,
        },
        asyncContext: new AsyncLocalStorage(),
      });

      await factory.create.account({ with: { handle: 'leo' } });
    } catch (err) {
      error = err as Error;
    }

    // Restore the old runtime.
    global.process = oldProcess;

    expect(error?.message).toMatch(
      `In the case that the "ronin" package receives a value for its \`hooks\` option, it must also receive a value for its \`waitUntil\` option. This requirement only applies when using an edge runtime and ensures that the edge worker continues to execute until all "after" hooks have been executed.`,
    );
  });

  test('invoke `ronin` from an edge runtime with `waitUntil` set', async () => {
    const queries = [
      {
        create: { account: { with: { handle: 'leo' } } },
      },
    ];

    const hookInvocation = { happened: () => true };
    const hookInvocationHappened = spyOn(hookInvocation, 'happened');

    const promisesToAwait: Promise<unknown>[] = [];

    // Simulate a web runtime.
    const oldProcess = global.process;
    global.process = undefined as unknown as NodeJS.Process;

    await runQueriesWithHooks(queries, {
      hooks: {
        account: {
          afterCreate: async function () {
            // Sleep for 50 milliseconds to simulate an asynchronous action.
            await new Promise((resolve) => setTimeout(resolve, 50));

            hookInvocation.happened();
          },
        },
      },
      waitUntil: (promise) => {
        promisesToAwait.push(promise);
      },
      asyncContext: new AsyncLocalStorage(),
    });

    // Restore the old runtime.
    global.process = oldProcess;

    expect(promisesToAwait.length).toBeGreaterThan(0);

    // Wait for asynchronous actions to finish.
    expect(hookInvocationHappened).not.toHaveBeenCalled();
    await Promise.all(promisesToAwait);
    expect(hookInvocationHappened).toHaveBeenCalled();
  });
});
