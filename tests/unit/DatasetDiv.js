import { shallowMount } from '@vue/test-utils';
import DatasetDiv from '@/DatasetDiv.vue';

describe('DatasetDiv', () => {

  const WrapperComp = {
    template: `
    <DatasetDiv v-slot="{row, rowIndex}">
      <p>{{row.name}}</p>
      <p>{{rowIndex}}</p>
    </DatasetDiv>
    `,
    components: {
      DatasetDiv
    }
  };

  const wrapper = shallowMount(DatasetDiv, {
    propsData: {
      dsData: [
        {
          age: 20,
          name: 'Jessie Casey',
          email: 'jessie.casey@flyboyz.biz'
        },
        {
          age: 26,
          name: 'Solomon Stanley',
          email: 'solomon.stanley@tetak.net'
        }
      ],
      dsRows: [0, 1],
      slots: {
        default: `
          <template v-slot="{row, rowIndex}">
            {{  }}
          </template>
        `
      }
    }
  });

  it('renders divs based on passed props', () => {
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
