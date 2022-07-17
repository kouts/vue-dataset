function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
(function(global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.DatasetItem = factory());
})(this, function() {
  "use strict";
  var render = function __render__() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(_vm.tag, {
      tag: "component"
    }, [_vm._l(_vm.dsRows, function(rowIndex, i) {
      return [_vm._t("default", null, {
        "row": _vm.dsData[rowIndex],
        "rowIndex": rowIndex,
        "index": _vm.indexes[i]
      })];
    }), !_vm.dsRows.length ? _vm._t("noDataFound") : _vm._e()], 2);
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
      hook = function hook2(context) {
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
    inject: ["rdsData", "rdsRows", "rdsFrom", "rdsTo"],
    props: {
      tag: {
        type: String,
        default: "div"
      }
    },
    computed: {
      dsRows: function dsRows() {
        return this.rdsRows();
      },
      dsData: function dsData() {
        return this.rdsData();
      },
      dsFrom: function dsFrom() {
        return this.rdsFrom();
      },
      dsTo: function dsTo() {
        return this.rdsTo();
      },
      indexes: function indexes() {
        var arr = [];
        for (var i = this.dsFrom; i < this.dsTo; i++) {
          arr.push(i);
        }
        return arr;
      }
    }
  };
  var __cssModules = {};
  var __component__ = /* @__PURE__ */ normalizeComponent(__vue2_script, render, staticRenderFns, false, __vue2_injectStyles, null, null, null);
  function __vue2_injectStyles(context) {
    for (var o in __cssModules) {
      this[o] = __cssModules[o];
    }
  }
  var DatasetItem = /* @__PURE__ */ function() {
    return __component__.exports;
  }();
  return DatasetItem;
});
//# sourceMappingURL=DatasetItem.js.map
