import { shallowMount, createWrapper } from '@vue/test-utils';
import DatasetSearch from '@/DatasetSearch.vue';

describe('DatasetSearch', () => {
  const testDiv = document.createElement('div');
  testDiv.setAttribute('id', 'test-div');
  document.body.appendChild(testDiv);

  const wrapper = shallowMount(DatasetSearch, {
    provide: {
      search: function (value) {
        const testDiv = document.getElementById('test-div');
        testDiv.textContent = value;
      }
    }
  });

  it('renders an input element', () => {
    const inputText = wrapper.find('input.form-control');
    expect(inputText.exists()).toBe(true);
  });

  it('passes the correct value to the injected search method', () => {
    const inputText = wrapper.find('input.form-control');
    inputText.setValue('test');
    const testDiv = document.getElementById('test-div');
    expect(testDiv.textContent).toEqual('test');
  });
});
