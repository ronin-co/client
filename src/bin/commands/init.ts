import childProcess from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import util from 'node:util';
import json5 from 'json5';
import ora from 'ora';

import { exists } from '@/src/bin/utils/file';

const exec = util.promisify(childProcess.exec);

export default async (positionals: Array<string>) => {
  const spinner = ora('Initializing project').start();
  const lastPositional = positionals[positionals.length - 1];
  const spaceHandle = lastPositional === 'init' ? null : lastPositional;

  if (!spaceHandle) {
    spinner.fail('Please provide a space handle like this:\n$ ronin init my-space');
    process.exit(1);
  }

  if (!(await exists('package.json'))) {
    spinner.fail(
      'No `package.json` found in the current directory. Please run the command in your project.',
    );
    process.exit(1);
  }

  const packageManager = (await exists('bun.lockb')) ? 'bun' : 'npm';
  const packageManagerName = packageManager === 'bun' ? 'Bun' : 'npm';

  spinner.text = `Detected ${packageManagerName} — installing types package`;

  try {
    // Add `.ronin` to `.gitignore` if `.gitignore` exists but doesn't contain `.ronin`.
    const gitignoreExists = await exists('.gitignore');

    if (gitignoreExists) {
      const gitignorePath = path.join(process.cwd(), '.gitignore');
      const gitignoreContents = await fs.readFile(gitignorePath, 'utf-8');

      if (!gitignoreContents.includes('.ronin')) {
        await fs.appendFile(gitignorePath, '\n.ronin');
      }
    }

    // Install the types package using the preferred package manager
    if (packageManager === 'bun') {
      await exec(`bun add @ronin-types/${spaceHandle} --dev`);
    } else {
      await exec(`npm install @ronin-types/${spaceHandle} --save-dev`);
    }

    // Add the types package to the project's TypeScript config if one exists
    const tsConfigPath = path.join(process.cwd(), 'tsconfig.json');

    const tsConfigExists = await exists('tsconfig.json');
    if (!tsConfigExists) return;

    const contents = await fs.readFile(tsConfigPath, 'utf-8');
    const tsConfig = json5.parse(contents);

    if (!tsConfig.compilerOptions.types?.includes(`@ronin-types/${spaceHandle}`))
      Object.assign(tsConfig.compilerOptions, {
        types: [...(tsConfig.compilerOptions.types || []), `@ronin-types/${spaceHandle}`],
      });

    await fs.writeFile(tsConfigPath, JSON.stringify(tsConfig, null, 2));
  } catch (err) {
    if (err instanceof Error && err.message.includes('401')) {
      spinner.fail(
        `You are not a member of the "${spaceHandle}" space or the space doesn't exist.`,
      );
      process.exit(1);
    }
  }

  spinner.succeed('Project initialized');
};
