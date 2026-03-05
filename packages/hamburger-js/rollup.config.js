import { createRequire } from 'node:module';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

/** @type {import('rollup').RollupOptions[]} */
const options = [
  {
    input: './lib/index.ts',
    output: { name: 'hamburger', file: pkg.browser, format: 'umd', exports: 'named' },
    plugins: [typescript({ declaration: false, declarationDir: undefined }), resolve()],
  },
  {
    input: './lib/index.ts',
    output: [
      { file: pkg.module, format: 'esm', exports: 'named' },
      { file: pkg.main, format: 'cjs', exports: 'named' },
    ],
    plugins: [typescript({ declaration: false, declarationDir: undefined }), resolve()],
  },
];

export default options;
