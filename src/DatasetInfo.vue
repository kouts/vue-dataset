<template>
  <div>
    {{ datasetI18n.showing }} {{ showing }} {{ datasetI18n.showingTo }} {{ showingTo }} {{ datasetI18n.showingOf }}
    {{ dsResultsNumber }} {{ datasetI18n.showingEntries }}
  </div>
</template>

<script>
import { computed, inject } from 'vue'

export default {
  setup() {
    const dsResultsNumber = inject('dsResultsNumber')
    const dsFrom = inject('dsFrom')
    const dsTo = inject('dsTo')

    const showing = computed(() => (dsResultsNumber.value !== 0 ? dsFrom.value + 1 : 0))
    const showingTo = computed(() => (dsTo.value >= dsResultsNumber.value ? dsResultsNumber.value : dsTo.value))

    return {
      datasetI18n: inject('datasetI18n'),
      dsResultsNumber,
      showing,
      showingTo
    }
  }
}
</script>
