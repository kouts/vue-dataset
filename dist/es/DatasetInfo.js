import { n as normalizeComponent } from './normalize-component-1efcb3aa.js';

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

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", [
    _vm._v(
      "\n  " +
        _vm._s(_vm.datasetI18n.showing) +
        " " +
        _vm._s(_vm.showing) +
        "\n  " +
        _vm._s(_vm.datasetI18n.showingTo) +
        " " +
        _vm._s(_vm.showingTo) +
        "\n  " +
        _vm._s(_vm.datasetI18n.showingOf) +
        " " +
        _vm._s(_vm.ds.dsResultsNumber) +
        " " +
        _vm._s(_vm.datasetI18n.showingEntries) +
        "\n"
    )
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
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

export default __vue_component__;
//# sourceMappingURL=DatasetInfo.js.map
