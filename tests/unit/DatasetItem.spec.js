import DatasetItem from '@/DatasetItem.vue'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'

describe('DatasetItem', () => {
  let wrapper = null

  function wrapperWithProvide(provideOpts) {
    const wrapper = mount(DatasetItem, {
      global: {
        provide: {
          dsData: ref([
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
          ]),
          dsRows: ref([0, 1]),
          dsFrom: ref(0),
          dsTo: ref(10),
          ...provideOpts
        }
      },
      slots: {
        default: `
          <template v-slot="{ row, rowIndex, index }">
            <div class="result">
              <p>{{ row.name }}</p>
              <p>{{ rowIndex }}</p>
              <p>{{ index }}</p>
            </div>
          </template>
        `,
        noDataFound: `<p>No results found</p>`
      }
    })

    return wrapper
  }

  afterEach(function () {
    wrapper.unmount()
  })

  it('renders correctly', () => {
    wrapper = wrapperWithProvide()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders divs based on passed props', () => {
    wrapper = wrapperWithProvide()
    expect(wrapper.findAll('div.result').length).toBe(2)
  })

  it('calculates the correct indexes', () => {
    wrapper = wrapperWithProvide()
    expect(wrapper.vm.indexes).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  })

  it('does not render any results when dsRows is empty', () => {
    wrapper = wrapperWithProvide({
      dsRows: ref([])
    })
    expect(wrapper.findAll('div.result').length).toBe(0)
  })

  it('renders the noDataFound slot when dsRows is empty', () => {
    wrapper = wrapperWithProvide({
      dsRows: ref([])
    })
    expect(wrapper.find('p').text()).toBe('No results found')
  })

  it('renders divs after data changed', () => {
    wrapper = wrapperWithProvide({
      dsData: ref([
        {
          age: 17,
          name: 'John Doe',
          email: 'john.doe@flyboyz.biz'
        }
      ]),
      dsRows: ref([0])
    })
    expect(wrapper.findAll('div.result').length).toBe(1)
    expect(wrapper.element).toMatchSnapshot()
  })
})
