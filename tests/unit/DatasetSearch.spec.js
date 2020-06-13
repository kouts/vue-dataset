import { shallowMount } from '@vue/test-utils';
import DatasetSearch from '@/DatasetSearch.vue';

describe('DatasetSearch', () => {
  const wrapper = shallowMount(DatasetSearch, {
    provide: {
      search: function (value) {
        console.log(value);
      }
    }
  });
  it('renders an input element', () => {
    expect(wrapper.findAll('.form-control').length).toEqual(1);
  });
});
