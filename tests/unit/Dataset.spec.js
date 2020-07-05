import { shallowMount } from '@vue/test-utils';
import Dataset from '@/Dataset.vue';
import users from '../../example-data/users.json';

describe('Dataset', () => {
  const wrapper = shallowMount(Dataset, {
    propsData: {
      dsData: users
    }
  });

  it('renders the dataset container div', () => {
    const div = wrapper.find('div');
    expect(div.exists()).toBe(true);
  });
});
