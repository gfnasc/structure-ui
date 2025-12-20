import type { StorybookConfig } from '@storybook/vue3-vite';
import { mergeConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const config: StorybookConfig = {
  "stories": [
    // MDX patterns removed to prevent mdx-react-shim error
    // "../src/*.mdx",
    // "../src/stories/*.mdx",
    
    // Include the new Vue-based Introduction story
    "../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    
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
        },
      },
    });
  },
};
export default config;