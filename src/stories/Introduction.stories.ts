import type { Meta, StoryObj } from '@storybook/vue3';
import Introduction from './Introduction.vue';

const meta: Meta<typeof Introduction> = {
  title: 'Introduction',
  component: Introduction,
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false, // Esconde o painel de controles para parecer uma doc
    },
  },
};

export default meta;
type Story = StoryObj<typeof Introduction>;

export const ReadMe: Story = {};
