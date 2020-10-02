(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.DatasetPager = factory());
}(this, (function () { 'use strict';

  var MORE_PAGES = '...';

  //

  var script = {
    inject: ['ds', 'datasetI18n', 'setActive'],
    data: function () {
      return {
        morePages: MORE_PAGES
      };
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

  return __vue_component__;

})));
//# sourceMappingURL=DatasetPager.js.map
