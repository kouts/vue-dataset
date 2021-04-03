import { n as normalizeComponent } from './normalize-component-1efcb3aa.js';

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
  inject: ['rdsData', 'rdsRows'],
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },
  computed: {
    /* Setup reactive injects */
    dsRows: function dsRows () {
      return this.rdsRows();
    },
    dsData: function dsData () {
      return this.rdsData();
    }
  }
};

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    _vm.tag,
    { tag: "component" },
    [
      _vm._l(_vm.dsRows, function(item) {
        return [
          _vm._t("default", null, { row: _vm.dsData[item], rowIndex: item })
        ]
      }),
      _vm._v(" "),
      !_vm.dsRows.length ? _vm._t("noDataFound") : _vm._e()
    ],
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

export default __vue_component__;
//# sourceMappingURL=DatasetItem.js.map
