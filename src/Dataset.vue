<template>
  <div>
    <slot :ds="{ dsShowEntries, dsResultsNumber, dsPage, dsPagecount, dsFrom, dsTo, dsData, dsRows, dsPages }"></slot>
  </div>
</template>

<script>
import datasetI18n from './i18n/en.js';

// Sorting method
function compare (a, b) {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
}

// Search method that also takes into account transformations needed
function findAny (dsSearchIn, dsSearchAs, obj, str) {
  // Convert the search string to lower case
  str = str.toLowerCase();
  for (var key in obj) {
    if (dsSearchIn.length === 0 || dsSearchIn.indexOf(key) !== -1) {
      var value = String(obj[key]).toLowerCase();
      for (var field in dsSearchAs) {
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
      type: String,
      default: ''
    },
    dsSearchIn: {
      type: Array,
      default: () => []
    },
    dsSearchAs: {
      type: Object,
      default: () => {}
    },
    dsShowEntries: {
      type: Number,
      default: 10
    }
  },
  data: function () {
    return {
      dsPage: 1,
      dsSearch: '',
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
      var result = [];
      var dsData = this.dsData || [];
      var dsSearch = this.dsSearch;
      var dsSortby = this.dsSortby;
      var dsFilterFields = this.dsFilterFields;
      var dsSearchIn = this.dsSearchIn;
      var dsSearchAs = this.dsSearchAs;

      if (!dsSearch && !dsSortby && (!dsFilterFields || Object.keys(dsFilterFields).length === 0)) {
        // just get the indexes
        result = dsData.map(function (val, i) {
          return i;
        });
      } else {
        // Index it
        result = dsData.map(function (val, i) {
          return {
            index: i,
            value: val
          };
        });
        // Filter it by field
        for (var filterKey in dsFilterFields) {
          // console.log(filterKey+' -> '+dsFilterFields[filterKey]);
          result = result.filter(function (entry) {
            var entryValue = entry.value;
            for (var entryKey in entryValue) {
              if (entryKey === filterKey) {
                if (dsFilterFields[filterKey] === '') {
                  return true;
                }
                if (entryValue[entryKey] === dsFilterFields[filterKey]) {
                  return true;
                }
              }
            }
            return false;
          });
        }
        // Search it
        if (dsSearch) {
          result = result.filter(function (entry) {
            return findAny.call(this, dsSearchIn, dsSearchAs, entry.value, dsSearch);
          }.bind(this));
        }
        // Sort it
        if (dsSortby) {
          var reverse = (dsSortby.charAt(0) === '-');
          if (!reverse) {
            result = result.sort(function (a, b) {
              return compare(a.value[dsSortby], b.value[dsSortby]);
            });
          } else {
            dsSortby = dsSortby.substr(1);
            result = result.sort(function (b, a) {
              return compare(a.value[dsSortby], b.value[dsSortby]);
            });
          }
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
      var currentPage = this.dsPage;
      var nrOfPages = this.dsPagecount;
      var delta = 2;
      var range = [];
      var rangeWithDots = [];
      var l;

      range.push(1);

      if (nrOfPages <= 1) {
        return range;
      }

      for (var i = currentPage - delta; i <= currentPage + delta; i++) {
        if (i < nrOfPages && i > 1) {
          range.push(i);
        }
      }
      range.push(nrOfPages);

      for (var j = 0; j < range.length; j++) {
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
    dsData: {
      handler: function (val, oldVal) {
        // Reset active page when data changes
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
      this.$emit('update:dsShowEntries', value);
      // this.dsShowEntries = value;
      const pagesAfterChange = this.dsPages;
      if (pagesAfterChange.length < pagesBeforeChange.length) {
        this.setActive(pagesAfterChange[pagesAfterChange.length - 1]);
      }
    },
    setActive (value) {
      this.dsPage = value;
    }
  }
};
</script>
