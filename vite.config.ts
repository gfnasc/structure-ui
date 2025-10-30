import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    globals: true, // This makes Vitest APIs like describe, it, expect globally available
    environment: 'jsdom', // or 'happy-dom' for browser-like environment
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      // Main entry point for the library
      name: 'StructureUI',
      fileName: format => `structure-ui.${format}.js`
    },
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
});