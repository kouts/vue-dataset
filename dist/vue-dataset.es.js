//
//
//
//
//
//

// Sorting method
function compare (a, b) {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
}

// Search method that also takes into account transformations needed
function findAny (dsSearchIn, dsSearchAs, obj, str) {
  // Convert the search string to lower case.
  str = str.toLowerCase();
  for (var key in obj) {
    if (dsSearchIn.length === 0 || dsSearchIn.indexOf(key) !== -1) {
      var value = String(obj[key]).toLowerCase();
      for (var field in dsSearchAs) {
        if (field === key) {
          // Found key in dsSearchAs so we pass the value and the search string to a search function
          // that returns true/false and we return that if true.
          /* Check if dsSearchAs was passed as string from template, if so call apropriate function from component */
          if (typeof dsSearchAs[field] === 'string') {
            var res = this[dsSearchAs[field]](value, str);
            if (res === true) {
              return res;
            }
            /* Check if dsSearchAs is a function(passed from template) */
          }
          if (typeof dsSearchAs[field] === 'function') {
            var res$1 = dsSearchAs[field](value, str);
            if (res$1 === true) {
              return res$1;
            }
          }
        }
      }
      // If it doesn't return from above we make a simple search
      if (value.indexOf(str) >= 0) {
        return true;
      }
    }
  }
  return false;
}

var script = {
  provide: function provide () {
    var this$1 = this;

    return {
      search: function (value) {
        this$1.dsSearch = value;
      },
      showEntries: function (value) {
        this$1.dsShowEntries = value;
      },
      setActive: function (value) {
        this$1.setActive(value);
      }
    };
  },
  props: {
    dsData: {
      type: Array,
      default: function () { return []; }
    },
    dsFilterFields: {
      type: Object,
      default: function () {}
    },
    dsSortby: {
      type: String,
      default: ''
    },
    dsSearchIn: {
      type: Array,
      default: function () { return []; }
    },
    dsSearchAs: {
      type: Object,
      default: function () {}
    }
  },
  data: function () {
    return {
      dsShowEntries: 10,
      dsPage: 1,
      dsSearch: ''
    };
  },
  computed: {
    /*
    The naive attempt would be to manipulate the original array directly.
    This is problematic because it have to be filtered first, then sorted, then the from/to rows extracted.
    In order to do that in that order, you would need to work on a copy.
    But this is problematic as well since you'd loose the data-binding with the original array.

    The trick is to work directly on the array indexes.
    */
    indexes: function () {
      var result = [];
      var dsData = this.dsData || [];
      var dsSearch = this.dsSearch;
      var dsSortby = this.dsSortby;
      var dsFilterFields = this.dsFilterFields;
      var dsSearchIn = this.dsSearchIn;
      var dsSearchAs = this.dsSearchAs;

      if (!dsSearch && !dsSortby && (!dsFilterFields || Object.keys(dsFilterFields).length === 0)) {
        // just get the indexes
        result = dsData.map(function (val, i) {
          return i;
        });
      } else {
        // Index it
        result = dsData.map(function (val, i) {
          return {
            index: i,
            value: val
          };
        });
        // Filter it by field
        for (var filterKey in dsFilterFields) {
          // console.log(filterKey+' -> '+dsFilterFields[filterKey]);
          result = result.filter(function (entry) {
            var entryValue = entry.value;
            for (var entryKey in entryValue) {
              if (entryKey === filterKey) {
                if (dsFilterFields[filterKey] === '') {
                  return true;
                }
                if (entryValue[entryKey] === dsFilterFields[filterKey]) {
                  return true;
                }
              }
            }
            return false;
          });
        }
        // Search it
        if (dsSearch) {
          result = result.filter(function (entry) {
            return findAny.call(this, dsSearchIn, dsSearchAs, entry.value, dsSearch);
          }.bind(this));
        }
        // Sort it
        if (dsSortby) {
          var reverse = (dsSortby.charAt(0) === '-');
          if (!reverse) {
            result = result.sort(function (a, b) {
              return compare(a.value[dsSortby], b.value[dsSortby]);
            });
          } else {
            dsSortby = dsSortby.substr(1);
            result = result.sort(function (b, a) {
              return compare(a.value[dsSortby], b.value[dsSortby]);
            });
          }
        }
        // We need indexes only
        result = result.map(function (entry) {
          return entry.index;
        });
      }

      // console.log('update');
      // console.log(result);
      return result;
    },
    dsRows: function () {
      // Cannot modify another computed property from inside a computed property
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
      var currentPage = this.dsPage;
      var nrOfPages = this.dsPagecount;
      var delta = 2;
      var range = [];
      var rangeWithDots = [];
      var l;

      range.push(1);

      if (nrOfPages <= 1) {
        return range;
      }

      for (var i = currentPage - delta; i <= currentPage + delta; i++) {
        if (i < nrOfPages && i > 1) {
          range.push(i);
        }
      }
      range.push(nrOfPages);

      for (var j = 0; j < range.length; j++) {
        if (l) {
          if (range[j] - l === 2) {
            rangeWithDots.push(l + 1);
          } else if (range[j] - l !== 1) {
            rangeWithDots.push('...');
          }
        }
        rangeWithDots.push(range[j]);
        l = range[j];
      }
      return rangeWithDots;
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
    dsData: {
      handler: function (val, oldVal) {
        // Reset active page when data changes
        this.setActive(1);
      }
    }
  },
  methods: {
    setActive: function setActive (value) {
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
    var options = typeof script === 'function' ? script.options : script;
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
    var hook;
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
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
var __vue_script__ = script;

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
//# sourceMappingURL=vue-dataset.es.js.map
