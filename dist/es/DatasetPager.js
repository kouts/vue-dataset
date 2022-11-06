import { M as MORE_PAGES } from './index-e1c0eda3.js';
import { n as normalizeComponent } from './normalize-component-cf2db48b.js';

//

var script = {
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
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {
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
              "aria-disabled": _vm.disabledPrevious && "true",
            },
            on: {
              click: function ($event) {
                $event.preventDefault();
                return _vm.setActive(
                  _vm.dsPage !== 1 && _vm.dsPagecount !== 0
                    ? _vm.dsPage - 1
                    : _vm.dsPage
                )
              },
            },
          },
          [_vm._v("\n      " + _vm._s(_vm.datasetI18n.previous) + "\n    ")]
        ) ]),
      _vm._v(" "),
      _vm._l(_vm.dsPages, function (item, index) {
        return [
          _c(
            "li",
            {
              key: index,
              class: [
                "page-item",
                item === _vm.dsPage && "active",
                item === _vm.morePages && "disabled" ],
            },
            [
              item !== _vm.morePages
                ? _c(
                    "a",
                    {
                      staticClass: "page-link",
                      attrs: { href: "#" },
                      on: {
                        click: function ($event) {
                          $event.preventDefault();
                          return _vm.setActive(item)
                        },
                      },
                    },
                    [_vm._v("\n        " + _vm._s(item) + "\n      ")]
                  )
                : _c("span", { staticClass: "page-link" }, [
                    _vm._v("\n        " + _vm._s(item) + "\n      ") ]) ]
          ) ]
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
              "aria-disabled": _vm.disabledNext && "true",
            },
            on: {
              click: function ($event) {
                $event.preventDefault();
                return _vm.setActive(
                  _vm.dsPage !== _vm.dsPagecount && _vm.dsPagecount !== 0
                    ? _vm.dsPage + 1
                    : _vm.dsPage
                )
              },
            },
          },
          [_vm._v("\n      " + _vm._s(_vm.datasetI18n.next) + "\n    ")]
        ) ]) ],
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
//# sourceMappingURL=DatasetPager.js.map
