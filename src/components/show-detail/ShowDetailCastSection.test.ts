import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import ShowDetailCastSection from '@/components/show-detail/ShowDetailCastSection.vue';

describe('ShowDetailCastSection', () => {
  it('renders cast list', () => {
    const wrapper = mount(ShowDetailCastSection, {
      props: {
        isPending: false,
        isError: false,
        errorMessage: '',
        cast: [
          {
            person: { id: 1, name: 'Actor One', image: null },
            character: { id: 11, name: 'Character One', image: null },
          },
        ],
      },
    });

    expect(wrapper.text()).toContain('Cast');
    expect(wrapper.text()).toContain('Actor One as Character One');
  });

  it('renders loading state', () => {
    const wrapper = mount(ShowDetailCastSection, {
      props: { isPending: true, isError: false, errorMessage: '', cast: [] },
    });
    expect(wrapper.text()).toContain('Loading cast...');
  });
});
