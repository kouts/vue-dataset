<template>
  <slot :ds="{ dsShowEntries, dsResultsNumber, dsPage, dsPagecount, dsFrom, dsTo, dsData, dsRows, dsPages, search, showEntries, setActive }"></slot>
</template>

<script>
import i18n from './i18n/en.js'
import { isEmptyObject, createPagingRange, fieldSorter, fieldFilter, findAny } from './helpers'
import { ref, computed, provide, watch, nextTick } from 'vue'

export default {
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
  setup(props) {
    const dsPage = ref(1)
    const dsSearch = ref('')
    const dsShowEntries = ref(10)
    const datasetI18n = ref(i18n)
    const indexes = ref([])

    const search = (value) => {
      dsSearch.value = value
    }

    const showEntries = async (value) => {
      const pagesBeforeChange = dsPages.value
      dsShowEntries.value = value
      await nextTick()
      const pagesAfterChange = dsPages.value
      if (pagesAfterChange.length < pagesBeforeChange.length) {
        setActive(pagesAfterChange[pagesAfterChange.length - 1])
      }
    }

    const setActive = (value) => {
      dsPage.value = value
    }

    const whenChanged = computed(() => {
      /* eslint-disable no-unused-expressions */
      props.dsData
      dsSearch.value
      props.dsSortby
      props.dsFilterFields
      props.dsSearchIn
      props.dsSearchAs
      props.dsSortAs
      return Date.now()
    })

    const dsRows = computed(() => {
      return indexes.value.slice(dsFrom.value, dsTo.value)
    })

    const dsPages = computed(() => {
      return createPagingRange(dsPagecount.value, dsPage.value)
    })

    const dsResultsNumber = computed(() => {
      return indexes.value.length
    })

    const dsPagecount = computed(() => {
      return Math.ceil(dsResultsNumber.value / dsShowEntries.value)
    })

    const dsFrom = computed(() => {
      return (dsPage.value - 1) * dsShowEntries.value
    })

    const dsTo = computed(() => {
      return dsPage.value * dsShowEntries.value
    })

    watch(dsResultsNumber, (val, oldVal) => {
      // Reset active page when results change
      setActive(1)
    })

    watch(
      whenChanged,
      (val, oldVal) => {
        let result = []

        if (!dsSearch.value && !props.dsSortby.length && isEmptyObject(props.dsFilterFields)) {
          // Skip processing and just get the indexes
          result = props.dsData.map((val, i) => i)
        } else {
          // Index it
          result = props.dsData.map((val, i) => ({ index: i, value: val }))

          // Filter it by field
          if (!isEmptyObject(props.dsFilterFields)) {
            result = fieldFilter(result, props.dsFilterFields)
          }

          // Search it
          if (dsSearch.value) {
            result = result.filter((entry) => findAny(props.dsSearchIn, props.dsSearchAs, entry.value, dsSearch.value))
          }

          // Sort it
          if (props.dsSortby.length) {
            result.sort(fieldSorter(props.dsSortby, props.dsSortAs))
          }

          // We need only the indexes
          result = result.map((entry) => entry.index)
        }
        indexes.value = result
      },
      {
        immediate: true
      }
    )

    provide('search', search)
    provide('showEntries', showEntries)
    provide('setActive', setActive)
    provide('datasetI18n', datasetI18n)
    provide(
      'dsData',
      computed(() => props.dsData)
    )
    provide('dsRows', dsRows)
    provide('dsPages', dsPages)
    provide('dsResultsNumber', dsResultsNumber)
    provide('dsPagecount', dsPagecount)
    provide('dsFrom', dsFrom)
    provide('dsTo', dsTo)
    provide('dsPage', dsPage)

    return {
      dsShowEntries,
      dsResultsNumber,
      dsPage,
      dsPagecount,
      dsFrom,
      dsTo,
      dsRows,
      dsPages,
      search,
      showEntries,
      setActive
    }
  }
}
</script>
