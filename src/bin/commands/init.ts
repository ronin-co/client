import childProcess from 'child_process';
import fs from 'fs/promises';
import json5 from 'json5';
import ora from 'ora';
import path from 'path';
import util from 'util';

const exec = util.promisify(childProcess.exec);

const exists = async (file: string) => {
  try {
    await fs.access(path.join(process.cwd(), file));
  } catch (err) {
    if ((err as { code: string }).code === 'ENOENT') {
      return false;
    } else {
      throw err;
    }
  }

  return true;
};

export default async (positionals: string[]) => {
  const spinner = ora('Initializing project').start();
  const lastPositional = positionals[positionals.length - 1];
  const spaceHandle = lastPositional === 'init' ? null : lastPositional;

  if (!spaceHandle) {
    spinner.fail('Please provide a space handle like this:\n$ ronin init my-space');
    process.exit(1);
  }

  if (!(await exists('package.json'))) {
    spinner.fail('No `package.json` found in the current directory. Please run the command in your project.');
    process.exit(1);
  }

  const packageManager = (await exists('bun.lockb')) ? 'bun' : 'npm';
  const packageManagerName = packageManager === 'bun' ? 'Bun' : 'npm';

  spinner.text = `Detected ${packageManagerName} — installing types package`;

  try {
    // Install the types package using the preferred package manager
    if (packageManager === 'bun') {
      await exec(`bun add @ronin/${spaceHandle} --dev`);
    } else {
      await exec(`npm install @ronin/${spaceHandle} --save-dev`);
    }

    // Add the types package to the project's TypeScript config if one exists
    const tsConfigPath = path.join(process.cwd(), 'tsconfig.json');

    const tsConfigExists = await exists('tsconfig.json');
    if (!tsConfigExists) return;

    const contents = await fs.readFile(tsConfigPath, 'utf-8');
    const tsConfig = json5.parse(contents);

    if (!tsConfig.compilerOptions.types || !tsConfig.compilerOptions.types.includes(`@ronin/${spaceHandle}`))
      Object.assign(tsConfig.compilerOptions, {
        types: [...(tsConfig.compilerOptions.types || []), `@ronin/${spaceHandle}`],
      });

    await fs.writeFile(tsConfigPath, JSON.stringify(tsConfig, null, 2));
  } catch (err) {
    if (err instanceof Error && err.message.includes('401')) {
      spinner.fail(`You are not a member of the "${spaceHandle}" space or the space doesn't exist.`);
      process.exit(1);
    }
  }

  spinner.succeed('Project initialized');
};
