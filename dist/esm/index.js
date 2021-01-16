import vue from 'vue';

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var VueReactiveProvide_common = createCommonjsModule(function (module) {
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = vue;

/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var i;
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1]; // eslint-disable-line
  }
}

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// CONCATENATED MODULE: ./lib/utils/index.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }


var utils_createReactiveObject = function createReactiveObject() {
  return external_commonjs_vue_commonjs2_vue_root_Vue_default.a.observable({});
};
var pick = function pick(obj) {
  var arr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (Array.isArray(obj) || _typeof(obj) !== 'object') return obj;
  var keys = Array.isArray(arr) ? arr : Object.keys(arr);
  var mapping = !Array.isArray(arr);
  return keys.reduce(function (picked, key) {
    var newKey = mapping ? arr[key] : key;
    picked[newKey] = obj[key];
    return picked;
  }, {});
};
// CONCATENATED MODULE: ./lib/utils/warn.js
function warn(msg) {
  console.error("[vue-reactive-provide]: ".concat(msg));
}
// CONCATENATED MODULE: ./lib/mixins/ReactiveProvide.js
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




function createReactiveProvideMixin() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      name = _ref.name,
      _ref$nameForComputed = _ref.nameForComputed,
      nameForComputed = _ref$nameForComputed === void 0 ? null : _ref$nameForComputed,
      _ref$props = _ref.props,
      props = _ref$props === void 0 ? false : _ref$props,
      _ref$attrs = _ref.attrs,
      attrs = _ref$attrs === void 0 ? false : _ref$attrs,
      _ref$listeners = _ref.listeners,
      listeners = _ref$listeners === void 0 ? false : _ref$listeners,
      _ref$include = _ref.include,
      include = _ref$include === void 0 ? false : _ref$include,
      _ref$inheritAs = _ref.inheritAs,
      inheritAs = _ref$inheritAs === void 0 ? false : _ref$inheritAs;

  if (!name) {
    warn("[vue-reactive-provide]: No name property found on options object when trying to create mixin.\n      the 'name' property is required.");
    return;
  }

  var internalDataName = '';
  var computedName = nameForComputed || name;
  return {
    beforeCreate: function beforeCreate() {
      internalDataName = "$_reactiveProvide-".concat(name, "-Data");
      this[internalDataName] = utils_createReactiveObject(); // just an empty object so far
    },
    provide: function provide() {
      return _defineProperty({}, name, this[internalDataName]);
    },
    inject: inheritAs ? _defineProperty({}, inheritAs, {
      from: name,
      default: {}
    }) : undefined,
    computed: _defineProperty({}, computedName, function () {
      var result = {};
      inheritAs && Object.assign(result, this[inheritAs]);
      include && Object.assign(result, pick(this, include));
      props && Object.assign(result, this.$props);
      attrs && Object.assign(result, this.$attrs);
      listeners && Object.assign(result, this.$listeners);
      return result;
    }),
    watch: _defineProperty({}, computedName, {
      immediate: true,
      handler: function handler() {
        var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var data = this[internalDataName];
        Object.keys(val).forEach(function (key) {
          if (data.hasOwnProperty(key)) {
            data[key] = val[key];
          } else {
            external_commonjs_vue_commonjs2_vue_root_Vue_default.a.set(data, key, val[key]);
          }
        });
      }
    })
  };
}
// CONCATENATED MODULE: ./lib/mixins/GlobalMixin.js
function GlobalMixin_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { GlobalMixin_typeof = function _typeof(obj) { return typeof obj; }; } else { GlobalMixin_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return GlobalMixin_typeof(obj); }



var _Vue$config$optionMer = external_commonjs_vue_commonjs2_vue_root_Vue_default.a.config.optionMergeStrategies,
    mergeProvide = _Vue$config$optionMer.provide,
    mergeComputed = _Vue$config$optionMer.computed,
    mergeInject = _Vue$config$optionMer.inject;
