import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Icon from './Icon.vue';
import { icons } from './icons';

describe('Icon', () => {
  // Teste de Renderização
  it('renders the correct SVG and path data for a valid icon name', () => {
    const wrapper = mount(Icon, {
      props: { name: 'search' },
    });

    expect(wrapper.find('svg').exists()).toBe(true);
    expect(wrapper.find('path').exists()).toBe(true);
    expect(wrapper.find('path').attributes('d')).toBe(icons.search);
  });

  // Teste de Tamanho/Cor
  it('applies the correct size and color props', () => {
    const wrapper = mount(Icon, {
      props: { name: 'arrow', size: 32, color: 'red' },
    });

    const svg = wrapper.find('svg');
    expect(svg.attributes('width')).toBe('32');
    expect(svg.attributes('height')).toBe('32');
    expect(svg.attributes('stroke')).toBe('red');
  });

  it('uses default size and color when not provided', () => {
    const wrapper = mount(Icon, {
      props: { name: 'close' },
    });

    const svg = wrapper.find('svg');
    expect(svg.attributes('width')).toBe('24');
    expect(svg.attributes('height')).toBe('24');
    expect(svg.attributes('stroke')).toBe('currentColor');
  });

  // Teste de Segurança/FallBack
  it('renders a fallback message for an invalid icon name', () => {
    const wrapper = mount(Icon, {
      props: { name: 'nonexistent' as any }, // Cast to any to bypass TypeScript error for testing invalid input
    });

    expect(wrapper.find('svg').exists()).toBe(false);
    expect(wrapper.text()).toContain('[Invalid Icon]');
  });

  it('applies aria-label when provided', () => {
    const wrapper = mount(Icon, {
      props: { name: 'info', ariaLabel: 'Information icon' },
    });

    const svg = wrapper.find('svg');
    expect(svg.attributes('aria-label')).toBe('Information icon');
    expect(svg.attributes('aria-hidden')).toBeUndefined();
  });

  it('applies aria-hidden when aria-label is not provided', () => {
    const wrapper = mount(Icon, {
      props: { name: 'info' },
    });

    const svg = wrapper.find('svg');
    expect(svg.attributes('aria-hidden')).toBe('true');
    expect(svg.attributes('aria-label')).toBeUndefined();
  });
});
