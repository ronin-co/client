import chalkTemplate from 'chalk-template';

import { version } from '../../../package.json';

export const printVersion = () => {
  console.log(version);
  process.exit(0);
};

export const printHelp = () => {
  const text = chalkTemplate`
    {bold.magenta ronin} — Automatically set the types for your RONIN project

    {bold USAGE}

        {bold $} {magenta ronin}
        {bold $} {magenta ronin} login
        {bold $} {magenta ronin} --help
        {bold $} {magenta ronin} --version

    {bold COMMANDS}

        login                               Authenticate with RONIN (run by default for every command)

        init [space]                        Initialize the TypeScript types for a given space

    {bold OPTIONS}

        -h, --help                          Shows this help message

        -v, --version                       Displays the current version of serve

        -d, --debug                         Show debugging information
  `;
  console.log(text);
  process.exit(0);
};
