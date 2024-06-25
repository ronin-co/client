import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/bin/index.ts',
    'src/types/index.ts',
    'src/schema/index.ts',
    'src/utils/index.ts',
  ],
  format: 'esm',
  dts: true,
  esbuildOptions(options) {
    // This is required in order to make `typescript` work with `esbuild`.
    // Otherwise, you will get:
    // Error: "Dynamic require of 'fs' is not supported".
    options.inject = ['scripts/cjs-shim.ts'];
  },
});
