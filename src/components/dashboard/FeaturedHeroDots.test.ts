import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import FeaturedHeroDots from '@/components/dashboard/FeaturedHeroDots.vue';

describe('FeaturedHeroDots', () => {
  it('renders one radio per slide and marks the active one', () => {
    const wrapper = mount(FeaturedHeroDots, {
      props: { count: 3, activeIndex: 1 },
    });

    const radios = wrapper.findAll('[role="radio"]');
    expect(radios).toHaveLength(3);
    expect(radios[1].attributes('aria-checked')).toBe('true');
    expect(radios[0].attributes('aria-checked')).toBe('false');
  });

  it('emits select with the chosen index', async () => {
    const wrapper = mount(FeaturedHeroDots, {
      props: { count: 3, activeIndex: 0 },
    });

    await wrapper.find('[aria-label="Featured slide 2 of 3"]').trigger('click');

    expect(wrapper.emitted('select')).toEqual([[1]]);
  });
});
