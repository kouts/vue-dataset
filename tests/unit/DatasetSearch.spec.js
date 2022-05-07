import DatasetSearch from '@/DatasetSearch.vue'
import { shallowMount } from '@vue/test-utils'

const mockSearch = jest.fn()

describe('DatasetSearch', () => {
  const wrapper = shallowMount(DatasetSearch, {
    global: {
      provide: {
        search: function (value) {
          mockSearch(value)
        }
      }
    }
  })

  it('renders an input element', () => {
    const inputText = wrapper.find('input.form-control')

    expect(inputText.exists()).toBe(true)
  })

  it('passes the correct value to the injected search method', (done) => {
    mockSearch.mockClear()
    const inputText = wrapper.find('input.form-control')

    inputText.setValue('test')
    setTimeout(() => {
      expect(mockSearch.mock.calls[0][0]).toBe('test')
      done()
    })
  })
})
