import fs from 'fs/promises';
import os from 'os';
import path from 'path';

import { CACHE_DIR, CACHE_DIR_FILE } from '../utils';

export default async () => {
  console.log('Logging in...');

  // Ensure that the cache directory exists.
  try {
    await fs.stat(CACHE_DIR);
  } catch (err) {
    if ((err as { code: string }).code === 'ENOENT') {
      await fs.mkdir(CACHE_DIR);
    } else {
      throw err;
    }
  }

  await fs.writeFile(
    CACHE_DIR_FILE,
    JSON.stringify(
      {
        token: 'test',
      },
      null,
      2,
    ),
  );

  console.log('Successfully authenticated!');
};
