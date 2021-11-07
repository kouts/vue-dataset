<template>
  <slot :ds="{ dsShowEntries, dsResultsNumber, dsPage, dsPagecount, dsFrom, dsTo, dsData, dsRows, dsPages }"></slot>
</template>

<script>
import datasetI18n from './i18n/en.js'
import { isEmptyObject, createPagingRange, fieldSorter, fieldFilter, findAny } from './helpers'

export default {
  provide() {
    return {
      search: this.search,
      showEntries: this.showEntries,
      setActive: this.setActive,
      datasetI18n: this.datasetI18n,
      /* Setup reactive provides */
      rdsData: () => this.dsData,
      rdsRows: () => this.dsRows,
      rdsPages: () => this.dsPages,
      rdsResultsNumber: () => this.dsResultsNumber,
      rdsPagecount: () => this.dsPagecount,
      rdsFrom: () => this.dsFrom,
      rdsTo: () => this.dsTo,
      rdsPage: () => this.dsPage
    }
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
    },
    dsSortAs: {
      type: Object,
      default: () => ({})
    }
  },
  data: function () {
    return {
      dsPage: 1,
      dsSearch: '',
      dsShowEntries: 10,
      datasetI18n: datasetI18n,
      indexes: []
    }
  },
  computed: {
    whenChanged() {
      /* eslint-disable no-unused-expressions */
      this.dsData
      this.dsSearch
      this.dsSortby
      this.dsFilterFields
      this.dsSearchIn
      this.dsSearchAs
      this.dsSortAs
      return Date.now()
    },
    dsRows() {
      // We should not modify another computed property from inside a computed property
      // This should be moved into the dsTo computed if needed
      /*
      if (this.dsTo <= 0) {
        this.dsTo = this.indexes.length;
      }
      */
      return this.indexes.slice(this.dsFrom, this.dsTo)
    },
    dsPages() {
      return createPagingRange(this.dsPagecount, this.dsPage)
    },
    dsResultsNumber() {
      return this.indexes.length
    },
    dsPagecount() {
      return Math.ceil(this.dsResultsNumber / this.dsShowEntries)
    },
    dsFrom() {
      return (this.dsPage - 1) * this.dsShowEntries
    },
    dsTo() {
      return this.dsPage * this.dsShowEntries
    }
  },
  watch: {
    dsResultsNumber: {
      handler(val, oldVal) {
        // Reset active page when results change
        this.setActive(1)
      }
    },
    /*
    The naive attempt would be to manipulate the original array directly.
    This is problematic because it has to be filtered first, then sorted, then the from/to rows extracted.
    In order to do that in that order, we would need to work on a copy.
    But this is problematic as well since we'd loose the data-binding to the original array.

    The trick is to work directly on the array indexes.
    */
    whenChanged: {
      handler(val, oldVal) {
        let result = []
        const dsData = this.dsData
        const dsSearch = this.dsSearch
        const dsSortby = this.dsSortby
        const dsFilterFields = this.dsFilterFields
        const dsSearchIn = this.dsSearchIn
        const dsSearchAs = this.dsSearchAs
        const dsSortAs = this.dsSortAs

        if (!dsSearch && !dsSortby.length && isEmptyObject(dsFilterFields)) {
          // Skip processing and just get the indexes
          result = dsData.map((val, i) => i)
        } else {
          // Index it
          result = dsData.map((val, i) => ({ index: i, value: val }))

          // Filter it by field
          if (!isEmptyObject(dsFilterFields)) {
            result = fieldFilter(result, dsFilterFields)
          }

          // Search it
          if (dsSearch) {
            result = result.filter((entry) => findAny(dsSearchIn, dsSearchAs, entry.value, dsSearch))
          }

          // Sort it
          if (dsSortby.length) {
            result.sort(fieldSorter(dsSortby, dsSortAs))
          }

          // We need only the indexes
          result = result.map((entry) => entry.index)
        }
        this.indexes = result
      },
      immediate: true
    }
  },
  methods: {
    search(value) {
      this.dsSearch = value
    },
    showEntries(value) {
      const pagesBeforeChange = this.dsPages
      this.dsShowEntries = value
      this.$nextTick(() => {
        const pagesAfterChange = this.dsPages
        if (pagesAfterChange.length < pagesBeforeChange.length) {
          this.setActive(pagesAfterChange[pagesAfterChange.length - 1])
        }
      })
    },
    setActive(value) {
      this.dsPage = value
    }
  }
}
</script>
