import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
// Removed 'ref' as it's not directly used in this test file
import Image from './Image.vue';

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
const observe = vi.fn();
const unobserve = vi.fn();
const disconnect = vi.fn();

mockIntersectionObserver.mockReturnValue({
  observe,
  unobserve,
  disconnect,
});

vi.stubGlobal('IntersectionObserver', mockIntersectionObserver);

describe('Image', () => {
  beforeEach(() => {
    // Reset mocks before each test
    observe.mockClear();
    unobserve.mockClear();
    disconnect.mockClear();
    mockIntersectionObserver.mockClear();
  });

  it('renders the img tag with correct props and lazy loading when observed', async () => {
    const wrapper = mount(Image, {
      props: {
        src: 'https://example.com/image.jpg',
        alt: 'Test Image',
        width: 100,
        height: 50,
      },
    });

    // Initially, the img should not be rendered (placeholder should be visible)
    expect(wrapper.find('img').exists()).toBe(false);
    expect(wrapper.find('.bg-gray-200').exists()).toBe(true);

    // Simulate intersection
    const observerCallback = mockIntersectionObserver.mock.calls[0][0];
    observerCallback([{ isIntersecting: true, target: wrapper.element }]);
    await wrapper.vm.$nextTick();

    // After intersection, the img should be rendered
    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe('https://example.com/image.jpg');
    expect(img.attributes('alt')).toBe('Test Image');
    expect(img.attributes('width')).toBe('100');
    expect(img.attributes('height')).toBe('50');
    expect(img.attributes('loading')).toBe('lazy');
    expect(wrapper.find('.bg-gray-200').exists()).toBe(false);

    // Ensure observer was disconnected
    expect(disconnect).toHaveBeenCalled();
  });

  it('applies correct padding-top for CLS zero when width and height are provided', () => {
    const wrapper = mount(Image, {
      props: {
        src: 'https://example.com/image.jpg',
        alt: 'Test Image',
        width: 200,
        height: 100,
      },
    });

    // Aspect ratio for 200x100 is 50% (height/width * 100)
    expect(wrapper.attributes('style')).toContain('padding-top: 50%;');
  });

  it('does not apply padding-top if width or height are missing', () => {
    const wrapper = mount(Image, {
      props: {
        src: 'https://example.com/image.jpg',
        alt: 'Test Image',
        width: 200,
      },
    });

    expect(wrapper.attributes('style')).not.toContain('padding-top');

    const wrapper2 = mount(Image, {
      props: {
        src: 'https://example.com/image.jpg',
        alt: 'Test Image',
        height: 100,
      },
    });

    expect(wrapper2.attributes('style')).not.toContain('padding-top');
  });

  it('ensures alt prop is rendered for accessibility', async () => {
    const wrapper = mount(Image, {
      props: {
        src: 'https://example.com/image.jpg',
        alt: 'Descriptive alt text',
      },
    });

    // Simulate intersection for the img to render
    const observerCallback = mockIntersectionObserver.mock.calls[0][0];
    observerCallback([{ isIntersecting: true, target: wrapper.element }]);
    await wrapper.vm.$nextTick();

    const img = wrapper.find('img');
    expect(img.attributes('alt')).toBe('Descriptive alt text');
  });

  it('observes the root element on mount', () => {
    const wrapper = mount(Image, {
      props: {
        src: 'https://example.com/image.jpg',
        alt: 'Test Image',
      },
    });

    expect(mockIntersectionObserver).toHaveBeenCalledTimes(1);
    expect(observe).toHaveBeenCalledTimes(1);
    expect(observe).toHaveBeenCalledWith(wrapper.element);
  });

  it('disconnects the observer on unmount', () => {
    const wrapper = mount(Image, {
      props: {
        src: 'https://example.com/image.jpg',
        alt: 'Test Image',
      },
    });

    // Simulate intersection to ensure observer is created and then disconnected
    const observerCallback = mockIntersectionObserver.mock.calls[0][0];
    observerCallback([{ isIntersecting: true, target: wrapper.element }]);
    wrapper.unmount();

    expect(disconnect).toHaveBeenCalledTimes(1);
  });
});
