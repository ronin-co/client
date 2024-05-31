import fs from 'fs/promises';
import os from 'os';
import path from 'path';

export const CACHE_DIR = path.join(os.homedir(), '.ronin');
export const CACHE_DIR_FILE = path.join(CACHE_DIR, 'session.json');

interface Session {
  token: string;
}

export const getSession = async (): Promise<Session | null> => {
  try {
    const contents = await fs.readFile(CACHE_DIR_FILE, {
      encoding: 'utf-8',
    });

    const parsedContents = JSON.parse(contents);
    if (parsedContents?.token) return parsedContents;
  } catch (err) {
    if ((err as { code: string }).code !== 'ENOENT') throw err;
  }

  return null;
};
