import { shallowMount } from '@vue/test-utils';
import DatasetInfo from '@/DatasetInfo.vue';

describe('DatasetInfo', () => {
  const wrapper = shallowMount(DatasetInfo, {
    provide: {
      datasetI18n: {
        showing: 'Showing',
        showingTo: 'to',
        showingOf: 'of',
        showingEntries: 'entries'
      }
    }
  });

  it('renders a div element', () => {
    const div = wrapper.find('div');
    expect(div.exists()).toBe(true);
  });

  it('shows the correct number of the "showing" label when results number is zero', () => {
    wrapper.setProps({
      dsResultsNumber: 0
    });
    expect(wrapper.vm.showing).toBe(0);
  });

  it('shows the correct number of "showing" label when results number is not zero', () => {
    wrapper.setProps({
      dsResultsNumber: 10
    });
    expect(wrapper.vm.showing).toBe(1);
  });

  it('shows the correct number of the "to" label when to number is greater or equals to the results number', () => {
    wrapper.setProps({
      dsResultsNumber: 3,
      dsTo: 4
    });
    expect(wrapper.vm.showingTo).toBe(3);
  });

  it('shows the correct number of the "to" label when to number less than the results number', () => {
    wrapper.setProps({
      dsResultsNumber: 3,
      dsTo: 2
    });
    expect(wrapper.vm.showingTo).toBe(2);
  });
});
