<template>
  <div>
    {{ datasetI18n.showing }} {{ showing }}
    {{ datasetI18n.showingTo }} {{ showingTo }}
    {{ datasetI18n.showingOf }} {{ ds.dsResultsNumber }} {{ datasetI18n.showingEntries }}
  </div>
</template>

<script>
export default {
  inject: ['ds', 'datasetI18n'],
  computed: {
    showing () {
      return this.ds.dsResultsNumber !== 0 ? this.ds.dsFrom + 1 : 0;
    },
    showingTo () {
      return this.ds.dsTo >= this.ds.dsResultsNumber ? this.ds.dsResultsNumber : this.ds.dsTo;
    }
  }
};
</script>
