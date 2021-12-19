import { findAny } from '@/helpers'
import { data } from './testData.js'

let findData = []

beforeEach(() => {
  findData = JSON.parse(JSON.stringify(data))
})

describe('findAny', () => {
  it('finds string inside a designated object property', () => {
    const res = findAny(['email'], undefined, findData[0].value, 'discuz')
    expect(res).toBe(true)
  })

  it('does not find string in non-designated object property', () => {
    const res = findAny(['firstName', 'lastName'], undefined, findData[0].value, 'discuz')
    expect(res).toBe(false)
  })

  it('does find number when search value is a string', () => {
    const res = findAny(['balance'], undefined, findData[0].value, '39317')
    expect(res).toBe(true)
  })

  it('does find number when search value is a number', () => {
    const res = findAny(['balance'], undefined, findData[0].value, 39317)
    expect(res).toBe(true)
  })

  it('uses the predicate function', () => {
    const searchAs = {
      birthdate: jest.fn((value, searchStr, rowData) => {
        const parts = searchStr.split('.')
        const isoDate = `${parts[2]}-${parts[1]}-${parts[0]}`
        return isoDate === value
      })
    }
    const res = findAny(['birthdate'], searchAs, findData[0].value, '09.03.1980')
    expect(res).toBe(true)
    expect(searchAs.birthdate).toHaveBeenCalledWith('1980-03-09', '09.03.1980', findData[0].value)
  })
})
