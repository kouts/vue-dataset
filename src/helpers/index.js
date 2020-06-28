const MORE_PAGES = '...';

// https://jsperf.com/object-empty-ch/1
function isEmptyObject (obj) {
  for (const key in obj) {
    return false;
  }
  return true;
}

function createPagingRange (nrOfPages, currentPage) {
  const delta = 2;
  const range = [];
  const rangeWithDots = [];
  let length;

  range.push(1);

  if (nrOfPages <= 1) {
    return range;
  }

  for (let i = currentPage - delta; i <= currentPage + delta; i++) {
    if (i < nrOfPages && i > 1) {
      range.push(i);
    }
  }
  range.push(nrOfPages);

  for (let i = 0; i < range.length; i++) {
    if (length) {
      if (range[i] - length === 2) {
        rangeWithDots.push(length + 1);
      } else if (range[i] - length !== 1) {
        rangeWithDots.push(MORE_PAGES);
      }
    }
    rangeWithDots.push(range[i]);
    length = range[i];
  }
  return rangeWithDots;
}

function fieldSorter (fields) {
  const dir = [];
  let i;
  const length = fields.length;
  fields = fields.map(function (o, i) {
    if (o[0] === '-') {
      dir[i] = -1;
      o = o.substring(1);
    } else {
      dir[i] = 1;
    }
    return o;
  });

  return function (a, b) {
    for (i = 0; i < length; i++) {
      const o = fields[i];
      if (a.value[o] > b.value[o]) {
        return dir[i];
      }
      if (a.value[o] < b.value[o]) {
        return -(dir[i]);
      }
    }
    return 0;
  };
}

function fieldFilter (result, filterFields) {
  // Filter it by field
  for (const filterKey in filterFields) {
    // console.log(filterKey + ' -> ' + filterFields[filterKey]);
    result = result.filter(function (entry) {
      const entryValue = entry.value;
      for (const entryKey in entryValue) {
        if (entryKey === filterKey) {
          if (typeof filterFields[filterKey] === 'function') {
            return filterFields[filterKey](entryValue[entryKey]);
          }
          if (filterFields[filterKey] === '') {
            return true;
          }
          if (entryValue[entryKey] === filterFields[filterKey]) {
            return true;
          }
        }
      }
      return false;
    });
  }
  return result;
}

// Search method that also takes into account transformations needed
function findAny (dsSearchIn, dsSearchAs, obj, str) {
  // Convert the search string to lower case
  str = str.toLowerCase();
  for (const key in obj) {
    if (dsSearchIn.length === 0 || dsSearchIn.indexOf(key) !== -1) {
      const value = String(obj[key]).toLowerCase();
      for (const field in dsSearchAs) {
        if (field === key) {
          // Found key in dsSearchAs so we pass the value and the search string to a search function
          // that returns true/false and we return that if true.
          /* Check if dsSearchAs was passed as string from template, if so call appropriate function from the component */
          if (typeof dsSearchAs[field] === 'string') {
            const res = this[dsSearchAs[field]](value, str);
            if (res === true) {
              return res;
            }
            /* Check if dsSearchAs is a function (passed from the template) */
          }
          if (typeof dsSearchAs[field] === 'function') {
            const res = dsSearchAs[field](value, str);
            if (res === true) {
              return res;
            }
          }
        }
      }
      // If it doesn't return from above we perform a simple search
      if (value.indexOf(str) >= 0) {
        return true;
      }
    }
  }
  return false;
}

export { MORE_PAGES, isEmptyObject, createPagingRange, fieldSorter, fieldFilter, findAny };
