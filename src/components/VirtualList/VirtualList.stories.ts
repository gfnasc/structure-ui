import type { Meta, StoryObj } from '@storybook/vue3';
import VirtualList from './VirtualList.vue';
import Button from '../Button/Button.vue';

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
  Array.from({ length: count }, (_, i) => ({ 
    id: i, 
    title: `Product ${i + 1}`,
    description: `This is a short description for product number ${i + 1}. It demonstrates text content.`,
    price: `$${(Math.random() * 100).toFixed(2)}`,
    image: `https://placehold.co/100x100?text=Prod+${i+1}`
  }));

export const CardList: Story = {
  render: (args) => ({
    components: { VirtualList, Button },
    setup() {
      const items = generateItems(1000);
      return { args, items };
    },
    template: `
      <div class="border border-gray-200 rounded-lg shadow-sm h-[600px] w-[400px] bg-gray-50 overflow-hidden">
        <div class="p-4 bg-white border-b border-gray-200 shadow-sm z-10 relative">
          <h2 class="font-bold text-lg text-gray-800">Virtual Product Feed</h2>
          <p class="text-sm text-gray-500">{{ items.length }} items loaded instantly</p>
        </div>
        
        <VirtualList v-bind="args" :items="items" class="h-[calc(100%-70px)]">
          <template #default="{ item }">
            <div class="p-3 h-full">
              <div class="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex gap-4 h-full items-center hover:shadow-md transition-shadow">
                <img :src="item.image" class="w-16 h-16 rounded bg-gray-200 object-cover flex-shrink-0" alt="" />
                
                <div class="flex-1 min-w-0">
                  <div class="flex justify-between items-start">
                    <h3 class="font-semibold text-gray-900 truncate">{{ item.title }}</h3>
                    <span class="text-green-600 font-bold text-sm">{{ item.price }}</span>
                  </div>
                  <p class="text-xs text-gray-500 line-clamp-2 mt-1">{{ item.description }}</p>
                </div>

                <Button class="px-3 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-medium rounded hover:bg-indigo-100">
                  Add
                </Button>
              </div>
            </div>
          </template>
        </VirtualList>
      </div>
    `,
  }),
  args: {
    itemHeight: 110, // Altura ajustada para o card + padding
    buffer: 5,
  },
  parameters: {
    docs: {
      source: {
        code: `
<script setup>
import { VirtualList, Button } from 'structure-ui';

// Generate 1000 items
const items = Array.from({ length: 1000 }, (_, i) => ({ 
  id: i, 
  title: \`Product \${i + 1}\`,
  price: \`$\${(Math.random() * 100).toFixed(2)}\`,
  image: \`https://placehold.co/100x100?text=Prod+\${i+1}\`
}));
</script>

<template>
  <div class="h-[600px] w-[400px]">
    <VirtualList :items="items" :itemHeight="110" class="h-full">
      <template #default="{ item }">
        <!-- Card Layout -->
        <div class="p-3 h-full">
          <div class="bg-white p-3 rounded shadow flex gap-4 items-center h-full">
            <img :src="item.image" class="w-16 h-16 rounded" />
            <div class="flex-1">
              <h3 class="font-bold">{{ item.title }}</h3>
              <span class="text-green-600">{{ item.price }}</span>
            </div>
            <Button class="bg-indigo-50 text-indigo-600 px-3 py-1 rounded">Add</Button>
          </div>
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
