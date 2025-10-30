import type { Meta, StoryObj } from '@storybook/vue3';
import Image from './Image.vue';

const meta: Meta<typeof Image> = {
  title: 'Components/Image',
  component: Image,
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'The image source URL.',
      table: { type: { summary: 'string' } },
    },
    alt: {
      control: 'text',
      description: 'The alternative text for the image, important for SEO and accessibility.',
      table: { type: { summary: 'string' } },
    },
    width: {
      control: 'number',
      description: 'The intrinsic width of the image, used for CLS optimization.',
      table: { type: { summary: 'number' } },
    },
    height: {
      control: 'number',
      description: 'The intrinsic height of the image, used for CLS optimization.',
      table: { type: { summary: 'number' } },
    },
  },
  args: {
    src: 'https://placehold.co/600x400',
    alt: 'A placeholder image',
    width: 600,
    height: 400,
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Default: Story = {
  args: {
    src: 'https://placehold.co/600x400',
    alt: 'A default placeholder image',
    width: 600,
    height: 400,
  },
};

export const SmallImage: Story = {
  args: {
    src: 'https://placehold.co/200x150',
    alt: 'A small placeholder image',
    width: 200,
    height: 150,
  },
};

export const LargeImage: Story = {
  args: {
    src: 'https://placehold.co/1200x800',
    alt: 'A large placeholder image',
    width: 1200,
    height: 800,
  },
};

export const NoDimensions: Story = {
  args: {
    src: 'https://placehold.co/400x300',
    alt: 'An image without explicit dimensions',
    width: undefined,
    height: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'When width and height are not provided, CLS optimization via padding-top is not applied.',
      },
    },
  },
};

export const LongScroll: Story = {
  render: (args) => ({
    components: { Image },
    setup() {
      return { args };
    },
    template: `
      <div style="height: 150vh; background: linear-gradient(to bottom, #f0f0f0, #e0e0e0); padding: 20px;">
        <h1>Scroll down to see the lazy-loaded image</h1>
        <p style="margin-bottom: 1500px;">Scroll area</p>
        <Image v-bind="args" />
      </div>
    `,
  }),
  args: {
    src: 'https://placehold.co/800x600?text=Lazy+Loaded+Image',
    alt: 'A lazy loaded image that appears on scroll',
    width: 800,
    height: 600,
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the lazy loading behavior. The image will only load when it enters the viewport.',
      },
    },
  },
};
