import ora from 'ora';
import path from 'path';

import { parseSchemaDefinitionFile } from '@/src/bin/utils/schema';

export default async (positionals: string[], token: string) => {
  const spinner = ora('Reading schema definitions').start();
  const lastPositional = positionals[positionals.length - 1];
  const schemasDir = lastPositional === 'sync' ? 'schemas' : lastPositional;

  const schemaDtsFile = path.join(process.cwd(), schemasDir, 'index.d.ts');

  let status: 'reading' | 'uploading' = 'reading';
  try {
    const schemaJson = await parseSchemaDefinitionFile(schemaDtsFile);
    spinner.text = 'Uploading schema definitions';
    status = 'uploading';

    const res = await fetch('https://ronin.co/ronin/api/schemas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(schemaJson),
    });

    if (!res.ok) {
      const text = await res.text();
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
