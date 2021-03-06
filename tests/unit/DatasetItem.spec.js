import { mount } from '@vue/test-utils'
import DatasetItem from '@/DatasetItem.vue'

describe('DatasetItem', () => {
  const WrapperComp = {
    provide() {
      return {
        rdsData: () => this.dsData,
        rdsRows: () => this.dsRows
      }
    },
    data: function () {
      return {
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
        dsRows: [0, 1]
      }
    },
    template: `
      <dataset-item>
        <template v-slot="{ row, rowIndex }">
          <div class="result">
            <p>{{ row.name }}</p>
            <p>{{ rowIndex }}</p>
          </div>
        </template>
        <template v-slot:noDataFound>
          <p>No results found</p>
        </template>      
      </dataset-item>
    `,
    components: {
      DatasetItem
    }
  }

  const wrapperComp = mount(WrapperComp)
  const wrapper = wrapperComp.findComponent(DatasetItem)

  it('renders divs based on passed props', () => {
    expect(wrapper.findAll('div.result').length).toBe(2)
  })

  it('does not render any results when dsRows is empty', () => {
    wrapperComp.setData({ dsRows: [] })
    wrapperComp.vm.$nextTick(() => {
      expect(wrapper.findAll('div.result').length).toBe(0)
    })
  })

  it('renders the noDataFound slot when dsRows is empty', () => {
    wrapperComp.setData({ dsRows: [] })
    wrapperComp.vm.$nextTick(() => {
      expect(wrapper.find('p').text()).toBe('No results found')
    })
  })

  it('renders divs after data changed', () => {
    wrapperComp.setData({
      dsData: [
        {
          age: 17,
          name: 'John Doe',
          email: 'john.doe@flyboyz.biz'
        }
      ],
      dsRows: [0]
    })
    wrapperComp.vm.$nextTick(() => {
      expect(wrapper.findAll('div.result').length).toBe(1)
    })
  })
})
