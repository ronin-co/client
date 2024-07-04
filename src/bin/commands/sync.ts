import { select } from '@inquirer/prompts';
import fs from 'fs';
import ora from 'ora';
import path from 'path';

import { readConfig, saveConfig } from '@/src/bin/utils/config';
import { exists } from '@/src/bin/utils/file';
import { parseSchemaDefinitionFile } from '@/src/bin/utils/schema';

const getInfoFromSession = async (sessionToken: string) => {
  let res;
  try {
    res = await fetch('http://localhost:5100/-/ronin/spaces', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionToken}`,
      },
    });
  } catch (err) {
    throw new Error('Failed to fetch available spaces: ${err.message}');
  }

  const text = await res.text();

  let json;
  try {
    json = JSON.parse(text);
  } catch (err) {
    throw new Error(`Failed to parse response from server: ${text}`);
  }

  const spaces = json.spaces as { id: string; handle: string; name: string }[];

  return { spaces };
};

export default async (positionals: string[], appToken?: string, sessionToken?: string) => {
  const spinner = ora('Reading schema definitions').start();

  if (!appToken && !sessionToken) {
    spinner.fail('Either an App Token or Session Token is required to sync schemas');
    process.exit(1);
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

  let status: 'reading' | 'uploading' = 'reading';
  try {
    if (!config.spaceId && !appToken && sessionToken) {
      const { spaces } = await getInfoFromSession(sessionToken);

      if (spaces.length === 0) {
        spinner.fail(
          "You don't have access to any spaces or your CLI session is invalid. Please login again or create a new space and try again.",
        );
      }

      if (spaces.length === 1) {
        saveConfig({ spaceId: spaces[0].id });
      }

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

    const schemasDir = config.schemasDir || 'schemas';
    const schemaFile = path.join(schemasDir, 'index.d.ts');
    const schemaJson = await parseSchemaDefinitionFile(schemaFile);

    spinner.start('Uploading schema definitions');
    status = 'uploading';

    const res = await fetch('http://localhost:5100/-/ronin/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${appToken || sessionToken}`,
      },
      body: JSON.stringify({ schemas: schemaJson, space: config.spaceId }),
    });

    const text = await res.text();
    console.log(text);

    if (!res.ok) {
      throw new Error(text);
    }
  } catch (err) {
    spinner.fail(
      `Failed to ${status === 'reading' ? 'read schema definitions' : 'apply new schema changes'}:\n`,
    );
    console.error(err);
    process.exit(1);
  }

  spinner.succeed('Schemas are in sync!');
};
