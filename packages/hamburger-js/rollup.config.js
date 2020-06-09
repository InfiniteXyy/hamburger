import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { uglify } from 'rollup-plugin-uglify';
import pkg from './package.json';

/** @type {import('rollup').RollupOptions} */
const options = [
  {
    input: './lib/index.ts',
    output: { name: 'hamburger', file: pkg.browser, format: 'umd' },
    plugins: [typescript(), resolve()],
  },
  {
    input: './lib/index.ts',
    output: [
      { file: pkg.module, format: 'esm' },
      { file: pkg.main, format: 'cjs' },
    ],
    plugins: [typescript(), resolve()],
  },
];

export default options;