var GlobalMixin_createGlobalMixin = function createGlobalMixin() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$name = _ref.name,
      name = _ref$name === void 0 ? 'reactiveProvide' : _ref$name;

  return {
    beforeCreate: function beforeCreate() {
      var _this = this;

      var options = this.$options[name];
      if (!options) return;

      if (typeof options === 'function') {
        options = options.call(this, this);
      }
      /* istanbul ignore next */


      if (GlobalMixin_typeof(options) !== 'object') return;

      var _ReactiveProvide = createReactiveProvideMixin(options),
          beforeCreate = _ReactiveProvide.beforeCreate,
          provide = _ReactiveProvide.provide,
          inject = _ReactiveProvide.inject,
          computed = _ReactiveProvide.computed,
          watch = _ReactiveProvide.watch; // hook


      beforeCreate.call(this, this); //merging options

      this.$options.computed = mergeComputed(this.$options.computed, computed, this, 'computed');
      this.$options.provide = mergeProvide(this.$options.provide, provide, this, 'provide');
      this.$options.inject = mergeInject(this.$options.inject, inject, this, 'inject'); //applying the watch

      this.$once('hook:created', function () {
        var unwatch = _this.$watch(function () {
          return _this[options.name];
        }, watch[options.name].handler, {
          immediate: true
        });

        _this.$on('hook:beforeDestroy', unwatch);
      });
    }
  };
};
// CONCATENATED MODULE: ./lib/index.js



function install(Vue, options) {
  Vue.mixin(GlobalMixin_createGlobalMixin(options));
}

/* harmony default export */ var lib = ({
  install: install,
  version: "0.3.0"
});

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js
/* concated harmony reexport ReactiveProvideMixin */__webpack_require__.d(__webpack_exports__, "ReactiveProvideMixin", function() { return createReactiveProvideMixin; });


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (lib);



/***/ })

/******/ });

});

unwrapExports(VueReactiveProvide_common);
var VueReactiveProvide_common_1 = VueReactiveProvide_common.ReactiveProvideMixin;

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

const MORE_PAGES = '...';

function debounce (func, wait, immediate) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    if (immediate && !timeout) {
      func.apply(context, args);
    }
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    }, wait);
  };
}
// https://jsperf.com/object-empty-ch/1
function isEmptyObject (obj) {
  for (const key in obj) {
    return false;
  }
  return true;
}

function createPagingRange (nrOfPages, currentPage) {
  const delta = 2;
  const range = [];
  const rangeWithDots = [];
  let length;

  range.push(1);

  if (nrOfPages <= 1) {
    return range;
  }

  for (let i = currentPage - delta; i <= currentPage + delta; i++) {
    if (i < nrOfPages && i > 1) {
      range.push(i);
    }
  }
  range.push(nrOfPages);

  for (let i = 0; i < range.length; i++) {
    if (length) {
      if (range[i] - length === 2) {
        rangeWithDots.push(length + 1);
      } else if (range[i] - length !== 1) {
        rangeWithDots.push(MORE_PAGES);
      }
    }
    rangeWithDots.push(range[i]);
    length = range[i];
  }
  return rangeWithDots;
}

function fieldSorter (fields, dsSortAs = {}) {
  const dir = [];
  let i;
  const length = fields.length;
  fields = fields.map(function (o, i) {
    if (o[0] === '-') {
      dir[i] = -1;
      o = o.substring(1);
    } else {
      dir[i] = 1;
    }
    return o;
  });

  return function (a, b) {
    for (i = 0; i < length; i++) {
      const o = fields[i];
      const aVal = dsSortAs[o] ? dsSortAs[o](a.value[o]) : a.value[o];
      const bVal = dsSortAs[o] ? dsSortAs[o](b.value[o]) : b.value[o];
      if (aVal > bVal) {
        return dir[i];
      }
      if (aVal < bVal) {
        return -(dir[i]);
      }
    }
    return 0;
  };
}

