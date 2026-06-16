import { defineConfig } from 'tsup';
import { cp, readFile, writeFile } from 'node:fs/promises';
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

    const cssImport = `import './index.css';\n`;
    const entries = [
      resolve('dist/index.js'),
      resolve('dist/borders/index.js'),
      resolve('dist/text/index.js'),
    ];
    for (const entry of entries) {
      const content = await readFile(entry, 'utf-8');
      await writeFile(entry, cssImport + content);
    }
  },
});
