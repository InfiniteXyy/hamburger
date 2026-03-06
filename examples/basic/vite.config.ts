import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  esbuild: {
    jsx: 'transform',
    jsxFactory: 'hamburger.createElement',
    jsxImportSource: undefined,
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
  },
});