function fieldFilter (items, filterFields) {
  // Filter it by field
  for (const filterKey in filterFields) {
    // console.log(filterKey + ' -> ' + filterFields[filterKey]);
    items = items.filter(function (item) {
      const itemValue = item.value;
      for (const itemKey in itemValue) {
        if (itemKey === filterKey) {
          if (typeof filterFields[filterKey] === 'function') {
            return filterFields[filterKey](itemValue[itemKey]);
          }
          if (filterFields[filterKey] === '') {
            return true;
          }
          if (itemValue[itemKey] === filterFields[filterKey]) {
            return true;
          }
        }
      }
      return false;
    });
  }
  return items;
}

// Search method that also takes into account transformations needed
function findAny (dsSearchIn, dsSearchAs, obj, str) {
  // Convert the search string to lower case
  str = str.toLowerCase();
  for (const key in obj) {
    if (dsSearchIn.length === 0 || dsSearchIn.indexOf(key) !== -1) {
      const value = String(obj[key]).toLowerCase();
      for (const field in dsSearchAs) {
        if (field === key) {
          // Found key in dsSearchAs so we pass the value and the search string to a search function
          // that returns true/false and we return that if true.
          /* Check if dsSearchAs is a function (passed from the template) */
          if (typeof dsSearchAs[field] === 'function') {
            const res = dsSearchAs[field](value, str);
            if (res === true) {
              return res;
            }
          }
        }
      }
      // If it doesn't return from above we perform a simple search
      if (value.indexOf(str) >= 0) {
        return true;
      }
    }
  }
  return false;
}

//

