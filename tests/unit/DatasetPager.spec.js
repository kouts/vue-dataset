import DatasetPager from '@/DatasetPager.vue'
import datasetI18n from '@/i18n/en.js'
import { ref } from 'vue'
import { shallowMount } from '@vue/test-utils'

const mockSetActive = jest.fn()

const isButtonDisabled = function (el) {
  return el.tabIndex === -1 && el.hasAttribute('aria-disabled') === true
}

const isButtonEnabled = function (el) {
  return el.hasAttribute('tabIndex') === false && el.hasAttribute('aria-disabled') === false
}

describe('DatasetPager', () => {
  let wrapper = null

  function wrapperWithProvide(provideOpts = {}) {
    const wrapper = shallowMount(DatasetPager, {
      global: {
        provide: {
          datasetI18n: ref(datasetI18n),
          setActive: function (value) {
            mockSetActive(value)
          },
          dsPages: ref([1, 2, 3]),
          dsPagecount: ref(0),
          dsPage: ref(1),
          ...provideOpts
        }
      }
    })

    return wrapper
  }

  afterEach(function () {
    wrapper.unmount()
  })

  it('renders a ul element', () => {
    wrapper = wrapperWithProvide()
    const ul = wrapper.find('ul')

    expect(ul.exists()).toBe(true)
  })

  it('disables the previous button on first page', () => {
    wrapper = wrapperWithProvide({
      dsPage: ref(1)
    })
    const previousButton = wrapper.findAll('a')[0].element

    expect(isButtonDisabled(previousButton)).toBe(true)
  })

  it('disables the previous button when there is only one page', () => {
    wrapper = wrapperWithProvide({
      dsPagecount: ref(1)
    })
    const previousButton = wrapper.findAll('a')[0].element

    expect(isButtonDisabled(previousButton)).toBe(true)
  })

  it('enables the previous button', () => {
    wrapper = wrapperWithProvide({
      dsPage: ref(2),
      dsPagecount: ref(3)
    })
    const previousButton = wrapper.findAll('a')[0].element

    expect(isButtonEnabled(previousButton)).toBe(true)
  })

  it('disables the next button on last page', () => {
    wrapper = wrapperWithProvide({
      dsPage: ref(4),
      dsPagecount: ref(4)
    })
    const buttons = wrapper.findAll('a')
    const nextButton = buttons[buttons.length - 1].element

    expect(isButtonDisabled(nextButton)).toBe(true)
  })

  it('disables the next button when there is only one page', () => {
    wrapper = wrapperWithProvide({
      dsPagecount: ref(1)
    })
    const buttons = wrapper.findAll('a')
    const nextButton = buttons[buttons.length - 1].element

    expect(isButtonDisabled(nextButton)).toBe(true)
  })

  it('disables the previous and next buttons when there are no pages', () => {
    wrapper = wrapperWithProvide({
      dsPagecount: ref(0)
    })
    const buttons = wrapper.findAll('a')
    const previousButton = buttons[0].element
    const nextButton = buttons[buttons.length - 1].element

    expect(isButtonDisabled(previousButton)).toBe(true)
    expect(isButtonDisabled(nextButton)).toBe(true)
  })

  it('enables the next button', () => {
    wrapper = wrapperWithProvide({
      dsPage: ref(2),
      dsPagecount: ref(3)
    })
    const buttons = wrapper.findAll('a')
    const nextButton = buttons[buttons.length - 1].element

    expect(isButtonEnabled(nextButton)).toBe(true)
  })

  it('makes the normal page button active', () => {
    wrapper = wrapperWithProvide({
      dsPage: ref(1),
      dsPagecount: ref(3)
    })
    const li = wrapper.findAll('li')[1]

    expect(li.classes()).toContain('active')
  })

  it('makes the ... page button disabled', () => {
    wrapper = wrapperWithProvide({
      dsPages: ref([1, '...', 4, 5, 6]),
      dsPage: ref(6),
      dsPagecount: ref(6)
    })
    const li = wrapper.findAll('li')[2]

    expect(li.classes()).toContain('disabled')
    expect(li.find('span').exists()).toBe(true)
  })

  it('sends the correct active page number on previous button click', () => {
    mockSetActive.mockClear()
    wrapper = wrapperWithProvide({
      dsPages: ref([1, '...', 4, 5, 6]),
      dsPage: ref(6),
      dsPagecount: ref(6)
    })
    const previousButton = wrapper.findAll('a')[0]

    previousButton.trigger('click')
    expect(mockSetActive.mock.calls[0][0]).toBe(5)
  })

  it('sends the correct active page number on next button click', () => {
    mockSetActive.mockClear()
    wrapper = wrapperWithProvide({
      dsPages: ref([1, '...', 4, 5, 6]),
      dsPage: ref(5),
      dsPagecount: ref(6)
    })
    const buttons = wrapper.findAll('a')
    const nextButton = buttons[buttons.length - 1]

    nextButton.trigger('click')
    expect(mockSetActive.mock.calls[0][0]).toBe(6)
  })
})
