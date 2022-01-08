import { ref, computed, watch, provide, renderSlot, nextTick, inject, openBlock, createElementBlock, toDisplayString, createBlock, resolveDynamicComponent, withCtx, Fragment, renderList, createCommentVNode, createElementVNode, normalizeClass, withModifiers } from "vue";
var i18n = {
  show: "Show",
  entries: "entries",
  previous: "Previous",
  next: "Next",
  showing: "Showing",
  showingTo: "to",
  showingOf: "of",
  showingEntries: "entries"
};
const MORE_PAGES = "...";
function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
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
function isEmptyObject(obj) {
  for (const key in obj) {
    return false;
  }
  return true;
}
function createPagingRange(nrOfPages, currentPage) {
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
function fieldSorter(fields, dsSortAs = {}) {
  const dir = [];
  let i;
  const length = fields.length;
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
      const o = fields[i];
      const aVal = dsSortAs[o] ? dsSortAs[o](a.value[o]) : a.value[o];
      const bVal = dsSortAs[o] ? dsSortAs[o](b.value[o]) : b.value[o];
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
  for (const filterKey in filterFields) {
    items = items.filter(function(item) {
      const itemValue = item.value;
      for (const itemKey in itemValue) {
        if (itemKey === filterKey) {
          if (typeof filterFields[filterKey] === "function") {
            return filterFields[filterKey](itemValue[itemKey]);
          }
          if (filterFields[filterKey] === "") {
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
function findAny(dsSearchIn, dsSearchAs, rowData, str) {
  str = String(str).toLowerCase();
  for (const key in rowData) {
    if (dsSearchIn.length === 0 || dsSearchIn.indexOf(key) !== -1) {
      const value = String(rowData[key]).toLowerCase();
      for (const field in dsSearchAs) {
        if (field === key) {
          if (typeof dsSearchAs[field] === "function") {
            const res = dsSearchAs[field](value, str, rowData);
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
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main$5 = {
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
  setup(props) {
    const dsPage = ref(1);
    const dsSearch = ref("");
    const dsShowEntries = ref(10);
    const datasetI18n = ref(i18n);
    const dsIndexes = ref([]);
    const search = (value) => {
      dsSearch.value = value;
    };
    const showEntries = async (value) => {
      const pagesBeforeChange = dsPages.value;
      dsShowEntries.value = value;
      await nextTick();
      const pagesAfterChange = dsPages.value;
      if (pagesAfterChange.length < pagesBeforeChange.length) {
        setActive(pagesAfterChange[pagesAfterChange.length - 1]);
      }
    };
    const setActive = (value) => {
      dsPage.value = value;
    };
    const whenChanged = computed(() => {
      props.dsData;
      dsSearch.value;
      props.dsSortby;
      props.dsFilterFields;
      props.dsSearchIn;
      props.dsSearchAs;
      props.dsSortAs;
      return Date.now();
    });
    const dsRows = computed(() => {
      return dsIndexes.value.slice(dsFrom.value, dsTo.value);
    });
    const dsPages = computed(() => {
      return createPagingRange(dsPagecount.value, dsPage.value);
    });
    const dsResultsNumber = computed(() => {
      return dsIndexes.value.length;
    });
    const dsPagecount = computed(() => {
      return Math.ceil(dsResultsNumber.value / dsShowEntries.value);
    });
    const dsFrom = computed(() => {
      return (dsPage.value - 1) * dsShowEntries.value;
    });
    const dsTo = computed(() => {
      return dsPage.value * dsShowEntries.value;
    });
    watch(dsResultsNumber, (val, oldVal) => {
      setActive(1);
    });
    watch(whenChanged, (newVal, oldVal) => {
      let result = [];
      if (!dsSearch.value && !props.dsSortby.length && isEmptyObject(props.dsFilterFields)) {
        result = props.dsData.map((val, i) => i);
      } else {
        result = props.dsData.map((val, i) => ({ index: i, value: val }));
        if (!isEmptyObject(props.dsFilterFields)) {
          result = fieldFilter(result, props.dsFilterFields);
        }
        if (dsSearch.value) {
          result = result.filter((entry) => findAny(props.dsSearchIn, props.dsSearchAs, entry.value, dsSearch.value));
        }
        if (props.dsSortby.length) {
          result.sort(fieldSorter(props.dsSortby, props.dsSortAs));
        }
        result = result.map((entry) => entry.index);
      }
      dsIndexes.value = result;
    }, {
      immediate: true
    });
    provide("dsIndexes", dsIndexes);
    provide("search", search);
    provide("showEntries", showEntries);
    provide("setActive", setActive);
    provide("datasetI18n", datasetI18n);
    provide("dsData", computed(() => props.dsData));
    provide("dsRows", dsRows);
    provide("dsPages", dsPages);
    provide("dsResultsNumber", dsResultsNumber);
    provide("dsPagecount", dsPagecount);
    provide("dsFrom", dsFrom);
    provide("dsTo", dsTo);
    provide("dsPage", dsPage);
    return {
      dsIndexes,
      dsShowEntries,
      dsResultsNumber,
      dsPage,
      dsPagecount,
      dsFrom,
      dsTo,
      dsRows,
      dsPages,
      search,
      showEntries,
      setActive
    };
  }
};
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return renderSlot(_ctx.$slots, "default", {
    ds: {
      dsIndexes: $setup.dsIndexes,
      dsShowEntries: $setup.dsShowEntries,
      dsResultsNumber: $setup.dsResultsNumber,
      dsPage: $setup.dsPage,
      dsPagecount: $setup.dsPagecount,
      dsFrom: $setup.dsFrom,
      dsTo: $setup.dsTo,
      dsData: $props.dsData,
      dsRows: $setup.dsRows,
      dsPages: $setup.dsPages,
      search: $setup.search,
      showEntries: $setup.showEntries,
      setActive: $setup.setActive
    }
  });
}
var Dataset = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5]]);
const _sfc_main$4 = {
  setup() {
    const dsResultsNumber = inject("dsResultsNumber");
    const dsFrom = inject("dsFrom");
    const dsTo = inject("dsTo");
    const showing = computed(() => dsResultsNumber.value !== 0 ? dsFrom.value + 1 : 0);
    const showingTo = computed(() => dsTo.value >= dsResultsNumber.value ? dsResultsNumber.value : dsTo.value);
    return {
      datasetI18n: inject("datasetI18n"),
      dsResultsNumber,
      showing,
      showingTo
    };
  }
};
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, toDisplayString($setup.datasetI18n.showing) + " " + toDisplayString($setup.showing) + " " + toDisplayString($setup.datasetI18n.showingTo) + " " + toDisplayString($setup.showingTo) + " " + toDisplayString($setup.datasetI18n.showingOf) + " " + toDisplayString($setup.dsResultsNumber) + " " + toDisplayString($setup.datasetI18n.showingEntries), 1);
}
var DatasetInfo = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
const _sfc_main$3 = {
  props: {
    tag: {
      type: String,
      default: "div"
    }
  },
  setup() {
    const indexes = computed(() => {
      const arr = [];
      for (let i = inject("dsFrom").value; i < inject("dsTo").value; i++) {
        arr.push(i);
      }
      return arr;
    });
    return {
      dsData: inject("dsData"),
      dsRows: inject("dsRows"),
      indexes
    };
  }
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent($props.tag), null, {
    default: withCtx(() => [
      (openBlock(true), createElementBlock(Fragment, null, renderList($setup.dsRows, (rowIndex, i) => {
        return renderSlot(_ctx.$slots, "default", {
          row: $setup.dsData[rowIndex],
          rowIndex,
          index: $setup.indexes[i]
        });
      }), 256)),
      !$setup.dsRows.length ? renderSlot(_ctx.$slots, "noDataFound", { key: 0 }) : createCommentVNode("", true)
    ]),
    _: 3
  });
}
var DatasetItem = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
const _sfc_main$2 = {
  setup() {
    const morePages = ref(MORE_PAGES);
    const dsPage = inject("dsPage");
    const dsPagecount = inject("dsPagecount");
    const disabledPrevious = computed(() => dsPage.value === 1);
    const disabledNext = computed(() => dsPage.value === dsPagecount.value || dsPagecount.value === 0);
    return {
      datasetI18n: inject("datasetI18n"),
      setActive: inject("setActive"),
      dsPages: inject("dsPages"),
      dsPagecount,
      dsPage,
      morePages,
      disabledPrevious,
      disabledNext
    };
  }
};
const _hoisted_1$2 = { class: "pagination" };
const _hoisted_2$1 = ["tabindex", "aria-disabled"];
const _hoisted_3$1 = ["onClick"];
const _hoisted_4 = {
  key: 1,
  class: "page-link"
};
const _hoisted_5 = ["tabindex", "aria-disabled"];
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("ul", _hoisted_1$2, [
    createElementVNode("li", {
      class: normalizeClass(["page-item", $setup.disabledPrevious && "disabled"])
    }, [
      createElementVNode("a", {
        class: "page-link",
        href: "#",
        tabindex: $setup.disabledPrevious ? "-1" : null,
        "aria-disabled": $setup.disabledPrevious ? "true" : null,
        onClick: _cache[0] || (_cache[0] = withModifiers(($event) => $setup.setActive($setup.dsPage !== 1 && $setup.dsPagecount !== 0 ? $setup.dsPage - 1 : $setup.dsPage), ["prevent"]))
      }, toDisplayString($setup.datasetI18n.previous), 9, _hoisted_2$1)
    ], 2),
    (openBlock(true), createElementBlock(Fragment, null, renderList($setup.dsPages, (item, index) => {
      return openBlock(), createElementBlock("li", {
        key: index,
        class: normalizeClass(["page-item", item === $setup.dsPage && "active", item === $setup.morePages && "disabled"])
      }, [
        item !== $setup.morePages ? (openBlock(), createElementBlock("a", {
          key: 0,
          class: "page-link",
          href: "#",
          onClick: withModifiers(($event) => $setup.setActive(item), ["prevent"])
        }, toDisplayString(item), 9, _hoisted_3$1)) : (openBlock(), createElementBlock("span", _hoisted_4, toDisplayString(item), 1))
      ], 2);
    }), 128)),
    createElementVNode("li", {
      class: normalizeClass(["page-item", $setup.disabledNext && "disabled"])
    }, [
      createElementVNode("a", {
        class: "page-link",
        href: "#",
        tabindex: $setup.disabledNext ? "-1" : null,
        "aria-disabled": $setup.disabledNext ? "true" : null,
        onClick: _cache[1] || (_cache[1] = withModifiers(($event) => $setup.setActive($setup.dsPage !== $setup.dsPagecount && $setup.dsPagecount !== 0 ? $setup.dsPage + 1 : $setup.dsPage), ["prevent"]))
      }, toDisplayString($setup.datasetI18n.next), 9, _hoisted_5)
    ], 2)
  ]);
}
var DatasetPager = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
const _sfc_main$1 = {
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
  setup(props) {
    const search = inject("search");
    const dsSearch = ref("");
    const input = debounce((value) => {
      search(value);
    }, props.wait);
    return {
      dsSearch,
      input
    };
  }
};
const _hoisted_1$1 = ["placeholder", "value"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("input", {
    type: "text",
    placeholder: $props.dsSearchPlaceholder,
    class: "form-control",
    value: $setup.dsSearch,
    onInput: _cache[0] || (_cache[0] = ($event) => $setup.input($event.target.value))
  }, null, 40, _hoisted_1$1);
}
var DatasetSearch = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const _sfc_main = {
  props: {
    dsShowEntries: {
      type: Number,
      default: 10
    },
    dsShowEntriesLovs: {
      type: Array,
      default: () => [
        { value: 5, text: 5 },
        { value: 10, text: 10 },
        { value: 25, text: 25 },
        { value: 50, text: 50 },
        { value: 100, text: 100 }
      ]
    }
  },
  emits: ["changed"],
  setup(props, { emit }) {
    const showEntries = inject("showEntries");
    const change = (e) => {
      emit("changed", Number(e.target.value));
      showEntries(Number(e.target.value));
    };
    showEntries(Number(props.dsShowEntries));
    return {
      datasetI18n: inject("datasetI18n"),
      change
    };
  }
};
const _hoisted_1 = { class: "form-inline" };
const _hoisted_2 = ["value"];
const _hoisted_3 = ["value"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createElementVNode("label", null, toDisplayString($setup.datasetI18n.show), 1),
    createElementVNode("select", {
      value: $props.dsShowEntries,
      class: "form-control mr-1 ml-1",
      onChange: _cache[0] || (_cache[0] = (...args) => $setup.change && $setup.change(...args))
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($props.dsShowEntriesLovs, (option) => {
        return openBlock(), createElementBlock("option", {
          key: option.value,
          value: option.value
        }, toDisplayString(option.text), 9, _hoisted_3);
      }), 128))
    ], 40, _hoisted_2),
    createElementVNode("label", null, toDisplayString($setup.datasetI18n.entries), 1)
  ]);
}
var DatasetShow = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Dataset, DatasetInfo, DatasetItem, DatasetPager, DatasetSearch, DatasetShow };