var script = {
  provide () {
    return {
      search: this.search,
      showEntries: this.showEntries,
      setActive: this.setActive,
      datasetI18n: this.datasetI18n
    };
  },
  mixins: [
    VueReactiveProvide_common_1({
      name: 'ds',
      include: ['dsData', 'dsRows', 'dsResultsNumber', 'dsFrom', 'dsTo', 'dsPages', 'dsPagecount', 'dsPage']
    })
  ],
  props: {
    dsData: {
      type: Array,
      default: () => []
    },
    dsFilterFields: {
      type: Object,
      default: () => ({})
    },
    dsSortby: {
      type: Array,
      default: () => []
    },
    dsSearchIn: {
      type: Array,
      default: () => []
    },
    dsSearchAs: {
      type: Object,
      default: () => ({})
    },
    dsSortAs: {
      type: Object,
      default: () => ({})
    }
  },
  data: function () {
    return {
      dsPage: 1,
      dsSearch: '',
      dsShowEntries: 10,
      datasetI18n: datasetI18n
    };
  },
  computed: {
    /*
    The naive attempt would be to manipulate the original array directly.
    This is problematic because it has to be filtered first, then sorted, then the from/to rows extracted.
    In order to do that in that order, you would need to work on a copy.
    But this is problematic as well since you'd loose the data-binding with the original array.

    The trick is to work directly on the array indexes.
    */
    indexes: function () {
      let result = [];
      const dsData = this.dsData;
      const dsSearch = this.dsSearch;
      const dsSortby = this.dsSortby;
      const dsFilterFields = this.dsFilterFields;
      const dsSearchIn = this.dsSearchIn;
      const dsSearchAs = this.dsSearchAs;
      const dsSortAs = this.dsSortAs;

      if (!dsSearch && !dsSortby.length && isEmptyObject(dsFilterFields)) {
        // Just get the indexes
        result = dsData.map(function (val, i) {
          return i;
        });
      } else {
        // Index it
        result = dsData.map(function (val, i) {
          return { index: i, value: val };
        });

        // Filter it by field
        if (!isEmptyObject(dsFilterFields)) {
          result = fieldFilter(result, dsFilterFields);
        }

        // Search it
        if (dsSearch) {
          result = result.filter(function (entry) {
            return findAny(dsSearchIn, dsSearchAs, entry.value, dsSearch);
          });
        }

        // Sort it
        if (dsSortby.length) {
          result.sort(fieldSorter(dsSortby, dsSortAs));
        }

        // We need indexes only
        result = result.map(function (entry) {
          return entry.index;
        });
      }
      return result;
    },
    dsRows: function () {
      // We should not modify another computed property from inside a computed property
      // This should be moved into the dsTo computed if needed
      /*
      if (this.dsTo <= 0) {
        this.dsTo = this.indexes.length;
      }
      */
      // console.log(this.indexes);
      return this.indexes.slice(this.dsFrom, this.dsTo);
    },
    dsPages: function () {
      return createPagingRange(this.dsPagecount, this.dsPage);
    },
    dsResultsNumber: function () {
      return this.indexes.length;
    },
    dsPagecount: function () {
      return Math.ceil(this.dsResultsNumber / this.dsShowEntries);
    },
    dsFrom: function () {
      return (this.dsPage - 1) * this.dsShowEntries;
    },
    dsTo: function () {
      return this.dsPage * this.dsShowEntries;
    }
  },
  watch: {
    dsResultsNumber: {
      handler: function (val, oldVal) {
        // Reset active page when results change
        this.setActive(1);
      }
    }
  },
  methods: {
    search (value) {
      this.dsSearch = value;
    },
    showEntries (value) {
      const pagesBeforeChange = this.dsPages;
      this.dsShowEntries = value;
      this.$nextTick(() => {
        const pagesAfterChange = this.dsPages;
        if (pagesAfterChange.length < pagesBeforeChange.length) {
          this.setActive(pagesAfterChange[pagesAfterChange.length - 1]);
        }
      });
    },
    setActive (value) {
      this.dsPage = value;
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    [
      _vm._t("default", null, {
        ds: {
          dsShowEntries: _vm.dsShowEntries,
          dsResultsNumber: _vm.dsResultsNumber,
          dsPage: _vm.dsPage,
          dsPagecount: _vm.dsPagecount,
          dsFrom: _vm.dsFrom,
          dsTo: _vm.dsTo,
          dsData: _vm.dsData,
          dsRows: _vm.dsRows,
          dsPages: _vm.dsPages
        }
      })
    ],
    2
  )
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

//
//
//
//
//
//
//
//

var script$1 = {
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
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
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
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//

var script$2 = {
  inject: ['ds'],
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  }
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    _vm.tag,
    { tag: "component" },
    [
      _vm._l(_vm.ds.dsRows, function(item) {
        return [
          _vm._t("default", null, { row: _vm.ds.dsData[item], rowIndex: item })
        ]
      }),
      _vm._v(" "),
      !_vm.ds.dsRows.length ? _vm._t("noDataFound") : _vm._e()
    ],
    2
  )
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$2 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    undefined,
    undefined,
    undefined
  );

//

var script$3 = {
  inject: ['ds', 'datasetI18n', 'setActive'],
  data: function () {
    return {
      morePages: MORE_PAGES
    };
  }
};

/* script */
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "ul",
    { staticClass: "pagination" },
    [
      _c(
        "li",
        {
          class: [
            "page-item",
            (_vm.ds.dsPage === 1 || _vm.ds.dsPagecount === 1) && "disabled"
          ]
        },
        [
          _c(
            "a",
            {
              staticClass: "page-link",
              attrs: {
                href: "#",
                tabindex:
                  (_vm.ds.dsPage === 1 || _vm.ds.dsPagecount === 1) && "-1",
                "aria-disabled":
                  (_vm.ds.dsPage === 1 || _vm.ds.dsPagecount === 1) && "true"
              },
              on: {
                click: function($event) {
                  $event.preventDefault();
                  return _vm.setActive(
                    _vm.ds.dsPage !== 1 && _vm.ds.dsPagecount !== 0
                      ? _vm.ds.dsPage - 1
                      : _vm.ds.dsPage
                  )
                }
              }
            },
            [_vm._v("\n      " + _vm._s(_vm.datasetI18n.previous) + "\n    ")]
          )
        ]
      ),
      _vm._v(" "),
      _vm._l(_vm.ds.dsPages, function(item, index) {
        return [
          _c(
            "li",
            {
              key: index,
              class: [
                "page-item",
                item === _vm.ds.dsPage && "active",
                item === _vm.morePages && "disabled"
              ]
            },
            [
              item !== _vm.morePages
                ? _c(
                    "a",
                    {
                      staticClass: "page-link",
                      attrs: { href: "#" },
                      on: {
                        click: function($event) {
                          $event.preventDefault();
                          return _vm.setActive(item)
                        }
                      }
                    },
                    [_vm._v("\n        " + _vm._s(item) + "\n      ")]
                  )
                : _c("span", { staticClass: "page-link" }, [
                    _vm._v("\n        " + _vm._s(item) + "\n      ")
                  ])
            ]
          )
        ]
      }),
      _vm._v(" "),
      _c(
        "li",
        {
          class: [
            "page-item",
            (_vm.ds.dsPage === _vm.ds.dsPagecount ||
              _vm.ds.dsPagecount === 1) &&
              "disabled"
          ]
        },
        [
          _c(
            "a",
            {
              staticClass: "page-link",
              attrs: {
                href: "#",
                tabindex:
                  (_vm.ds.dsPage === _vm.ds.dsPagecount ||
                    _vm.ds.dsPagecount === 1) &&
                  "-1",
                "aria-disabled":
                  (_vm.ds.dsPage === _vm.ds.dsPagecount ||
                    _vm.ds.dsPagecount === 1) &&
                  "true"
              },
              on: {
                click: function($event) {
                  $event.preventDefault();
                  return _vm.setActive(
                    _vm.ds.dsPage !== _vm.ds.dsPagecount &&
                      _vm.ds.dsPagecount !== 0
                      ? _vm.ds.dsPage + 1
                      : _vm.ds.dsPage
                  )
                }
              }
            },
            [_vm._v("\n      " + _vm._s(_vm.datasetI18n.next) + "\n    ")]
          )
        ]
      )
    ],
    2
  )
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = undefined;
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$3 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    undefined,
    undefined,
    undefined
  );

