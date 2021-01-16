import normalizeComponent from '../node_modules/vue-runtime-helpers/dist/normalize-component.mjs.js';
import script from './DatasetPager.vue_rollup-plugin-vue=script.js';

/* script */
const __vue_script__ = script;

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

export default __vue_component__;
//# sourceMappingURL=DatasetPager.vue.js.map
