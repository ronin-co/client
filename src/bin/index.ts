import { printHelp, printVersion } from 'src/bin/utils/info';
import { parseArgs } from 'util';

import initializeProject from './commands/init';
import logIn from './commands/login';
import { getSession } from './utils/session';

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

  // If there is no active session, automatically start one and then continue
  // with the execution of the requested sub command, if there is one.
  const session = await getSession();
  if (!session) await logIn();

  // This ensures that people can accidentally type uppercase letters and still
  // get the command they are looking for.
  const normalizedPositionals = positionals.map((positional) => positional.toLowerCase());

  // `login` command
  if (normalizedPositionals.includes('login')) return logIn();

  // `init` command
  if (normalizedPositionals.includes('init')) return initializeProject(positionals);

  // If no matching flags or commands were found, render the help, since we
  // don't want to use the main `ronin` command for anything yet.
  return printHelp();
};

run();
