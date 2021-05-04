<template>
  <div>
    {{ datasetI18n.showing }} {{ showing }} {{ datasetI18n.showingTo }} {{ showingTo }} {{ datasetI18n.showingOf }}
    {{ dsResultsNumber }} {{ datasetI18n.showingEntries }}
  </div>
</template>

<script>
export default {
  inject: ['datasetI18n', 'rdsResultsNumber', 'rdsFrom', 'rdsTo'],
  computed: {
    showing() {
      return this.dsResultsNumber !== 0 ? this.dsFrom + 1 : 0
    },
    showingTo() {
      return this.dsTo >= this.dsResultsNumber ? this.dsResultsNumber : this.dsTo
    },
    /* Setup reactive injects */
    dsResultsNumber() {
      return this.rdsResultsNumber()
    },
    dsFrom() {
      return this.rdsFrom()
    },
    dsTo() {
      return this.rdsTo()
    }
  }
}
</script>
