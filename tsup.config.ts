import { defineConfig } from 'tsup';
import { cp } from 'node:fs/promises';
import { resolve } from 'node:path';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'borders/index': 'src/borders/index.ts',
    'text/index': 'src/text/index.ts',
    'react/hooks/index': 'src/react/hooks/index.ts',
  },
  format: ['esm'],
  dts: {
    entry: {
      index: 'src/index.ts',
      'borders/index': 'src/borders/index.ts',
      'text/index': 'src/text/index.ts',
      'react/hooks/index': 'src/react/hooks/index.ts',
    },
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  loader: {
    '.css': 'css',
  },
  treeshake: true,
  async onSuccess() {
    await cp(resolve('src/borders/base.css'), resolve('dist/borders/base.css'));
    await cp(resolve('src/text/base.css'), resolve('dist/text/base.css'));
  },
});
