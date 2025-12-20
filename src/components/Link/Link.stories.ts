import type { Meta, StoryObj } from '@storybook/vue3';
import { defineComponent } from 'vue';
import Link from './Link.vue';

// Mock RouterLink for Storybook
const RouterLinkStub = defineComponent({
  props: ['to'],
  template: '<a :href="to"><slot /></a>',
});

const meta: Meta<typeof Link> = {
  component: Link,
  title: 'Components/Link',
  tags: ['autodocs'],
  argTypes: {
    to: {
      control: { type: 'text' },
      description: 'The internal route to navigate to (uses RouterLink).',
    },
    href: {
      control: { type: 'text' },
      description: 'The external URL to navigate to (uses <a> tag).',
    },
    external: {
      control: { type: 'boolean' },
      description: 'Whether the link is external (opens in new tab).',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the link is disabled.',
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessible label for the link.',
    },
  },
  parameters: {
    // Note: In a real app, RouterLink is provided by Vue Router.
    // In Storybook, we might need a decorator or global stub if not using the vue-router addon fully.
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const HeadlessDefault: Story = {
  render: (args) => ({
    components: { Link },
    setup() { return { args }; },
    template: `
      <Link v-bind="args">
        Unstyled Link
      </Link>
    `,
  }),
  args: {
    href: '#',
  },
  parameters: {
    docs: {
      source: {
        code: `
<Link href="#">
  Unstyled Link
</Link>
        `,
      },
    },
  },
};

export const StyledLink: Story = {
  render: (args) => ({
    components: { Link },
    setup() { return { args }; },
    template: `
      <Link 
        v-bind="args" 
        class="text-indigo-600 hover:text-indigo-800 font-medium underline decoration-2 underline-offset-2 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
      >
        Styled Link
      </Link>
    `,
  }),
  args: {
    href: 'https://example.com',
    external: true,
  },
  parameters: {
    docs: {
      source: {
        code: `
<Link 
  href="https://example.com" 
  external
  class="text-indigo-600 hover:text-indigo-800 font-medium underline decoration-2 underline-offset-2 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
>
  Styled Link
</Link>
        `,
      },
    },
  },
};

export const ButtonLikeLink: Story = {
  render: (args) => ({
    components: { Link },
    setup() { return { args }; },
    template: `
      <Link 
        v-bind="args" 
        class="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors no-underline"
      >
        Button Link
      </Link>
    `,
  }),
  args: {
    to: '/dashboard',
  },
  parameters: {
    docs: {
      source: {
        code: `
<Link 
  to="/dashboard"
  class="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors no-underline"
>
  Button Link
</Link>
        `,
      },
    },
  },
};
