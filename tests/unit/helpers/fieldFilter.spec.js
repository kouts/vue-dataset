import { data } from './testData.js'
import { fieldFilter } from '@/helpers'

let filterData = []

beforeEach(() => {
  filterData = JSON.parse(JSON.stringify(data))
})

describe('fieldFilter', () => {
  it('filters the given array by first name "Gawain"', () => {
    const res = fieldFilter(filterData, { firstName: 'Gawain' })

    expect(res.length).toBe(2)
  })

  it('filters the given array by first names that start with "Bo"', () => {
    const filterFunction = (value) => value.startsWith('Bo')
    const res = fieldFilter(filterData, { firstName: filterFunction })

    expect(res.length).toBe(1)
  })

  it('includes items with empty filter key', () => {
    const res = fieldFilter(filterData, { firstName: '' })

    expect(res.length).toBe(4)
  })
})
