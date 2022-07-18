const datasetI18n = {
  show: "Show",
  entries: "entries",
  previous: "Previous",
  next: "Next",
  showing: "Showing",
  showingTo: "to",
  showingOf: "of",
  showingEntries: "entries"
};
var MORE_PAGES = "...";
function isEmptyObject(obj) {
  for (var key in obj) {
    return false;
  }
  return true;
}
function createPagingRange(nrOfPages, currentPage) {
  var delta = 2;
  var range = [];
  var rangeWithDots = [];
  var length;
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
  for (var i$1 = 0; i$1 < range.length; i$1++) {
    if (length) {
      if (range[i$1] - length === 2) {
        rangeWithDots.push(length + 1);
      } else if (range[i$1] - length !== 1) {
        rangeWithDots.push(MORE_PAGES);
      }
    }
    rangeWithDots.push(range[i$1]);
    length = range[i$1];
  }
  return rangeWithDots;
}
function fieldSorter(fields, dsSortAs) {
  if (dsSortAs === void 0)
    dsSortAs = {};
  var dir = [];
  var i;
  var length = fields.length;
  fields = fields.map(function(o, i2) {
    if (o[0] === "-") {
      dir[i2] = -1;
      o = o.substring(1);
    } else {
      dir[i2] = 1;
    }
    return o;
  });
  return function(a, b) {
    for (i = 0; i < length; i++) {
      var o = fields[i];
      var aVal = dsSortAs[o] ? dsSortAs[o](a.value[o]) : a.value[o];
      var bVal = dsSortAs[o] ? dsSortAs[o](b.value[o]) : b.value[o];
      if (aVal > bVal) {
        return dir[i];
      }
      if (aVal < bVal) {
        return -dir[i];
      }
    }
    return 0;
  };
}
function fieldFilter(items, filterFields) {
  var loop = function(filterKey2) {
    items = items.filter(function(item) {
      var itemValue = item.value;
      for (var itemKey in itemValue) {
        if (itemKey === filterKey2) {
          if (typeof filterFields[filterKey2] === "function") {
            return filterFields[filterKey2](itemValue[itemKey]);
          }
          if (filterFields[filterKey2] === "") {
            return true;
          }
          if (itemValue[itemKey] === filterFields[filterKey2]) {
            return true;
          }
        }
      }
      return false;
    });
  };
  for (var filterKey in filterFields)
    loop(filterKey);
  return items;
}
function findAny(dsSearchIn, dsSearchAs, rowData, str) {
  str = String(str).toLowerCase();
  for (var key in rowData) {
    if (dsSearchIn.length === 0 || dsSearchIn.indexOf(key) !== -1) {
      var value = String(rowData[key]).toLowerCase();
      for (var field in dsSearchAs) {
        if (field === key) {
          if (typeof dsSearchAs[field] === "function") {
            var res = dsSearchAs[field](value, str, rowData);
            if (res === true) {
              return res;
            }
          }
        }
      }
      if (value.indexOf(str) >= 0) {
        return true;
      }
    }
  }
  return false;
}
var render = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", [_vm._t("default", null, {
    "ds": {
      dsIndexes: _vm.indexes,
      dsShowEntries: _vm.dsShowEntries,
      dsResultsNumber: _vm.dsResultsNumber,
      dsPage: _vm.dsPage,
      dsPagecount: _vm.dsPagecount,
      dsFrom: _vm.dsFrom,
      dsTo: _vm.dsTo,
      dsData: _vm.dsData,
      dsRows: _vm.dsRows,
      dsPages: _vm.dsPages,
      search: _vm.search,
      showEntries: _vm.showEntries,
      setActive: _vm.setActive
    }
  })], 2);
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
  provide: function provide() {
    var this$1$1 = this;
    return {
      search: this.search,
      showEntries: this.showEntries,
      setActive: this.setActive,
      datasetI18n: this.datasetI18n,
      rdsIndexes: function() {
        return this$1$1.indexes;
      },
      rdsData: function() {
        return this$1$1.dsData;
      },
      rdsRows: function() {
        return this$1$1.dsRows;
      },
      rdsPages: function() {
        return this$1$1.dsPages;
      },
      rdsResultsNumber: function() {
        return this$1$1.dsResultsNumber;
      },
      rdsPagecount: function() {
        return this$1$1.dsPagecount;
      },
      rdsFrom: function() {
        return this$1$1.dsFrom;
      },
      rdsTo: function() {
        return this$1$1.dsTo;
      },
      rdsPage: function() {
        return this$1$1.dsPage;
      }
    };
  },
  props: {
    dsData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    dsFilterFields: {
      type: Object,
      default: function() {
        return {};
      }
    },
    dsSortby: {
      type: Array,
      default: function() {
        return [];
      }
    },
    dsSearchIn: {
      type: Array,
      default: function() {
        return [];
      }
    },
    dsSearchAs: {
      type: Object,
      default: function() {
        return {};
      }
    },
    dsSortAs: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data: function() {
    return {
      dsPage: 1,
      dsSearch: "",
      dsShowEntries: 10,
      datasetI18n,
      indexes: []
    };
  },
  computed: {
    whenChanged: function whenChanged() {
      this.dsData;
      this.dsSearch;
      this.dsSortby;
      this.dsFilterFields;
      this.dsSearchIn;
      this.dsSearchAs;
      this.dsSortAs;
      return Date.now();
    },
    dsRows: function dsRows() {
      return this.indexes.slice(this.dsFrom, this.dsTo);
    },
    dsPages: function dsPages() {
      return createPagingRange(this.dsPagecount, this.dsPage);
    },
    dsResultsNumber: function dsResultsNumber() {
      return this.indexes.length;
    },
    dsPagecount: function dsPagecount() {
      return Math.ceil(this.dsResultsNumber / this.dsShowEntries);
    },
    dsFrom: function dsFrom() {
      return (this.dsPage - 1) * this.dsShowEntries;
    },
    dsTo: function dsTo() {
      return this.dsPage * this.dsShowEntries;
    }
  },
  watch: {
    dsResultsNumber: {
      handler: function handler(val, oldVal) {
        this.setActive(1);
      }
    },
    whenChanged: {
      handler: function handler2(newVal, oldVal) {
        var result = [];
        var dsData = this.dsData;
        var dsSearch = this.dsSearch;
        var dsSortby = this.dsSortby;
        var dsFilterFields = this.dsFilterFields;
        var dsSearchIn = this.dsSearchIn;
        var dsSearchAs = this.dsSearchAs;
        var dsSortAs = this.dsSortAs;
        if (!dsSearch && !dsSortby.length && isEmptyObject(dsFilterFields)) {
          result = dsData.map(function(val, i) {
            return i;
          });
        } else {
          result = dsData.map(function(val, i) {
            return { index: i, value: val };
          });
          if (!isEmptyObject(dsFilterFields)) {
            result = fieldFilter(result, dsFilterFields);
          }
          if (dsSearch) {
            result = result.filter(function(entry) {
              return findAny(dsSearchIn, dsSearchAs, entry.value, dsSearch);
            });
          }
          if (dsSortby.length) {
            result.sort(fieldSorter(dsSortby, dsSortAs));
          }
          result = result.map(function(entry) {
            return entry.index;
          });
        }
        this.indexes = result;
      },
      immediate: true
    }
  },
  methods: {
    search: function search(value) {
      this.dsSearch = value;
    },
    showEntries: function showEntries(value) {
      var this$1$1 = this;
      var pagesBeforeChange = this.dsPages;
      this.dsShowEntries = value;
      this.$nextTick(function() {
        var pagesAfterChange = this$1$1.dsPages;
        if (pagesAfterChange.length < pagesBeforeChange.length) {
          this$1$1.setActive(pagesAfterChange[pagesAfterChange.length - 1]);
        }
      });
    },
    setActive: function setActive(value) {
      this.dsPage = value;
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
const Dataset = /* @__PURE__ */ function() {
  return __component__.exports;
}();
export {
  Dataset as default
};
//# sourceMappingURL=Dataset.js.map
