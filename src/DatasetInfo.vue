<template>
  <div>
    {{ datasetI18n.showing }} {{ dsResultsNumber !== 0 ? dsFrom + 1 : 0 }}
    {{ datasetI18n.showingTo }} {{ dsTo >= dsResultsNumber ? dsResultsNumber : dsTo }}
    {{ datasetI18n.showingOf }} {{ dsResultsNumber }} {{ datasetI18n.showingEntries }}
  </div>
</template>

<script>
export default {
  inject: ['datasetI18n'],
  props: {
    dsResultsNumber: {
      type: Number,
      default: 0
    },
    dsFrom: {
      type: Number,
      default: 0
    },
    dsTo: {
      type: Number,
      default: 0
    }
  }
};
</script>
