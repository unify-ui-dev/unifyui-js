import UnoCSS from 'unocss/vite'
import { resolve } from 'path';
import { defineConfig } from 'vite'


export default defineConfig({
  plugins: [UnoCSS()],
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