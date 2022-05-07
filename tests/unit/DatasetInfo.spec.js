import DatasetInfo from '@/DatasetInfo.vue'
import datasetI18n from '@/i18n/en.js'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'

describe('DatasetInfo', () => {
  let wrapper = null

  function wrapperWithProvide(provideOpts) {
    const wrapper = mount(DatasetInfo, {
      global: {
        provide: {
          datasetI18n: ref(datasetI18n),
          ...provideOpts
        }
      }
    })

    return wrapper
  }

  afterEach(function () {
    wrapper.unmount()
  })

  it('renders a div element', () => {
    wrapper = wrapperWithProvide({
      dsResultsNumber: ref(1),
      dsFrom: ref(0),
      dsTo: ref(0)
    })
    const div = wrapper.find('div')

    expect(div.exists()).toBe(true)
  })

  it('shows the correct number of the "showing" label when results number is zero', () => {
    wrapper = wrapperWithProvide({
      dsResultsNumber: ref(0),
      dsFrom: ref(0),
      dsTo: ref(0)
    })
    expect(wrapper.vm.showing).toBe(0)
  })

  it('shows the correct number of "showing" label when results number is not zero', () => {
    wrapper = wrapperWithProvide({
      dsResultsNumber: ref(10),
      dsFrom: ref(0),
      dsTo: ref(0)
    })
    expect(wrapper.vm.showing).toBe(1)
  })

  it('shows the correct number of the "to" label when to number is greater or equals to the results number', () => {
    wrapper = wrapperWithProvide({
      dsResultsNumber: ref(3),
      dsFrom: ref(1),
      dsTo: ref(4)
    })
    expect(wrapper.vm.showingTo).toBe(3)
  })

  it('shows the correct number of the "to" label when to number less than the results number', () => {
    wrapper = wrapperWithProvide({
      dsResultsNumber: ref(3),
      dsFrom: ref(1),
      dsTo: ref(2)
    })
    expect(wrapper.vm.showingTo).toBe(2)
  })
})
