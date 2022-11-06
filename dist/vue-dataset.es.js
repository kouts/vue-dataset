import { ref as w, computed as u, watch as O, provide as c, renderSlot as A, nextTick as B, inject as l, openBlock as f, createElementBlock as v, toDisplayString as i, createBlock as M, resolveDynamicComponent as K, withCtx as z, Fragment as F, renderList as T, createCommentVNode as G, createElementVNode as _, normalizeClass as N, withModifiers as R } from "vue";
const W = {
  show: "Show",
  entries: "entries",
  previous: "Previous",
  next: "Next",
  showing: "Showing",
  showingTo: "to",
  showingOf: "of",
  showingEntries: "entries"
}, j = "...";
function q(t, n, s) {
  let e;
  return function() {
    const r = this, o = arguments;
    clearTimeout(e), s && !e && t.apply(r, o), e = setTimeout(function() {
      e = null, s || t.apply(r, o);
    }, n);
  };
}
function V(t) {
  for (const n in t)
    return !1;
  return !0;
}
function H(t, n) {
  const e = [], r = [];
  let o;
  if (e.push(1), t <= 1)
    return e;
  for (let a = n - 2; a <= n + 2; a++)
    a < t && a > 1 && e.push(a);
  e.push(t);
  for (let a = 0; a < e.length; a++)
    o && (e[a] - o === 2 ? r.push(o + 1) : e[a] - o !== 1 && r.push(j)), r.push(e[a]), o = e[a];
  return r;
}
function J(t, n = {}) {
  const s = [];
  let e;
  const r = t.length;
  return t = t.map(function(o, a) {
    return o[0] === "-" ? (s[a] = -1, o = o.substring(1)) : s[a] = 1, o;
  }), function(o, a) {
    for (e = 0; e < r; e++) {
      const d = t[e], g = n[d] ? n[d](o.value[d]) : o.value[d], P = n[d] ? n[d](a.value[d]) : a.value[d];
      if (g > P)
        return s[e];
      if (g < P)
        return -s[e];
    }
    return 0;
  };
}
function Q(t, n) {
  for (const s in n)
    t = t.filter(function(e) {
      const r = e.value;
      for (const o in r)
        if (o === s) {
          if (typeof n[s] == "function")
            return n[s](r[o]);
          if (n[s] === "" || r[o] === n[s])
            return !0;
        }
      return !1;
    });
  return t;
}
function U(t, n, s, e) {
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
const y = (t, n) => {
  const s = t.__vccOpts || t;
  for (const [e, r] of n)
    s[e] = r;
  return s;
}, X = {
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
  setup(t) {
    const n = w(1), s = w(""), e = w(10), r = w(W), o = w([]), a = (m) => {
      s.value = m;
    }, d = async (m) => {
      e.value = m, await B(), n.value > I.value && g(x.value[x.value.length - 1]);
    }, g = (m) => {
      n.value = m;
    }, P = u(() => (t.dsData, s.value, t.dsSortby, t.dsFilterFields, t.dsSearchIn, t.dsSearchAs, t.dsSortAs, Date.now())), C = u(() => o.value.slice(E.value, k.value)), x = u(() => H(I.value, n.value)), S = u(() => o.value.length), I = u(() => Math.ceil(S.value / e.value)), E = u(() => (n.value - 1) * e.value), k = u(() => n.value * e.value);
    return O(S, (m, L) => {
      g(1);
    }), O(
      P,
      (m, L) => {
        let h = [];
        !s.value && !t.dsSortby.length && V(t.dsFilterFields) ? h = t.dsData.map((b, D) => D) : (h = t.dsData.map((b, D) => ({ index: D, value: b })), V(t.dsFilterFields) || (h = Q(h, t.dsFilterFields)), s.value && (h = h.filter((b) => U(t.dsSearchIn, t.dsSearchAs, b.value, s.value))), t.dsSortby.length && h.sort(J(t.dsSortby, t.dsSortAs)), h = h.map((b) => b.index)), o.value = h;
      },
      {
        immediate: !0
      }
    ), c("dsIndexes", o), c("search", a), c("showEntries", d), c("setActive", g), c("datasetI18n", r), c(
      "dsData",
      u(() => t.dsData)
    ), c("dsRows", C), c("dsPages", x), c("dsResultsNumber", S), c("dsPagecount", I), c("dsFrom", E), c("dsTo", k), c("dsPage", n), {
      dsIndexes: o,
      dsShowEntries: e,
      dsResultsNumber: S,
      dsPage: n,
      dsPagecount: I,
      dsFrom: E,
      dsTo: k,
      dsRows: C,
      dsPages: x,
      search: a,
      showEntries: d,
      setActive: g
    };
  }
};
function Y(t, n, s, e, r, o) {
  return A(t.$slots, "default", {
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
const we = /* @__PURE__ */ y(X, [["render", Y]]), Z = {
  setup() {
    const t = l("dsResultsNumber"), n = l("dsFrom"), s = l("dsTo"), e = u(() => t.value !== 0 ? n.value + 1 : 0), r = u(() => s.value >= t.value ? t.value : s.value);
    return {
      datasetI18n: l("datasetI18n"),
      dsResultsNumber: t,
      showing: e,
      showingTo: r
    };
  }
};
function p(t, n, s, e, r, o) {
  return f(), v("div", null, i(e.datasetI18n.showing) + " " + i(e.showing) + " " + i(e.datasetI18n.showingTo) + " " + i(e.showingTo) + " " + i(e.datasetI18n.showingOf) + " " + i(e.dsResultsNumber) + " " + i(e.datasetI18n.showingEntries), 1);
}
const _e = /* @__PURE__ */ y(Z, [["render", p]]), $ = {
  props: {
    tag: {
      type: String,
      default: "div"
    }
  },
  setup() {
    const t = u(() => {
      const n = [];
      for (let s = l("dsFrom").value; s < l("dsTo").value; s++)
        n.push(s);
      return n;
    });
    return {
      dsData: l("dsData"),
      dsRows: l("dsRows"),
      indexes: t
    };
  }
};
function ee(t, n, s, e, r, o) {
  return f(), M(K(s.tag), null, {
    default: z(() => [
      (f(!0), v(F, null, T(e.dsRows, (a, d) => A(t.$slots, "default", {
        row: e.dsData[a],
        rowIndex: a,
        index: e.indexes[d]
      })), 256)),
      e.dsRows.length ? G("", !0) : A(t.$slots, "noDataFound", { key: 0 })
    ]),
    _: 3
  });
}
const be = /* @__PURE__ */ y($, [["render", ee]]), te = {
  setup() {
    const t = w(j), n = l("dsPage"), s = l("dsPagecount"), e = u(() => n.value === 1), r = u(() => n.value === s.value || s.value === 0);
    return {
      datasetI18n: l("datasetI18n"),
      setActive: l("setActive"),
      dsPages: l("dsPages"),
      dsPagecount: s,
      dsPage: n,
      morePages: t,
      disabledPrevious: e,
      disabledNext: r
    };
  }
}, ne = { class: "pagination" }, se = ["tabindex", "aria-disabled"], ae = ["onClick"], re = {
  key: 1,
  class: "page-link"
}, oe = ["tabindex", "aria-disabled"];
function de(t, n, s, e, r, o) {
  return f(), v("ul", ne, [
    _("li", {
      class: N(["page-item", e.disabledPrevious && "disabled"])
    }, [
      _("a", {
        class: "page-link",
        href: "#",
        tabindex: e.disabledPrevious ? "-1" : null,
        "aria-disabled": e.disabledPrevious ? "true" : null,
        onClick: n[0] || (n[0] = R((a) => e.setActive(e.dsPage !== 1 && e.dsPagecount !== 0 ? e.dsPage - 1 : e.dsPage), ["prevent"]))
      }, i(e.datasetI18n.previous), 9, se)
    ], 2),
    (f(!0), v(F, null, T(e.dsPages, (a, d) => (f(), v("li", {
      key: d,
      class: N(["page-item", a === e.dsPage && "active", a === e.morePages && "disabled"])
    }, [
      a !== e.morePages ? (f(), v("a", {
        key: 0,
        class: "page-link",
        href: "#",
        onClick: R((g) => e.setActive(a), ["prevent"])
      }, i(a), 9, ae)) : (f(), v("span", re, i(a), 1))
    ], 2))), 128)),
    _("li", {
      class: N(["page-item", e.disabledNext && "disabled"])
    }, [
      _("a", {
        class: "page-link",
        href: "#",
        tabindex: e.disabledNext ? "-1" : null,
        "aria-disabled": e.disabledNext ? "true" : null,
        onClick: n[1] || (n[1] = R((a) => e.setActive(e.dsPage !== e.dsPagecount && e.dsPagecount !== 0 ? e.dsPage + 1 : e.dsPage), ["prevent"]))
      }, i(e.datasetI18n.next), 9, oe)
    ], 2)
  ]);
}
const ye = /* @__PURE__ */ y(te, [["render", de]]), le = {
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
    const n = l("search"), s = w(""), e = q((r) => {
      n(r);
    }, t.wait);
    return {
      dsSearch: s,
      input: e
    };
  }
}, ie = ["placeholder", "value"];
function ce(t, n, s, e, r, o) {
  return f(), v("input", {
    type: "text",
    placeholder: s.dsSearchPlaceholder,
    class: "form-control",
    value: e.dsSearch,
    onInput: n[0] || (n[0] = (a) => e.input(a.target.value))
  }, null, 40, ie);
}
const Pe = /* @__PURE__ */ y(le, [["render", ce]]), ue = {
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
    const s = l("showEntries"), e = (r) => {
      n("changed", Number(r.target.value)), s(Number(r.target.value));
    };
    return s(Number(t.dsShowEntries)), {
      datasetI18n: l("datasetI18n"),
      change: e
    };
  }
}, fe = { class: "form-inline" }, ve = ["value"], he = ["value"];
function ge(t, n, s, e, r, o) {
  return f(), v("div", fe, [
    _("label", null, i(e.datasetI18n.show), 1),
    _("select", {
      value: s.dsShowEntries,
      class: "form-control mr-1 ml-1",
      onChange: n[0] || (n[0] = (...a) => e.change && e.change(...a))
    }, [
      (f(!0), v(F, null, T(s.dsShowEntriesLovs, (a) => (f(), v("option", {
        key: a.value,
        value: a.value
      }, i(a.text), 9, he))), 128))
    ], 40, ve),
    _("label", null, i(e.datasetI18n.entries), 1)
  ]);
}
const xe = /* @__PURE__ */ y(ue, [["render", ge]]);
export {
  we as Dataset,
  _e as DatasetInfo,
  be as DatasetItem,
  ye as DatasetPager,
  Pe as DatasetSearch,
  xe as DatasetShow
};
