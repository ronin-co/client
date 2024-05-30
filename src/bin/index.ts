import chalkTemplate from 'chalk-template';
import { parseArgs } from 'util';

import { version } from '../../package.json';

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
  if (err instanceof Error) console.error(err.message);
  process.exit(1);
}

if (values.help) {
  const text = chalkTemplate`
  {bold.magenta ronin} — Automatically set the types for your RONIN project

  {bold USAGE}

    {bold $} {magenta ronin}
    {bold $} {magenta ronin} login
    {bold $} {magenta ronin} --help
    {bold $} {magenta ronin} --version

  {bold COMMANDS}

    login                               Authenticate with RONIN (run by default for every command)

  {bold OPTIONS}

    -h, --help                          Shows this help message

    -v, --version                       Displays the current version of serve

    -d, --debug                         Show debugging information
`;
  console.log(text);
  process.exit(0);
}

if (values.version) {
  console.log(version);
  process.exit(0);
}

console.log(positionals);
