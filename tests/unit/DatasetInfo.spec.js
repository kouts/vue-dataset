import { shallowMount } from '@vue/test-utils';
import DatasetInfo from '@/DatasetInfo.vue';
import datasetI18n from '@/i18n/en.js';

describe('DatasetInfo', () => {

  let wrapper = null;

  function wrapperWithProvide (provideOpts) {
    const wrapper = shallowMount(DatasetInfo, {
      provide: {
        datasetI18n: datasetI18n,
        ds: provideOpts
      }
    });
    return wrapper;
  }

  afterEach(function () {
    wrapper.destroy();
  });

  it('renders a div element', () => {
    wrapper = wrapperWithProvide({
      dsResultsNumber: 1,
      dsFrom: 0,
      dsTo: 0
    });
    const div = wrapper.find('div');
    expect(div.exists()).toBe(true);
  });

  it('shows the correct number of the "showing" label when results number is zero', () => {
    wrapper = wrapperWithProvide({
      dsResultsNumber: 0,
      dsFrom: 0,
      dsTo: 0
    });
    expect(wrapper.vm.showing).toBe(0);
  });

  it('shows the correct number of "showing" label when results number is not zero', () => {
    wrapper = wrapperWithProvide({
      dsResultsNumber: 10,
      dsFrom: 0,
      dsTo: 0
    });
    expect(wrapper.vm.showing).toBe(1);
  });

  it('shows the correct number of the "to" label when to number is greater or equals to the results number', () => {
    wrapper = wrapperWithProvide({
      dsResultsNumber: 3,
      dsFrom: 1,
      dsTo: 4
    });
    expect(wrapper.vm.showingTo).toBe(3);
  });

  it('shows the correct number of the "to" label when to number less than the results number', () => {
    wrapper = wrapperWithProvide({
      dsResultsNumber: 3,
      dsFrom: 1,
      dsTo: 2
    });
    expect(wrapper.vm.showingTo).toBe(2);
  });
});
