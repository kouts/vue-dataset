import { debounce } from '@/helpers'

beforeEach(() => {
  vi.clearAllMocks()
  vi.useRealTimers()
})

describe('debounce', () => {
  it('calls the function immediately if theres no wait', () => {
    const func = vi.fn()

    const debounced = debounce(func, 0, true)

    debounced()

    expect(func).toHaveBeenCalled()
  })

  it('calls the function only once for a wait time period', () => {
    vi.useFakeTimers()
    const func = vi.fn()

    const debounced = debounce(func, 100, false)

    debounced()
    debounced()
    debounced()
    debounced()

    vi.advanceTimersByTime(300)

    expect(func).toHaveBeenCalledTimes(1)
  })

  it('calls the function immediately only once for a wait time period', () => {
    vi.useFakeTimers()
    const func = vi.fn()

    const debounced = debounce(func, 100, true)

    debounced()
    debounced()
    debounced()
    debounced()

    vi.advanceTimersByTime(300)

    expect(func).toHaveBeenCalledTimes(1)
  })
})
