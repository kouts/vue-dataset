import { shallowMount } from '@vue/test-utils'
import DatasetInfo from '@/DatasetInfo.vue'
import datasetI18n from '@/i18n/en.js'

describe('DatasetInfo', () => {
  let wrapper = null

  function wrapperWithProvide(provideOpts) {
    const wrapper = shallowMount(DatasetInfo, {
      provide: {
        datasetI18n,
        ...provideOpts,
      },
    })

    return wrapper
  }

  afterEach(function () {
    wrapper.destroy()
  })

  it('renders a div element', () => {
    wrapper = wrapperWithProvide({
      rdsResultsNumber: () => 1,
      rdsFrom: () => 0,
      rdsTo: () => 0,
    })
    const div = wrapper.find('div')

    expect(div.exists()).toBe(true)
  })

  it('shows the correct number of the "showing" label when results number is zero', () => {
    wrapper = wrapperWithProvide({
      rdsResultsNumber: () => 0,
      rdsFrom: () => 0,
      rdsTo: () => 0,
    })
    expect(wrapper.vm.showing).toBe(0)
  })

  it('shows the correct number of "showing" label when results number is not zero', () => {
    wrapper = wrapperWithProvide({
      rdsResultsNumber: () => 10,
      rdsFrom: () => 0,
      rdsTo: () => 0,
    })
    expect(wrapper.vm.showing).toBe(1)
  })

  it('shows the correct number of the "to" label when to number is greater or equals to the results number', () => {
    wrapper = wrapperWithProvide({
      rdsResultsNumber: () => 3,
      rdsFrom: () => 1,
      rdsTo: () => 4,
    })
    expect(wrapper.vm.showingTo).toBe(3)
  })

  it('shows the correct number of the "to" label when to number less than the results number', () => {
    wrapper = wrapperWithProvide({
      rdsResultsNumber: () => 3,
      rdsFrom: () => 1,
      rdsTo: () => 2,
    })
    expect(wrapper.vm.showingTo).toBe(2)
  })
})
