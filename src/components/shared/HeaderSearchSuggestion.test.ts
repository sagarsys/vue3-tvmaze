import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import HeaderSearchSuggestion from '@/components/shared/HeaderSearchSuggestion.vue';
import defaultPoster from '@/assets/default-poster.png';
import type { TvMazeSearchResult } from '@/types/tvmaze';

const routerStub = {
  RouterLink: {
    template: '<a :data-to="JSON.stringify(to)"><slot /></a>',
    props: ['to'],
  },
};

function resultStub(overrides?: Partial<TvMazeSearchResult['show']>): TvMazeSearchResult {
  return {
    score: 1,
    show: {
      id: 7,
      name: 'Planet Earth',
      genres: ['Documentary', 'Nature', 'Drama'],
      rating: { average: 8.7 },
      image: {
        medium: 'https://example.com/show.jpg',
        original: 'https://example.com/show-lg.jpg',
      },
      summary: null,
      premiered: null,
      status: null,
      ...overrides,
    },
  };
}

describe('HeaderSearchSuggestion', () => {
  it('renders show data and points to the show route', () => {
    const result = resultStub();
    const wrapper = mount(HeaderSearchSuggestion, {
      props: { result },
      global: { stubs: routerStub },
    });

    expect(wrapper.text()).toContain('Planet Earth');
    expect(wrapper.text()).toContain('Documentary, Nature, Drama');
    expect(wrapper.text()).toContain('8.7');
    expect(wrapper.find('img').attributes('src')).toBe('https://example.com/show.jpg');

    expect(wrapper.find('a').attributes('data-to')).toBe(
      JSON.stringify({
        name: 'show',
        params: { id: '7' },
      })
    );
  });

  it('renders fallback values when image, genres, or rating are missing', () => {
    const result = resultStub({
      image: null,
      genres: [],
      rating: { average: null },
    });
    const wrapper = mount(HeaderSearchSuggestion, {
      props: { result },
      global: { stubs: routerStub },
    });

    expect(wrapper.find('img').attributes('src')).toBe(defaultPoster);
    expect(wrapper.text()).toContain('No genres');
    expect(wrapper.text()).not.toContain('8.7');
  });

  it('emits pick when the suggestion is clicked', async () => {
    const wrapper = mount(HeaderSearchSuggestion, {
      props: { result: resultStub() },
      global: { stubs: routerStub },
    });

    await wrapper.find('a').trigger('click');
    expect(wrapper.emitted('pick')).toHaveLength(1);
  });
});
