#!/usr/bin/env node

import { parseArgs } from 'util';

import initializeProject from '@/src/bin/commands/init';
import logIn from '@/src/bin/commands/login';
import sync from '@/src/bin/commands/sync';
import { printHelp, printVersion } from '@/src/bin/utils/info';
import { getSession } from '@/src/bin/utils/session';

let values;
let positionals;

try {
  ({ values, positionals } = parseArgs({
    args: process.argv,
    options: {
      help: {
        type: 'boolean',
        short: 'h',
        default: false,
      },
      version: {
        type: 'boolean',
        short: 'v',
        default: false,
      },
      debug: {
        type: 'boolean',
        short: 'd',
        default: false,
      },
    },
    strict: true,
    allowPositionals: true,
  }));
} catch (err) {
  if (err instanceof Error) {
    console.error(err.message);
  } else {
    throw err;
  }

  process.exit(1);
}

const run = async () => {
  // Flags for printing useful information about the CLI.
  if (values.help) return printHelp();
  if (values.version) return printVersion();

  // This ensures that people can accidentally type uppercase letters and still
  // get the command they are looking for.
  const normalizedPositionals = positionals.map((positional) => positional.toLowerCase());

  // If this environment variable is provided, the CLI will authenticate as an
  // app for a particular space instead of authenticating as an account. This
  // is especially useful in CI, which must be independent of a team member.
  const appToken = process.env.RONIN_TOKEN;

  // If there is no active session, automatically start one and then continue
  // with the execution of the requested sub command, if there is one. If the
  // `login` sub command is invoked, we don't need to auto-login, since the
  // command itself will handle it already.
  const session = await getSession();

  if (!process.stdout.isTTY && !session && !appToken) {
    let message = 'If RONIN CLI is invoked from a non-interactive shell, ';
    message += 'a `RONIN_TOKEN` environment variable containing an app token must be provided.';

    console.error(message);
    process.exit(1);
  }

  if (!session && !normalizedPositionals.includes('login')) await logIn(appToken);

  // `login` sub command
  if (normalizedPositionals.includes('login')) return logIn(appToken);

  // `init` sub command
  if (normalizedPositionals.includes('init')) return initializeProject(positionals);

  const token = (appToken || session?.token) as string;
  // `sync` sub command
  if (normalizedPositionals.includes('sync')) return sync(positionals, token);

  // If no matching flags or commands were found, render the help, since we
  // don't want to use the main `ronin` command for anything yet.
  return printHelp();
};

run();
