import { d as debounce } from './index-e1c0eda3.js';
import { n as normalizeComponent } from './normalize-component-cf2db48b.js';

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
    }
  },
  mounted: function mounted() {
    var this$1$1 = this;

    this.input = debounce(function (value) {
      this$1$1.search(value);
    }, this.wait);
  }
};

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("input", {
    staticClass: "form-control",
    attrs: { type: "text", placeholder: _vm.dsSearchPlaceholder },
    domProps: { value: _vm.dsSearch },
    on: {
      input: function ($event) {
        return _vm.input($event.target.value)
      },
    },
  })
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
//# sourceMappingURL=DatasetSearch.js.map
