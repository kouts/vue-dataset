import { debounce } from '@/helpers'

beforeEach(() => {
  jest.clearAllMocks()
  jest.useRealTimers()
})

describe('debounce', () => {
  it('calls the function immediately if theres no wait', () => {
    const func = jest.fn()

    const debounced = debounce(func, 0, true)

    debounced()

    expect(func).toHaveBeenCalled()
  })

  it('calls the function only once for a wait time period', () => {
    jest.useFakeTimers()
    const func = jest.fn()

    const debounced = debounce(func, 100, false)

    debounced()
    debounced()
    debounced()
    debounced()

    jest.advanceTimersByTime(300)

    expect(func).toHaveBeenCalledTimes(1)
  })

  it('calls the function immediately only once for a wait time period', () => {
    jest.useFakeTimers()
    const func = jest.fn()

    const debounced = debounce(func, 100, true)

    debounced()
    debounced()
    debounced()
    debounced()

    jest.advanceTimersByTime(300)

    expect(func).toHaveBeenCalledTimes(1)
  })
})
