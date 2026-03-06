import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/hamburger.ts', 'src/hamburger-create.ts'],
  format: ['esm'],
  clean: true,
});
