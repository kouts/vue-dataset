function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
(function(global2, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.VueDataset = {}));
})(this, function(exports2) {
  "use strict";
  var datasetI18n = {
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
  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this;
      var args = arguments;
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
    for (var _i = 0; _i < range.length; _i++) {
      if (length) {
        if (range[_i] - length === 2) {
          rangeWithDots.push(length + 1);
        } else if (range[_i] - length !== 1) {
          rangeWithDots.push(MORE_PAGES);
        }
      }
      rangeWithDots.push(range[_i]);
      length = range[_i];
    }
    return rangeWithDots;
  }
  function fieldSorter(fields) {
    var dsSortAs = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
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
    var _loop = function _loop2(filterKey2) {
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
    for (var filterKey in filterFields) {
      _loop(filterKey);
    }
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
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  var check = function check2(it) {
    return it && it.Math == Math && it;
  };
  var global$e = check((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) == "object" && globalThis) || check((typeof window === "undefined" ? "undefined" : _typeof(window)) == "object" && window) || check((typeof self === "undefined" ? "undefined" : _typeof(self)) == "object" && self) || check(_typeof(commonjsGlobal) == "object" && commonjsGlobal) || function() {
    return this;
  }() || Function("return this")();
  var objectGetOwnPropertyDescriptor = {};
  var fails$e = function fails$e2(exec2) {
    try {
      return !!exec2();
    } catch (error) {
      return true;
    }
  };
  var fails$d = fails$e;
  var descriptors = !fails$d(function() {
    return Object.defineProperty({}, 1, {
      get: function get2() {
        return 7;
      }
    })[1] != 7;
  });
  var fails$c = fails$e;
  var functionBindNative = !fails$c(function() {
    var test2 = function() {
    }.bind();
    return typeof test2 != "function" || test2.hasOwnProperty("prototype");
  });
  var NATIVE_BIND$1 = functionBindNative;
  var call$8 = Function.prototype.call;
  var functionCall = NATIVE_BIND$1 ? call$8.bind(call$8) : function() {
    return call$8.apply(call$8, arguments);
  };
  var objectPropertyIsEnumerable = {};
  var $propertyIsEnumerable = {}.propertyIsEnumerable;
  var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
  var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({
    1: 2
  }, 1);
  objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$1(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable;
  var createPropertyDescriptor$3 = function createPropertyDescriptor$32(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value
    };
  };
  var NATIVE_BIND = functionBindNative;
  var FunctionPrototype$1 = Function.prototype;
  var bind = FunctionPrototype$1.bind;
  var call$7 = FunctionPrototype$1.call;
  var uncurryThis$c = NATIVE_BIND && bind.bind(call$7, call$7);
  var functionUncurryThis = NATIVE_BIND ? function(fn) {
    return fn && uncurryThis$c(fn);
  } : function(fn) {
    return fn && function() {
      return call$7.apply(fn, arguments);
    };
  };
  var uncurryThis$b = functionUncurryThis;
  var toString$5 = uncurryThis$b({}.toString);
  var stringSlice$1 = uncurryThis$b("".slice);
  var classofRaw$1 = function classofRaw$12(it) {
    return stringSlice$1(toString$5(it), 8, -1);
  };
  var uncurryThis$a = functionUncurryThis;
  var fails$b = fails$e;
  var classof$4 = classofRaw$1;
  var $Object$4 = Object;
  var split = uncurryThis$a("".split);
  var indexedObject = fails$b(function() {
    return !$Object$4("z").propertyIsEnumerable(0);
  }) ? function(it) {
    return classof$4(it) == "String" ? split(it, "") : $Object$4(it);
  } : $Object$4;
  var $TypeError$7 = TypeError;
  var requireObjectCoercible$3 = function requireObjectCoercible$32(it) {
    if (it == void 0)
      throw $TypeError$7("Can't call method on " + it);
    return it;
  };
  var IndexedObject = indexedObject;
  var requireObjectCoercible$2 = requireObjectCoercible$3;
  var toIndexedObject$5 = function toIndexedObject$52(it) {
    return IndexedObject(requireObjectCoercible$2(it));
  };
  var isCallable$g = function isCallable$g2(argument) {
    return typeof argument == "function";
  };
  var isCallable$f = isCallable$g;
  var isObject$5 = function isObject$52(it) {
    return _typeof(it) == "object" ? it !== null : isCallable$f(it);
  };
  var global$d = global$e;
  var isCallable$e = isCallable$g;
  var aFunction = function aFunction2(argument) {
    return isCallable$e(argument) ? argument : void 0;
  };
  var getBuiltIn$4 = function getBuiltIn$42(namespace, method) {
    return arguments.length < 2 ? aFunction(global$d[namespace]) : global$d[namespace] && global$d[namespace][method];
  };
  var uncurryThis$9 = functionUncurryThis;
  var objectIsPrototypeOf = uncurryThis$9({}.isPrototypeOf);
  var getBuiltIn$3 = getBuiltIn$4;
  var engineUserAgent = getBuiltIn$3("navigator", "userAgent") || "";
  var global$c = global$e;
  var userAgent = engineUserAgent;
  var process = global$c.process;
  var Deno = global$c.Deno;
  var versions = process && process.versions || Deno && Deno.version;
  var v8 = versions && versions.v8;
  var match, version;
  if (v8) {
    match = v8.split(".");
    version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
  }
  if (!version && userAgent) {
    match = userAgent.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = userAgent.match(/Chrome\/(\d+)/);
      if (match)
        version = +match[1];
    }
  }
  var engineV8Version = version;
  var V8_VERSION = engineV8Version;
  var fails$a = fails$e;
  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$a(function() {
    var symbol = Symbol();
    return !String(symbol) || !(Object(symbol) instanceof Symbol) || !Symbol.sham && V8_VERSION && V8_VERSION < 41;
  });
  var NATIVE_SYMBOL$1 = nativeSymbol;
  var useSymbolAsUid = NATIVE_SYMBOL$1 && !Symbol.sham && _typeof(Symbol.iterator) == "symbol";
  var getBuiltIn$2 = getBuiltIn$4;
  var isCallable$d = isCallable$g;
  var isPrototypeOf = objectIsPrototypeOf;
  var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;
  var $Object$3 = Object;
  var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function(it) {
    return _typeof(it) == "symbol";
  } : function(it) {
    var $Symbol = getBuiltIn$2("Symbol");
    return isCallable$d($Symbol) && isPrototypeOf($Symbol.prototype, $Object$3(it));
  };
  var $String$3 = String;
  var tryToString$1 = function tryToString$12(argument) {
    try {
      return $String$3(argument);
    } catch (error) {
      return "Object";
    }
  };
  var isCallable$c = isCallable$g;
  var tryToString = tryToString$1;
  var $TypeError$6 = TypeError;
  var aCallable$1 = function aCallable$12(argument) {
    if (isCallable$c(argument))
      return argument;
    throw $TypeError$6(tryToString(argument) + " is not a function");
  };
  var aCallable = aCallable$1;
  var getMethod$2 = function getMethod$22(V, P) {
    var func = V[P];
    return func == null ? void 0 : aCallable(func);
  };
  var call$6 = functionCall;
  var isCallable$b = isCallable$g;
  var isObject$4 = isObject$5;
  var $TypeError$5 = TypeError;
  var ordinaryToPrimitive$1 = function ordinaryToPrimitive$12(input, pref) {
    var fn, val;
    if (pref === "string" && isCallable$b(fn = input.toString) && !isObject$4(val = call$6(fn, input)))
      return val;
    if (isCallable$b(fn = input.valueOf) && !isObject$4(val = call$6(fn, input)))
      return val;
    if (pref !== "string" && isCallable$b(fn = input.toString) && !isObject$4(val = call$6(fn, input)))
      return val;
    throw $TypeError$5("Can't convert object to primitive value");
  };
  var shared$4 = {
    exports: {}
  };
  var global$b = global$e;
  var defineProperty$4 = Object.defineProperty;
  var defineGlobalProperty$3 = function defineGlobalProperty$32(key, value) {
    try {
      defineProperty$4(global$b, key, {
        value,
        configurable: true,
        writable: true
      });
    } catch (error) {
      global$b[key] = value;
    }
    return value;
  };
  var global$a = global$e;
  var defineGlobalProperty$2 = defineGlobalProperty$3;
  var SHARED = "__core-js_shared__";
  var store$3 = global$a[SHARED] || defineGlobalProperty$2(SHARED, {});
  var sharedStore = store$3;
  var store$2 = sharedStore;
  (shared$4.exports = function(key, value) {
    return store$2[key] || (store$2[key] = value !== void 0 ? value : {});
  })("versions", []).push({
    version: "3.23.5",
    mode: "global",
    copyright: "\xA9 2014-2022 Denis Pushkarev (zloirock.ru)",
    license: "https://github.com/zloirock/core-js/blob/v3.23.5/LICENSE",
    source: "https://github.com/zloirock/core-js"
  });
  var requireObjectCoercible$1 = requireObjectCoercible$3;
  var $Object$2 = Object;
  var toObject$2 = function toObject$22(argument) {
    return $Object$2(requireObjectCoercible$1(argument));
  };
  var uncurryThis$8 = functionUncurryThis;
  var toObject$1 = toObject$2;
  var hasOwnProperty = uncurryThis$8({}.hasOwnProperty);
  var hasOwnProperty_1 = Object.hasOwn || function hasOwn2(it, key) {
    return hasOwnProperty(toObject$1(it), key);
  };
  var uncurryThis$7 = functionUncurryThis;
  var id = 0;
  var postfix = Math.random();
  var toString$4 = uncurryThis$7(1 .toString);
  var uid$2 = function uid$22(key) {
    return "Symbol(" + (key === void 0 ? "" : key) + ")_" + toString$4(++id + postfix, 36);
  };
  var global$9 = global$e;
  var shared$3 = shared$4.exports;
  var hasOwn$8 = hasOwnProperty_1;
  var uid$1 = uid$2;
  var NATIVE_SYMBOL = nativeSymbol;
  var USE_SYMBOL_AS_UID = useSymbolAsUid;
  var WellKnownSymbolsStore = shared$3("wks");
  var Symbol$1 = global$9.Symbol;
  var symbolFor = Symbol$1 && Symbol$1["for"];
  var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;
  var wellKnownSymbol$9 = function wellKnownSymbol$92(name) {
    if (!hasOwn$8(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == "string")) {
      var description = "Symbol." + name;
      if (NATIVE_SYMBOL && hasOwn$8(Symbol$1, name)) {
        WellKnownSymbolsStore[name] = Symbol$1[name];
      } else if (USE_SYMBOL_AS_UID && symbolFor) {
        WellKnownSymbolsStore[name] = symbolFor(description);
      } else {
        WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
      }
    }
    return WellKnownSymbolsStore[name];
  };
  var call$5 = functionCall;
  var isObject$3 = isObject$5;
  var isSymbol$1 = isSymbol$2;
  var getMethod$1 = getMethod$2;
  var ordinaryToPrimitive = ordinaryToPrimitive$1;
  var wellKnownSymbol$8 = wellKnownSymbol$9;
  var $TypeError$4 = TypeError;
  var TO_PRIMITIVE = wellKnownSymbol$8("toPrimitive");
  var toPrimitive$1 = function toPrimitive$12(input, pref) {
    if (!isObject$3(input) || isSymbol$1(input))
      return input;
    var exoticToPrim = getMethod$1(input, TO_PRIMITIVE);
    var result;
    if (exoticToPrim) {
      if (pref === void 0)
        pref = "default";
      result = call$5(exoticToPrim, input, pref);
      if (!isObject$3(result) || isSymbol$1(result))
        return result;
      throw $TypeError$4("Can't convert object to primitive value");
    }
    if (pref === void 0)
      pref = "number";
    return ordinaryToPrimitive(input, pref);
  };
  var toPrimitive = toPrimitive$1;
  var isSymbol = isSymbol$2;
  var toPropertyKey$2 = function toPropertyKey$22(argument) {
    var key = toPrimitive(argument, "string");
    return isSymbol(key) ? key : key + "";
  };
  var global$8 = global$e;
  var isObject$2 = isObject$5;
  var document$1 = global$8.document;
  var EXISTS$1 = isObject$2(document$1) && isObject$2(document$1.createElement);
  var documentCreateElement$2 = function documentCreateElement$22(it) {
    return EXISTS$1 ? document$1.createElement(it) : {};
  };
  var DESCRIPTORS$8 = descriptors;
  var fails$9 = fails$e;
  var createElement = documentCreateElement$2;
  var ie8DomDefine = !DESCRIPTORS$8 && !fails$9(function() {
    return Object.defineProperty(createElement("div"), "a", {
      get: function get2() {
        return 7;
      }
    }).a != 7;
  });
  var DESCRIPTORS$7 = descriptors;
  var call$4 = functionCall;
  var propertyIsEnumerableModule = objectPropertyIsEnumerable;
  var createPropertyDescriptor$2 = createPropertyDescriptor$3;
  var toIndexedObject$4 = toIndexedObject$5;
  var toPropertyKey$1 = toPropertyKey$2;
  var hasOwn$7 = hasOwnProperty_1;
  var IE8_DOM_DEFINE$1 = ie8DomDefine;
  var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
  objectGetOwnPropertyDescriptor.f = DESCRIPTORS$7 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor2(O, P) {
    O = toIndexedObject$4(O);
    P = toPropertyKey$1(P);
    if (IE8_DOM_DEFINE$1)
      try {
        return $getOwnPropertyDescriptor$1(O, P);
      } catch (error) {
      }
    if (hasOwn$7(O, P))
      return createPropertyDescriptor$2(!call$4(propertyIsEnumerableModule.f, O, P), O[P]);
  };
  var objectDefineProperty = {};
  var DESCRIPTORS$6 = descriptors;
  var fails$8 = fails$e;
  var v8PrototypeDefineBug = DESCRIPTORS$6 && fails$8(function() {
    return Object.defineProperty(function() {
    }, "prototype", {
      value: 42,
      writable: false
    }).prototype != 42;
  });
  var isObject$1 = isObject$5;
  var $String$2 = String;
  var $TypeError$3 = TypeError;
  var anObject$8 = function anObject$82(argument) {
    if (isObject$1(argument))
      return argument;
    throw $TypeError$3($String$2(argument) + " is not an object");
  };
  var DESCRIPTORS$5 = descriptors;
  var IE8_DOM_DEFINE = ie8DomDefine;
  var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
  var anObject$7 = anObject$8;
  var toPropertyKey = toPropertyKey$2;
  var $TypeError$2 = TypeError;
  var $defineProperty = Object.defineProperty;
  var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var ENUMERABLE = "enumerable";
  var CONFIGURABLE$1 = "configurable";
  var WRITABLE = "writable";
  objectDefineProperty.f = DESCRIPTORS$5 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty2(O, P, Attributes) {
    anObject$7(O);
    P = toPropertyKey(P);
    anObject$7(Attributes);
    if (typeof O === "function" && P === "prototype" && "value" in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
      var current = $getOwnPropertyDescriptor(O, P);
      if (current && current[WRITABLE]) {
        O[P] = Attributes.value;
        Attributes = {
          configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
          enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
          writable: false
        };
      }
    }
    return $defineProperty(O, P, Attributes);
  } : $defineProperty : function defineProperty2(O, P, Attributes) {
    anObject$7(O);
    P = toPropertyKey(P);
    anObject$7(Attributes);
    if (IE8_DOM_DEFINE)
      try {
        return $defineProperty(O, P, Attributes);
      } catch (error) {
      }
    if ("get" in Attributes || "set" in Attributes)
      throw $TypeError$2("Accessors not supported");
    if ("value" in Attributes)
      O[P] = Attributes.value;
    return O;
  };
  var DESCRIPTORS$4 = descriptors;
  var definePropertyModule$3 = objectDefineProperty;
  var createPropertyDescriptor$1 = createPropertyDescriptor$3;
  var createNonEnumerableProperty$5 = DESCRIPTORS$4 ? function(object, key, value) {
    return definePropertyModule$3.f(object, key, createPropertyDescriptor$1(1, value));
  } : function(object, key, value) {
    object[key] = value;
    return object;
  };
  var makeBuiltIn$2 = {
    exports: {}
  };
  var DESCRIPTORS$3 = descriptors;
  var hasOwn$6 = hasOwnProperty_1;
  var FunctionPrototype = Function.prototype;
  var getDescriptor = DESCRIPTORS$3 && Object.getOwnPropertyDescriptor;
  var EXISTS = hasOwn$6(FunctionPrototype, "name");
  var PROPER = EXISTS && function something() {
  }.name === "something";
  var CONFIGURABLE = EXISTS && (!DESCRIPTORS$3 || DESCRIPTORS$3 && getDescriptor(FunctionPrototype, "name").configurable);
  var functionName = {
    EXISTS,
    PROPER,
    CONFIGURABLE
  };
  var uncurryThis$6 = functionUncurryThis;
  var isCallable$a = isCallable$g;
  var store$1 = sharedStore;
  var functionToString = uncurryThis$6(Function.toString);
  if (!isCallable$a(store$1.inspectSource)) {
    store$1.inspectSource = function(it) {
      return functionToString(it);
    };
  }
  var inspectSource$2 = store$1.inspectSource;
  var global$7 = global$e;
  var isCallable$9 = isCallable$g;
  var inspectSource$1 = inspectSource$2;
  var WeakMap$1 = global$7.WeakMap;
  var nativeWeakMap = isCallable$9(WeakMap$1) && /native code/.test(inspectSource$1(WeakMap$1));
  var shared$2 = shared$4.exports;
  var uid = uid$2;
  var keys = shared$2("keys");
  var sharedKey$3 = function sharedKey$32(key) {
    return keys[key] || (keys[key] = uid(key));
  };
  var hiddenKeys$4 = {};
  var NATIVE_WEAK_MAP = nativeWeakMap;
  var global$6 = global$e;
  var uncurryThis$5 = functionUncurryThis;
  var isObject = isObject$5;
  var createNonEnumerableProperty$4 = createNonEnumerableProperty$5;
  var hasOwn$5 = hasOwnProperty_1;
  var shared$1 = sharedStore;
  var sharedKey$2 = sharedKey$3;
  var hiddenKeys$3 = hiddenKeys$4;
  var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
  var TypeError$1 = global$6.TypeError;
  var WeakMap = global$6.WeakMap;
  var set, get, has;
  var enforce = function enforce2(it) {
    return has(it) ? get(it) : set(it, {});
  };
  var getterFor = function getterFor2(TYPE) {
    return function(it) {
      var state;
      if (!isObject(it) || (state = get(it)).type !== TYPE) {
        throw TypeError$1("Incompatible receiver, " + TYPE + " required");
      }
      return state;
    };
  };
  if (NATIVE_WEAK_MAP || shared$1.state) {
    var store = shared$1.state || (shared$1.state = new WeakMap());
    var wmget = uncurryThis$5(store.get);
    var wmhas = uncurryThis$5(store.has);
    var wmset = uncurryThis$5(store.set);
    set = function set2(it, metadata) {
      if (wmhas(store, it))
        throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      wmset(store, it, metadata);
      return metadata;
    };
    get = function get2(it) {
      return wmget(store, it) || {};
    };
    has = function has2(it) {
      return wmhas(store, it);
    };
  } else {
    var STATE = sharedKey$2("state");
    hiddenKeys$3[STATE] = true;
    set = function set2(it, metadata) {
      if (hasOwn$5(it, STATE))
        throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty$4(it, STATE, metadata);
      return metadata;
    };
    get = function get2(it) {
      return hasOwn$5(it, STATE) ? it[STATE] : {};
    };
    has = function has2(it) {
      return hasOwn$5(it, STATE);
    };
  }
  var internalState = {
    set,
    get,
    has,
    enforce,
    getterFor
  };
  var fails$7 = fails$e;
  var isCallable$8 = isCallable$g;
  var hasOwn$4 = hasOwnProperty_1;
  var DESCRIPTORS$2 = descriptors;
  var CONFIGURABLE_FUNCTION_NAME$1 = functionName.CONFIGURABLE;
  var inspectSource = inspectSource$2;
  var InternalStateModule$1 = internalState;
  var enforceInternalState = InternalStateModule$1.enforce;
  var getInternalState$2 = InternalStateModule$1.get;
  var defineProperty$3 = Object.defineProperty;
  var CONFIGURABLE_LENGTH = DESCRIPTORS$2 && !fails$7(function() {
    return defineProperty$3(function() {
    }, "length", {
      value: 8
    }).length !== 8;
  });
  var TEMPLATE = String(String).split("String");
  var makeBuiltIn$1 = makeBuiltIn$2.exports = function(value, name, options) {
    if (String(name).slice(0, 7) === "Symbol(") {
      name = "[" + String(name).replace(/^Symbol\(([^)]*)\)/, "$1") + "]";
    }
    if (options && options.getter)
      name = "get " + name;
    if (options && options.setter)
      name = "set " + name;
    if (!hasOwn$4(value, "name") || CONFIGURABLE_FUNCTION_NAME$1 && value.name !== name) {
      if (DESCRIPTORS$2)
        defineProperty$3(value, "name", {
          value: name,
          configurable: true
        });
      else
        value.name = name;
    }
    if (CONFIGURABLE_LENGTH && options && hasOwn$4(options, "arity") && value.length !== options.arity) {
      defineProperty$3(value, "length", {
        value: options.arity
      });
    }
    try {
      if (options && hasOwn$4(options, "constructor") && options.constructor) {
        if (DESCRIPTORS$2)
          defineProperty$3(value, "prototype", {
            writable: false
          });
      } else if (value.prototype)
        value.prototype = void 0;
    } catch (error) {
    }
    var state = enforceInternalState(value);
    if (!hasOwn$4(state, "source")) {
      state.source = TEMPLATE.join(typeof name == "string" ? name : "");
    }
    return value;
  };
  Function.prototype.toString = makeBuiltIn$1(function toString2() {
    return isCallable$8(this) && getInternalState$2(this).source || inspectSource(this);
  }, "toString");
  var isCallable$7 = isCallable$g;
  var definePropertyModule$2 = objectDefineProperty;
  var makeBuiltIn = makeBuiltIn$2.exports;
  var defineGlobalProperty$1 = defineGlobalProperty$3;
  var defineBuiltIn$5 = function defineBuiltIn$52(O, key, value, options) {
    if (!options)
      options = {};
    var simple = options.enumerable;
    var name = options.name !== void 0 ? options.name : key;
    if (isCallable$7(value))
      makeBuiltIn(value, name, options);
    if (options.global) {
      if (simple)
        O[key] = value;
      else
        defineGlobalProperty$1(key, value);
    } else {
      try {
        if (!options.unsafe)
          delete O[key];
        else if (O[key])
          simple = true;
      } catch (error) {
      }
      if (simple)
        O[key] = value;
      else
        definePropertyModule$2.f(O, key, {
          value,
          enumerable: false,
          configurable: !options.nonConfigurable,
          writable: !options.nonWritable
        });
    }
    return O;
  };
  var objectGetOwnPropertyNames = {};
  var ceil = Math.ceil;
  var floor = Math.floor;
  var mathTrunc = Math.trunc || function trunc2(x) {
    var n = +x;
    return (n > 0 ? floor : ceil)(n);
  };
  var trunc = mathTrunc;
  var toIntegerOrInfinity$2 = function toIntegerOrInfinity$22(argument) {
    var number = +argument;
    return number !== number || number === 0 ? 0 : trunc(number);
  };
  var toIntegerOrInfinity$1 = toIntegerOrInfinity$2;
  var max = Math.max;
  var min$1 = Math.min;
  var toAbsoluteIndex$1 = function toAbsoluteIndex$12(index, length) {
    var integer = toIntegerOrInfinity$1(index);
    return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
  };
  var toIntegerOrInfinity = toIntegerOrInfinity$2;
  var min = Math.min;
  var toLength$1 = function toLength$12(argument) {
    return argument > 0 ? min(toIntegerOrInfinity(argument), 9007199254740991) : 0;
  };
  var toLength = toLength$1;
  var lengthOfArrayLike$1 = function lengthOfArrayLike$12(obj) {
    return toLength(obj.length);
  };
  var toIndexedObject$3 = toIndexedObject$5;
  var toAbsoluteIndex = toAbsoluteIndex$1;
  var lengthOfArrayLike = lengthOfArrayLike$1;
  var createMethod = function createMethod2(IS_INCLUDES) {
    return function($this, el, fromIndex) {
      var O = toIndexedObject$3($this);
      var length = lengthOfArrayLike(O);
      var index = toAbsoluteIndex(fromIndex, length);
      var value;
      if (IS_INCLUDES && el != el)
        while (length > index) {
          value = O[index++];
          if (value != value)
            return true;
        }
      else
        for (; length > index; index++) {
          if ((IS_INCLUDES || index in O) && O[index] === el)
            return IS_INCLUDES || index || 0;
        }
      return !IS_INCLUDES && -1;
    };
  };
  var arrayIncludes = {
    includes: createMethod(true),
    indexOf: createMethod(false)
  };
  var uncurryThis$4 = functionUncurryThis;
  var hasOwn$3 = hasOwnProperty_1;
  var toIndexedObject$2 = toIndexedObject$5;
  var indexOf$1 = arrayIncludes.indexOf;
  var hiddenKeys$2 = hiddenKeys$4;
  var push = uncurryThis$4([].push);
  var objectKeysInternal = function objectKeysInternal2(object, names) {
    var O = toIndexedObject$2(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) {
      !hasOwn$3(hiddenKeys$2, key) && hasOwn$3(O, key) && push(result, key);
    }
    while (names.length > i) {
      if (hasOwn$3(O, key = names[i++])) {
        ~indexOf$1(result, key) || push(result, key);
      }
    }
    return result;
  };
  var enumBugKeys$3 = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
  var internalObjectKeys$1 = objectKeysInternal;
  var enumBugKeys$2 = enumBugKeys$3;
  var hiddenKeys$1 = enumBugKeys$2.concat("length", "prototype");
  objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys$1(O, hiddenKeys$1);
  };
  var objectGetOwnPropertySymbols = {};
  objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;
  var getBuiltIn$1 = getBuiltIn$4;
  var uncurryThis$3 = functionUncurryThis;
  var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
  var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
  var anObject$6 = anObject$8;
  var concat = uncurryThis$3([].concat);
  var ownKeys$1 = getBuiltIn$1("Reflect", "ownKeys") || function ownKeys2(it) {
    var keys2 = getOwnPropertyNamesModule.f(anObject$6(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return getOwnPropertySymbols ? concat(keys2, getOwnPropertySymbols(it)) : keys2;
  };
  var hasOwn$2 = hasOwnProperty_1;
  var ownKeys = ownKeys$1;
  var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
  var definePropertyModule$1 = objectDefineProperty;
  var copyConstructorProperties$1 = function copyConstructorProperties$12(target, source, exceptions) {
    var keys2 = ownKeys(source);
    var defineProperty2 = definePropertyModule$1.f;
    var getOwnPropertyDescriptor2 = getOwnPropertyDescriptorModule.f;
    for (var i = 0; i < keys2.length; i++) {
      var key = keys2[i];
      if (!hasOwn$2(target, key) && !(exceptions && hasOwn$2(exceptions, key))) {
        defineProperty2(target, key, getOwnPropertyDescriptor2(source, key));
      }
    }
  };
  var fails$6 = fails$e;
  var isCallable$6 = isCallable$g;
  var replacement = /#|\.prototype\./;
  var isForced$1 = function isForced$12(feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true : value == NATIVE ? false : isCallable$6(detection) ? fails$6(detection) : !!detection;
  };
  var normalize = isForced$1.normalize = function(string) {
    return String(string).replace(replacement, ".").toLowerCase();
  };
  var data = isForced$1.data = {};
  var NATIVE = isForced$1.NATIVE = "N";
  var POLYFILL = isForced$1.POLYFILL = "P";
  var isForced_1 = isForced$1;
  var global$5 = global$e;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var createNonEnumerableProperty$3 = createNonEnumerableProperty$5;
  var defineBuiltIn$4 = defineBuiltIn$5;
  var defineGlobalProperty = defineGlobalProperty$3;
  var copyConstructorProperties = copyConstructorProperties$1;
  var isForced = isForced_1;
  var _export = function _export2(options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global$5;
    } else if (STATIC) {
      target = global$5[TARGET] || defineGlobalProperty(TARGET, {});
    } else {
      target = (global$5[TARGET] || {}).prototype;
    }
    if (target)
      for (key in source) {
        sourceProperty = source[key];
        if (options.dontCallGetSet) {
          descriptor = getOwnPropertyDescriptor(target, key);
          targetProperty = descriptor && descriptor.value;
        } else
          targetProperty = target[key];
        FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
        if (!FORCED && targetProperty !== void 0) {
          if (_typeof(sourceProperty) == _typeof(targetProperty))
            continue;
          copyConstructorProperties(sourceProperty, targetProperty);
        }
        if (options.sham || targetProperty && targetProperty.sham) {
          createNonEnumerableProperty$3(sourceProperty, "sham", true);
        }
        defineBuiltIn$4(target, key, sourceProperty, options);
      }
  };
  var wellKnownSymbol$7 = wellKnownSymbol$9;
  var TO_STRING_TAG$3 = wellKnownSymbol$7("toStringTag");
  var test = {};
  test[TO_STRING_TAG$3] = "z";
  var toStringTagSupport = String(test) === "[object z]";
  var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
  var isCallable$5 = isCallable$g;
  var classofRaw = classofRaw$1;
  var wellKnownSymbol$6 = wellKnownSymbol$9;
  var TO_STRING_TAG$2 = wellKnownSymbol$6("toStringTag");
  var $Object$1 = Object;
  var CORRECT_ARGUMENTS = classofRaw(function() {
    return arguments;
  }()) == "Arguments";
  var tryGet = function tryGet2(it, key) {
    try {
      return it[key];
    } catch (error) {
    }
  };
  var classof$3 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function(it) {
    var O, tag, result;
    return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (tag = tryGet(O = $Object$1(it), TO_STRING_TAG$2)) == "string" ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) == "Object" && isCallable$5(O.callee) ? "Arguments" : result;
  };
  var classof$2 = classof$3;
  var $String$1 = String;
  var toString$3 = function toString$32(argument) {
    if (classof$2(argument) === "Symbol")
      throw TypeError("Cannot convert a Symbol value to a string");
    return $String$1(argument);
  };
  var anObject$5 = anObject$8;
  var regexpFlags$1 = function regexpFlags$12() {
    var that = anObject$5(this);
    var result = "";
    if (that.hasIndices)
      result += "d";
    if (that.global)
      result += "g";
    if (that.ignoreCase)
      result += "i";
    if (that.multiline)
      result += "m";
    if (that.dotAll)
      result += "s";
    if (that.unicode)
      result += "u";
    if (that.unicodeSets)
      result += "v";
    if (that.sticky)
      result += "y";
    return result;
  };
  var fails$5 = fails$e;
  var global$4 = global$e;
  var $RegExp$2 = global$4.RegExp;
  var UNSUPPORTED_Y$1 = fails$5(function() {
    var re = $RegExp$2("a", "y");
    re.lastIndex = 2;
    return re.exec("abcd") != null;
  });
  var MISSED_STICKY = UNSUPPORTED_Y$1 || fails$5(function() {
    return !$RegExp$2("a", "y").sticky;
  });
  var BROKEN_CARET = UNSUPPORTED_Y$1 || fails$5(function() {
    var re = $RegExp$2("^r", "gy");
    re.lastIndex = 2;
    return re.exec("str") != null;
  });
  var regexpStickyHelpers = {
    BROKEN_CARET,
    MISSED_STICKY,
    UNSUPPORTED_Y: UNSUPPORTED_Y$1
  };
  var objectDefineProperties = {};
  var internalObjectKeys = objectKeysInternal;
  var enumBugKeys$1 = enumBugKeys$3;
  var objectKeys$1 = Object.keys || function keys2(O) {
    return internalObjectKeys(O, enumBugKeys$1);
  };
  var DESCRIPTORS$1 = descriptors;
  var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
  var definePropertyModule = objectDefineProperty;
  var anObject$4 = anObject$8;
  var toIndexedObject$1 = toIndexedObject$5;
  var objectKeys = objectKeys$1;
  objectDefineProperties.f = DESCRIPTORS$1 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject$4(O);
    var props = toIndexedObject$1(Properties);
    var keys2 = objectKeys(Properties);
    var length = keys2.length;
    var index = 0;
    var key;
    while (length > index) {
      definePropertyModule.f(O, key = keys2[index++], props[key]);
    }
    return O;
  };
  var getBuiltIn = getBuiltIn$4;
  var html$1 = getBuiltIn("document", "documentElement");
  var anObject$3 = anObject$8;
  var definePropertiesModule = objectDefineProperties;
  var enumBugKeys = enumBugKeys$3;
  var hiddenKeys = hiddenKeys$4;
  var html = html$1;
  var documentCreateElement$1 = documentCreateElement$2;
  var sharedKey$1 = sharedKey$3;
  var GT = ">";
  var LT = "<";
  var PROTOTYPE = "prototype";
  var SCRIPT = "script";
  var IE_PROTO$1 = sharedKey$1("IE_PROTO");
  var EmptyConstructor = function EmptyConstructor2() {
  };
  var scriptTag = function scriptTag2(content) {
    return LT + SCRIPT + GT + content + LT + "/" + SCRIPT + GT;
  };
  var NullProtoObjectViaActiveX = function NullProtoObjectViaActiveX2(activeXDocument2) {
    activeXDocument2.write(scriptTag(""));
    activeXDocument2.close();
    var temp = activeXDocument2.parentWindow.Object;
    activeXDocument2 = null;
    return temp;
  };
  var NullProtoObjectViaIFrame = function NullProtoObjectViaIFrame2() {
    var iframe = documentCreateElement$1("iframe");
    var JS = "java" + SCRIPT + ":";
    var iframeDocument;
    iframe.style.display = "none";
    html.appendChild(iframe);
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag("document.F=Object"));
    iframeDocument.close();
    return iframeDocument.F;
  };
  var activeXDocument;
  var _NullProtoObject = function NullProtoObject() {
    try {
      activeXDocument = new ActiveXObject("htmlfile");
    } catch (error) {
    }
    _NullProtoObject = typeof document != "undefined" ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument);
    var length = enumBugKeys.length;
    while (length--) {
      delete _NullProtoObject[PROTOTYPE][enumBugKeys[length]];
    }
    return _NullProtoObject();
  };
  hiddenKeys[IE_PROTO$1] = true;
  var objectCreate = Object.create || function create2(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE] = anObject$3(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE] = null;
      result[IE_PROTO$1] = O;
    } else
      result = _NullProtoObject();
    return Properties === void 0 ? result : definePropertiesModule.f(result, Properties);
  };
  var fails$4 = fails$e;
  var global$3 = global$e;
  var $RegExp$1 = global$3.RegExp;
  var regexpUnsupportedDotAll = fails$4(function() {
    var re = $RegExp$1(".", "s");
    return !(re.dotAll && re.exec("\n") && re.flags === "s");
  });
  var fails$3 = fails$e;
  var global$2 = global$e;
  var $RegExp = global$2.RegExp;
  var regexpUnsupportedNcg = fails$3(function() {
    var re = $RegExp("(?<a>b)", "g");
    return re.exec("b").groups.a !== "b" || "b".replace(re, "$<a>c") !== "bc";
  });
  var call$3 = functionCall;
  var uncurryThis$2 = functionUncurryThis;
  var toString$2 = toString$3;
  var regexpFlags = regexpFlags$1;
  var stickyHelpers = regexpStickyHelpers;
  var shared = shared$4.exports;
  var create$2 = objectCreate;
  var getInternalState$1 = internalState.get;
  var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
  var UNSUPPORTED_NCG = regexpUnsupportedNcg;
  var nativeReplace = shared("native-string-replace", String.prototype.replace);
  var nativeExec = RegExp.prototype.exec;
  var patchedExec = nativeExec;
  var charAt = uncurryThis$2("".charAt);
  var indexOf = uncurryThis$2("".indexOf);
  var replace = uncurryThis$2("".replace);
  var stringSlice = uncurryThis$2("".slice);
  var UPDATES_LAST_INDEX_WRONG = function() {
    var re1 = /a/;
    var re2 = /b*/g;
    call$3(nativeExec, re1, "a");
    call$3(nativeExec, re2, "a");
    return re1.lastIndex !== 0 || re2.lastIndex !== 0;
  }();
  var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;
  var NPCG_INCLUDED = /()??/.exec("")[1] !== void 0;
  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;
  if (PATCH) {
    patchedExec = function exec2(string) {
      var re = this;
      var state = getInternalState$1(re);
      var str = toString$2(string);
      var raw = state.raw;
      var result, reCopy, lastIndex, match2, i, object, group;
      if (raw) {
        raw.lastIndex = re.lastIndex;
        result = call$3(patchedExec, raw, str);
        re.lastIndex = raw.lastIndex;
        return result;
      }
      var groups = state.groups;
      var sticky = UNSUPPORTED_Y && re.sticky;
      var flags = call$3(regexpFlags, re);
      var source = re.source;
      var charsAdded = 0;
      var strCopy = str;
      if (sticky) {
        flags = replace(flags, "y", "");
        if (indexOf(flags, "g") === -1) {
          flags += "g";
        }
        strCopy = stringSlice(str, re.lastIndex);
        if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt(str, re.lastIndex - 1) !== "\n")) {
          source = "(?: " + source + ")";
          strCopy = " " + strCopy;
          charsAdded++;
        }
        reCopy = new RegExp("^(?:" + source + ")", flags);
      }
      if (NPCG_INCLUDED) {
        reCopy = new RegExp("^" + source + "$(?!\\s)", flags);
      }
      if (UPDATES_LAST_INDEX_WRONG)
        lastIndex = re.lastIndex;
      match2 = call$3(nativeExec, sticky ? reCopy : re, strCopy);
      if (sticky) {
        if (match2) {
          match2.input = stringSlice(match2.input, charsAdded);
          match2[0] = stringSlice(match2[0], charsAdded);
          match2.index = re.lastIndex;
          re.lastIndex += match2[0].length;
        } else
          re.lastIndex = 0;
      } else if (UPDATES_LAST_INDEX_WRONG && match2) {
        re.lastIndex = re.global ? match2.index + match2[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match2 && match2.length > 1) {
        call$3(nativeReplace, match2[0], reCopy, function() {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === void 0)
              match2[i] = void 0;
          }
        });
      }
      if (match2 && groups) {
        match2.groups = object = create$2(null);
        for (i = 0; i < groups.length; i++) {
          group = groups[i];
          object[group[0]] = match2[group[1]];
        }
      }
      return match2;
    };
  }
  var regexpExec$2 = patchedExec;
  var $$1 = _export;
  var exec = regexpExec$2;
  $$1({
    target: "RegExp",
    proto: true,
    forced: /./.exec !== exec
  }, {
    exec
  });
  var uncurryThis$1 = functionUncurryThis;
  var defineBuiltIn$3 = defineBuiltIn$5;
  var regexpExec$1 = regexpExec$2;
  var fails$2 = fails$e;
  var wellKnownSymbol$5 = wellKnownSymbol$9;
  var createNonEnumerableProperty$2 = createNonEnumerableProperty$5;
  var SPECIES = wellKnownSymbol$5("species");
  var RegExpPrototype = RegExp.prototype;
  var fixRegexpWellKnownSymbolLogic = function fixRegexpWellKnownSymbolLogic2(KEY, exec2, FORCED, SHAM) {
    var SYMBOL = wellKnownSymbol$5(KEY);
    var DELEGATES_TO_SYMBOL = !fails$2(function() {
      var O = {};
      O[SYMBOL] = function() {
        return 7;
      };
      return ""[KEY](O) != 7;
    });
    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$2(function() {
      var execCalled = false;
      var re = /a/;
      if (KEY === "split") {
        re = {};
        re.constructor = {};
        re.constructor[SPECIES] = function() {
          return re;
        };
        re.flags = "";
        re[SYMBOL] = /./[SYMBOL];
      }
      re.exec = function() {
        execCalled = true;
        return null;
      };
      re[SYMBOL]("");
      return !execCalled;
    });
    if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || FORCED) {
      var uncurriedNativeRegExpMethod = uncurryThis$1(/./[SYMBOL]);
      var methods = exec2(SYMBOL, ""[KEY], function(nativeMethod, regexp, str, arg2, forceStringMethod) {
        var uncurriedNativeMethod = uncurryThis$1(nativeMethod);
        var $exec = regexp.exec;
        if ($exec === regexpExec$1 || $exec === RegExpPrototype.exec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            return {
              done: true,
              value: uncurriedNativeRegExpMethod(regexp, str, arg2)
            };
          }
          return {
            done: true,
            value: uncurriedNativeMethod(str, regexp, arg2)
          };
        }
        return {
          done: false
        };
      });
      defineBuiltIn$3(String.prototype, KEY, methods[0]);
      defineBuiltIn$3(RegExpPrototype, SYMBOL, methods[1]);
    }
    if (SHAM)
      createNonEnumerableProperty$2(RegExpPrototype[SYMBOL], "sham", true);
  };
  var sameValue$1 = Object.is || function is(x, y) {
    return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
  };
  var call$2 = functionCall;
  var anObject$2 = anObject$8;
  var isCallable$4 = isCallable$g;
  var classof$1 = classofRaw$1;
  var regexpExec = regexpExec$2;
  var $TypeError$1 = TypeError;
  var regexpExecAbstract = function regexpExecAbstract2(R, S) {
    var exec2 = R.exec;
    if (isCallable$4(exec2)) {
      var result = call$2(exec2, R, S);
      if (result !== null)
        anObject$2(result);
      return result;
    }
    if (classof$1(R) === "RegExp")
      return call$2(regexpExec, R, S);
    throw $TypeError$1("RegExp#exec called on incompatible receiver");
  };
  var call$1 = functionCall;
  var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
  var anObject$1 = anObject$8;
  var requireObjectCoercible = requireObjectCoercible$3;
  var sameValue = sameValue$1;
  var toString$1 = toString$3;
  var getMethod = getMethod$2;
  var regExpExec = regexpExecAbstract;
  fixRegExpWellKnownSymbolLogic("search", function(SEARCH, nativeSearch, maybeCallNative) {
    return [
      function search(regexp) {
        var O = requireObjectCoercible(this);
        var searcher = regexp == void 0 ? void 0 : getMethod(regexp, SEARCH);
        return searcher ? call$1(searcher, regexp, O) : new RegExp(regexp)[SEARCH](toString$1(O));
      },
      function(string) {
        var rx = anObject$1(this);
        var S = toString$1(string);
        var res = maybeCallNative(nativeSearch, rx, S);
        if (res.done)
          return res.value;
        var previousLastIndex = rx.lastIndex;
        if (!sameValue(previousLastIndex, 0))
          rx.lastIndex = 0;
        var result = regExpExec(rx, S);
        if (!sameValue(rx.lastIndex, previousLastIndex))
          rx.lastIndex = previousLastIndex;
        return result === null ? -1 : result.index;
      }
    ];
  });
  var render$5 = function __render__() {
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
  var staticRenderFns$5 = [];
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
      hook = function hook2(context) {
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
  var __vue2_script$5 = {
    provide: function provide() {
      var _this = this;
      return {
        search: this.search,
        showEntries: this.showEntries,
        setActive: this.setActive,
        datasetI18n: this.datasetI18n,
        rdsIndexes: function rdsIndexes() {
          return _this.indexes;
        },
        rdsData: function rdsData() {
          return _this.dsData;
        },
        rdsRows: function rdsRows() {
          return _this.dsRows;
        },
        rdsPages: function rdsPages() {
          return _this.dsPages;
        },
        rdsResultsNumber: function rdsResultsNumber() {
          return _this.dsResultsNumber;
        },
        rdsPagecount: function rdsPagecount() {
          return _this.dsPagecount;
        },
        rdsFrom: function rdsFrom() {
          return _this.dsFrom;
        },
        rdsTo: function rdsTo() {
          return _this.dsTo;
        },
        rdsPage: function rdsPage() {
          return _this.dsPage;
        }
      };
    },
    props: {
      dsData: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      dsFilterFields: {
        type: Object,
        default: function _default() {
          return {};
        }
      },
      dsSortby: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      dsSearchIn: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      dsSearchAs: {
        type: Object,
        default: function _default() {
          return {};
        }
      },
      dsSortAs: {
        type: Object,
        default: function _default() {
          return {};
        }
      }
    },
    data: function data2() {
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
        handler: function handler(newVal, oldVal) {
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
              return {
                index: i,
                value: val
              };
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
        var _this2 = this;
        var pagesBeforeChange = this.dsPages;
        this.dsShowEntries = value;
        this.$nextTick(function() {
          var pagesAfterChange = _this2.dsPages;
          if (pagesAfterChange.length < pagesBeforeChange.length) {
            _this2.setActive(pagesAfterChange[pagesAfterChange.length - 1]);
          }
        });
      },
      setActive: function setActive(value) {
        this.dsPage = value;
      }
    }
  };
  var __cssModules$5 = {};
  var __component__$5 = /* @__PURE__ */ normalizeComponent(__vue2_script$5, render$5, staticRenderFns$5, false, __vue2_injectStyles$5, null, null, null);
  function __vue2_injectStyles$5(context) {
    for (var o in __cssModules$5) {
      this[o] = __cssModules$5[o];
    }
  }
  var Dataset = /* @__PURE__ */ function() {
    return __component__$5.exports;
  }();
  var render$4 = function __render__() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", [_vm._v(" " + _vm._s(_vm.datasetI18n.showing) + " " + _vm._s(_vm.showing) + " " + _vm._s(_vm.datasetI18n.showingTo) + " " + _vm._s(_vm.showingTo) + " " + _vm._s(_vm.datasetI18n.showingOf) + " " + _vm._s(_vm.dsResultsNumber) + " " + _vm._s(_vm.datasetI18n.showingEntries) + " ")]);
  };
  var staticRenderFns$4 = [];
  var __vue2_script$4 = {
    inject: ["datasetI18n", "rdsResultsNumber", "rdsFrom", "rdsTo"],
    computed: {
      showing: function showing() {
        return this.dsResultsNumber !== 0 ? this.dsFrom + 1 : 0;
      },
      showingTo: function showingTo() {
        return this.dsTo >= this.dsResultsNumber ? this.dsResultsNumber : this.dsTo;
      },
      dsResultsNumber: function dsResultsNumber() {
        return this.rdsResultsNumber();
      },
      dsFrom: function dsFrom() {
        return this.rdsFrom();
      },
      dsTo: function dsTo() {
        return this.rdsTo();
      }
    }
  };
  var __cssModules$4 = {};
  var __component__$4 = /* @__PURE__ */ normalizeComponent(__vue2_script$4, render$4, staticRenderFns$4, false, __vue2_injectStyles$4, null, null, null);
  function __vue2_injectStyles$4(context) {
    for (var o in __cssModules$4) {
      this[o] = __cssModules$4[o];
    }
  }
  var DatasetInfo = /* @__PURE__ */ function() {
    return __component__$4.exports;
  }();
  var render$3 = function __render__() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(_vm.tag, {
      tag: "component"
    }, [_vm._l(_vm.dsRows, function(rowIndex, i) {
      return [_vm._t("default", null, {
        "row": _vm.dsData[rowIndex],
        "rowIndex": rowIndex,
        "index": _vm.indexes[i]
      })];
    }), !_vm.dsRows.length ? _vm._t("noDataFound") : _vm._e()], 2);
  };
  var staticRenderFns$3 = [];
  var __vue2_script$3 = {
    inject: ["rdsData", "rdsRows", "rdsFrom", "rdsTo"],
    props: {
      tag: {
        type: String,
        default: "div"
      }
    },
    computed: {
      dsRows: function dsRows() {
        return this.rdsRows();
      },
      dsData: function dsData() {
        return this.rdsData();
      },
      dsFrom: function dsFrom() {
        return this.rdsFrom();
      },
      dsTo: function dsTo() {
        return this.rdsTo();
      },
      indexes: function indexes() {
        var arr = [];
        for (var i = this.dsFrom; i < this.dsTo; i++) {
          arr.push(i);
        }
        return arr;
      }
    }
  };
  var __cssModules$3 = {};
  var __component__$3 = /* @__PURE__ */ normalizeComponent(__vue2_script$3, render$3, staticRenderFns$3, false, __vue2_injectStyles$3, null, null, null);
  function __vue2_injectStyles$3(context) {
    for (var o in __cssModules$3) {
      this[o] = __cssModules$3[o];
    }
  }
  var DatasetItem = /* @__PURE__ */ function() {
    return __component__$3.exports;
  }();
  var render$2 = function __render__() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("ul", {
      staticClass: "pagination"
    }, [_c("li", {
      class: ["page-item", _vm.disabledPrevious && "disabled"]
    }, [_c("a", {
      staticClass: "page-link",
      attrs: {
        "href": "#",
        "tabindex": _vm.disabledPrevious && "-1",
        "aria-disabled": _vm.disabledPrevious && "true"
      },
      on: {
        "click": function click($event) {
          $event.preventDefault();
          return _vm.setActive(_vm.dsPage !== 1 && _vm.dsPagecount !== 0 ? _vm.dsPage - 1 : _vm.dsPage);
        }
      }
    }, [_vm._v(" " + _vm._s(_vm.datasetI18n.previous) + " ")])]), _vm._l(_vm.dsPages, function(item, index) {
      return [_c("li", {
        key: index,
        class: ["page-item", item === _vm.dsPage && "active", item === _vm.morePages && "disabled"]
      }, [item !== _vm.morePages ? _c("a", {
        staticClass: "page-link",
        attrs: {
          "href": "#"
        },
        on: {
          "click": function click($event) {
            $event.preventDefault();
            return _vm.setActive(item);
          }
        }
      }, [_vm._v(" " + _vm._s(item) + " ")]) : _c("span", {
        staticClass: "page-link"
      }, [_vm._v(" " + _vm._s(item) + " ")])])];
    }), _c("li", {
      class: ["page-item", _vm.disabledNext && "disabled"]
    }, [_c("a", {
      staticClass: "page-link",
      attrs: {
        "href": "#",
        "tabindex": _vm.disabledNext && "-1",
        "aria-disabled": _vm.disabledNext && "true"
      },
      on: {
        "click": function click($event) {
          $event.preventDefault();
          return _vm.setActive(_vm.dsPage !== _vm.dsPagecount && _vm.dsPagecount !== 0 ? _vm.dsPage + 1 : _vm.dsPage);
        }
      }
    }, [_vm._v(" " + _vm._s(_vm.datasetI18n.next) + " ")])])], 2);
  };
  var staticRenderFns$2 = [];
  var __vue2_script$2 = {
    inject: ["datasetI18n", "setActive", "rdsPages", "rdsPagecount", "rdsPage"],
    data: function data2() {
      return {
        morePages: MORE_PAGES
      };
    },
    computed: {
      dsPages: function dsPages() {
        return this.rdsPages();
      },
      dsPagecount: function dsPagecount() {
        return this.rdsPagecount();
      },
      dsPage: function dsPage() {
        return this.rdsPage();
      },
      disabledPrevious: function disabledPrevious() {
        return this.dsPage === 1;
      },
      disabledNext: function disabledNext() {
        return this.dsPage === this.dsPagecount || this.dsPagecount === 0;
      }
    }
  };
  var __cssModules$2 = {};
  var __component__$2 = /* @__PURE__ */ normalizeComponent(__vue2_script$2, render$2, staticRenderFns$2, false, __vue2_injectStyles$2, null, null, null);
  function __vue2_injectStyles$2(context) {
    for (var o in __cssModules$2) {
      this[o] = __cssModules$2[o];
    }
  }
  var DatasetPager = /* @__PURE__ */ function() {
    return __component__$2.exports;
  }();
  var render$1 = function __render__() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("input", {
      staticClass: "form-control",
      attrs: {
        "type": "text",
        "placeholder": _vm.dsSearchPlaceholder
      },
      domProps: {
        "value": _vm.dsSearch
      },
      on: {
        "input": function input($event) {
          return _vm.input($event.target.value);
        }
      }
    });
  };
  var staticRenderFns$1 = [];
  var __vue2_script$1 = {
    inject: ["search"],
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
    data: function data2() {
      return {
        dsSearch: ""
      };
    },
    mounted: function mounted() {
      var _this3 = this;
      this.input = debounce(function(value) {
        _this3.search(value);
      }, this.wait);
    }
  };
  var __cssModules$1 = {};
  var __component__$1 = /* @__PURE__ */ normalizeComponent(__vue2_script$1, render$1, staticRenderFns$1, false, __vue2_injectStyles$1, null, null, null);
  function __vue2_injectStyles$1(context) {
    for (var o in __cssModules$1) {
      this[o] = __cssModules$1[o];
    }
  }
  var DatasetSearch = /* @__PURE__ */ function() {
    return __component__$1.exports;
  }();
  var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
  var classof = classof$3;
  var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString2() {
    return "[object " + classof(this) + "]";
  };
  var TO_STRING_TAG_SUPPORT = toStringTagSupport;
  var defineBuiltIn$2 = defineBuiltIn$5;
  var toString = objectToString;
  if (!TO_STRING_TAG_SUPPORT) {
    defineBuiltIn$2(Object.prototype, "toString", toString, {
      unsafe: true
    });
  }
  var domIterables = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0
  };
  var documentCreateElement = documentCreateElement$2;
  var classList = documentCreateElement("span").classList;
  var DOMTokenListPrototype$1 = classList && classList.constructor && classList.constructor.prototype;
  var domTokenListPrototype = DOMTokenListPrototype$1 === Object.prototype ? void 0 : DOMTokenListPrototype$1;
  var wellKnownSymbol$4 = wellKnownSymbol$9;
  var create$1 = objectCreate;
  var defineProperty$2 = objectDefineProperty.f;
  var UNSCOPABLES = wellKnownSymbol$4("unscopables");
  var ArrayPrototype = Array.prototype;
  if (ArrayPrototype[UNSCOPABLES] == void 0) {
    defineProperty$2(ArrayPrototype, UNSCOPABLES, {
      configurable: true,
      value: create$1(null)
    });
  }
  var addToUnscopables$1 = function addToUnscopables$12(key) {
    ArrayPrototype[UNSCOPABLES][key] = true;
  };
  var iterators = {};
  var fails$1 = fails$e;
  var correctPrototypeGetter = !fails$1(function() {
    function F() {
    }
    F.prototype.constructor = null;
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });
  var hasOwn$1 = hasOwnProperty_1;
  var isCallable$3 = isCallable$g;
  var toObject = toObject$2;
  var sharedKey = sharedKey$3;
  var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;
  var IE_PROTO = sharedKey("IE_PROTO");
  var $Object = Object;
  var ObjectPrototype = $Object.prototype;
  var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function(O) {
    var object = toObject(O);
    if (hasOwn$1(object, IE_PROTO))
      return object[IE_PROTO];
    var constructor = object.constructor;
    if (isCallable$3(constructor) && object instanceof constructor) {
      return constructor.prototype;
    }
    return object instanceof $Object ? ObjectPrototype : null;
  };
  var fails = fails$e;
  var isCallable$2 = isCallable$g;
  var getPrototypeOf$1 = objectGetPrototypeOf;
  var defineBuiltIn$1 = defineBuiltIn$5;
  var wellKnownSymbol$3 = wellKnownSymbol$9;
  var ITERATOR$2 = wellKnownSymbol$3("iterator");
  var BUGGY_SAFARI_ITERATORS$1 = false;
  var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;
  if ([].keys) {
    arrayIterator = [].keys();
    if (!("next" in arrayIterator))
      BUGGY_SAFARI_ITERATORS$1 = true;
    else {
      PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype)
        IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
    }
  }
  var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == void 0 || fails(function() {
    var test2 = {};
    return IteratorPrototype$2[ITERATOR$2].call(test2) !== test2;
  });
  if (NEW_ITERATOR_PROTOTYPE)
    IteratorPrototype$2 = {};
  if (!isCallable$2(IteratorPrototype$2[ITERATOR$2])) {
    defineBuiltIn$1(IteratorPrototype$2, ITERATOR$2, function() {
      return this;
    });
  }
  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype$2,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
  };
  var defineProperty$1 = objectDefineProperty.f;
  var hasOwn = hasOwnProperty_1;
  var wellKnownSymbol$2 = wellKnownSymbol$9;
  var TO_STRING_TAG$1 = wellKnownSymbol$2("toStringTag");
  var setToStringTag$2 = function setToStringTag$22(target, TAG, STATIC) {
    if (target && !STATIC)
      target = target.prototype;
    if (target && !hasOwn(target, TO_STRING_TAG$1)) {
      defineProperty$1(target, TO_STRING_TAG$1, {
        configurable: true,
        value: TAG
      });
    }
  };
  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
  var create = objectCreate;
  var createPropertyDescriptor = createPropertyDescriptor$3;
  var setToStringTag$1 = setToStringTag$2;
  var Iterators$2 = iterators;
  var returnThis$1 = function returnThis$12() {
    return this;
  };
  var createIteratorConstructor$1 = function createIteratorConstructor$12(IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
    var TO_STRING_TAG2 = NAME + " Iterator";
    IteratorConstructor.prototype = create(IteratorPrototype$1, {
      next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next)
    });
    setToStringTag$1(IteratorConstructor, TO_STRING_TAG2, false);
    Iterators$2[TO_STRING_TAG2] = returnThis$1;
    return IteratorConstructor;
  };
  var isCallable$1 = isCallable$g;
  var $String = String;
  var $TypeError = TypeError;
  var aPossiblePrototype$1 = function aPossiblePrototype$12(argument) {
    if (_typeof(argument) == "object" || isCallable$1(argument))
      return argument;
    throw $TypeError("Can't set " + $String(argument) + " as a prototype");
  };
  var uncurryThis = functionUncurryThis;
  var anObject = anObject$8;
  var aPossiblePrototype = aPossiblePrototype$1;
  var objectSetPrototypeOf = Object.setPrototypeOf || ("__proto__" in {} ? function() {
    var CORRECT_SETTER = false;
    var test2 = {};
    var setter;
    try {
      setter = uncurryThis(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set);
      setter(test2, []);
      CORRECT_SETTER = test2 instanceof Array;
    } catch (error) {
    }
    return function setPrototypeOf2(O, proto) {
      anObject(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER)
        setter(O, proto);
      else
        O.__proto__ = proto;
      return O;
    };
  }() : void 0);
  var $ = _export;
  var call = functionCall;
  var FunctionName = functionName;
  var isCallable = isCallable$g;
  var createIteratorConstructor = createIteratorConstructor$1;
  var getPrototypeOf = objectGetPrototypeOf;
  var setPrototypeOf = objectSetPrototypeOf;
  var setToStringTag = setToStringTag$2;
  var createNonEnumerableProperty$1 = createNonEnumerableProperty$5;
  var defineBuiltIn = defineBuiltIn$5;
  var wellKnownSymbol$1 = wellKnownSymbol$9;
  var Iterators$1 = iterators;
  var IteratorsCore = iteratorsCore;
  var PROPER_FUNCTION_NAME = FunctionName.PROPER;
  var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
  var IteratorPrototype = IteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$1 = wellKnownSymbol$1("iterator");
  var KEYS = "keys";
  var VALUES = "values";
  var ENTRIES = "entries";
  var returnThis = function returnThis2() {
    return this;
  };
  var defineIterator$1 = function defineIterator$12(Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor(IteratorConstructor, NAME, next);
    var getIterationMethod = function getIterationMethod2(KIND) {
      if (KIND === DEFAULT && defaultIterator)
        return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype)
        return IterablePrototype[KIND];
      switch (KIND) {
        case KEYS:
          return function keys2() {
            return new IteratorConstructor(this, KIND);
          };
        case VALUES:
          return function values2() {
            return new IteratorConstructor(this, KIND);
          };
        case ENTRIES:
          return function entries() {
            return new IteratorConstructor(this, KIND);
          };
      }
      return function() {
        return new IteratorConstructor(this);
      };
    };
    var TO_STRING_TAG2 = NAME + " Iterator";
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR$1] || IterablePrototype["@@iterator"] || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME == "Array" ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;
    if (anyNativeIterator) {
      CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
      if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
        if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
          if (setPrototypeOf) {
            setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
          } else if (!isCallable(CurrentIteratorPrototype[ITERATOR$1])) {
            defineBuiltIn(CurrentIteratorPrototype, ITERATOR$1, returnThis);
          }
        }
        setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG2, true);
      }
    }
    if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      if (CONFIGURABLE_FUNCTION_NAME) {
        createNonEnumerableProperty$1(IterablePrototype, "name", VALUES);
      } else {
        INCORRECT_VALUES_NAME = true;
        defaultIterator = function values2() {
          return call(nativeIterator, this);
        };
      }
    }
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED)
        for (KEY in methods) {
          if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
            defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
          }
        }
      else
        $({
          target: NAME,
          proto: true,
          forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME
        }, methods);
    }
    if (IterablePrototype[ITERATOR$1] !== defaultIterator) {
      defineBuiltIn(IterablePrototype, ITERATOR$1, defaultIterator, {
        name: DEFAULT
      });
    }
    Iterators$1[NAME] = defaultIterator;
    return methods;
  };
  var toIndexedObject = toIndexedObject$5;
  var addToUnscopables = addToUnscopables$1;
  var Iterators = iterators;
  var InternalStateModule = internalState;
  var defineProperty = objectDefineProperty.f;
  var defineIterator = defineIterator$1;
  var DESCRIPTORS = descriptors;
  var ARRAY_ITERATOR = "Array Iterator";
  var setInternalState = InternalStateModule.set;
  var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);
  var es_array_iterator = defineIterator(Array, "Array", function(iterated, kind) {
    setInternalState(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject(iterated),
      index: 0,
      kind
    });
  }, function() {
    var state = getInternalState(this);
    var target = state.target;
    var kind = state.kind;
    var index = state.index++;
    if (!target || index >= target.length) {
      state.target = void 0;
      return {
        value: void 0,
        done: true
      };
    }
    if (kind == "keys")
      return {
        value: index,
        done: false
      };
    if (kind == "values")
      return {
        value: target[index],
        done: false
      };
    return {
      value: [index, target[index]],
      done: false
    };
  }, "values");
  var values = Iterators.Arguments = Iterators.Array;
  addToUnscopables("keys");
  addToUnscopables("values");
  addToUnscopables("entries");
  if (DESCRIPTORS && values.name !== "values")
    try {
      defineProperty(values, "name", {
        value: "values"
      });
    } catch (error) {
    }
  var global$1 = global$e;
  var DOMIterables = domIterables;
  var DOMTokenListPrototype = domTokenListPrototype;
  var ArrayIteratorMethods = es_array_iterator;
  var createNonEnumerableProperty = createNonEnumerableProperty$5;
  var wellKnownSymbol = wellKnownSymbol$9;
  var ITERATOR = wellKnownSymbol("iterator");
  var TO_STRING_TAG = wellKnownSymbol("toStringTag");
  var ArrayValues = ArrayIteratorMethods.values;
  var handlePrototype = function handlePrototype2(CollectionPrototype, COLLECTION_NAME2) {
    if (CollectionPrototype) {
      if (CollectionPrototype[ITERATOR] !== ArrayValues)
        try {
          createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
        } catch (error) {
          CollectionPrototype[ITERATOR] = ArrayValues;
        }
      if (!CollectionPrototype[TO_STRING_TAG]) {
        createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME2);
      }
      if (DOMIterables[COLLECTION_NAME2])
        for (var METHOD_NAME in ArrayIteratorMethods) {
          if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME])
            try {
              createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
            } catch (error) {
              CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
            }
        }
    }
  };
  for (var COLLECTION_NAME in DOMIterables) {
    handlePrototype(global$1[COLLECTION_NAME] && global$1[COLLECTION_NAME].prototype, COLLECTION_NAME);
  }
  handlePrototype(DOMTokenListPrototype, "DOMTokenList");
  var render = function __render__() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", {
      staticClass: "form-inline"
    }, [_c("label", [_vm._v(_vm._s(_vm.datasetI18n.show))]), _c("select", {
      staticClass: "form-control mr-1 ml-1",
      domProps: {
        "value": _vm.dsShowEntries
      },
      on: {
        "change": _vm.change
      }
    }, _vm._l(_vm.dsShowEntriesLovs, function(option) {
      return _c("option", {
        key: option.value,
        domProps: {
          "value": option.value
        }
      }, [_vm._v(" " + _vm._s(option.text) + " ")]);
    }), 0), _c("label", [_vm._v(_vm._s(_vm.datasetI18n.entries))])]);
  };
  var staticRenderFns = [];
  var __vue2_script = {
    inject: ["datasetI18n", "showEntries"],
    props: {
      dsShowEntries: {
        type: Number,
        default: 10
      },
      dsShowEntriesLovs: {
        type: Array,
        default: function _default() {
          return [{
            value: 5,
            text: 5
          }, {
            value: 10,
            text: 10
          }, {
            value: 25,
            text: 25
          }, {
            value: 50,
            text: 50
          }, {
            value: 100,
            text: 100
          }];
        }
      }
    },
    created: function created() {
      this.showEntries(Number(this.dsShowEntries));
    },
    methods: {
      change: function change(e) {
        this.$emit("changed", Number(e.target.value));
        this.showEntries(Number(e.target.value));
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
  var DatasetShow = /* @__PURE__ */ function() {
    return __component__.exports;
  }();
  exports2.Dataset = Dataset;
  exports2.DatasetInfo = DatasetInfo;
  exports2.DatasetItem = DatasetItem;
  exports2.DatasetPager = DatasetPager;
  exports2.DatasetSearch = DatasetSearch;
  exports2.DatasetShow = DatasetShow;
  Object.defineProperties(exports2, _defineProperty({
    __esModule: {
      value: true
    }
  }, Symbol.toStringTag, {
    value: "Module"
  }));
});
//# sourceMappingURL=VueDataset.js.map
