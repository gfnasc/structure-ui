import type { StorybookConfig } from '@storybook/vue3-vite';
import { mergeConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const config: StorybookConfig = {
  "stories": [
    "../src/components/**/*.mdx",
    "../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
  ],
  "framework": {
    "name": "@storybook/vue3-vite",
    "options": {}
  },
  async viteFinal(config) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    return mergeConfig(config, {
      resolve: {
        alias: {
          // Removed the alias for useStructureLazy to enable actual lazy loading in Storybook
          // '../../composables/useStructureLazy': path.resolve(__dirname, '../src/composables/useStructureLazy/useStructureLazy.storybook.ts'),
        },
      },
    });
  },
};
export default config;