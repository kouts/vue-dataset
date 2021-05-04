import { shallowMount } from '@vue/test-utils'
import DatasetPager from '@/DatasetPager.vue'
import datasetI18n from '@/i18n/en.js'

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
      provide: {
        datasetI18n: datasetI18n,
        setActive: function (value) {
          mockSetActive(value)
        },
        rdsPages: () => [1, 2, 3],
        rdsPagecount: () => 0,
        rdsPage: () => 1,
        ...provideOpts
      }
    })
    return wrapper
  }

  afterEach(function () {
    wrapper.destroy()
  })

  it('renders a ul element', () => {
    wrapper = wrapperWithProvide()
    const ul = wrapper.find('ul')
    expect(ul.exists()).toBe(true)
  })

  it('disables the previous button on first page', () => {
    wrapper = wrapperWithProvide({
      rdsPage: () => 1
    })
    wrapper.vm.$nextTick(() => {
      const previousButton = wrapper.findAll('a').at(0).element
      expect(isButtonDisabled(previousButton)).toBe(true)
    })
  })

  it('disables the previous button when there is only one page', () => {
    wrapper = wrapperWithProvide({
      rdsPagecount: () => 1
    })
    wrapper.vm.$nextTick(() => {
      const previousButton = wrapper.findAll('a').at(0).element
      expect(isButtonDisabled(previousButton)).toBe(true)
    })
  })

  it('enables the previous button', () => {
    wrapper = wrapperWithProvide({
      rdsPage: () => 2,
      rdsPagecount: () => 3
    })
    wrapper.vm.$nextTick(() => {
      const previousButton = wrapper.findAll('a').at(0).element
      expect(isButtonEnabled(previousButton)).toBe(true)
    })
  })

  it('disables the next button on last page', () => {
    wrapper = wrapperWithProvide({
      rdsPage: () => 4,
      rdsPagecount: () => 4
    })
    wrapper.vm.$nextTick(() => {
      const buttons = wrapper.findAll('a')
      const nextButton = buttons.at(buttons.length - 1).element
      expect(isButtonDisabled(nextButton)).toBe(true)
    })
  })

  it('disables the next button when there is only one page', () => {
    wrapper = wrapperWithProvide({
      rdsPagecount: () => 1
    })
    wrapper.vm.$nextTick(() => {
      const buttons = wrapper.findAll('a')
      const nextButton = buttons.at(buttons.length - 1).element
      expect(isButtonDisabled(nextButton)).toBe(true)
    })
  })

  it('disables the previous and next buttons when there are no pages', () => {
    wrapper = wrapperWithProvide({
      rdsPagecount: () => 0
    })
    wrapper.vm.$nextTick(() => {
      const buttons = wrapper.findAll('a')
      const previousButton = buttons.at(0).element
      const nextButton = buttons.at(buttons.length - 1).element
      expect(isButtonDisabled(previousButton)).toBe(true)
      expect(isButtonDisabled(nextButton)).toBe(true)
    })
  })

  it('enables the next button', () => {
    wrapper = wrapperWithProvide({
      rdsPage: () => 2,
      rdsPagecount: () => 3
    })
    wrapper.vm.$nextTick(() => {
      const buttons = wrapper.findAll('a')
      const nextButton = buttons.at(buttons.length - 1).element
      expect(isButtonEnabled(nextButton)).toBe(true)
    })
  })

  it('makes the normal page button active', () => {
    wrapper = wrapperWithProvide({
      rdsPage: () => 1,
      rdsPagecount: () => 3
    })
    wrapper.vm.$nextTick(() => {
      const li = wrapper.findAll('li').at(1)
      expect(li.classes()).toContain('active')
    })
  })

  it('makes the ... page button disabled', () => {
    wrapper = wrapperWithProvide({
      rdsPages: () => [1, '...', 4, 5, 6],
      rdsPage: () => 6,
      rdsPagecount: () => 6
    })
    wrapper.vm.$nextTick(() => {
      const li = wrapper.findAll('li').at(2)
      expect(li.classes()).toContain('disabled')
      expect(li.find('span').exists()).toBe(true)
    })
  })

  it('sends the correct active page number on previous button click', () => {
    mockSetActive.mockClear()
    wrapper = wrapperWithProvide({
      rdsPages: () => [1, '...', 4, 5, 6],
      rdsPage: () => 6,
      rdsPagecount: () => 6
    })
    const previousButton = wrapper.findAll('a').at(0)
    previousButton.trigger('click')
    expect(mockSetActive.mock.calls[0][0]).toBe(5)
  })

  it('sends the correct active page number on next button click', () => {
    mockSetActive.mockClear()
    wrapper = wrapperWithProvide({
      rdsPages: () => [1, '...', 4, 5, 6],
      rdsPage: () => 5,
      rdsPagecount: () => 6
    })
    const buttons = wrapper.findAll('a')
    const nextButton = buttons.at(buttons.length - 1)
    nextButton.trigger('click')
    expect(mockSetActive.mock.calls[0][0]).toBe(6)
  })
})
