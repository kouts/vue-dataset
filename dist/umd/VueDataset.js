(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VueDataset = {}));
}(this, (function (exports) { 'use strict';

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

  var MORE_PAGES = '...';

  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this;
      var args = arguments;
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
    }
  }

  // https://jsperf.com/object-empty-ch/1
  function isEmptyObject(obj) {
    // eslint-disable-next-line no-unreachable-loop
    for (var key in obj) {
      return false
    }
    return true
  }

  function createPagingRange(nrOfPages, currentPage) {
    var delta = 2;
    var range = [];
    var rangeWithDots = [];
    var length;

    range.push(1);

    if (nrOfPages <= 1) {
      return range
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
    return rangeWithDots
  }

  function fieldSorter(fields, dsSortAs) {
    if ( dsSortAs === void 0 ) dsSortAs = {};

    var dir = [];
    var i;
    var length = fields.length;
    fields = fields.map(function (o, i) {
      if (o[0] === '-') {
        dir[i] = -1;
        o = o.substring(1);
      } else {
        dir[i] = 1;
      }
      return o
    });

    return function (a, b) {
      for (i = 0; i < length; i++) {
        var o = fields[i];
        var aVal = dsSortAs[o] ? dsSortAs[o](a.value[o]) : a.value[o];
        var bVal = dsSortAs[o] ? dsSortAs[o](b.value[o]) : b.value[o];
        if (aVal > bVal) {
          return dir[i]
        }
        if (aVal < bVal) {
          return -dir[i]
        }
      }
      return 0
    }
  }

  function fieldFilter(items, filterFields) {
    // Filter it by field
    var loop = function ( filterKey ) {
      // console.log(filterKey + ' -> ' + filterFields[filterKey]);
      items = items.filter(function (item) {
        var itemValue = item.value;
        for (var itemKey in itemValue) {
          if (itemKey === filterKey) {
            if (typeof filterFields[filterKey] === 'function') {
              return filterFields[filterKey](itemValue[itemKey])
            }
            if (filterFields[filterKey] === '') {
              return true
            }
            if (itemValue[itemKey] === filterFields[filterKey]) {
              return true
            }
          }
        }
        return false
      });
    };

    for (var filterKey in filterFields) loop( filterKey );
    return items
  }

  // Search method that also takes into account transformations needed
  function findAny(dsSearchIn, dsSearchAs, obj, str) {
    // Convert the search string to lower case
    str = String(str).toLowerCase();
    for (var key in obj) {
      if (dsSearchIn.length === 0 || dsSearchIn.indexOf(key) !== -1) {
        var value = String(obj[key]).toLowerCase();
        for (var field in dsSearchAs) {
          if (field === key) {
            // Found key in dsSearchAs so we pass the value and the search string to a search function
            // that returns true/false and we return that if true.
            /* Check if dsSearchAs is a function (passed from the template) */
            if (typeof dsSearchAs[field] === 'function') {
              var res = dsSearchAs[field](value, str);
              if (res === true) {
                return res
              }
            }
          }
        }
        // If it doesn't return from above we perform a simple search
        if (value.indexOf(str) >= 0) {
          return true
        }
      }
    }
    return false
  }

  //

  var script$5 = {
    provide: function provide() {
      var this$1$1 = this;

      return {
        search: this.search,
        showEntries: this.showEntries,
        setActive: this.setActive,
        datasetI18n: this.datasetI18n,
        /* Setup reactive provides */
        rdsData: function () { return this$1$1.dsData; },
        rdsRows: function () { return this$1$1.dsRows; },
        rdsPages: function () { return this$1$1.dsPages; },
        rdsResultsNumber: function () { return this$1$1.dsResultsNumber; },
        rdsPagecount: function () { return this$1$1.dsPagecount; },
        rdsFrom: function () { return this$1$1.dsFrom; },
        rdsTo: function () { return this$1$1.dsTo; },
        rdsPage: function () { return this$1$1.dsPage; }
      }
    },
    props: {
      dsData: {
        type: Array,
        default: function () { return []; }
      },
      dsFilterFields: {
        type: Object,
        default: function () { return ({}); }
      },
      dsSortby: {
        type: Array,
        default: function () { return []; }
      },
      dsSearchIn: {
        type: Array,
        default: function () { return []; }
      },
      dsSearchAs: {
        type: Object,
        default: function () { return ({}); }
      },
      dsSortAs: {
        type: Object,
        default: function () { return ({}); }
      }
    },
    data: function () {
      return {
        dsPage: 1,
        dsSearch: '',
        dsShowEntries: 10,
        datasetI18n: datasetI18n,
        indexes: []
      }
    },
    computed: {
      whenChanged: function whenChanged() {
        /* eslint-disable no-unused-expressions */
        this.dsData;
        this.dsSearch;
        this.dsSortby;
        this.dsFilterFields;
        this.dsSearchIn;
        this.dsSearchAs;
        this.dsSortAs;
        return Date.now()
      },
      dsRows: function dsRows() {
        // We should not modify another computed property from inside a computed property
        // This should be moved into the dsTo computed if needed
        /*
        if (this.dsTo <= 0) {
          this.dsTo = this.indexes.length;
        }
        */
        return this.indexes.slice(this.dsFrom, this.dsTo)
      },
      dsPages: function dsPages() {
        return createPagingRange(this.dsPagecount, this.dsPage)
      },
      dsResultsNumber: function dsResultsNumber() {
        return this.indexes.length
      },
      dsPagecount: function dsPagecount() {
        return Math.ceil(this.dsResultsNumber / this.dsShowEntries)
      },
      dsFrom: function dsFrom() {
        return (this.dsPage - 1) * this.dsShowEntries
      },
      dsTo: function dsTo() {
        return this.dsPage * this.dsShowEntries
      }
    },
    watch: {
      dsResultsNumber: {
        handler: function handler(val, oldVal) {
          // Reset active page when results change
          this.setActive(1);
        }
      },
      /*
      The naive attempt would be to manipulate the original array directly.
      This is problematic because it has to be filtered first, then sorted, then the from/to rows extracted.
      In order to do that in that order, we would need to work on a copy.
      But this is problematic as well since we'd loose the data-binding to the original array.

      The trick is to work directly on the array indexes.
      */
      whenChanged: {
        handler: function handler(val, oldVal) {
          var result = [];
          var dsData = this.dsData;
          var dsSearch = this.dsSearch;
          var dsSortby = this.dsSortby;
          var dsFilterFields = this.dsFilterFields;
          var dsSearchIn = this.dsSearchIn;
          var dsSearchAs = this.dsSearchAs;
          var dsSortAs = this.dsSortAs;

          if (!dsSearch && !dsSortby.length && isEmptyObject(dsFilterFields)) {
            // Skip processing and just get the indexes
            result = dsData.map(function (val, i) { return i; });
          } else {
            // Index it
            result = dsData.map(function (val, i) { return ({ index: i, value: val }); });

            // Filter it by field
            if (!isEmptyObject(dsFilterFields)) {
              result = fieldFilter(result, dsFilterFields);
            }

            // Search it
            if (dsSearch) {
              result = result.filter(function (entry) { return findAny(dsSearchIn, dsSearchAs, entry.value, dsSearch); });
            }

            // Sort it
            if (dsSortby.length) {
              result.sort(fieldSorter(dsSortby, dsSortAs));
            }

            // We need only the indexes
            result = result.map(function (entry) { return entry.index; });
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
        this.$nextTick(function () {
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
  var __vue_script__$5 = script$5;

  /* template */
  var __vue_render__$5 = function() {
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
  var __vue_staticRenderFns__$5 = [];
  __vue_render__$5._withStripped = true;

    /* style */
    var __vue_inject_styles__$5 = undefined;
    /* scoped */
    var __vue_scope_id__$5 = undefined;
    /* module identifier */
    var __vue_module_identifier__$5 = undefined;
    /* functional template */
    var __vue_is_functional_template__$5 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$a = /*#__PURE__*/normalizeComponent(
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

    var __vue_component__$b = __vue_component__$a;

  //
  //
  //
  //
  //
  //
  //

  var script$4 = {
    inject: ['datasetI18n', 'rdsResultsNumber', 'rdsFrom', 'rdsTo'],
    computed: {
      showing: function showing() {
        return this.dsResultsNumber !== 0 ? this.dsFrom + 1 : 0
      },
      showingTo: function showingTo() {
        return this.dsTo >= this.dsResultsNumber ? this.dsResultsNumber : this.dsTo
      },
      /* Setup reactive injects */
      dsResultsNumber: function dsResultsNumber() {
        return this.rdsResultsNumber()
      },
      dsFrom: function dsFrom() {
        return this.rdsFrom()
      },
      dsTo: function dsTo() {
        return this.rdsTo()
      }
    }
  };

  /* script */
  var __vue_script__$4 = script$4;

  /* template */
  var __vue_render__$4 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", [
      _vm._v(
        "\n  " +
          _vm._s(_vm.datasetI18n.showing) +
          " " +
          _vm._s(_vm.showing) +
          " " +
          _vm._s(_vm.datasetI18n.showingTo) +
          " " +
          _vm._s(_vm.showingTo) +
          " " +
          _vm._s(_vm.datasetI18n.showingOf) +
          "\n  " +
          _vm._s(_vm.dsResultsNumber) +
          " " +
          _vm._s(_vm.datasetI18n.showingEntries) +
          "\n"
      )
    ])
  };
  var __vue_staticRenderFns__$4 = [];
  __vue_render__$4._withStripped = true;

    /* style */
    var __vue_inject_styles__$4 = undefined;
    /* scoped */
    var __vue_scope_id__$4 = undefined;
    /* module identifier */
    var __vue_module_identifier__$4 = undefined;
    /* functional template */
    var __vue_is_functional_template__$4 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$8 = /*#__PURE__*/normalizeComponent(
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

    var __vue_component__$9 = __vue_component__$8;

  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script$3 = {
    inject: ['rdsData', 'rdsRows'],
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
      }
    }
  };

  /* script */
  var __vue_script__$3 = script$3;

  /* template */
  var __vue_render__$3 = function() {
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
  var __vue_staticRenderFns__$3 = [];
  __vue_render__$3._withStripped = true;

    /* style */
    var __vue_inject_styles__$3 = undefined;
    /* scoped */
    var __vue_scope_id__$3 = undefined;
    /* module identifier */
    var __vue_module_identifier__$3 = undefined;
    /* functional template */
    var __vue_is_functional_template__$3 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$6 = /*#__PURE__*/normalizeComponent(
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

    var __vue_component__$7 = __vue_component__$6;

  //

  var script$2 = {
    inject: ['datasetI18n', 'setActive', 'rdsPages', 'rdsPagecount', 'rdsPage'],
    data: function () {
      return {
        morePages: MORE_PAGES
      }
    },
    computed: {
      /* Setup reactive injects */
      dsPages: function dsPages() {
        return this.rdsPages()
      },
      dsPagecount: function dsPagecount() {
        return this.rdsPagecount()
      },
      dsPage: function dsPage() {
        return this.rdsPage()
      },
      /* Normal computeds */
      disabledPrevious: function disabledPrevious() {
        return this.dsPage === 1
      },
      disabledNext: function disabledNext() {
        return this.dsPage === this.dsPagecount || this.dsPagecount === 0
      }
    }
  };

  /* script */
  var __vue_script__$2 = script$2;

  /* template */
  var __vue_render__$2 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "ul",
      { staticClass: "pagination" },
      [
        _c("li", { class: ["page-item", _vm.disabledPrevious && "disabled"] }, [
          _c(
            "a",
            {
              staticClass: "page-link",
              attrs: {
                href: "#",
                tabindex: _vm.disabledPrevious && "-1",
                "aria-disabled": _vm.disabledPrevious && "true"
              },
              on: {
                click: function($event) {
                  $event.preventDefault();
                  return _vm.setActive(
                    _vm.dsPage !== 1 && _vm.dsPagecount !== 0
                      ? _vm.dsPage - 1
                      : _vm.dsPage
                  )
                }
              }
            },
            [_vm._v("\n      " + _vm._s(_vm.datasetI18n.previous) + "\n    ")]
          )
        ]),
        _vm._v(" "),
        _vm._l(_vm.dsPages, function(item, index) {
          return [
            _c(
              "li",
              {
                key: index,
                class: [
                  "page-item",
                  item === _vm.dsPage && "active",
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
        _c("li", { class: ["page-item", _vm.disabledNext && "disabled"] }, [
          _c(
            "a",
            {
              staticClass: "page-link",
              attrs: {
                href: "#",
                tabindex: _vm.disabledNext && "-1",
                "aria-disabled": _vm.disabledNext && "true"
              },
              on: {
                click: function($event) {
                  $event.preventDefault();
                  return _vm.setActive(
                    _vm.dsPage !== _vm.dsPagecount && _vm.dsPagecount !== 0
                      ? _vm.dsPage + 1
                      : _vm.dsPage
                  )
                }
              }
            },
            [_vm._v("\n      " + _vm._s(_vm.datasetI18n.next) + "\n    ")]
          )
        ])
      ],
      2
    )
  };
  var __vue_staticRenderFns__$2 = [];
  __vue_render__$2._withStripped = true;

    /* style */
    var __vue_inject_styles__$2 = undefined;
    /* scoped */
    var __vue_scope_id__$2 = undefined;
    /* module identifier */
    var __vue_module_identifier__$2 = undefined;
    /* functional template */
    var __vue_is_functional_template__$2 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$4 = /*#__PURE__*/normalizeComponent(
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

    var __vue_component__$5 = __vue_component__$4;

  //

  var script$1 = {
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
  var __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function() {
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
  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;

    /* style */
    var __vue_inject_styles__$1 = undefined;
    /* scoped */
    var __vue_scope_id__$1 = undefined;
    /* module identifier */
    var __vue_module_identifier__$1 = undefined;
    /* functional template */
    var __vue_is_functional_template__$1 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$2 = /*#__PURE__*/normalizeComponent(
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

    var __vue_component__$3 = __vue_component__$2;

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

  var script = {
    inject: ['datasetI18n', 'showEntries'],
    props: {
      dsShowEntries: {
        type: Number,
        default: 10
      },
      dsShowEntriesLovs: {
        type: Array,
        default: function () { return [
          { value: 5, text: 5 },
          { value: 10, text: 10 },
          { value: 25, text: 25 },
          { value: 50, text: 50 },
          { value: 100, text: 100 }
        ]; }
      }
    },
    created: function created() {
      this.showEntries(Number(this.dsShowEntries));
    },
    methods: {
      change: function change(e) {
        this.$emit('changed', Number(e.target.value));
        this.showEntries(Number(e.target.value));
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

    var __vue_component__$1 = __vue_component__;

  exports.Dataset = __vue_component__$b;
  exports.DatasetInfo = __vue_component__$9;
  exports.DatasetItem = __vue_component__$7;
  exports.DatasetPager = __vue_component__$5;
  exports.DatasetSearch = __vue_component__$3;
  exports.DatasetShow = __vue_component__$1;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=VueDataset.js.map
