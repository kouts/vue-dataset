(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.DatasetSearch = factory());
})(this, function() {
  "use strict";
  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this;
      var args = arguments;
      clearTimeout(timeout);
      if (immediate && !timeout) {
        func.apply(context, args);
      }
      timeout = setTimeout(function() {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      }, wait);
    };
  }
  var render = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("input", {
      staticClass: "form-control",
      attrs: {
        "type": "text",
        "placeholder": _vm.dsSearchPlaceholder
      },
      domProps: {
        "value": _vm.dsSearch
      },
      on: {
        "input": function($event) {
          return _vm.input($event.target.value);
        }
      }
    });
  };
  var staticRenderFns = [];
  function normalizeComponent(scriptExports, render2, staticRenderFns2, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
    var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
    if (render2) {
      options.render = render2;
      options.staticRenderFns = staticRenderFns2;
      options._compiled = true;
    }
    if (functionalTemplate) {
      options.functional = true;
    }
    if (scopeId) {
      options._scopeId = "data-v-" + scopeId;
    }
    var hook;
    if (moduleIdentifier) {
      hook = function(context) {
        context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
        if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
          context = __VUE_SSR_CONTEXT__;
        }
        if (injectStyles) {
          injectStyles.call(this, context);
        }
        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      };
      options._ssrRegister = hook;
    } else if (injectStyles) {
      hook = shadowMode ? function() {
        injectStyles.call(this, (options.functional ? this.parent : this).$root.$options.shadowRoot);
      } : injectStyles;
    }
    if (hook) {
      if (options.functional) {
        options._injectStyles = hook;
        var originalRender = options.render;
        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }
    return {
      exports: scriptExports,
      options
    };
  }
  var __vue2_script = {
    inject: ["search"],
    props: {
      dsSearchPlaceholder: {
        type: String,
        default: ""
      },
      wait: {
        type: Number,
        default: 0
      }
    },
    data: function() {
      return {
        dsSearch: ""
      };
    },
    mounted: function mounted() {
      var this$1$1 = this;
      this.input = debounce(function(value) {
        this$1$1.search(value);
      }, this.wait);
    }
  };
  var __cssModules = {};
  var __component__ = /* @__PURE__ */ normalizeComponent(__vue2_script, render, staticRenderFns, false, __vue2_injectStyles, null, null, null);
  function __vue2_injectStyles(context) {
    for (var o in __cssModules) {
      this[o] = __cssModules[o];
    }
  }
  const DatasetSearch = /* @__PURE__ */ function() {
    return __component__.exports;
  }();
  return DatasetSearch;
});
//# sourceMappingURL=DatasetSearch.js.map
