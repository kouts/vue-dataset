<template>
  <div>
    {{ datasetI18n.showing }} {{ showing }}
    {{ datasetI18n.showingTo }} {{ showingTo }}
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
  },
  computed: {
    showing () {
      return this.dsResultsNumber !== 0 ? this.dsFrom + 1 : 0;
    },
    showingTo () {
      return this.dsTo >= this.dsResultsNumber ? this.dsResultsNumber : this.dsTo;
    }
  }
};
</script>
