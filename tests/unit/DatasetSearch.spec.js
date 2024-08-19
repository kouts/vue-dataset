import { shallowMount } from '@vue/test-utils'
import DatasetSearch from '@/DatasetSearch.vue'

const mockSearch = vi.fn()

describe('DatasetSearch', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const wrapper = shallowMount(DatasetSearch, {
    global: {
      provide: {
        search: function (value) {
          mockSearch(value)
        },
      },
    },
  })

  it('renders an input element', () => {
    const inputText = wrapper.find('input.form-control')

    expect(inputText.exists()).toBe(true)
  })

  it('passes the correct value to the injected search method', async () => {
    mockSearch.mockClear()
    const inputText = wrapper.find('input.form-control')

    await inputText.setValue('test')

    vi.advanceTimersByTime(1000)

    expect(mockSearch.mock.calls[0][0]).toBe('test')
  })
})
