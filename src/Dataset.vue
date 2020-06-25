<template>
  <div>
    <slot :ds="{ dsShowEntries, dsResultsNumber, dsPage, dsPagecount, dsFrom, dsTo, dsData, dsRows, dsPages }"></slot>
  </div>
</template>

<script>
import datasetI18n from './i18n/en.js';

function isEmptyObject (obj) {
  return Object.keys(obj).length === 0;
}

function fieldSorter (fields) {
  const dir = [];
  let i;
  const l = fields.length;
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
    for (i = 0; i < l; i++) {
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

export default {
  provide () {
    return {
      search: this.search,
      showEntries: this.showEntries,
      setActive: this.setActive,
      datasetI18n: this.datasetI18n
    };
  },
  props: {
    dsData: {
      type: Array,
      default: () => []
    },
    dsFilterFields: {
      type: Object,
      default: () => {}
    },
    dsSortby: {
      type: Array,
      default: () => []
    },
    dsSearchIn: {
      type: Array,
      default: () => []
    },
    dsSearchAs: {
      type: Object,
      default: () => {}
    }
  },
  data: function () {
    return {
      dsPage: 1,
      dsSearch: '',
      dsShowEntries: 10,
      datasetI18n: datasetI18n
    };
  },
  computed: {
    /*
    The naive attempt would be to manipulate the original array directly.
    This is problematic because it have to be filtered first, then sorted, then the from/to rows extracted.
    In order to do that in that order, you would need to work on a copy.
    But this is problematic as well since you'd loose the data-binding with the original array.

    The trick is to work directly on the array indexes.
    */
    indexes: function () {
      let result = [];
      const dsData = this.dsData || [];
      const dsSearch = this.dsSearch;
      const dsSortby = this.dsSortby;
      const dsFilterFields = this.dsFilterFields || {};
      const dsSearchIn = this.dsSearchIn;
      const dsSearchAs = this.dsSearchAs;

      if (!dsSearch && !dsSortby.length && isEmptyObject(dsFilterFields)) {
        // Just get the indexes
        result = dsData.map(function (val, i) {
          return i;
        });
      } else {
        // Index it
        result = dsData.map(function (val, i) {
          return { index: i, value: val };
        });

        // Filter it by field
        if (!isEmptyObject(dsFilterFields)) {
          result = fieldFilter(result, dsFilterFields);
        }

        // Search it
        if (dsSearch) {
          result = result.filter(function (entry) {
            return findAny.call(this, dsSearchIn, dsSearchAs, entry.value, dsSearch);
          }.bind(this));
        }

        // Sort it
        if (dsSortby.length) {
          result.sort(fieldSorter(dsSortby));
        }

        // We need indexes only
        result = result.map(function (entry) {
          return entry.index;
        });
      }
      // console.log('update');
      // console.log(result);
      return result;
    },
    dsRows: function () {
      // Cannot modify another computed property from inside a computed property
      // This should be moved into the dsTo computed if needed
      /*
      if (this.dsTo <= 0) {
        this.dsTo = this.indexes.length;
      }
      */
      // console.log(this.indexes);
      return this.indexes.slice(this.dsFrom, this.dsTo);
    },
    dsPages: function () {
      const currentPage = this.dsPage;
      const nrOfPages = this.dsPagecount;
      const delta = 2;
      const range = [];
      const rangeWithDots = [];
      let l;

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

      for (let j = 0; j < range.length; j++) {
        if (l) {
          if (range[j] - l === 2) {
            rangeWithDots.push(l + 1);
          } else if (range[j] - l !== 1) {
            rangeWithDots.push('...');
          }
        }
        rangeWithDots.push(range[j]);
        l = range[j];
      }
      return rangeWithDots;
    },
    dsResultsNumber: function () {
      return this.indexes.length;
    },
    dsPagecount: function () {
      return Math.ceil(this.dsResultsNumber / this.dsShowEntries);
    },
    dsFrom: function () {
      return (this.dsPage - 1) * this.dsShowEntries;
    },
    dsTo: function () {
      return this.dsPage * this.dsShowEntries;
    }
  },
  watch: {
    dsResultsNumber: {
      handler: function (val, oldVal) {
        // Reset active page when results change
        this.setActive(1);
      }
    }
  },
  methods: {
    search (value) {
      this.dsSearch = value;
    },
    showEntries (value) {
      const pagesBeforeChange = this.dsPages;
      this.dsShowEntries = value;
      this.$nextTick(() => {
        const pagesAfterChange = this.dsPages;
        if (pagesAfterChange.length < pagesBeforeChange.length) {
          this.setActive(pagesAfterChange[pagesAfterChange.length - 1]);
        }
      });
    },
    setActive (value) {
      this.dsPage = value;
    }
  }
};
</script>
