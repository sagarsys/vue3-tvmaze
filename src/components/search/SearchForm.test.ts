import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import SearchForm from '@/components/search/SearchForm.vue';

describe('SearchForm', () => {
  it('emits model update on input', async () => {
    const wrapper = mount(SearchForm, { props: { modelValue: '' } });

    await wrapper.find('input').setValue('dexter');

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['dexter']);
  });

  it('emits submit when form is submitted', async () => {
    const wrapper = mount(SearchForm, { props: { modelValue: 'lost' } });

    await wrapper.find('form').trigger('submit');

    expect(wrapper.emitted('submit')).toBeTruthy();
  });
});
