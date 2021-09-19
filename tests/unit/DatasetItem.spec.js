import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import DatasetItem from '@/DatasetItem.vue'

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
          ...provideOpts
        }
      },
      slots: {
        default: `
          <template v-slot="{ row, rowIndex }">
            <div class="result">
              <p>{{ row.name }}</p>
              <p>{{ rowIndex }}</p>
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

  it('renders divs based on passed props', () => {
    wrapper = wrapperWithProvide()
    expect(wrapper.findAll('div.result').length).toBe(2)
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
  })
})
