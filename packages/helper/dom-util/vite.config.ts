import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins:[dts()],
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@unify-ui/dom-util',
      fileName: 'dom-util',
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {
          
        },
      },
    },
  },
});
