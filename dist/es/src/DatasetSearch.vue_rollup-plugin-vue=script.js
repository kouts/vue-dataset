import { debounce } from './helpers/index.js';

//

var script = {
  inject: ['search'],
  props: {
    dsSearchPlaceholder: {
      type: String,
      default: ''
    },
    wait: {
      type: Number,
      default: 0
    }
  },
  data: function () {
    return {
      dsSearch: ''
    };
  },
  mounted () {
    this.input = debounce((value) => {
      this.search(value);
    }, this.wait);
  }
};

export default script;
//# sourceMappingURL=DatasetSearch.vue_rollup-plugin-vue=script.js.map
