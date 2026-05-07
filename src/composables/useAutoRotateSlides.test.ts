import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent, ref } from 'vue';

import { useAutoRotateSlides } from '@/composables/useAutoRotateSlides.ts';

function mountAutoRotate(initialEnabled: boolean) {
  const tick = vi.fn();
  const enabled = ref(initialEnabled);

  const Host = defineComponent({
    setup() {
      const { restart } = useAutoRotateSlides({
        intervalMs: 1000,
        enabled,
        onTick: tick,
      });
      return { restart, enabled };
    },
    template: '<div />',
  });

  const wrapper = mount(Host);
  return { wrapper, tick, enabled };
}

describe('useAutoRotateSlides', () => {
  beforeEach(() => vi.useFakeTimers({ toFake: ['setInterval'] }));
  afterEach(() => vi.useRealTimers());

  it('fires onTick on every interval when enabled', () => {
    const { tick } = mountAutoRotate(true);

    vi.advanceTimersByTime(2500);
    expect(tick).toHaveBeenCalledTimes(2);
  });

  it('does not fire onTick when disabled', () => {
    const { tick } = mountAutoRotate(false);

    vi.advanceTimersByTime(5000);
    expect(tick).not.toHaveBeenCalled();
  });
});
