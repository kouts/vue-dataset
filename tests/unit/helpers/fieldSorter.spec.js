import { data } from './testData.js'
import { fieldSorter } from '@/helpers'

function isoDateToDate(isoDate) {
  const isoDateParts = isoDate.split('-').map((o) => Number(o))
  const res = new Date(new Date(isoDateParts[0], isoDateParts[1] - 1, isoDateParts[2]))

  return res
}

let sortData = []

beforeEach(() => {
  sortData = JSON.parse(JSON.stringify(data))
})

describe('fieldSorter', () => {
  it('sorts the given array by the firstName column - asc', () => {
    sortData.sort(fieldSorter(['firstName']))
    expect(sortData[0].value.firstName).toBe('Bob')
    expect(sortData[3].value.firstName).toBe('Mile')
  })

  it('sorts the given array by the firstName column - desc', () => {
    sortData.sort(fieldSorter(['-firstName']))
    expect(sortData[0].value.firstName).toBe('Mile')
    expect(sortData[3].value.firstName).toBe('Bob')
  })

  it('sorts the given array by the birthdate column - asc', () => {
    sortData = sortData.map((o) => {
      o.value.birthdate = isoDateToDate(o.value.birthdate)

      return o
    })
    sortData.sort(fieldSorter(['birthdate']))
    expect(sortData[0].value.birthdate.getFullYear()).toBe(1972)
    expect(sortData[3].value.birthdate.getFullYear()).toBe(2004)
  })

  it('sorts the given array by the birthdate column - desc', () => {
    sortData = sortData.map((o) => {
      o.value.birthdate = isoDateToDate(o.value.birthdate)

      return o
    })
    sortData.sort(fieldSorter(['-birthdate']))
    expect(sortData[0].value.birthdate.getFullYear()).toBe(2004)
    expect(sortData[3].value.birthdate.getFullYear()).toBe(1972)
  })

  it('sorts the given array by the balance column - asc', () => {
    sortData.sort(fieldSorter(['balance']))
    expect(sortData[0].value.balance).toBe(3855)
    expect(sortData[3].value.balance).toBe(64949)
  })

  it('sorts the given array by the balance column - desc', () => {
    sortData.sort(fieldSorter(['-balance']))
    expect(sortData[0].value.balance).toBe(64949)
    expect(sortData[3].value.balance).toBe(3855)
  })

  it('sorts the given array by first name asc and last name asc', () => {
    sortData.sort(fieldSorter(['firstName', 'lastName']))
    expect(sortData[1].value.lastName).toBe('Arraway')
    expect(sortData[2].value.lastName).toBe('Bumpsty')
  })

  it('sorts the given array by first name asc and last name desc', () => {
    sortData.sort(fieldSorter(['firstName', '-lastName']))
    expect(sortData[1].value.lastName).toBe('Bumpsty')
    expect(sortData[2].value.lastName).toBe('Arraway')
  })

  it('sorts the given array by the birthdate column using sortAs - asc', () => {
    sortData.sort(fieldSorter(['birthdate'], { birthdate: isoDateToDate }))
    expect(sortData[0].value.birthdate).toBe('1972-09-29')
    expect(sortData[3].value.birthdate).toBe('2004-02-11')
  })

  it('sorts the given array by the birthdate column using sortAs - desc', () => {
    sortData.sort(fieldSorter(['-birthdate'], { birthdate: isoDateToDate }))
    expect(sortData[0].value.birthdate).toBe('2004-02-11')
    expect(sortData[3].value.birthdate).toBe('1972-09-29')
  })
})
