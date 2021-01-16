//
//
//
//
//
//
//
//

var script = {
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

export default script;
//# sourceMappingURL=DatasetInfo.vue_rollup-plugin-vue=script.js.map
