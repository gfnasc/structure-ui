import type { Preview } from '@storybook/vue3-vite'
import '../src/assets/main.css';
import { setup } from '@storybook/vue3';
import { createRouter, createWebHistory } from 'vue-router';

// Create a mock router instance
const router = createRouter({
  history: createWebHistory(),
  routes: [],
});

// Register the mock router globally for all stories
setup((app) => {
  app.use(router);
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;