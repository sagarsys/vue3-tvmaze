import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import AppPageSpinner from '@/components/ui/AppSpinner.vue';

describe('AppPageSpinner', () => {
  it('exposes status role and label text', () => {
    const wrapper = mount(AppPageSpinner, { props: { label: 'Working…' } });

    expect(wrapper.find('[role="status"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('Working…');
  });

  it('uses centered layout when size is page', () => {
    const wrapper = mount(AppPageSpinner, {
      props: { label: 'Wait', size: 'page' },
    });

    expect(wrapper.classes()).toContain('flex-col');
    expect(wrapper.text()).toContain('Wait');
  });

  it('uses inline layout when size is inline', () => {
    const wrapper = mount(AppPageSpinner, {
      props: { label: 'Wait', size: 'inline' },
    });

    expect(wrapper.classes()).toContain('flex-row');
    expect(wrapper.text()).toContain('Wait');
  });
});