//

var script$4 = {
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

/* script */
const __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("input", {
    staticClass: "form-control",
    attrs: { type: "text", placeholder: _vm.dsSearchPlaceholder },
    domProps: { value: _vm.dsSearch },
    on: {
      input: function($event) {
        return _vm.input($event.target.value)
      }
    }
  })
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  const __vue_inject_styles__$4 = undefined;
  /* scoped */
  const __vue_scope_id__$4 = undefined;
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$4 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//

var script$5 = {
  inject: ['datasetI18n', 'showEntries'],
  props: {
    dsShowEntries: {
      type: Number,
      default: 10
    },
    dsShowEntriesLovs: {
      type: Array,
      default: () => [{ value: 5, text: 5 }, { value: 10, text: 10 }, { value: 25, text: 25 }, { value: 50, text: 50 }, { value: 100, text: 100 }]
    }
  },
  created () {
    this.showEntries(Number(this.dsShowEntries));
  },
  methods: {
    change (e) {
      this.$emit('changed', Number(e.target.value));
      this.showEntries(Number(e.target.value));
    }
  }
};

/* script */
const __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function() {
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
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  const __vue_inject_styles__$5 = undefined;
  /* scoped */
  const __vue_scope_id__$5 = undefined;
  /* module identifier */
  const __vue_module_identifier__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$5 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    undefined,
    undefined,
    undefined
  );

export { __vue_component__ as Dataset, __vue_component__$1 as DatasetInfo, __vue_component__$2 as DatasetItem, __vue_component__$3 as DatasetPager, __vue_component__$4 as DatasetSearch, __vue_component__$5 as DatasetShow };
//# sourceMappingURL=index.js.map
