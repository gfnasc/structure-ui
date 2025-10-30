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
    default: {
      control: { type: 'text' },
      description: 'The content of the link.',
    },
  },
  parameters: {
    stubs: {
      RouterLink: RouterLinkStub,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const InternalLink: Story = {
  args: {
    to: '/some-internal-route',
    default: 'Internal Link',
  },
};

export const ExternalLink: Story = {
  args: {
    href: 'https://www.google.com',
    external: true,
    default: 'External Link to Google',
  },
};

export const SimpleExternalLink: Story = {
  args: {
    href: 'https://www.github.com',
    default: 'Simple External Link',
  },
};

export const DisabledLink: Story = {
  args: {
    to: '/some-internal-route',
    disabled: true,
    default: 'Disabled Link',
  },
};

export const LinkWithAriaLabel: Story = {
  args: {
    to: '/accessibility',
    ariaLabel: 'Navigate to accessibility page',
    default: 'A11y Link',
  },
};
