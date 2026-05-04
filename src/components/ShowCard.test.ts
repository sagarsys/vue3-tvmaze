import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import ShowCard from '@/components/ShowCard.vue';
import type { TvMazeShowSummary } from '@/types/tvmaze.ts';

const mockShow: TvMazeShowSummary = {
  id: 42,
  name: 'Test Show',
  genres: ['Drama'],
  rating: { average: 8.2 },
  image: null,
  summary: null,
};

describe('ShowCard', () => {
  it('renders show name and rating', () => {
    const wrapper = mount(ShowCard, {
      props: { show: mockShow },
    });

    expect(wrapper.text()).toContain('Test Show');
    expect(wrapper.text()).toContain('8.2');
  });
});
