import { n as normalizeComponent } from './normalize-component-cf2db48b.js';

//
//
//
//
//
//
//

var script = {
  inject: ['datasetI18n', 'rdsResultsNumber', 'rdsFrom', 'rdsTo'],
  computed: {
    showing: function showing() {
      return this.dsResultsNumber !== 0 ? this.dsFrom + 1 : 0
    },
    showingTo: function showingTo() {
      return this.dsTo >= this.dsResultsNumber ? this.dsResultsNumber : this.dsTo
    },
    /* Setup reactive injects */
    dsResultsNumber: function dsResultsNumber() {
      return this.rdsResultsNumber()
    },
    dsFrom: function dsFrom() {
      return this.rdsFrom()
    },
    dsTo: function dsTo() {
      return this.rdsTo()
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
  return _c("div", [
    _vm._v(
      "\n  " +
        _vm._s(_vm.datasetI18n.showing) +
        " " +
        _vm._s(_vm.showing) +
        " " +
        _vm._s(_vm.datasetI18n.showingTo) +
        " " +
        _vm._s(_vm.showingTo) +
        " " +
        _vm._s(_vm.datasetI18n.showingOf) +
        "\n  " +
        _vm._s(_vm.dsResultsNumber) +
        " " +
        _vm._s(_vm.datasetI18n.showingEntries) +
        "\n"
    ) ])
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
//# sourceMappingURL=DatasetInfo.js.map
