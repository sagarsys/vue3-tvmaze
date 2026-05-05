import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import ShowDetailPoster from '@/components/show-detail/ShowDetailPoster.vue';

describe('ShowDetailPoster', () => {
  it('renders poster image with src and alt', () => {
    const wrapper = mount(ShowDetailPoster, {
      props: {
        imageUrl: 'https://example.com/poster.jpg',
        showName: 'Sample',
      },
    });

    const img = wrapper.find('img');
    expect(img.attributes('src')).toBe('https://example.com/poster.jpg');
    expect(img.attributes('alt')).toContain('Sample');
  });
});
