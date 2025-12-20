import type { Meta, StoryObj } from '@storybook/vue3';
import VirtualList from './VirtualList.vue';

const meta: Meta<typeof VirtualList> = {
  component: VirtualList,
  title: 'Components/VirtualList',
  tags: ['autodocs'],
  argTypes: {
    itemHeight: {
      control: 'number',
      description: 'Height of each item in pixels.',
    },
    buffer: {
      control: 'number',
      description: 'Number of extra items to render outside the viewport.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof VirtualList>;

const generateItems = (count: number) => 
  Array.from({ length: count }, (_, i) => ({ id: i, text: `Item ${i + 1}` }));

export const TenThousandItems: Story = {
  render: (args) => ({
    components: { VirtualList },
    setup() {
      const items = generateItems(10000);
      return { args, items };
    },
    template: `
      <div class="border border-gray-300 rounded h-[400px] w-[300px]">
        <VirtualList v-bind="args" :items="items" class="h-full">
          <template #default="{ item }">
            <div class="flex items-center px-4 border-b border-gray-100 h-full hover:bg-gray-50">
              <span class="font-mono text-sm text-gray-500 mr-3">#{{ item.id }}</span>
              <span>{{ item.text }}</span>
            </div>
          </template>
        </VirtualList>
      </div>
    `,
  }),
  args: {
    itemHeight: 50,
    buffer: 5,
  },
  parameters: {
    docs: {
      source: {
        code: `
<script setup>
import { VirtualList } from 'structure-ui';

const items = Array.from({ length: 10000 }, (_, i) => ({ id: i, text: \`Item \${i + 1}\` }));
</script>

<template>
  <div class="h-[400px] w-[300px]">
    <VirtualList :items="items" :itemHeight="50" class="h-full">
      <template #default="{ item }">
        <div class="flex items-center px-4 border-b h-full">
          <span>{{ item.text }}</span>
        </div>
      </template>
    </VirtualList>
  </div>
</template>
        `,
      },
    },
  },
};
