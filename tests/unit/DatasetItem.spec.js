import DatasetItem from '@/DatasetItem.vue'
import { mount } from '@vue/test-utils'

describe('DatasetItem', () => {
  const WrapperComp = {
    provide() {
      return {
        rdsData: () => this.dsData,
        rdsRows: () => this.dsRows,
        rdsFrom: () => this.dsFrom,
        rdsTo: () => this.dsTo
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
        dsRows: [0, 1],
        dsFrom: 0,
        dsTo: 10
      }
    },
    template: `
      <dataset-item>
        <template v-slot="{ row, rowIndex, index }">
          <div class="result">
            <p>{{ row.name }}</p>
            <p>{{ rowIndex }}</p>
            <p>{{ index }}</p>
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

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders divs based on passed props', () => {
    expect(wrapper.findAll('div.result').length).toBe(2)
  })

  it('calculates the correct indexes', () => {
    expect(wrapper.vm.indexes).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
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
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
