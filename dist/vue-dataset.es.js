import { ref as w, computed as u, watch as O, provide as c, renderSlot as A, nextTick as M, inject as l, openBlock as f, createElementBlock as h, toDisplayString as i, createBlock as K, resolveDynamicComponent as z, withCtx as G, Fragment as F, renderList as T, createCommentVNode as W, createElementVNode as b, normalizeClass as N, withModifiers as R } from "vue";
const q = {
  show: "Show",
  entries: "entries",
  previous: "Previous",
  next: "Next",
  showing: "Showing",
  showingTo: "to",
  showingOf: "of",
  showingEntries: "entries"
}, j = "...";
function H(t, s, n) {
  let e;
  return function() {
    const r = this, o = arguments;
    clearTimeout(e), n && !e && t.apply(r, o), e = setTimeout(function() {
      e = null, n || t.apply(r, o);
    }, s);
  };
}
function V(t) {
  for (const s in t)
    return !1;
  return !0;
}
function J(t, s) {
  const e = [], r = [];
  let o;
  if (e.push(1), t <= 1)
    return e;
  for (let a = s - 2; a <= s + 2; a++)
    a < t && a > 1 && e.push(a);
  e.push(t);
  for (let a = 0; a < e.length; a++)
    o && (e[a] - o === 2 ? r.push(o + 1) : e[a] - o !== 1 && r.push(j)), r.push(e[a]), o = e[a];
  return r;
}
function Q(t, s = {}) {
  const n = [];
  let e;
  const r = t.length;
  return t = t.map(function(o, a) {
    return o[0] === "-" ? (n[a] = -1, o = o.substring(1)) : n[a] = 1, o;
  }), function(o, a) {
    for (e = 0; e < r; e++) {
      const d = t[e], y = s[d] ? s[d](o.value[d]) : o.value[d], g = s[d] ? s[d](a.value[d]) : a.value[d];
      if (y > g)
        return n[e];
      if (y < g)
        return -n[e];
    }
    return 0;
  };
}
function U(t, s) {
  for (const n in s)
    t = t.filter(function(e) {
      const r = e.value;
      for (const o in r)
        if (o === n) {
          if (typeof s[n] == "function")
            return s[n](r[o]);
          if (s[n] === "" || r[o] === s[n])
            return !0;
        }
      return !1;
    });
  return t;
}
function X(t, s, n, e) {
  e = String(e).toLowerCase();
  for (const r in n)
    if (t.length === 0 || t.indexOf(r) !== -1) {
      const o = String(n[r]).toLowerCase();
      for (const a in s)
        if (a === r && typeof s[a] == "function") {
          const d = s[a](o, e, n);
          if (d === !0)
            return d;
        }
      if (o.indexOf(e) >= 0)
        return !0;
    }
  return !1;
}
const P = (t, s) => {
  const n = t.__vccOpts || t;
  for (const [e, r] of s)
    n[e] = r;
  return n;
}, Y = {
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
  setup(t, { emit: s }) {
    const n = w(1), e = w(""), r = w(10), o = w(q), a = w([]), d = (m) => {
      e.value = m;
    }, y = async (m) => {
      r.value = m, await M(), n.value > D.value && g(S.value[S.value.length - 1]);
    }, g = (m) => {
      n.value = m;
    }, L = u(() => (t.dsData, e.value, t.dsSortby, t.dsFilterFields, t.dsSearchIn, t.dsSearchAs, t.dsSortAs, Date.now())), C = u(() => a.value.slice(E.value, k.value)), S = u(() => J(D.value, n.value)), I = u(() => a.value.length), D = u(() => Math.ceil(I.value / r.value)), E = u(() => (n.value - 1) * r.value), k = u(() => n.value * r.value);
    return O(I, (m, B) => {
      g(1);
    }), O(
      L,
      (m, B) => {
        let v = [];
        !e.value && !t.dsSortby.length && V(t.dsFilterFields) ? v = t.dsData.map((_, x) => x) : (v = t.dsData.map((_, x) => ({ index: x, value: _ })), V(t.dsFilterFields) || (v = U(v, t.dsFilterFields)), e.value && (v = v.filter((_) => X(t.dsSearchIn, t.dsSearchAs, _.value, e.value))), t.dsSortby.length && v.sort(Q(t.dsSortby, t.dsSortAs)), v = v.map((_) => _.index)), a.value = v, s(
          "update:dsData",
          t.dsData.filter((_, x) => v.includes(x))
        );
      },
      {
        immediate: !0
      }
    ), c("dsIndexes", a), c("search", d), c("showEntries", y), c("setActive", g), c("datasetI18n", o), c(
      "dsData",
      u(() => t.dsData)
    ), c("dsRows", C), c("dsPages", S), c("dsResultsNumber", I), c("dsPagecount", D), c("dsFrom", E), c("dsTo", k), c("dsPage", n), {
      dsIndexes: a,
      dsShowEntries: r,
      dsResultsNumber: I,
      dsPage: n,
      dsPagecount: D,
      dsFrom: E,
      dsTo: k,
      dsRows: C,
      dsPages: S,
      search: d,
      showEntries: y,
      setActive: g
    };
  }
};
function Z(t, s, n, e, r, o) {
  return A(t.$slots, "default", {
    ds: {
      dsIndexes: e.dsIndexes,
      dsShowEntries: e.dsShowEntries,
      dsResultsNumber: e.dsResultsNumber,
      dsPage: e.dsPage,
      dsPagecount: e.dsPagecount,
      dsFrom: e.dsFrom,
      dsTo: e.dsTo,
      dsData: n.dsData,
      dsRows: e.dsRows,
      dsPages: e.dsPages,
      search: e.search,
      showEntries: e.showEntries,
      setActive: e.setActive
    }
  });
}
const we = /* @__PURE__ */ P(Y, [["render", Z]]), p = {
  setup() {
    const t = l("dsResultsNumber"), s = l("dsFrom"), n = l("dsTo"), e = u(() => t.value !== 0 ? s.value + 1 : 0), r = u(() => n.value >= t.value ? t.value : n.value);
    return {
      datasetI18n: l("datasetI18n"),
      dsResultsNumber: t,
      showing: e,
      showingTo: r
    };
  }
};
function $(t, s, n, e, r, o) {
  return f(), h("div", null, i(e.datasetI18n.showing) + " " + i(e.showing) + " " + i(e.datasetI18n.showingTo) + " " + i(e.showingTo) + " " + i(e.datasetI18n.showingOf) + " " + i(e.dsResultsNumber) + " " + i(e.datasetI18n.showingEntries), 1);
}
const be = /* @__PURE__ */ P(p, [["render", $]]), ee = {
  props: {
    tag: {
      type: String,
      default: "div"
    }
  },
  setup() {
    const t = u(() => {
      const s = [];
      for (let n = l("dsFrom").value; n < l("dsTo").value; n++)
        s.push(n);
      return s;
    });
    return {
      dsData: l("dsData"),
      dsRows: l("dsRows"),
      indexes: t
    };
  }
};
function te(t, s, n, e, r, o) {
  return f(), K(z(n.tag), null, {
    default: G(() => [
      (f(!0), h(F, null, T(e.dsRows, (a, d) => A(t.$slots, "default", {
        row: e.dsData[a],
        rowIndex: a,
        index: e.indexes[d]
      })), 256)),
      e.dsRows.length ? W("", !0) : A(t.$slots, "noDataFound", { key: 0 })
    ]),
    _: 3
  });
}
const ye = /* @__PURE__ */ P(ee, [["render", te]]), ne = {
  setup() {
    const t = w(j), s = l("dsPage"), n = l("dsPagecount"), e = u(() => s.value === 1), r = u(() => s.value === n.value || n.value === 0);
    return {
      datasetI18n: l("datasetI18n"),
      setActive: l("setActive"),
      dsPages: l("dsPages"),
      dsPagecount: n,
      dsPage: s,
      morePages: t,
      disabledPrevious: e,
      disabledNext: r
    };
  }
}, se = { class: "pagination" }, ae = ["tabindex", "aria-disabled"], re = ["onClick"], oe = {
  key: 1,
  class: "page-link"
}, de = ["tabindex", "aria-disabled"];
function le(t, s, n, e, r, o) {
  return f(), h("ul", se, [
    b("li", {
      class: N(["page-item", e.disabledPrevious && "disabled"])
    }, [
      b("a", {
        class: "page-link",
        href: "#",
        tabindex: e.disabledPrevious ? "-1" : null,
        "aria-disabled": e.disabledPrevious ? "true" : null,
        onClick: s[0] || (s[0] = R((a) => e.setActive(e.dsPage !== 1 && e.dsPagecount !== 0 ? e.dsPage - 1 : e.dsPage), ["prevent"]))
      }, i(e.datasetI18n.previous), 9, ae)
    ], 2),
    (f(!0), h(F, null, T(e.dsPages, (a, d) => (f(), h("li", {
      key: d,
      class: N(["page-item", a === e.dsPage && "active", a === e.morePages && "disabled"])
    }, [
      a !== e.morePages ? (f(), h("a", {
        key: 0,
        class: "page-link",
        href: "#",
        onClick: R((y) => e.setActive(a), ["prevent"])
      }, i(a), 9, re)) : (f(), h("span", oe, i(a), 1))
    ], 2))), 128)),
    b("li", {
      class: N(["page-item", e.disabledNext && "disabled"])
    }, [
      b("a", {
        class: "page-link",
        href: "#",
        tabindex: e.disabledNext ? "-1" : null,
        "aria-disabled": e.disabledNext ? "true" : null,
        onClick: s[1] || (s[1] = R((a) => e.setActive(e.dsPage !== e.dsPagecount && e.dsPagecount !== 0 ? e.dsPage + 1 : e.dsPage), ["prevent"]))
      }, i(e.datasetI18n.next), 9, de)
    ], 2)
  ]);
}
const Pe = /* @__PURE__ */ P(ne, [["render", le]]), ie = {
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
    const s = l("search"), n = w(""), e = H((r) => {
      s(r);
    }, t.wait);
    return {
      dsSearch: n,
      input: e
    };
  }
}, ce = ["placeholder", "value"];
function ue(t, s, n, e, r, o) {
  return f(), h("input", {
    type: "text",
    placeholder: n.dsSearchPlaceholder,
    class: "form-control",
    value: e.dsSearch,
    onInput: s[0] || (s[0] = (a) => e.input(a.target.value))
  }, null, 40, ce);
}
const xe = /* @__PURE__ */ P(ie, [["render", ue]]), fe = {
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
  setup(t, { emit: s }) {
    const n = l("showEntries"), e = (r) => {
      s("changed", Number(r.target.value)), n(Number(r.target.value));
    };
    return n(Number(t.dsShowEntries)), {
      datasetI18n: l("datasetI18n"),
      change: e
    };
  }
}, ve = { class: "form-inline" }, he = ["value"], ge = ["value"];
function me(t, s, n, e, r, o) {
  return f(), h("div", ve, [
    b("label", null, i(e.datasetI18n.show), 1),
    b("select", {
      value: n.dsShowEntries,
      class: "form-control mr-1 ml-1",
      onChange: s[0] || (s[0] = (...a) => e.change && e.change(...a))
    }, [
      (f(!0), h(F, null, T(n.dsShowEntriesLovs, (a) => (f(), h("option", {
        key: a.value,
        value: a.value
      }, i(a.text), 9, ge))), 128))
    ], 40, he),
    b("label", null, i(e.datasetI18n.entries), 1)
  ]);
}
const Se = /* @__PURE__ */ P(fe, [["render", me]]);
export {
  we as Dataset,
  be as DatasetInfo,
  ye as DatasetItem,
  Pe as DatasetPager,
  xe as DatasetSearch,
  Se as DatasetShow
};
