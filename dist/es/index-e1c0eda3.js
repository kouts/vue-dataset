var MORE_PAGES = '...';

function debounce(func, wait, immediate) {
  var timeout;

  return function () {
    var context = this;
    var args = arguments;

    clearTimeout(timeout);
    if (immediate && !timeout) {
      func.apply(context, args);
    }
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    }, wait);
  }
}

// https://jsperf.com/object-empty-ch/1
function isEmptyObject(obj) {
  // eslint-disable-next-line no-unreachable-loop
  for (var key in obj) {
    return false
  }

  return true
}

function createPagingRange(nrOfPages, currentPage) {
  var delta = 2;
  var range = [];
  var rangeWithDots = [];
  var length;

  range.push(1);

  if (nrOfPages <= 1) {
    return range
  }

  for (var i = currentPage - delta; i <= currentPage + delta; i++) {
    if (i < nrOfPages && i > 1) {
      range.push(i);
    }
  }
  range.push(nrOfPages);

  for (var i$1 = 0; i$1 < range.length; i$1++) {
    if (length) {
      if (range[i$1] - length === 2) {
        rangeWithDots.push(length + 1);
      } else if (range[i$1] - length !== 1) {
        rangeWithDots.push(MORE_PAGES);
      }
    }
    rangeWithDots.push(range[i$1]);
    length = range[i$1];
  }

  return rangeWithDots
}

function fieldSorter(fields, dsSortAs) {
  if ( dsSortAs === void 0 ) dsSortAs = {};

  var dir = [];
  var i;
  var length = fields.length;

  fields = fields.map(function (o, i) {
    if (o[0] === '-') {
      dir[i] = -1;
      o = o.substring(1);
    } else {
      dir[i] = 1;
    }

    return o
  });

  return function (a, b) {
    for (i = 0; i < length; i++) {
      var o = fields[i];
      var aVal = dsSortAs[o] ? dsSortAs[o](a.value[o]) : a.value[o];
      var bVal = dsSortAs[o] ? dsSortAs[o](b.value[o]) : b.value[o];

      if (aVal > bVal) {
        return dir[i]
      }
      if (aVal < bVal) {
        return -dir[i]
      }
    }

    return 0
  }
}

function fieldFilter(items, filterFields) {
  // Filter it by field
  var loop = function ( filterKey ) {
    // console.log(filterKey + ' -> ' + filterFields[filterKey]);
    items = items.filter(function (item) {
      var itemValue = item.value;

      for (var itemKey in itemValue) {
        if (itemKey === filterKey) {
          if (typeof filterFields[filterKey] === 'function') {
            return filterFields[filterKey](itemValue[itemKey])
          }
          if (filterFields[filterKey] === '') {
            return true
          }
          if (itemValue[itemKey] === filterFields[filterKey]) {
            return true
          }
        }
      }

      return false
    });
  };

  for (var filterKey in filterFields) loop( filterKey );

  return items
}

// Search method that also takes into account transformations needed
function findAny(dsSearchIn, dsSearchAs, rowData, str) {
  // Convert the search string to lower case
  str = String(str).toLowerCase();
  for (var key in rowData) {
    if (dsSearchIn.length === 0 || dsSearchIn.indexOf(key) !== -1) {
      var value = String(rowData[key]).toLowerCase();

      for (var field in dsSearchAs) {
        if (field === key) {
          // Found key in dsSearchAs so we pass the value and the search string to a search function
          // that returns true/false and we return that if true.
          /* Check if dsSearchAs is a function (passed from the template) */
          if (typeof dsSearchAs[field] === 'function') {
            var res = dsSearchAs[field](value, str, rowData);

            if (res === true) {
              return res
            }
          }
        }
      }
      // If it doesn't return from above we perform a simple search
      if (value.indexOf(str) >= 0) {
        return true
      }
    }
  }

  return false
}

export { MORE_PAGES as M, findAny as a, fieldSorter as b, createPagingRange as c, debounce as d, fieldFilter as f, isEmptyObject as i };
//# sourceMappingURL=index-e1c0eda3.js.map
