import { mount, flushPromises } from '@vue/test-utils';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

import FeaturedHeroSlide from '@/components/dashboard/FeaturedHeroSlide.vue';
import FeaturedHeroSlider from '@/components/dashboard/FeaturedHeroSlider.vue';
import type { TvMazeShowSummary } from '@/types/tvmaze';

function stubShow(id: number, name: string, rating: number): TvMazeShowSummary {
  return {
    id,
    name,
    genres: [],
    rating: { average: rating },
    image: null,
    summary: null,
    premiered: null,
    status: null,
  };
}

describe('FeaturedHeroSlider', () => {
  beforeEach(() => vi.useFakeTimers({ toFake: ['setInterval'] }));
  afterEach(() => vi.useRealTimers());

  it('shows the next slide after clicking next', async () => {
    const wrapper = mount(FeaturedHeroSlider, {
      props: {
        shows: [stubShow(1, 'Solar Winds', 9), stubShow(2, 'Ocean Gate', 8.5)],
      },
      global: {
        stubs: {
          RouterLink: { template: '<a><slot /></a>', props: ['to'] },
        },
      },
    });

    expect(wrapper.findComponent(FeaturedHeroSlide).props('show').name).toBe('Solar Winds');

    await wrapper.find('[aria-label="Next featured show"]').trigger('click');
    await flushPromises();

    expect(wrapper.findComponent(FeaturedHeroSlide).props('show').name).toBe('Ocean Gate');
  });

  it('selects a slide when clicking a pagination dot', async () => {
    const wrapper = mount(FeaturedHeroSlider, {
      props: {
        shows: [
          stubShow(10, 'Alpha Team', 9),
          stubShow(20, 'Beta Squad', 8),
          stubShow(30, 'Gamma Unit', 7),
        ],
      },
      global: {
        stubs: {
          RouterLink: { template: '<a><slot /></a>', props: ['to'] },
        },
      },
    });

    await wrapper.find('[aria-label="Featured slide 2 of 3"]').trigger('click');
    await flushPromises();

    expect(wrapper.findComponent(FeaturedHeroSlide).props('show').name).toBe('Beta Squad');
  });
});
