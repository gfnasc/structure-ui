import type { Meta, StoryObj } from '@storybook/vue3';
import HelloWorld from './HelloWorld.vue';

const meta: Meta<typeof HelloWorld> = {
  component: HelloWorld,
  title: 'Example/HelloWorld',
  tags: ['autodocs'],
  argTypes: {
    msg: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof HelloWorld>;

export const Primary: Story = {
  args: {
    msg: 'Hello World',
  },
};