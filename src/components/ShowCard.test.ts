import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import ShowCard from '@/components/ShowCard.vue';
import defaultPoster from '@/assets/default-poster.png';
import type { TvMazeShowSummary } from '@/types/tvmaze.ts';

const mockShow: TvMazeShowSummary = {
  id: 42,
  name: 'Test Show',
  genres: ['Drama'],
  rating: { average: 8.2 },
  image: {
    medium: 'https://example.com/poster.jpg',
    original: 'https://example.com/poster-lg.jpg',
  },
  summary: null,
};

describe('ShowCard', () => {
  it('renders poster, show name and rating', () => {
    const wrapper = mount(ShowCard, {
      props: { show: mockShow },
    });

    expect(wrapper.find('img').attributes('src')).toBe('https://example.com/poster.jpg');
    expect(wrapper.text()).toContain('Test Show');
    expect(wrapper.text()).toContain('8.2');
  });

  it('renders fallback poster block when image is missing', () => {
    const wrapper = mount(ShowCard, {
      props: { show: { ...mockShow, image: null } },
    });

    const poster = wrapper.find('img');
    expect(poster.exists()).toBe(true);
    expect(poster.attributes('src')).toBe(defaultPoster);
  });
});
