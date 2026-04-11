import { defineConfig } from 'vite'
import { resolve, dirname, relative, extname } from 'path'
import { obfuscator } from 'rollup-obfuscator'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { globSync } from 'glob'

const assetFiles = globSync(['assets/js/**/*.js', 'assets/css/**/*.css'], { nodir: true });

const dynamicInput = {
  main: resolve(__dirname, 'index.html')
};

assetFiles.forEach(file => {
  const relativePath = relative(__dirname, file).replace(extname(file), '');
  dynamicInput[relativePath] = resolve(__dirname, file);
});

export default defineConfig({
  base: '/',
  build: {
    minify: 'esbuild',
    cssCodeSplit: true,
    assetsInlineLimit: 0,
    rollupOptions: {
      input: dynamicInput,
      output: {
        entryFileNames: (chunkInfo) => {
          const dir = dirname(chunkInfo.name);
          return dir === '.' ? '[hash].js' : `${dir}/[hash].js`;
        },
        chunkFileNames: 'assets/js/[hash].js',
        assetFileNames: (assetInfo) => {
          const originalPath = assetInfo.originalFileName || '';
          
          if (originalPath.includes('assets/images/logo/favicon/')) {
            return 'assets/images/logo/favicon/[name][extname]';
          }
          if (originalPath) {
            const dir = dirname(originalPath);
            return dir === '.' ? '[hash][extname]' : `${dir}/[hash][extname]`;
          }
          return 'assets/[hash][extname]';
        }
      }
    }
  },
  plugins: [
    obfuscator({
      compact: true,
      controlFlowFlattening: false,
      stringArray: true,
      include: ['**/*.js'],
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'assets/images/logo/favicon/**/*',
          dest: 'assets/images/logo/favicon'
        }
      ]
    })
  ]
})