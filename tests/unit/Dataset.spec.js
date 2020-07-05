import { mount } from '@vue/test-utils';
import Dataset from '@/Dataset.vue';
import users from '../../example-data/users.json';

const TestComponent = {
  inject: ['search', 'showEntries', 'setActive', 'datasetI18n', 'ds'],
  template: '<div>Test component</div>'
};

describe('Dataset', () => {
  const WrapperComponent = {
    data: function () {
      return {
        users: users
      };
    },
    template: '<dataset :ds-data="users"><test-component /></dataset>',
    components: {
      Dataset,
      TestComponent
    }
  };

  const wrapperComponent = mount(WrapperComponent);
  const wrapperDataset = wrapperComponent.findComponent(Dataset);
  const wrapperTestComponent = wrapperComponent.findComponent(TestComponent);

  it('renders the dataset container div', () => {
    const div = wrapperDataset.find('div');
    expect(div.exists()).toBe(true);
  });

  it('slot renders and gets the injected values', () => {
    const div = wrapperTestComponent.find('div');
    expect(div.exists()).toBe(true);
    expect(div.text()).toBe('Test component');
  });
});
