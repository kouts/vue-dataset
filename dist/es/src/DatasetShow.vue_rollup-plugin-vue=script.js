//
//
//
//
//
//
//
//
//
//
//
//

var script = {
  inject: ['datasetI18n', 'showEntries'],
  props: {
    dsShowEntries: {
      type: Number,
      default: 10
    },
    dsShowEntriesLovs: {
      type: Array,
      default: () => [{ value: 5, text: 5 }, { value: 10, text: 10 }, { value: 25, text: 25 }, { value: 50, text: 50 }, { value: 100, text: 100 }]
    }
  },
  created () {
    this.showEntries(Number(this.dsShowEntries));
  },
  methods: {
    change (e) {
      this.$emit('changed', Number(e.target.value));
      this.showEntries(Number(e.target.value));
    }
  }
};

export default script;
//# sourceMappingURL=DatasetShow.vue_rollup-plugin-vue=script.js.map
