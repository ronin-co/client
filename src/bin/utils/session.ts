import toml from '@iarna/toml';
import fs from 'fs/promises';
import ini from 'ini';
import os from 'os';
import path from 'path';

const CACHE_DIR = path.join(os.homedir(), '.ronin');
const CACHE_DIR_FILE = path.join(CACHE_DIR, 'session.json');

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

const readConfigFile = async (
  filePath: string,
  name: string,
  parser: (config: string) => Record<string, any>,
): Promise<Record<string, any>> => {
  let npmConfigContents: Record<string, any> = {};

  try {
    const contents = await fs.readFile(filePath, { encoding: 'utf-8' });
    npmConfigContents = parser(contents);
  } catch (err) {
    if ((err as { code: string }).code !== 'ENOENT') {
      console.error(`Failed to read ${name} config file at ${filePath}`, err);
    }
  }

  return npmConfigContents;
};

const writeConfigFile = async (filePath: string, contents: string) => {
  return fs.writeFile(filePath, contents, { encoding: 'utf-8' });
};

export const storeSession = async (token: string) => {
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

  return writeConfigFile(CACHE_DIR_FILE, JSON.stringify({ token }, null, 2));
};

export const storeTokenForNPM = async (token: string) => {
  const npmConfigFile = process.env['npm_config_userconfig'] || path.join(os.homedir(), '.npmrc');
  const npmConfigContents = await readConfigFile(npmConfigFile, 'npm', ini.parse);

  npmConfigContents['@ronin:registry'] = 'https://ronin.supply';
  npmConfigContents['//ronin.supply/:_authToken'] = token;

  await writeConfigFile(npmConfigFile, ini.stringify(npmConfigContents));
};

export const storeTokenForBun = async (token: string) => {
  const bunConfigFile = path.join(os.homedir(), '.bunfig.toml');
  const bunConfigContents = await readConfigFile(bunConfigFile, 'Bun', toml.parse);

  // Safely initialize potentially missing keys.
  if (!bunConfigContents.install) bunConfigContents.install = {};
  if (!bunConfigContents.install.scopes) bunConfigContents.install.scopes = {};
  if (!bunConfigContents.install.scopes.ronin) bunConfigContents.install.scopes.ronin = {};

  bunConfigContents.install.scopes.ronin.url = 'https://ronin.supply';
  bunConfigContents.install.scopes.ronin.token = token;

  await writeConfigFile(bunConfigFile, toml.stringify(bunConfigContents));
};
