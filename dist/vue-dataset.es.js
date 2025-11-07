import { renderSlot as R, ref as _, computed as f, watch as C, provide as c, nextTick as j, createElementBlock as v, openBlock as h, toDisplayString as u, inject as i, createBlock as L, resolveDynamicComponent as B, withCtx as M, createCommentVNode as K, Fragment as A, renderList as F, createElementVNode as w, normalizeClass as k, withModifiers as N } from "vue";
const V = "...";
function z(t, n, s) {
  let e;
  return function() {
    const r = this, o = arguments;
    clearTimeout(e), e = setTimeout(function() {
      e = null, t.apply(r, o);
    }, n);
  };
}
function O(t) {
  for (const n in t)
    return !1;
  return !0;
}
function G(t, n) {
  const e = [], r = [];
  let o;
  if (e.push(1), t <= 1)
    return e;
  for (let a = n - 2; a <= n + 2; a++)
    a < t && a > 1 && e.push(a);
  e.push(t);
  for (let a = 0; a < e.length; a++)
    o && (e[a] - o === 2 ? r.push(o + 1) : e[a] - o !== 1 && r.push(V)), r.push(e[a]), o = e[a];
  return r;
}
function W(t, n = {}) {
  const s = [];
  let e;
  const r = t.length;
  return t = t.map(function(o, a) {
    return o[0] === "-" ? (s[a] = -1, o = o.substring(1)) : s[a] = 1, o;
  }), function(o, a) {
    for (e = 0; e < r; e++) {
      const d = t[e], b = n[d] ? n[d](o.value[d]) : o.value[d], m = n[d] ? n[d](a.value[d]) : a.value[d];
      if (b > m)
        return s[e];
      if (b < m)
        return -s[e];
    }
    return 0;
  };
}
function q(t, n) {
  for (const s in n)
    t = t.filter(function(e) {
      const r = e.value;
      for (const o in r)
        if (o === s) {
          if (typeof n[s] == "function")
            return n[s](r[o], r);
          if (n[s] === "" || r[o] === n[s])
            return !0;
        }
      return !1;
    });
  return t;
}
function H(t, n, s, e) {
  e = String(e).toLowerCase();
  for (const r in s)
    if (t.length === 0 || t.indexOf(r) !== -1) {
      const o = String(s[r]).toLowerCase();
      for (const a in n)
        if (a === r && typeof n[a] == "function") {
          const d = n[a](o, e, s);
          if (d === !0)
            return d;
        }
      if (o.indexOf(e) >= 0)
        return !0;
    }
  return !1;
}
const J = {
  show: "Show",
  entries: "entries",
  previous: "Previous",
  next: "Next",
  showing: "Showing",
  showingTo: "to",
  showingOf: "of",
  showingEntries: "entries"
}, P = (t, n) => {
  const s = t.__vccOpts || t;
  for (const [e, r] of n)
    s[e] = r;
  return s;
}, Q = {
  name: "Dataset",
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
  emits: ["update:dsData"],
  /**
   * @param {{
   *   dsData: Record<string, any>[];
   *   dsFilterFields: { [fieldId in string]: (columnValue: any) => boolean | any };
   *   dsSortby: string[];
   *   dsSearchIn: string[];
   *   dsSearchAs: { [id in string]: (columnValue: any, searchString: string) => boolean };
   *   dsSortAs: { [id in string]: (columnValue: any) => any };
   * }} props
   */
  setup(t, { emit: n }) {
    const s = _(1), e = _(""), r = _(10), o = _(J), a = _([]), d = (l) => {
      e.value = l;
    }, b = async (l) => {
      r.value = l, await j(), s.value > S.value && m(y.value[y.value.length - 1]);
    }, m = (l) => {
      s.value = l;
    }, T = f(() => a.value.slice(D.value, I.value)), y = f(() => G(S.value, s.value)), x = f(() => a.value.length), S = f(() => Math.ceil(x.value / r.value)), D = f(() => (s.value - 1) * r.value), I = f(() => s.value * r.value);
    return C(x, (l, g) => {
      m(1);
    }), C(
      () => [t.dsData, e, t.dsSortby, t.dsFilterFields, t.dsSearchIn, t.dsSearchAs, t.dsSortAs],
      () => {
        let l = [];
        !e.value && !t.dsSortby.length && O(t.dsFilterFields) ? l = t.dsData.map((g, E) => E) : (l = t.dsData.map((g, E) => ({ index: E, value: g })), O(t.dsFilterFields) || (l = q(l, t.dsFilterFields)), e.value && (l = l.filter((g) => H(t.dsSearchIn, t.dsSearchAs, g.value, e.value))), t.dsSortby.length && l.sort(W(t.dsSortby, t.dsSortAs)), l = l.map((g) => g.index)), a.value = l, n(
          "update:dsData",
          l.map((g) => t.dsData[g])
        );
      },
      {
        immediate: !0,
        deep: !0
      }
    ), c("dsIndexes", a), c("search", d), c("showEntries", b), c("setActive", m), c("datasetI18n", o), c(
      "dsData",
      f(() => t.dsData)
    ), c("dsRows", T), c("dsSearch", e), c("dsShowEntries", r), c("dsPages", y), c("dsResultsNumber", x), c("dsPagecount", S), c("dsFrom", D), c("dsTo", I), c("dsPage", s), {
      dsIndexes: a,
      dsShowEntries: r,
      dsResultsNumber: x,
      dsPage: s,
      dsPagecount: S,
      dsFrom: D,
      dsTo: I,
      dsRows: T,
      dsPages: y,
      search: d,
      showEntries: b,
      setActive: m
    };
  }
};
function U(t, n, s, e, r, o) {
  return R(t.$slots, "default", {
    ds: {
      dsIndexes: e.dsIndexes,
      dsShowEntries: e.dsShowEntries,
      dsResultsNumber: e.dsResultsNumber,
      dsPage: e.dsPage,
      dsPagecount: e.dsPagecount,
      dsFrom: e.dsFrom,
      dsTo: e.dsTo,
      dsData: s.dsData,
      dsRows: e.dsRows,
      dsPages: e.dsPages,
      search: e.search,
      showEntries: e.showEntries,
      setActive: e.setActive
    }
  });
}
const ge = /* @__PURE__ */ P(Q, [["render", U]]), X = {
  name: "DatasetInfo",
  setup() {
    const t = i("dsResultsNumber"), n = i("dsFrom"), s = i("dsTo"), e = f(() => t.value !== 0 ? n.value + 1 : 0), r = f(() => s.value >= t.value ? t.value : s.value);
    return {
      datasetI18n: i("datasetI18n"),
      dsResultsNumber: t,
      showing: e,
      showingTo: r
    };
  }
};
function Y(t, n, s, e, r, o) {
  return h(), v("div", null, u(e.datasetI18n.showing) + " " + u(e.showing) + " " + u(e.datasetI18n.showingTo) + " " + u(e.showingTo) + " " + u(e.datasetI18n.showingOf) + " " + u(e.dsResultsNumber) + " " + u(e.datasetI18n.showingEntries), 1);
}
const me = /* @__PURE__ */ P(X, [["render", Y]]), Z = {
  name: "DatasetItem",
  props: {
    tag: {
      type: String,
      default: "div"
    }
  },
  setup() {
    const t = f(() => {
      const n = [];
      for (let s = i("dsFrom").value; s < i("dsTo").value; s++)
        n.push(s);
      return n;
    });
    return {
      dsData: i("dsData"),
      dsRows: i("dsRows"),
      indexes: t
    };
  }
};
function p(t, n, s, e, r, o) {
  return h(), L(B(s.tag), null, {
    default: M(() => [
      (h(!0), v(A, null, F(e.dsRows, (a, d) => R(t.$slots, "default", {
        row: e.dsData[a],
        rowIndex: a,
        index: e.indexes[d]
      })), 256)),
      e.dsRows.length ? K("", !0) : R(t.$slots, "noDataFound", { key: 0 })
    ]),
    _: 3
  });
}
const _e = /* @__PURE__ */ P(Z, [["render", p]]), $ = {
  name: "DatasetPager",
  setup() {
    const t = _(V), n = i("dsPage"), s = i("dsPagecount"), e = f(() => n.value === 1), r = f(() => n.value === s.value || s.value === 0);
    return {
      datasetI18n: i("datasetI18n"),
      setActive: i("setActive"),
      dsPages: i("dsPages"),
      dsPagecount: s,
      dsPage: n,
      morePages: t,
      disabledPrevious: e,
      disabledNext: r
    };
  }
}, ee = { class: "pagination" }, te = ["tabindex", "aria-disabled"], se = ["onClick"], ne = {
  key: 1,
  class: "page-link"
}, ae = ["tabindex", "aria-disabled"];
function re(t, n, s, e, r, o) {
  return h(), v("ul", ee, [
    w("li", {
      class: k(["page-item", e.disabledPrevious && "disabled"])
    }, [
      w("a", {
        class: "page-link",
        href: "#",
        tabindex: e.disabledPrevious ? "-1" : null,
        "aria-disabled": e.disabledPrevious ? "true" : null,
        onClick: n[0] || (n[0] = N((a) => e.setActive(e.dsPage !== 1 && e.dsPagecount !== 0 ? e.dsPage - 1 : e.dsPage), ["prevent"]))
      }, u(e.datasetI18n.previous), 9, te)
    ], 2),
    (h(!0), v(A, null, F(e.dsPages, (a, d) => (h(), v("li", {
      key: d,
      class: k(["page-item", a === e.dsPage && "active", a === e.morePages && "disabled"])
    }, [
      a !== e.morePages ? (h(), v("a", {
        key: 0,
        class: "page-link",
        href: "#",
        onClick: N((b) => e.setActive(a), ["prevent"])
      }, u(a), 9, se)) : (h(), v("span", ne, u(a), 1))
    ], 2))), 128)),
    w("li", {
      class: k(["page-item", e.disabledNext && "disabled"])
    }, [
      w("a", {
        class: "page-link",
        href: "#",
        tabindex: e.disabledNext ? "-1" : null,
        "aria-disabled": e.disabledNext ? "true" : null,
        onClick: n[1] || (n[1] = N((a) => e.setActive(e.dsPage !== e.dsPagecount && e.dsPagecount !== 0 ? e.dsPage + 1 : e.dsPage), ["prevent"]))
      }, u(e.datasetI18n.next), 9, ae)
    ], 2)
  ]);
}
const we = /* @__PURE__ */ P($, [["render", re]]), oe = {
  name: "DatasetSearch",
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
  setup(t) {
    const n = i("search"), s = _(""), e = z((r) => {
      n(r);
    }, t.wait);
    return {
      dsSearch: s,
      input: e
    };
  }
}, de = ["placeholder", "value"];
function le(t, n, s, e, r, o) {
  return h(), v("input", {
    type: "text",
    placeholder: s.dsSearchPlaceholder,
    class: "form-control",
    value: e.dsSearch,
    onInput: n[0] || (n[0] = (a) => e.input(a.target.value))
  }, null, 40, de);
}
const be = /* @__PURE__ */ P(oe, [["render", le]]), ie = {
  name: "DatasetShow",
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
  setup(t, { emit: n }) {
    const s = i("showEntries"), e = (r) => {
      n("changed", Number(r.target.value)), s(Number(r.target.value));
    };
    return s(Number(t.dsShowEntries)), {
      datasetI18n: i("datasetI18n"),
      change: e
    };
  }
}, ce = { class: "form-inline" }, ue = ["value"], fe = ["value"];
function he(t, n, s, e, r, o) {
  return h(), v("div", ce, [
    w("label", null, u(e.datasetI18n.show), 1),
    w("select", {
      value: s.dsShowEntries,
      class: "form-control mr-1 ml-1",
      onChange: n[0] || (n[0] = (...a) => e.change && e.change(...a))
    }, [
      (h(!0), v(A, null, F(s.dsShowEntriesLovs, (a) => (h(), v("option", {
        key: a.value,
        value: a.value
      }, u(a.text), 9, fe))), 128))
    ], 40, ue),
    w("label", null, u(e.datasetI18n.entries), 1)
  ]);
}
const Pe = /* @__PURE__ */ P(ie, [["render", he]]);
export {
  ge as Dataset,
  me as DatasetInfo,
  _e as DatasetItem,
  we as DatasetPager,
  be as DatasetSearch,
  Pe as DatasetShow
};
