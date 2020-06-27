<template>
  <div>
    <slot :ds="{ dsShowEntries, dsResultsNumber, dsPage, dsPagecount, dsFrom, dsTo, dsData, dsRows, dsPages }"></slot>
  </div>
</template>

<script>
import datasetI18n from './i18n/en.js';
import { isEmptyObject, createPagingRange, fieldSorter, fieldFilter, findAny } from './helpers';

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
      default: () => ({})
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
      default: () => ({})
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
      const dsData = this.dsData;
      const dsSearch = this.dsSearch;
      const dsSortby = this.dsSortby;
      const dsFilterFields = this.dsFilterFields;
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
      return createPagingRange(this.dsPagecount, this.dsPage);
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
