import type { Plugin } from 'esbuild';
import * as fs from 'fs';
import { defineConfig } from 'tsup';

const injectShimsPlugin: Plugin = {
  name: 'inject-shims-plugin',
  setup(build) {
    const outputFilePath = 'dist/bin/index.js';
    const scriptFilePath = './scripts/cjs-shim.ts';
    const startFromLine = 1;

    build.onEnd((result) => {
      // Read the script content from the specified file
      let scriptToInject = '';
      try {
        scriptToInject = fs.readFileSync(scriptFilePath, 'utf8');
      } catch (err) {
        console.error(`Failed to read the script file ${scriptFilePath}:`, err);
        return;
      }

      result.outputFiles = result.outputFiles!.map((outputFile) => {
        if (!outputFile.path.endsWith(outputFilePath)) {
          return outputFile;
        }

        const text = outputFile.text.split('\n');
        text.splice(startFromLine, 0, scriptToInject);

        return {
          ...outputFile,
          text: text.join('\n'),
        };
      });
    });
  },
};

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
  esbuildPlugins: [injectShimsPlugin],
});
