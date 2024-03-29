import { resolve } from 'path';
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts()],
  build: {
    outDir:'dist',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: "@unifyui-js/accordion",
      fileName: 'accordion',
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {
          
        },
      },
    },
  },
  
})