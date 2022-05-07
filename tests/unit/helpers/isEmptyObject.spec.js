import { isEmptyObject } from '@/helpers'

describe('isEmptyObject', () => {
  it('should return true when an object is empty', () => {
    const object = {}
    const res = isEmptyObject(object)

    expect(res).toBe(true)
  })

  it('should return false when an object is not empty', () => {
    const object = {
      test: 'value'
    }
    const res = isEmptyObject(object)

    expect(res).toBe(false)
  })
})
