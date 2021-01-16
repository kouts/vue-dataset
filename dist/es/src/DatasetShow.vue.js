import normalizeComponent from '../node_modules/vue-runtime-helpers/dist/normalize-component.mjs.js';
import script from './DatasetShow.vue_rollup-plugin-vue=script.js';

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "form-inline" }, [
    _c("label", [_vm._v(_vm._s(_vm.datasetI18n.show))]),
    _vm._v(" "),
    _c(
      "select",
      {
        staticClass: "form-control mr-1 ml-1",
        domProps: { value: _vm.dsShowEntries },
        on: { change: _vm.change }
      },
      _vm._l(_vm.dsShowEntriesLovs, function(option) {
        return _c(
          "option",
          { key: option.value, domProps: { value: option.value } },
          [_vm._v("\n      " + _vm._s(option.text) + "\n    ")]
        )
      }),
      0
    ),
    _vm._v(" "),
    _c("label", [_vm._v(_vm._s(_vm.datasetI18n.entries))])
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
//# sourceMappingURL=DatasetShow.vue.js.map
