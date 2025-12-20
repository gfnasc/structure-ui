import type { Meta, StoryObj } from '@storybook/vue3';
import Button from './Button.vue';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Components/Button',
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled.',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Whether the button is in a loading state.',
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      description: 'The type of the button.',
    },
    onClick: {
      action: 'clicked',
      description: 'Emitted when the button is clicked.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const HeadlessDefault: Story = {
  render: (args) => ({
    components: { Button },
    setup() { return { args }; },
    template: `
      <Button v-bind="args">
        Unstyled Button (Headless)
      </Button>
    `,
  }),
  args: {
    disabled: false,
    loading: false,
  },
  parameters: {
    docs: {
      source: {
        code: `
<Button>
  Unstyled Button (Headless)
</Button>
        `,
      },
    },
  },
};

export const StyledPrimary: Story = {
  render: (args) => ({
    components: { Button },
    setup() { return { args }; },
    template: `
      <Button 
        v-bind="args" 
        class="px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        <template #loading>
          <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </template>
        <template #default>
          Styled Button
        </template>
      </Button>
    `,
  }),
  args: {
    disabled: false,
    loading: false,
  },
  parameters: {
    docs: {
      source: {
        code: `
<Button 
  class="px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
>
  <template #loading>
    <!-- Custom Loading Spinner -->
    <svg class="animate-spin h-5 w-5 text-white" ...>...</svg>
    Processing...
  </template>
  Styled Button
</Button>
        `,
      },
    },
  },
};

export const LoadingState: Story = {
  ...StyledPrimary,
  args: {
    loading: true,
  },
  parameters: {
    docs: {
      source: {
        code: `
<Button loading class="...">
  Styled Button
</Button>
        `,
      },
    },
  },
};
