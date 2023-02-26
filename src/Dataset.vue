<template>
  <slot
    :ds="{
      dsIndexes,
      dsShowEntries,
      dsResultsNumber,
      dsPage,
      dsPagecount,
      dsFrom,
      dsTo,
      dsData,
      dsRows,
      dsPages,
      search,
      showEntries,
      setActive
    }"
  ></slot>
</template>

<script>
import i18n from './i18n/en.js'
import { computed, nextTick, provide, ref, watch } from 'vue'
import { createPagingRange, fieldFilter, fieldSorter, findAny, isEmptyObject } from './helpers'

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
  emits: ['update:dsData'],
  /**
   * @param {{
   *   dsData: Record<string, any>[];
   *   dsFilterFields: { [fieldId in string]: (columnValue: any) => boolean | any };
   *   dsSortby: string[];
   *   dsSearchIn: string[];
   *   dsSearchAs: { [id in string]: (columnValue: any, searchString: string) => boolean };
   *   dsSortAs: { [id in string]: (columnValue: any) => any };
   * }} props
   */
  setup(props, { emit }) {
    const dsPage = ref(1)
    const dsSearch = ref('')
    const dsShowEntries = ref(10)
    const datasetI18n = ref(i18n)
    const dsIndexes = ref([])

    const search = (value) => {
      dsSearch.value = value
    }

    const showEntries = async (value) => {
      dsShowEntries.value = value
      await nextTick()

      if (dsPage.value > dsPagecount.value) {
        setActive(dsPages.value[dsPages.value.length - 1])
      }
    }

    const setActive = (value) => {
      dsPage.value = value
    }

    const dsRows = computed(() => {
      return dsIndexes.value.slice(dsFrom.value, dsTo.value)
    })

    const dsPages = computed(() => {
      return createPagingRange(dsPagecount.value, dsPage.value)
    })

    const dsResultsNumber = computed(() => {
      return dsIndexes.value.length
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
      () => [props.dsData, dsSearch, props.dsSortby, props.dsFilterFields, props.dsSearchIn, props.dsSearchAs, props.dsSortAs],
      () => {
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
        dsIndexes.value = result

        emit(
          'update:dsData',
          result.map((i) => props.dsData[i])
        )
      },
      {
        immediate: true,
        deep: true
      }
    )

    provide('dsIndexes', dsIndexes)
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
      dsIndexes,
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
