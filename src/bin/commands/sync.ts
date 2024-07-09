import { select } from '@inquirer/prompts';
import ora from 'ora';
import path from 'path';

import { readConfig, resetConfig, saveConfig } from '@/src/bin/utils/config';
import { exists } from '@/src/bin/utils/file';
import { parseSchemaDefinitionFile } from '@/src/bin/utils/schema';
import { compareSchemas, getSchemas, getSpaces, replaceFieldIdsWithExisting } from '@/src/bin/utils/sync';

type Status = 'readingConfig' | 'readingSchemas' | 'comparing' | 'syncing';

export default async (positionals: string[], appToken?: string, sessionToken?: string) => {
  if (positionals.includes('-r') || positionals.includes('--reset')) {
    resetConfig();
  }

  let status: Status = 'readingConfig';
  const spinner = ora('Reading configuration').start();

  const token = appToken || sessionToken;

  if (!token) {
    throw new Error('Either an App Token or Session Token is required to sync schemas');
  }

  const customDir = positionals[0] && !positionals[0].startsWith('-') ? positionals[0] : undefined;

  // Check if custom directory exists and save it to config
  if (customDir) {
    const schemaFile = path.join(customDir, 'index.d.ts');
    const schemaFileExists = await exists(schemaFile);

    if (!schemaFileExists) {
      spinner.fail(
        'The provided schemas directory does not exist or does not contain a schema definitions file (`index.d.ts`).',
      );
      process.exit(1);
    }

    saveConfig({ schemasDir: customDir });
  }

  const config = readConfig();

  try {
    if (!config.spaceId && !appToken && sessionToken) {
      const spaces = await getSpaces(sessionToken);

      if (!spaces || spaces.length === 0) {
        spinner.fail(
          "You don't have access to any spaces or your CLI session is invalid.\n\n" +
            'Please login again (by running `npx ronin login`) or ' +
            'create a new space in the dashboard (`https://ronin.co/new`) and try again.',
        );
        process.exit(1);
      }

      if (spaces.length === 1) {
        config.spaceId = spaces[0].id;
        saveConfig({ spaceId: spaces[0].id });
      } else {
        spinner.stop();

        const answer = await select<string>({
          message: 'Which space do you want to sync schemas to?',
          choices: spaces.map((space) => ({
            name: space.handle,
            value: space.id,
            description: space.name,
          })),
        });

        config.spaceId = answer;
        saveConfig({ spaceId: answer });
      }
    }

    status = 'readingSchemas';
    spinner.text = 'Reading schema definitions';

    const schemaFile = path.join(config.schemasDir || 'schemas', 'index.d.ts');
    let schemaDefinitions = await parseSchemaDefinitionFile(schemaFile);

    status = 'comparing';
    spinner.start('Retrieving existing schemas');

    const remoteSchemas = await getSchemas(token, config.spaceId as string);

    schemaDefinitions = await replaceFieldIdsWithExisting(schemaDefinitions, remoteSchemas);

    status = 'comparing';
    spinner.text = 'Comparing local and remote schema definitions';

    await compareSchemas(schemaDefinitions, remoteSchemas, spinner);

    status = 'syncing';
    spinner.text = 'Syncing schema definitions';

    const res = await fetch('https://ronin.supply/-/ronin/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${appToken || sessionToken}`,
      },
      body: JSON.stringify({ schemas: schemaDefinitions, space: config.spaceId }),
    });

    const text = await res.text();

    if (!res.ok) {
      throw new Error(text);
    }
  } catch (err) {
    spinner.fail(
      `Failed to ${status === 'readingSchemas' ? 'read schema definitions' : 'apply new schema changes'}:\n`,
    );
    console.error(err);
    process.exit(1);
  }

  spinner.succeed('Schemas are in sync!');
};
