import toml from '@iarna/toml';
import fs from 'fs/promises';
import getPort from 'get-port';
import http from 'http';
import ini from 'ini';
import open from 'open';
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

  let token: string | undefined;

  const port = await getPort();
  const server = http.createServer().listen(port);

  const baseURL = new URL('https://ronin.co/actions/auth/cli');

  const currentHost = `http://localhost:${port}`;
  const initURL = new URL(baseURL);
  initURL.searchParams.set('from', currentHost);

  console.log(`Opening browser with the following URL:`);
  console.log(initURL.href);

  try {
    [token] = await Promise.all([
      new Promise<string>((resolve, reject) => {
        server.once('request', (req, res) => {
          res.setHeader('connection', 'close');

          const requestURL = new URL(req.url || '', currentHost);
          const requestToken = requestURL.searchParams.get('token');

          if (!requestToken) return reject(new Error('Missing token'));
          resolve(requestToken);

          const headers = { Location: baseURL.href };
          res.writeHead(307, headers).end();
        });

        server.once('error', reject);
      }),
      open(initURL.href),
    ]);
  } finally {
    server.close();
  }

  await fs.writeFile(
    CACHE_DIR_FILE,
    JSON.stringify(
      {
        token,
      },
      null,
      2,
    ),
  );

  const authenticateNPM = async () => {
    const npmConfigFile = process.env['npm_config_userconfig'] || path.join(os.homedir(), '.npmrc');

    let npmConfigContents: Record<string, any> = {};

    try {
      const contents = await fs.readFile(npmConfigFile, { encoding: 'utf-8' });
      npmConfigContents = ini.parse(contents);
    } catch (err) {
      if ((err as { code: string }).code !== 'ENOENT') {
        console.error(`Failed to read npm config file at ${npmConfigFile}`, err);
      }
    }

    npmConfigContents['@ronin:registry'] = 'https://ronin.supply';
    npmConfigContents['//ronin.supply/:_authToken'] = token;

    await fs.writeFile(npmConfigFile, ini.stringify(npmConfigContents), {
      encoding: 'utf-8',
    });
  };

  authenticateNPM();

  const authenticateBun = async () => {
    const bunConfigFile = path.join(os.homedir(), '.bunfig.toml');

    let bunConfigContents: Record<string, any> = {};

    try {
      const contents = await fs.readFile(bunConfigFile, { encoding: 'utf-8' });
      bunConfigContents = toml.parse(contents);
    } catch (err) {
      if ((err as { code: string }).code !== 'ENOENT') {
        console.error(`Failed to read npm config file at ${bunConfigFile}`, err);
      }
    }

    // Safely initialize potentially missing keys.
    if (!bunConfigContents.install) bunConfigContents.install = {};
    if (!bunConfigContents.install.scopes) bunConfigContents.install.scopes = {};
    if (!bunConfigContents.install.scopes.ronin) bunConfigContents.install.scopes.ronin = {};

    bunConfigContents.install.scopes.ronin.url = 'https://ronin.supply';
    bunConfigContents.install.scopes.ronin.token = token;

    await fs.writeFile(bunConfigFile, toml.stringify(bunConfigContents), {
      encoding: 'utf-8',
    });
  };

  authenticateBun();

  console.log('Successfully logged in');
};
