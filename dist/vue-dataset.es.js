import { ref as w, computed as f, watch as V, provide as u, renderSlot as F, nextTick as B, inject as l, openBlock as h, createElementBlock as g, toDisplayString as c, createBlock as M, resolveDynamicComponent as K, withCtx as p, Fragment as C, renderList as T, createCommentVNode as z, createElementVNode as _, normalizeClass as A, withModifiers as R } from "vue";
const G = {
  show: "Show",
  entries: "entries",
  previous: "Previous",
  next: "Next",
  showing: "Showing",
  showingTo: "to",
  showingOf: "of",
  showingEntries: "entries"
}, L = "...";
function W(t, n, s) {
  let e;
  return function() {
    const o = this, r = arguments;
    clearTimeout(e), s && !e && t.apply(o, r), e = setTimeout(function() {
      e = null, s || t.apply(o, r);
    }, n);
  };
}
function j(t) {
  for (const n in t)
    return !1;
  return !0;
}
function q(t, n) {
  const e = [], o = [];
  let r;
  if (e.push(1), t <= 1)
    return e;
  for (let a = n - 2; a <= n + 2; a++)
    a < t && a > 1 && e.push(a);
  e.push(t);
  for (let a = 0; a < e.length; a++)
    r && (e[a] - r === 2 ? o.push(r + 1) : e[a] - r !== 1 && o.push(L)), o.push(e[a]), r = e[a];
  return o;
}
function H(t, n = {}) {
  const s = [];
  let e;
  const o = t.length;
  return t = t.map(function(r, a) {
    return r[0] === "-" ? (s[a] = -1, r = r.substring(1)) : s[a] = 1, r;
  }), function(r, a) {
    for (e = 0; e < o; e++) {
      const d = t[e], v = n[d] ? n[d](r.value[d]) : r.value[d], P = n[d] ? n[d](a.value[d]) : a.value[d];
      if (v > P)
        return s[e];
      if (v < P)
        return -s[e];
    }
    return 0;
  };
}
function J(t, n) {
  for (const s in n)
    t = t.filter(function(e) {
      const o = e.value;
      for (const r in o)
        if (r === s) {
          if (typeof n[s] == "function")
            return n[s](o[r]);
          if (n[s] === "" || o[r] === n[s])
            return !0;
        }
      return !1;
    });
  return t;
}
function Q(t, n, s, e) {
  e = String(e).toLowerCase();
  for (const o in s)
    if (t.length === 0 || t.indexOf(o) !== -1) {
      const r = String(s[o]).toLowerCase();
      for (const a in n)
        if (a === o && typeof n[a] == "function") {
          const d = n[a](r, e, s);
          if (d === !0)
            return d;
        }
      if (r.indexOf(e) >= 0)
        return !0;
    }
  return !1;
}
const y = (t, n) => {
  const s = t.__vccOpts || t;
  for (const [e, o] of n)
    s[e] = o;
  return s;
}, U = {
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
    const n = w(1), s = w(""), e = w(10), o = w(G), r = w([]), a = (m) => {
      s.value = m;
    }, d = async (m) => {
      const D = x.value;
      e.value = m, await B();
      const i = x.value;
      i.length < D.length && v(i[i.length - 1]);
    }, v = (m) => {
      n.value = m;
    }, P = f(() => (t.dsData, s.value, t.dsSortby, t.dsFilterFields, t.dsSearchIn, t.dsSearchAs, t.dsSortAs, Date.now())), O = f(() => r.value.slice(E.value, k.value)), x = f(() => q(I.value, n.value)), S = f(() => r.value.length), I = f(() => Math.ceil(S.value / e.value)), E = f(() => (n.value - 1) * e.value), k = f(() => n.value * e.value);
    return V(S, (m, D) => {
      v(1);
    }), V(P, (m, D) => {
      let i = [];
      !s.value && !t.dsSortby.length && j(t.dsFilterFields) ? i = t.dsData.map((b, N) => N) : (i = t.dsData.map((b, N) => ({ index: N, value: b })), j(t.dsFilterFields) || (i = J(i, t.dsFilterFields)), s.value && (i = i.filter((b) => Q(t.dsSearchIn, t.dsSearchAs, b.value, s.value))), t.dsSortby.length && i.sort(H(t.dsSortby, t.dsSortAs)), i = i.map((b) => b.index)), r.value = i;
    }, {
      immediate: !0
    }), u("dsIndexes", r), u("search", a), u("showEntries", d), u("setActive", v), u("datasetI18n", o), u("dsData", f(() => t.dsData)), u("dsRows", O), u("dsPages", x), u("dsResultsNumber", S), u("dsPagecount", I), u("dsFrom", E), u("dsTo", k), u("dsPage", n), {
      dsIndexes: r,
      dsShowEntries: e,
      dsResultsNumber: S,
      dsPage: n,
      dsPagecount: I,
      dsFrom: E,
      dsTo: k,
      dsRows: O,
      dsPages: x,
      search: a,
      showEntries: d,
      setActive: v
    };
  }
};
function X(t, n, s, e, o, r) {
  return F(t.$slots, "default", {
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
const we = /* @__PURE__ */ y(U, [["render", X]]), Y = {
  setup() {
    const t = l("dsResultsNumber"), n = l("dsFrom"), s = l("dsTo"), e = f(() => t.value !== 0 ? n.value + 1 : 0), o = f(() => s.value >= t.value ? t.value : s.value);
    return {
      datasetI18n: l("datasetI18n"),
      dsResultsNumber: t,
      showing: e,
      showingTo: o
    };
  }
};
function Z(t, n, s, e, o, r) {
  return h(), g("div", null, c(e.datasetI18n.showing) + " " + c(e.showing) + " " + c(e.datasetI18n.showingTo) + " " + c(e.showingTo) + " " + c(e.datasetI18n.showingOf) + " " + c(e.dsResultsNumber) + " " + c(e.datasetI18n.showingEntries), 1);
}
const _e = /* @__PURE__ */ y(Y, [["render", Z]]), $ = {
  props: {
    tag: {
      type: String,
      default: "div"
    }
  },
  setup() {
    const t = f(() => {
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
function ee(t, n, s, e, o, r) {
  return h(), M(K(s.tag), null, {
    default: p(() => [
      (h(!0), g(C, null, T(e.dsRows, (a, d) => F(t.$slots, "default", {
        row: e.dsData[a],
        rowIndex: a,
        index: e.indexes[d]
      })), 256)),
      e.dsRows.length ? z("", !0) : F(t.$slots, "noDataFound", { key: 0 })
    ]),
    _: 3
  });
}
const be = /* @__PURE__ */ y($, [["render", ee]]), te = {
  setup() {
    const t = w(L), n = l("dsPage"), s = l("dsPagecount"), e = f(() => n.value === 1), o = f(() => n.value === s.value || s.value === 0);
    return {
      datasetI18n: l("datasetI18n"),
      setActive: l("setActive"),
      dsPages: l("dsPages"),
      dsPagecount: s,
      dsPage: n,
      morePages: t,
      disabledPrevious: e,
      disabledNext: o
    };
  }
}, ne = { class: "pagination" }, se = ["tabindex", "aria-disabled"], ae = ["onClick"], oe = {
  key: 1,
  class: "page-link"
}, re = ["tabindex", "aria-disabled"];
function de(t, n, s, e, o, r) {
  return h(), g("ul", ne, [
    _("li", {
      class: A(["page-item", e.disabledPrevious && "disabled"])
    }, [
      _("a", {
        class: "page-link",
        href: "#",
        tabindex: e.disabledPrevious ? "-1" : null,
        "aria-disabled": e.disabledPrevious ? "true" : null,
        onClick: n[0] || (n[0] = R((a) => e.setActive(e.dsPage !== 1 && e.dsPagecount !== 0 ? e.dsPage - 1 : e.dsPage), ["prevent"]))
      }, c(e.datasetI18n.previous), 9, se)
    ], 2),
    (h(!0), g(C, null, T(e.dsPages, (a, d) => (h(), g("li", {
      key: d,
      class: A(["page-item", a === e.dsPage && "active", a === e.morePages && "disabled"])
    }, [
      a !== e.morePages ? (h(), g("a", {
        key: 0,
        class: "page-link",
        href: "#",
        onClick: R((v) => e.setActive(a), ["prevent"])
      }, c(a), 9, ae)) : (h(), g("span", oe, c(a), 1))
    ], 2))), 128)),
    _("li", {
      class: A(["page-item", e.disabledNext && "disabled"])
    }, [
      _("a", {
        class: "page-link",
        href: "#",
        tabindex: e.disabledNext ? "-1" : null,
        "aria-disabled": e.disabledNext ? "true" : null,
        onClick: n[1] || (n[1] = R((a) => e.setActive(e.dsPage !== e.dsPagecount && e.dsPagecount !== 0 ? e.dsPage + 1 : e.dsPage), ["prevent"]))
      }, c(e.datasetI18n.next), 9, re)
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
    const n = l("search"), s = w(""), e = W((o) => {
      n(o);
    }, t.wait);
    return {
      dsSearch: s,
      input: e
    };
  }
}, ie = ["placeholder", "value"];
function ce(t, n, s, e, o, r) {
  return h(), g("input", {
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
    const s = l("showEntries"), e = (o) => {
      n("changed", Number(o.target.value)), s(Number(o.target.value));
    };
    return s(Number(t.dsShowEntries)), {
      datasetI18n: l("datasetI18n"),
      change: e
    };
  }
}, fe = { class: "form-inline" }, he = ["value"], ge = ["value"];
function ve(t, n, s, e, o, r) {
  return h(), g("div", fe, [
    _("label", null, c(e.datasetI18n.show), 1),
    _("select", {
      value: s.dsShowEntries,
      class: "form-control mr-1 ml-1",
      onChange: n[0] || (n[0] = (...a) => e.change && e.change(...a))
    }, [
      (h(!0), g(C, null, T(s.dsShowEntriesLovs, (a) => (h(), g("option", {
        key: a.value,
        value: a.value
      }, c(a.text), 9, ge))), 128))
    ], 40, he),
    _("label", null, c(e.datasetI18n.entries), 1)
  ]);
}
const xe = /* @__PURE__ */ y(ue, [["render", ve]]);
export {
  we as Dataset,
  _e as DatasetInfo,
  be as DatasetItem,
  ye as DatasetPager,
  Pe as DatasetSearch,
  xe as DatasetShow
};
