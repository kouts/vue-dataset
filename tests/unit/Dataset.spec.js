import { mount } from '@vue/test-utils'
import Dataset from '@/Dataset.vue'
import DatasetInfo from '@/DatasetInfo.vue'
import DatasetItem from '@/DatasetItem.vue'
import DatasetPager from '@/DatasetPager.vue'
import DatasetSearch from '@/DatasetSearch.vue'
import DatasetShow from '@/DatasetShow.vue'

import users from '../../example-data/users.json'
import { clone, waitNT } from '../../tests/utils.js'

const createWrapper = (props = {}) => {
  return mount(Dataset, {
    slots: {
      default: `
        <dataset-show />
        <dataset-search />
        <dataset-item class="items">
          <template #default="{ row, rowIndex }">
            <div>{{ rowIndex }} - {{ row.name }}</div>
          </template>
          <template #noDataFound>
            <div>
              No results found
            </div>
          </template>          
        </dataset-item>
        <dataset-info />
        <dataset-pager />
      `
    },
    props,
    global: {
      components: {
        DatasetShow,
        DatasetSearch,
        DatasetInfo,
        DatasetItem,
        DatasetPager
      }
    }
  })
}

describe('Dataset', () => {
  it('renders the dataset container div', () => {
    const wrapper = createWrapper({ dsData: users })
    const div = wrapper.find('div')
    expect(div.exists()).toBe(true)
  })

  it('has the correct pagination values', async () => {
    const wrapper = createWrapper({ dsData: users })
    const pagination = wrapper.findComponent(DatasetPager)
    const lis = pagination.findAll('ul > li')
    const arr = lis.map((li) => li.text())
    expect(arr).toEqual(['Previous', '1', '2', '3', '...', '500', 'Next'])
  })

  it('resets the active page when data changes', async () => {
    const wrapper = createWrapper({ dsData: users })
    const newUsers = clone(users).slice(0, 200)
    await wrapper.setProps({ dsData: newUsers })
    expect(wrapper.findAll('li.page-item')[1].classes()).toContain('active')
  })

  it('correctly calulates the number of pages', async () => {
    const wrapper = createWrapper({ dsData: users })
    const newUsers = clone(users).slice(0, 301)
    await wrapper.setProps({ dsData: newUsers })
    expect(wrapper.vm.dsPagecount).toBe(31)
  })

  it('correctly filters the search data', async () => {
    const wrapper = createWrapper({ dsData: users })
    await wrapper.vm.search('tristique.net')
    expect(wrapper.vm.dsRows.length).toBe(4)
  })

  it('displays items depending on show entries', async () => {
    const wrapper = createWrapper({ dsData: users })
    await wrapper.vm.showEntries(5)
    expect(wrapper.vm.dsRows.length).toBe(5)
    await wrapper.vm.showEntries(25)
    expect(wrapper.vm.dsRows.length).toBe(25)
  })

  it('sets the active page to the last one if previous pages number was higher than the current one', async () => {
    const wrapper = createWrapper({ dsData: users })
    await wrapper.vm.showEntries(5)
    await wrapper.vm.setActive(1000)
    await wrapper.vm.showEntries(100)
    await waitNT(wrapper.vm)
    expect(wrapper.vm.dsPage).toBe(50)
  })

  it('correctly sets the active page', async () => {
    const wrapper = createWrapper({ dsData: users })
    await wrapper
      .findAll('a')
      .filter((node) => node.text().match(/Next/))[0]
      .trigger('click')
    expect(wrapper.findAll('li.page-item')[2].classes()).toContain('active')
  })

  it('sorts the dataset using the dsSortBy prop', async () => {
    const wrapper = createWrapper({ dsData: users })
    await wrapper.setProps({ dsSortby: ['name'] })
    expect(wrapper.find('.items > div').text()).toBe('873 - Aaron Brock')
    await wrapper.setProps({ dsSortby: ['-name'] })
    expect(wrapper.find('.items > div').text()).toBe('2299 - Zorita Rose')
  })

  it('filters the dataset based on the dsFilterFields prop', async () => {
    const wrapper = createWrapper({ dsData: users })
    await wrapper.setProps({ dsFilterFields: { onlineStatus: 'Active' } })
    expect(wrapper.find('.items > div').text()).toBe('1 - Whoopi David')
    await wrapper.setProps({ dsFilterFields: { onlineStatus: 'Away' } })
    expect(wrapper.find('.items > div').text()).toBe('2 - Peter Mendez')
  })

  it('searches the dataset only in properties defined in the dsSearchIn prop', async () => {
    const wrapper = createWrapper({ dsData: users })
    await wrapper.setProps({ dsSearchIn: ['name', 'favoriteColor'] })
    await wrapper.vm.search('tristique.net')
    expect(wrapper.find('.items > div').text()).toBe('No results found')
    await wrapper.vm.search('Burke Kelley')
    expect(wrapper.find('.items > div').text()).toBe('4188 - Burke Kelley')
    expect(wrapper.findAll('.items > div').length).toBe(1)
  })

  it('data updates correctly when initialized with empty array', async () => {
    const wrapper = createWrapper()
    const newUsers = clone(users).slice(0, 5)
    expect(wrapper.vm.dsData.length).toBe(0)
    await wrapper.setProps({ dsData: newUsers })
    expect(wrapper.findAll('.items > div')[0].text()).toBe('0 - Harper Nolan')
  })

  it('data updates correctly when initialized with a non-empty array', async () => {
    const users1 = clone(users).slice(0, 5)
    const users2 = clone(users).slice(6, 10)
    const wrapper = createWrapper({ dsData: users1 })
    expect(wrapper.findAll('.items > div')[0].text()).toBe('0 - Harper Nolan')
    await wrapper.setProps({ dsData: users2 })
    expect(wrapper.findAll('.items > div')[0].text()).toBe('0 - Aimee Stephens')
  })
})
