import { n as normalizeComponent } from './normalize-component-cf2db48b.js';

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
  inject: ['rdsData', 'rdsRows', 'rdsFrom', 'rdsTo'],
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },
  computed: {
    /* Setup reactive injects */
    dsRows: function dsRows() {
      return this.rdsRows()
    },
    dsData: function dsData() {
      return this.rdsData()
    },
    dsFrom: function dsFrom() {
      return this.rdsFrom()
    },
    dsTo: function dsTo() {
      return this.rdsTo()
    },
    indexes: function indexes() {
      var arr = [];

      for (var i = this.dsFrom; i < this.dsTo; i++) {
        arr.push(i);
      }

      return arr
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
    _vm.tag,
    { tag: "component" },
    [
      _vm._l(_vm.dsRows, function (rowIndex, i) {
        return [
          _vm._t("default", null, {
            row: _vm.dsData[rowIndex],
            rowIndex: rowIndex,
            index: _vm.indexes[i],
          }) ]
      }),
      _vm._v(" "),
      !_vm.dsRows.length ? _vm._t("noDataFound") : _vm._e() ],
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
//# sourceMappingURL=DatasetItem.js.map
