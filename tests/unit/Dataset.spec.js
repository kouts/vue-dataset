import { mount, createLocalVue } from '@vue/test-utils'
import Dataset from '@/Dataset.vue'
import DatasetInfo from '@/DatasetInfo.vue'
import DatasetItem from '@/DatasetItem.vue'
import DatasetPager from '@/DatasetPager.vue'
import DatasetSearch from '@/DatasetSearch.vue'
import DatasetShow from '@/DatasetShow.vue'

import users from '../../example-data/users.json'
import { clone, waitNT } from '../../tests/utils.js'

let wrapper

const localVue = createLocalVue()
localVue.component('DatasetShow', DatasetShow)
localVue.component('DatasetSearch', DatasetSearch)
localVue.component('DatasetInfo', DatasetInfo)
localVue.component('DatasetItem', DatasetItem)
localVue.component('DatasetPager', DatasetPager)

beforeEach(function () {
  wrapper = mount(Dataset, {
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
    propsData: {
      dsData: users
    },
    localVue
  })
})

afterEach(function () {
  wrapper.destroy()
})

describe('Dataset', () => {
  it('renders the dataset container div', () => {
    const div = wrapper.find('div')
    expect(div.exists()).toBe(true)
  })

  it('has the correct pagination values', async () => {
    const pagination = wrapper.findComponent(DatasetPager)
    const { wrappers: lis } = pagination.findAll('ul > li')
    const arr = lis.map((li) => li.text())
    expect(arr).toEqual(['Previous', '1', '2', '3', '...', '500', 'Next'])
  })

  it('resets the active page when data changes', async () => {
    const newUsers = clone(users).slice(0, 200)
    await wrapper.setProps({ dsData: newUsers })
    expect(wrapper.findAll('li.page-item').at(1).classes()).toContain('active')
  })

  it('correctly calulates the number of pages', async () => {
    const newUsers = clone(users).slice(0, 301)
    await wrapper.setProps({ dsData: newUsers })
    expect(wrapper.vm.dsPagecount).toBe(31)
  })

  it('correctly filters the search data', async () => {
    await wrapper.vm.search('tristique.net')
    expect(wrapper.vm.dsRows.length).toBe(4)
  })

  it('displays items depending on show entries', async () => {
    await wrapper.vm.showEntries(5)
    expect(wrapper.vm.dsRows.length).toBe(5)
    await wrapper.vm.showEntries(25)
    expect(wrapper.vm.dsRows.length).toBe(25)
  })

  it('sets the active page to the last one if previous pages number was higher than the current one', async () => {
    await wrapper.vm.showEntries(5)
    await wrapper.vm.setActive(1000)
    await wrapper.vm.showEntries(100)
    await waitNT(wrapper.vm)
    expect(wrapper.vm.dsPage).toBe(50)
  })

  it('correctly sets the active page', async () => {
    await wrapper
      .findAll('a')
      .filter((node) => node.text().match(/Next/))
      .at(0)
      .trigger('click')
    expect(wrapper.findAll('li.page-item').at(2).classes()).toContain('active')
  })

  it('sorts the dataset using the dsSortBy prop', async () => {
    await wrapper.setProps({ dsSortby: ['name'] })
    expect(wrapper.find('.items > div').text()).toBe('873 - Aaron Brock')
    await wrapper.setProps({ dsSortby: ['-name'] })
    expect(wrapper.find('.items > div').text()).toBe('2299 - Zorita Rose')
  })

  it('filters the dataset based on the dsFilterFields prop', async () => {
    await wrapper.setProps({ dsFilterFields: { onlineStatus: 'Active' } })
    expect(wrapper.find('.items > div').text()).toBe('1 - Whoopi David')
    await wrapper.setProps({ dsFilterFields: { onlineStatus: 'Away' } })
    expect(wrapper.find('.items > div').text()).toBe('2 - Peter Mendez')
  })

  it('searches the dataset only in properties defined in the dsSearchIn prop', async () => {
    await wrapper.setProps({ dsSearchIn: ['name', 'favoriteColor'] })
    await wrapper.vm.search('tristique.net')
    expect(wrapper.find('.items > div').text()).toBe('No results found')
    await wrapper.vm.search('Burke Kelley')
    expect(wrapper.find('.items > div').text()).toBe('4188 - Burke Kelley')
    expect(wrapper.findAll('.items > div').length).toBe(1)
  })

  it('provides the indexes to child components', async () => {
    expect(typeof wrapper.vm._provided.rdsIndexes).toBe('function')
    expect(wrapper.vm._provided.rdsIndexes().length).toBe(5000)
  })

  it('initializes with an empty data array', async () => {
    const wrapperDataset = mount(Dataset)

    expect(wrapperDataset.vm.dsData).toEqual([])
  })
})
