import type { Meta, StoryObj } from '@storybook/vue3';
import Icon from './Icon.vue';
import { icons, type IconName } from './icons';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(icons) as IconName[], // Explicitly cast to IconName[]
      description: 'The name of the icon to display.',
      table: { type: { summary: 'IconName' } },
    },
    size: {
      control: 'number',
      description: 'The size of the icon in pixels (width and height).',
      table: { type: { summary: 'number' } },
    },
    color: {
      control: 'color',
      description: 'The color of the icon.',
      table: { type: { summary: 'string' } },
    },
    ariaLabel: {
      control: 'text',
      description: "Accessible label for the icon, if it's interactive.", // Fixed syntax error here
      table: { type: { summary: 'string' } },
    },
  },
  args: {
    name: 'search',
    size: 24,
    color: 'currentColor',
    ariaLabel: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: 'search',
  },
};

export const AllIcons: Story = {
  render: (args) => ({
    components: { Icon },
    setup() {
      const iconNames = Object.keys(icons) as IconName[];
      return { args, iconNames };
    },
    template: `
      <div class="flex flex-wrap gap-4">
        <div v-for="iconName in iconNames" :key="iconName" class="flex flex-col items-center">
          <Icon v-bind="args" :name="iconName" />
          <span class="text-xs mt-1">{{ iconName }}</span>
        </div>
      </div>
    `,
  }),
  args: {
    size: 32,
    color: '#333',
  },
  parameters: {
    docs: {
      description: {
        story: 'Displays all available icons with a custom size and color.',
      },
    },
  },
};

export const CustomSizeAndColor: Story = {
  args: {
    name: 'arrow',
    size: 48,
    color: 'blue',
  },
};

export const WithAriaLabel: Story = {
  args: {
    name: 'close',
    ariaLabel: 'Close dialog',
  },
  parameters: {
    docs: {
      description: {
        story: 'An icon with an accessible label for screen readers.',
      },
    },
  },
};

export const InvalidIcon: Story = {
  args: {
    name: 'nonexistent' as IconName, // Explicitly cast for testing invalid input
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the fallback for an invalid icon name.',
      },
    },
  },
};
