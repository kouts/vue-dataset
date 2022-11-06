import { c as createPagingRange, i as isEmptyObject, f as fieldFilter, a as findAny, b as fieldSorter } from './index-e1c0eda3.js';
import { n as normalizeComponent } from './normalize-component-cf2db48b.js';

var datasetI18n = {
  show: 'Show',
  entries: 'entries',
  previous: 'Previous',
  next: 'Next',
  showing: 'Showing',
  showingTo: 'to',
  showingOf: 'of',
  showingEntries: 'entries'
};

//

var script = {
  provide: function provide() {
    var this$1$1 = this;

    return {
      search: this.search,
      showEntries: this.showEntries,
      setActive: this.setActive,
      datasetI18n: this.datasetI18n,
      /* Setup reactive provides */
      rdsIndexes: function () { return this$1$1.indexes; },
      rdsData: function () { return this$1$1.dsData; },
      rdsRows: function () { return this$1$1.dsRows; },
      rdsPages: function () { return this$1$1.dsPages; },
      rdsResultsNumber: function () { return this$1$1.dsResultsNumber; },
      rdsPagecount: function () { return this$1$1.dsPagecount; },
      rdsFrom: function () { return this$1$1.dsFrom; },
      rdsTo: function () { return this$1$1.dsTo; },
      rdsPage: function () { return this$1$1.dsPage; }
    }
  },
  props: {
    dsData: {
      type: Array,
      default: function () { return []; }
    },
    dsFilterFields: {
      type: Object,
      default: function () { return ({}); }
    },
    dsSortby: {
      type: Array,
      default: function () { return []; }
    },
    dsSearchIn: {
      type: Array,
      default: function () { return []; }
    },
    dsSearchAs: {
      type: Object,
      default: function () { return ({}); }
    },
    dsSortAs: {
      type: Object,
      default: function () { return ({}); }
    }
  },
  data: function () {
    return {
      dsPage: 1,
      dsSearch: '',
      dsShowEntries: 10,
      datasetI18n: datasetI18n,
      indexes: []
    }
  },
  computed: {
    whenChanged: function whenChanged() {
      /* eslint-disable no-unused-expressions */
      this.dsData;
      this.dsSearch;
      this.dsSortby;
      this.dsFilterFields;
      this.dsSearchIn;
      this.dsSearchAs;
      this.dsSortAs;

      return Date.now()
    },
    dsRows: function dsRows() {
      // We should not modify another computed property from inside a computed property
      // This should be moved into the dsTo computed if needed
      /*
      if (this.dsTo <= 0) {
        this.dsTo = this.indexes.length;
      }
      */
      return this.indexes.slice(this.dsFrom, this.dsTo)
    },
    dsPages: function dsPages() {
      return createPagingRange(this.dsPagecount, this.dsPage)
    },
    dsResultsNumber: function dsResultsNumber() {
      return this.indexes.length
    },
    dsPagecount: function dsPagecount() {
      return Math.ceil(this.dsResultsNumber / this.dsShowEntries)
    },
    dsFrom: function dsFrom() {
      return (this.dsPage - 1) * this.dsShowEntries
    },
    dsTo: function dsTo() {
      return this.dsPage * this.dsShowEntries
    }
  },
  watch: {
    dsResultsNumber: {
      handler: function handler(val, oldVal) {
        // Reset active page when results change
        this.setActive(1);
      }
    },
    /*
    The naive attempt would be to manipulate the original array directly.
    This is problematic because it has to be filtered first, then sorted, then the from/to rows extracted.
    In order to do that in that order, we would need to work on a copy.
    But this is problematic as well since we'd loose the data-binding to the original array.

    The trick is to work directly on the array indexes.
    */
    whenChanged: {
      handler: function handler(newVal, oldVal) {
        var result = [];
        var dsData = this.dsData;
        var dsSearch = this.dsSearch;
        var dsSortby = this.dsSortby;
        var dsFilterFields = this.dsFilterFields;
        var dsSearchIn = this.dsSearchIn;
        var dsSearchAs = this.dsSearchAs;
        var dsSortAs = this.dsSortAs;

        if (!dsSearch && !dsSortby.length && isEmptyObject(dsFilterFields)) {
          // Skip processing and just get the indexes
          result = dsData.map(function (val, i) { return i; });
        } else {
          // Index it
          result = dsData.map(function (val, i) { return ({ index: i, value: val }); });

          // Filter it by field
          if (!isEmptyObject(dsFilterFields)) {
            result = fieldFilter(result, dsFilterFields);
          }

          // Search it
          if (dsSearch) {
            result = result.filter(function (entry) { return findAny(dsSearchIn, dsSearchAs, entry.value, dsSearch); });
          }

          // Sort it
          if (dsSortby.length) {
            result.sort(fieldSorter(dsSortby, dsSortAs));
          }

          // We need only the indexes
          result = result.map(function (entry) { return entry.index; });
        }
        this.indexes = result;
      },
      immediate: true
    }
  },
  methods: {
    search: function search(value) {
      this.dsSearch = value;
    },
    showEntries: function showEntries(value) {
      var this$1$1 = this;

      this.dsShowEntries = value;
      this.$nextTick(function () {
        if (this$1$1.dsPage > this$1$1.dsPagecount) {
          this$1$1.setActive(this$1$1.dsPages[this$1$1.dsPages.length - 1]);
        }
      });
    },
    setActive: function setActive(value) {
      this.dsPage = value;
    }
  }
};

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    [
      _vm._t("default", null, {
        ds: {
          dsIndexes: _vm.indexes,
          dsShowEntries: _vm.dsShowEntries,
          dsResultsNumber: _vm.dsResultsNumber,
          dsPage: _vm.dsPage,
          dsPagecount: _vm.dsPagecount,
          dsFrom: _vm.dsFrom,
          dsTo: _vm.dsTo,
          dsData: _vm.dsData,
          dsRows: _vm.dsRows,
          dsPages: _vm.dsPages,
          search: _vm.search,
          showEntries: _vm.showEntries,
          setActive: _vm.setActive,
        },
      }) ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

export { __vue_component__ as default };
//# sourceMappingURL=Dataset.js.map
