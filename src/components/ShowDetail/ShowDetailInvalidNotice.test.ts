import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import ShowDetailInvalidNotice from '@/components/ShowDetail/ShowDetailInvalidNotice.vue';

describe('ShowDetailInvalidNotice', () => {
  it('renders invalid id message', () => {
    const wrapper = mount(ShowDetailInvalidNotice);

    expect(wrapper.text()).toContain('Invalid show');
    expect(wrapper.text()).toContain('valid show id');
  });
});
