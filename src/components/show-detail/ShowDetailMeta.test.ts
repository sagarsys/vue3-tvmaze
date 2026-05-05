import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import ShowDetailMeta from '@/components/show-detail/ShowDetailMeta.vue';

describe('ShowDetailMeta', () => {
  it('renders title, status, rating, and genres', () => {
    const wrapper = mount(ShowDetailMeta, {
      props: {
        show: {
          id: 0,
          name: 'Galaxy Quest',
          status: 'Ended',
          rating: { average: 8.4 },
          genres: ['Comedy', 'Sci-Fi'],
          premiered: '1999-01-01',
          language: 'English',
          ended: null,
          image: null,
          summary: null,
        },
      },
    });

    expect(wrapper.text()).toContain('Galaxy Quest');
    expect(wrapper.text()).toContain('Ended');
    expect(wrapper.text()).toContain('8.4');
    expect(wrapper.text()).toContain('Comedy');
    expect(wrapper.text()).toContain('Sci-Fi');
    expect(wrapper.text()).toContain('Premiered');
    expect(wrapper.text()).toContain('English');
  });
});
