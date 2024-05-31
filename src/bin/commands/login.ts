import chalkTemplate from 'chalk-template';
import fs from 'fs/promises';
import getPort from 'get-port';
import http from 'http';
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

  console.log('YOU ARE NOW LOGGED IN');

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

  console.log('Successfully logged in');
};
