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
});
