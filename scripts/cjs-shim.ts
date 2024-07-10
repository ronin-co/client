// Source: https://github.com/evanw/esbuild/issues/1921#issuecomment-1898197331
import { createRequire } from 'node:module';
import url from 'node:url';
globalThis.require = createRequire(import.meta.url);
globalThis.__filename = url.fileURLToPath(import.meta.url);
// @ts-expect-error The `path` module will anyway be imported by the injected script
globalThis.__dirname = path.dirname(__filename);
