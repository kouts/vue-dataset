export const filterList = function (list = [], filter) {
  return list.filter(function (item) {
    for (const key in filter) {
      if (item[key] === undefined || item[key] !== filter[key]) {
        return false
      }
    }

    return true
  })
}

export const clone = function (obj) {
  return JSON.parse(JSON.stringify(obj || {}))
}

export const isoDateToEuroDate = function (isoDate) {
  const parts = isoDate.split('-')

  return `${parts[2]}.${parts[1]}.${parts[0]}`
}

export const searchAsEuroDate = function (value, searchString) {
  const parts = searchString.split('.')
  const isoDate = `${parts[2]}-${parts[1]}-${parts[0]}`

  return isoDate === value
}

export const isoDateToDate = function (isoDate) {
  return new Date(isoDate)
}
