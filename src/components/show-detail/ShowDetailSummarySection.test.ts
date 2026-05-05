import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import ShowDetailSummarySection from '@/components/show-detail/ShowDetailSummarySection.vue';

describe('ShowDetailSummarySection', () => {
  it('renders summary heading and text', () => {
    const wrapper = mount(ShowDetailSummarySection, {
      props: { text: 'A classic space parody.' },
    });

    expect(wrapper.text()).toContain('A classic space parody.');
  });
});
