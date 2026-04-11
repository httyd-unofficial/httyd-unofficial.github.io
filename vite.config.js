import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  build: {
    minify: 'esbuild',
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: 'index.html',
      },
    },
  },
})