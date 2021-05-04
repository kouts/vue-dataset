import { fieldFilter } from '@/helpers'
import { data } from './testData.js'

let filterData = []

beforeEach(() => {
  filterData = JSON.parse(JSON.stringify(data))
})

describe('fieldFilter', () => {
  it('filters the given array by first name "Gawain"', () => {
    const res = fieldFilter(filterData, { firstName: 'Gawain' })
    expect(res.length).toBe(2)
  })
})
