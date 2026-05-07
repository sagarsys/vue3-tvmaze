import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import FeaturedHeroSlide from '@/components/dashboard/FeaturedHeroSlide.vue';
import defaultPoster from '@/assets/default-poster.png';
import type { TvMazeShowSummary } from '@/types/tvmaze';

const routerStub = {
  RouterLink: {
    template: '<a :data-to="JSON.stringify(to)"><slot /></a>',
    props: ['to'],
  },
};

const sampleShow: TvMazeShowSummary = {
  id: 902,
  name: 'Neo Tokyo',
  genres: ['Drama'],
  rating: { average: 9.3 },
  image: {
    medium: 'https://example.com/med.jpg',
    original: 'https://example.com/large.jpg',
  },
  summary: '<p>Worth the hype.</p>',
  premiered: null,
  status: null,
};

describe('FeaturedHeroSlide', () => {
  it('shows title, synopsis, badges, rating, play link to show route', () => {
    const wrapper = mount(FeaturedHeroSlide, {
      props: { show: sampleShow },
      global: { stubs: routerStub },
    });

    expect(wrapper.text()).toContain('Neo Tokyo');
    expect(wrapper.text()).toContain('Drama');
    expect(wrapper.text()).toContain('9.3');
    expect(wrapper.text()).toContain('Worth the hype');
    expect(wrapper.find('img.object-cover').attributes('src')).toBe(
      'https://example.com/large.jpg'
    );

    expect(
      wrapper
        .findAll('a')
        .map((el) => el.attributes('data-to'))
        .filter(Boolean)
        .some(
          (payload) =>
            typeof payload === 'string' &&
            JSON.stringify({ name: 'show', params: { id: '902' } }) === payload
        )
    ).toBe(true);
  });

  it('falls back poster when artwork is missing', () => {
    const wrapper = mount(FeaturedHeroSlide, {
      props: { show: { ...sampleShow, image: null } },
      global: { stubs: routerStub },
    });

    expect(wrapper.find('img.object-cover').attributes('src')).toBe(defaultPoster);
  });
});
