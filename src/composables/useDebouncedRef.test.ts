import { mount, flushPromises } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent, ref } from 'vue';

import { useDebouncedRef } from '@/composables/useDebouncedRef';

function mountDebounced(delay = 200) {
  const Host = defineComponent({
    setup() {
      const source = ref('');
      const debounced = useDebouncedRef(source, delay);
      return { source, debounced };
    },
    template: '<div />',
  });

  const wrapper = mount(Host);
  const vm = wrapper.vm as unknown as { source: string; debounced: string };

  return {
    setSource(value: string) {
      vm.source = value;
    },
    getDebounced() {
      return vm.debounced;
    },
  };
}

describe('useDebouncedRef', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('updates the debounced value only after the delay has elapsed', async () => {
    const { setSource, getDebounced } = mountDebounced(200);

    setSource('a');
    await flushPromises();
    vi.advanceTimersByTime(199);
    expect(getDebounced()).toBe('');

    vi.advanceTimersByTime(1);
    expect(getDebounced()).toBe('a');
  });

  it('cancels pending updates when the source changes again', async () => {
    const { setSource, getDebounced } = mountDebounced(200);

    setSource('a');
    vi.advanceTimersByTime(150);
    setSource('ab');
    await flushPromises();
    vi.advanceTimersByTime(199);
    expect(getDebounced()).toBe('');

    vi.advanceTimersByTime(1);
    expect(getDebounced()).toBe('ab');
  });
});
