import getPort from 'get-port';
import http from 'http';
import open from 'open';
import ora from 'ora';

import { storeSession, storeSessionForBun, storeSessionforNPM } from '../utils/session';

export default async () => {
  const spinner = ora('Logging in').start();

  let token: string | undefined;

  const port = await getPort();
  const server = http.createServer().listen(port);

  const baseURL = new URL('https://ronin.co/actions/auth/cli');

  const currentHost = `http://localhost:${port}`;
  const initURL = new URL(baseURL);
  initURL.searchParams.set('from', currentHost);

  spinner.text = `Please log in using the following URL:\n${initURL.href}`;
  spinner.suffixText = `\n`;

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

  // Initialize sessions for the RONIN CLI and all relevant package managers.
  await Promise.all([storeSession(token), storeSessionforNPM(token), storeSessionForBun(token)]);

  spinner.suffixText = '';
  spinner.succeed('Logged in successfully!');
};
