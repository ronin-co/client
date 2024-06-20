import ora from 'ora';
import path from 'path';

import { parseSchemaDtsFile } from '@/src/bin/utils/schema';

export default async (positionals: string[]) => {
  const spinner = ora('Reading schema definitions').start();
  const lastPositional = positionals[positionals.length - 1];
  const schemasDir = lastPositional === 'sync' ? 'schemas' : lastPositional;

  const schemaDtsFile = path.join(process.cwd(), schemasDir, 'index.d.ts');

  try {
    const schemaJson = parseSchemaDtsFile(schemaDtsFile);
    console.log(schemaJson);
  } catch (err) {
    spinner.fail('Failed to read schema definitions');
    throw err;
  }

  spinner.succeed('Project initialized');
};
