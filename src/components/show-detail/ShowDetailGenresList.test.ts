import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import ShowDetailGenresList from '@/components/show-detail/ShowDetailGenresList.vue';

describe('ShowDetailGenresList', () => {
  it('renders a chip for each genre', () => {
    const wrapper = mount(ShowDetailGenresList, {
      props: { genres: ['Drama', 'Crime', 'Thriller'] },
    });

    const chips = wrapper.findAll('span');
    expect(chips).toHaveLength(3);
    expect(chips[0]?.text()).toBe('Drama');
    expect(chips[1]?.text()).toBe('Crime');
    expect(chips[2]?.text()).toBe('Thriller');
  });

  it('renders nothing when genres is empty', () => {
    const wrapper = mount(ShowDetailGenresList, {
      props: { genres: [] },
    });

    expect(wrapper.findAll('span')).toHaveLength(0);
  });
});
