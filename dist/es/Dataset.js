function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
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
var global$d = check((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) == "object" && globalThis) || check((typeof window === "undefined" ? "undefined" : _typeof(window)) == "object" && window) || check((typeof self === "undefined" ? "undefined" : _typeof(self)) == "object" && self) || check(_typeof(commonjsGlobal) == "object" && commonjsGlobal) || function() {
  return this;
}() || Function("return this")();
var objectGetOwnPropertyDescriptor = {};
var fails$c = function fails$c2(exec2) {
  try {
    return !!exec2();
  } catch (error) {
    return true;
  }
};
var fails$b = fails$c;
var descriptors = !fails$b(function() {
  return Object.defineProperty({}, 1, {
    get: function get2() {
      return 7;
    }
  })[1] != 7;
});
var fails$a = fails$c;
var functionBindNative = !fails$a(function() {
  var test2 = function() {
  }.bind();
  return typeof test2 != "function" || test2.hasOwnProperty("prototype");
});
var NATIVE_BIND$1 = functionBindNative;
var call$7 = Function.prototype.call;
var functionCall = NATIVE_BIND$1 ? call$7.bind(call$7) : function() {
  return call$7.apply(call$7, arguments);
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
var createPropertyDescriptor$2 = function createPropertyDescriptor$22(bitmap, value) {
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
var call$6 = FunctionPrototype$1.call;
var uncurryThis$b = NATIVE_BIND && bind.bind(call$6, call$6);
var functionUncurryThis = NATIVE_BIND ? function(fn) {
  return fn && uncurryThis$b(fn);
} : function(fn) {
  return fn && function() {
    return call$6.apply(fn, arguments);
  };
};
var uncurryThis$a = functionUncurryThis;
var toString$4 = uncurryThis$a({}.toString);
var stringSlice$1 = uncurryThis$a("".slice);
var classofRaw$1 = function classofRaw$12(it) {
  return stringSlice$1(toString$4(it), 8, -1);
};
var uncurryThis$9 = functionUncurryThis;
var fails$9 = fails$c;
var classof$3 = classofRaw$1;
var $Object$3 = Object;
var split = uncurryThis$9("".split);
var indexedObject = fails$9(function() {
  return !$Object$3("z").propertyIsEnumerable(0);
}) ? function(it) {
  return classof$3(it) == "String" ? split(it, "") : $Object$3(it);
} : $Object$3;
var $TypeError$6 = TypeError;
var requireObjectCoercible$3 = function requireObjectCoercible$32(it) {
  if (it == void 0)
    throw $TypeError$6("Can't call method on " + it);
  return it;
};
var IndexedObject = indexedObject;
var requireObjectCoercible$2 = requireObjectCoercible$3;
var toIndexedObject$4 = function toIndexedObject$42(it) {
  return IndexedObject(requireObjectCoercible$2(it));
};
var isCallable$c = function isCallable$c2(argument) {
  return typeof argument == "function";
};
var isCallable$b = isCallable$c;
var isObject$5 = function isObject$52(it) {
  return _typeof(it) == "object" ? it !== null : isCallable$b(it);
};
var global$c = global$d;
var isCallable$a = isCallable$c;
var aFunction = function aFunction2(argument) {
  return isCallable$a(argument) ? argument : void 0;
};
var getBuiltIn$4 = function getBuiltIn$42(namespace, method) {
  return arguments.length < 2 ? aFunction(global$c[namespace]) : global$c[namespace] && global$c[namespace][method];
};
var uncurryThis$8 = functionUncurryThis;
var objectIsPrototypeOf = uncurryThis$8({}.isPrototypeOf);
var getBuiltIn$3 = getBuiltIn$4;
var engineUserAgent = getBuiltIn$3("navigator", "userAgent") || "";
var global$b = global$d;
var userAgent = engineUserAgent;
var process = global$b.process;
var Deno = global$b.Deno;
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
var fails$8 = fails$c;
var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$8(function() {
  var symbol = Symbol();
  return !String(symbol) || !(Object(symbol) instanceof Symbol) || !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});
var NATIVE_SYMBOL$1 = nativeSymbol;
var useSymbolAsUid = NATIVE_SYMBOL$1 && !Symbol.sham && _typeof(Symbol.iterator) == "symbol";
var getBuiltIn$2 = getBuiltIn$4;
var isCallable$9 = isCallable$c;
var isPrototypeOf = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;
var $Object$2 = Object;
var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function(it) {
  return _typeof(it) == "symbol";
} : function(it) {
  var $Symbol = getBuiltIn$2("Symbol");
  return isCallable$9($Symbol) && isPrototypeOf($Symbol.prototype, $Object$2(it));
};
var $String$2 = String;
var tryToString$1 = function tryToString$12(argument) {
  try {
    return $String$2(argument);
  } catch (error) {
    return "Object";
  }
};
var isCallable$8 = isCallable$c;
var tryToString = tryToString$1;
var $TypeError$5 = TypeError;
var aCallable$1 = function aCallable$12(argument) {
  if (isCallable$8(argument))
    return argument;
  throw $TypeError$5(tryToString(argument) + " is not a function");
};
var aCallable = aCallable$1;
var getMethod$2 = function getMethod$22(V, P) {
  var func = V[P];
  return func == null ? void 0 : aCallable(func);
};
var call$5 = functionCall;
var isCallable$7 = isCallable$c;
var isObject$4 = isObject$5;
var $TypeError$4 = TypeError;
var ordinaryToPrimitive$1 = function ordinaryToPrimitive$12(input, pref) {
  var fn, val;
  if (pref === "string" && isCallable$7(fn = input.toString) && !isObject$4(val = call$5(fn, input)))
    return val;
  if (isCallable$7(fn = input.valueOf) && !isObject$4(val = call$5(fn, input)))
    return val;
  if (pref !== "string" && isCallable$7(fn = input.toString) && !isObject$4(val = call$5(fn, input)))
    return val;
  throw $TypeError$4("Can't convert object to primitive value");
};
var shared$4 = {
  exports: {}
};
var global$a = global$d;
var defineProperty$1 = Object.defineProperty;
var defineGlobalProperty$3 = function defineGlobalProperty$32(key, value) {
  try {
    defineProperty$1(global$a, key, {
      value,
      configurable: true,
      writable: true
    });
  } catch (error) {
    global$a[key] = value;
  }
  return value;
};
var global$9 = global$d;
var defineGlobalProperty$2 = defineGlobalProperty$3;
var SHARED = "__core-js_shared__";
var store$3 = global$9[SHARED] || defineGlobalProperty$2(SHARED, {});
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
var $Object$1 = Object;
var toObject$1 = function toObject$12(argument) {
  return $Object$1(requireObjectCoercible$1(argument));
};
var uncurryThis$7 = functionUncurryThis;
var toObject = toObject$1;
var hasOwnProperty = uncurryThis$7({}.hasOwnProperty);
var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};
var uncurryThis$6 = functionUncurryThis;
var id = 0;
var postfix = Math.random();
var toString$3 = uncurryThis$6(1 .toString);
var uid$2 = function uid$22(key) {
  return "Symbol(" + (key === void 0 ? "" : key) + ")_" + toString$3(++id + postfix, 36);
};
var global$8 = global$d;
var shared$3 = shared$4.exports;
var hasOwn$6 = hasOwnProperty_1;
var uid$1 = uid$2;
var NATIVE_SYMBOL = nativeSymbol;
var USE_SYMBOL_AS_UID = useSymbolAsUid;
var WellKnownSymbolsStore = shared$3("wks");
var Symbol$1 = global$8.Symbol;
var symbolFor = Symbol$1 && Symbol$1["for"];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;
var wellKnownSymbol$4 = function wellKnownSymbol$42(name) {
  if (!hasOwn$6(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == "string")) {
    var description = "Symbol." + name;
    if (NATIVE_SYMBOL && hasOwn$6(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  }
  return WellKnownSymbolsStore[name];
};
var call$4 = functionCall;
var isObject$3 = isObject$5;
var isSymbol$1 = isSymbol$2;
var getMethod$1 = getMethod$2;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$3 = wellKnownSymbol$4;
var $TypeError$3 = TypeError;
var TO_PRIMITIVE = wellKnownSymbol$3("toPrimitive");
var toPrimitive$1 = function toPrimitive$12(input, pref) {
  if (!isObject$3(input) || isSymbol$1(input))
    return input;
  var exoticToPrim = getMethod$1(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === void 0)
      pref = "default";
    result = call$4(exoticToPrim, input, pref);
    if (!isObject$3(result) || isSymbol$1(result))
      return result;
    throw $TypeError$3("Can't convert object to primitive value");
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
var global$7 = global$d;
var isObject$2 = isObject$5;
var document$1 = global$7.document;
var EXISTS$1 = isObject$2(document$1) && isObject$2(document$1.createElement);
var documentCreateElement$1 = function documentCreateElement$12(it) {
  return EXISTS$1 ? document$1.createElement(it) : {};
};
var DESCRIPTORS$7 = descriptors;
var fails$7 = fails$c;
var createElement = documentCreateElement$1;
var ie8DomDefine = !DESCRIPTORS$7 && !fails$7(function() {
  return Object.defineProperty(createElement("div"), "a", {
    get: function get2() {
      return 7;
    }
  }).a != 7;
});
var DESCRIPTORS$6 = descriptors;
var call$3 = functionCall;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var createPropertyDescriptor$1 = createPropertyDescriptor$2;
var toIndexedObject$3 = toIndexedObject$4;
var toPropertyKey$1 = toPropertyKey$2;
var hasOwn$5 = hasOwnProperty_1;
var IE8_DOM_DEFINE$1 = ie8DomDefine;
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$6 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$3(O);
  P = toPropertyKey$1(P);
  if (IE8_DOM_DEFINE$1)
    try {
      return $getOwnPropertyDescriptor$1(O, P);
    } catch (error) {
    }
  if (hasOwn$5(O, P))
    return createPropertyDescriptor$1(!call$3(propertyIsEnumerableModule.f, O, P), O[P]);
};
var objectDefineProperty = {};
var DESCRIPTORS$5 = descriptors;
var fails$6 = fails$c;
var v8PrototypeDefineBug = DESCRIPTORS$5 && fails$6(function() {
  return Object.defineProperty(function() {
  }, "prototype", {
    value: 42,
    writable: false
  }).prototype != 42;
});
var isObject$1 = isObject$5;
var $String$1 = String;
var $TypeError$2 = TypeError;
var anObject$7 = function anObject$72(argument) {
  if (isObject$1(argument))
    return argument;
  throw $TypeError$2($String$1(argument) + " is not an object");
};
var DESCRIPTORS$4 = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
var anObject$6 = anObject$7;
var toPropertyKey = toPropertyKey$2;
var $TypeError$1 = TypeError;
var $defineProperty = Object.defineProperty;
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = "enumerable";
var CONFIGURABLE$1 = "configurable";
var WRITABLE = "writable";
objectDefineProperty.f = DESCRIPTORS$4 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
  anObject$6(O);
  P = toPropertyKey(P);
  anObject$6(Attributes);
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
  anObject$6(O);
  P = toPropertyKey(P);
  anObject$6(Attributes);
  if (IE8_DOM_DEFINE)
    try {
      return $defineProperty(O, P, Attributes);
    } catch (error) {
    }
  if ("get" in Attributes || "set" in Attributes)
    throw $TypeError$1("Accessors not supported");
  if ("value" in Attributes)
    O[P] = Attributes.value;
  return O;
};
var DESCRIPTORS$3 = descriptors;
var definePropertyModule$3 = objectDefineProperty;
var createPropertyDescriptor = createPropertyDescriptor$2;
var createNonEnumerableProperty$3 = DESCRIPTORS$3 ? function(object, key, value) {
  return definePropertyModule$3.f(object, key, createPropertyDescriptor(1, value));
} : function(object, key, value) {
  object[key] = value;
  return object;
};
var makeBuiltIn$2 = {
  exports: {}
};
var DESCRIPTORS$2 = descriptors;
var hasOwn$4 = hasOwnProperty_1;
var FunctionPrototype = Function.prototype;
var getDescriptor = DESCRIPTORS$2 && Object.getOwnPropertyDescriptor;
var EXISTS = hasOwn$4(FunctionPrototype, "name");
var PROPER = EXISTS && function something() {
}.name === "something";
var CONFIGURABLE = EXISTS && (!DESCRIPTORS$2 || DESCRIPTORS$2 && getDescriptor(FunctionPrototype, "name").configurable);
var functionName = {
  EXISTS,
  PROPER,
  CONFIGURABLE
};
var uncurryThis$5 = functionUncurryThis;
var isCallable$6 = isCallable$c;
var store$1 = sharedStore;
var functionToString = uncurryThis$5(Function.toString);
if (!isCallable$6(store$1.inspectSource)) {
  store$1.inspectSource = function(it) {
    return functionToString(it);
  };
}
var inspectSource$2 = store$1.inspectSource;
var global$6 = global$d;
var isCallable$5 = isCallable$c;
var inspectSource$1 = inspectSource$2;
var WeakMap$1 = global$6.WeakMap;
var nativeWeakMap = isCallable$5(WeakMap$1) && /native code/.test(inspectSource$1(WeakMap$1));
var shared$2 = shared$4.exports;
var uid = uid$2;
var keys = shared$2("keys");
var sharedKey$2 = function sharedKey$22(key) {
  return keys[key] || (keys[key] = uid(key));
};
var hiddenKeys$4 = {};
var NATIVE_WEAK_MAP = nativeWeakMap;
var global$5 = global$d;
var uncurryThis$4 = functionUncurryThis;
var isObject = isObject$5;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$3;
var hasOwn$3 = hasOwnProperty_1;
var shared$1 = sharedStore;
var sharedKey$1 = sharedKey$2;
var hiddenKeys$3 = hiddenKeys$4;
var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
var TypeError$1 = global$5.TypeError;
var WeakMap = global$5.WeakMap;
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
  var wmget = uncurryThis$4(store.get);
  var wmhas = uncurryThis$4(store.has);
  var wmset = uncurryThis$4(store.set);
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
  var STATE = sharedKey$1("state");
  hiddenKeys$3[STATE] = true;
  set = function set2(it, metadata) {
    if (hasOwn$3(it, STATE))
      throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$2(it, STATE, metadata);
    return metadata;
  };
  get = function get2(it) {
    return hasOwn$3(it, STATE) ? it[STATE] : {};
  };
  has = function has2(it) {
    return hasOwn$3(it, STATE);
  };
}
var internalState = {
  set,
  get,
  has,
  enforce,
  getterFor
};
var fails$5 = fails$c;
var isCallable$4 = isCallable$c;
var hasOwn$2 = hasOwnProperty_1;
var DESCRIPTORS$1 = descriptors;
var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
var inspectSource = inspectSource$2;
var InternalStateModule = internalState;
var enforceInternalState = InternalStateModule.enforce;
var getInternalState$1 = InternalStateModule.get;
var defineProperty3 = Object.defineProperty;
var CONFIGURABLE_LENGTH = DESCRIPTORS$1 && !fails$5(function() {
  return defineProperty3(function() {
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
  if (!hasOwn$2(value, "name") || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
    if (DESCRIPTORS$1)
      defineProperty3(value, "name", {
        value: name,
        configurable: true
      });
    else
      value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn$2(options, "arity") && value.length !== options.arity) {
    defineProperty3(value, "length", {
      value: options.arity
    });
  }
  try {
    if (options && hasOwn$2(options, "constructor") && options.constructor) {
      if (DESCRIPTORS$1)
        defineProperty3(value, "prototype", {
          writable: false
        });
    } else if (value.prototype)
      value.prototype = void 0;
  } catch (error) {
  }
  var state = enforceInternalState(value);
  if (!hasOwn$2(state, "source")) {
    state.source = TEMPLATE.join(typeof name == "string" ? name : "");
  }
  return value;
};
Function.prototype.toString = makeBuiltIn$1(function toString() {
  return isCallable$4(this) && getInternalState$1(this).source || inspectSource(this);
}, "toString");
var isCallable$3 = isCallable$c;
var definePropertyModule$2 = objectDefineProperty;
var makeBuiltIn = makeBuiltIn$2.exports;
var defineGlobalProperty$1 = defineGlobalProperty$3;
var defineBuiltIn$2 = function defineBuiltIn$22(O, key, value, options) {
  if (!options)
    options = {};
  var simple = options.enumerable;
  var name = options.name !== void 0 ? options.name : key;
  if (isCallable$3(value))
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
var mathTrunc = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};
var trunc2 = mathTrunc;
var toIntegerOrInfinity$2 = function toIntegerOrInfinity$22(argument) {
  var number = +argument;
  return number !== number || number === 0 ? 0 : trunc2(number);
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
var toIndexedObject$2 = toIndexedObject$4;
var toAbsoluteIndex = toAbsoluteIndex$1;
var lengthOfArrayLike = lengthOfArrayLike$1;
var createMethod = function createMethod2(IS_INCLUDES) {
  return function($this, el, fromIndex) {
    var O = toIndexedObject$2($this);
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
var uncurryThis$3 = functionUncurryThis;
var hasOwn$1 = hasOwnProperty_1;
var toIndexedObject$1 = toIndexedObject$4;
var indexOf$1 = arrayIncludes.indexOf;
var hiddenKeys$2 = hiddenKeys$4;
var push = uncurryThis$3([].push);
var objectKeysInternal = function objectKeysInternal2(object, names) {
  var O = toIndexedObject$1(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) {
    !hasOwn$1(hiddenKeys$2, key) && hasOwn$1(O, key) && push(result, key);
  }
  while (names.length > i) {
    if (hasOwn$1(O, key = names[i++])) {
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
var uncurryThis$2 = functionUncurryThis;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var anObject$5 = anObject$7;
var concat = uncurryThis$2([].concat);
var ownKeys$1 = getBuiltIn$1("Reflect", "ownKeys") || function ownKeys(it) {
  var keys3 = getOwnPropertyNamesModule.f(anObject$5(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys3, getOwnPropertySymbols(it)) : keys3;
};
var hasOwn2 = hasOwnProperty_1;
var ownKeys2 = ownKeys$1;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var definePropertyModule$1 = objectDefineProperty;
var copyConstructorProperties$1 = function copyConstructorProperties$12(target, source, exceptions) {
  var keys3 = ownKeys2(source);
  var defineProperty4 = definePropertyModule$1.f;
  var getOwnPropertyDescriptor3 = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys3.length; i++) {
    var key = keys3[i];
    if (!hasOwn2(target, key) && !(exceptions && hasOwn2(exceptions, key))) {
      defineProperty4(target, key, getOwnPropertyDescriptor3(source, key));
    }
  }
};
var fails$4 = fails$c;
var isCallable$2 = isCallable$c;
var replacement = /#|\.prototype\./;
var isForced$1 = function isForced$12(feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : isCallable$2(detection) ? fails$4(detection) : !!detection;
};
var normalize = isForced$1.normalize = function(string) {
  return String(string).replace(replacement, ".").toLowerCase();
};
var data = isForced$1.data = {};
var NATIVE = isForced$1.NATIVE = "N";
var POLYFILL = isForced$1.POLYFILL = "P";
var isForced_1 = isForced$1;
var global$4 = global$d;
var getOwnPropertyDescriptor2 = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$3;
var defineBuiltIn$1 = defineBuiltIn$2;
var defineGlobalProperty = defineGlobalProperty$3;
var copyConstructorProperties = copyConstructorProperties$1;
var isForced = isForced_1;
var _export = function _export2(options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global$4;
  } else if (STATIC) {
    target = global$4[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global$4[TARGET] || {}).prototype;
  }
  if (target)
    for (key in source) {
      sourceProperty = source[key];
      if (options.dontCallGetSet) {
        descriptor = getOwnPropertyDescriptor2(target, key);
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
        createNonEnumerableProperty$1(sourceProperty, "sham", true);
      }
      defineBuiltIn$1(target, key, sourceProperty, options);
    }
};
var wellKnownSymbol$2 = wellKnownSymbol$4;
var TO_STRING_TAG$1 = wellKnownSymbol$2("toStringTag");
var test = {};
test[TO_STRING_TAG$1] = "z";
var toStringTagSupport = String(test) === "[object z]";
var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var isCallable$1 = isCallable$c;
var classofRaw = classofRaw$1;
var wellKnownSymbol$1 = wellKnownSymbol$4;
var TO_STRING_TAG = wellKnownSymbol$1("toStringTag");
var $Object = Object;
var CORRECT_ARGUMENTS = classofRaw(function() {
  return arguments;
}()) == "Arguments";
var tryGet = function tryGet2(it, key) {
  try {
    return it[key];
  } catch (error) {
  }
};
var classof$2 = TO_STRING_TAG_SUPPORT ? classofRaw : function(it) {
  var O, tag, result;
  return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == "string" ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) == "Object" && isCallable$1(O.callee) ? "Arguments" : result;
};
var classof$1 = classof$2;
var $String = String;
var toString$2 = function toString$22(argument) {
  if (classof$1(argument) === "Symbol")
    throw TypeError("Cannot convert a Symbol value to a string");
  return $String(argument);
};
var anObject$4 = anObject$7;
var regexpFlags$1 = function regexpFlags$12() {
  var that = anObject$4(this);
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
var fails$3 = fails$c;
var global$3 = global$d;
var $RegExp$2 = global$3.RegExp;
var UNSUPPORTED_Y$1 = fails$3(function() {
  var re = $RegExp$2("a", "y");
  re.lastIndex = 2;
  return re.exec("abcd") != null;
});
var MISSED_STICKY = UNSUPPORTED_Y$1 || fails$3(function() {
  return !$RegExp$2("a", "y").sticky;
});
var BROKEN_CARET = UNSUPPORTED_Y$1 || fails$3(function() {
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
var DESCRIPTORS = descriptors;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var definePropertyModule = objectDefineProperty;
var anObject$3 = anObject$7;
var toIndexedObject = toIndexedObject$4;
var objectKeys = objectKeys$1;
objectDefineProperties.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject$3(O);
  var props = toIndexedObject(Properties);
  var keys3 = objectKeys(Properties);
  var length = keys3.length;
  var index = 0;
  var key;
  while (length > index) {
    definePropertyModule.f(O, key = keys3[index++], props[key]);
  }
  return O;
};
var getBuiltIn = getBuiltIn$4;
var html$1 = getBuiltIn("document", "documentElement");
var anObject$2 = anObject$7;
var definePropertiesModule = objectDefineProperties;
var enumBugKeys = enumBugKeys$3;
var hiddenKeys = hiddenKeys$4;
var html = html$1;
var documentCreateElement = documentCreateElement$1;
var sharedKey = sharedKey$2;
var GT = ">";
var LT = "<";
var PROTOTYPE = "prototype";
var SCRIPT = "script";
var IE_PROTO = sharedKey("IE_PROTO");
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
  var iframe = documentCreateElement("iframe");
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
hiddenKeys[IE_PROTO] = true;
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject$2(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    result[IE_PROTO] = O;
  } else
    result = _NullProtoObject();
  return Properties === void 0 ? result : definePropertiesModule.f(result, Properties);
};
var fails$2 = fails$c;
var global$2 = global$d;
var $RegExp$1 = global$2.RegExp;
var regexpUnsupportedDotAll = fails$2(function() {
  var re = $RegExp$1(".", "s");
  return !(re.dotAll && re.exec("\n") && re.flags === "s");
});
var fails$1 = fails$c;
var global$1 = global$d;
var $RegExp = global$1.RegExp;
var regexpUnsupportedNcg = fails$1(function() {
  var re = $RegExp("(?<a>b)", "g");
  return re.exec("b").groups.a !== "b" || "b".replace(re, "$<a>c") !== "bc";
});
var call$2 = functionCall;
var uncurryThis$1 = functionUncurryThis;
var toString$1 = toString$2;
var regexpFlags = regexpFlags$1;
var stickyHelpers = regexpStickyHelpers;
var shared = shared$4.exports;
var create2 = objectCreate;
var getInternalState = internalState.get;
var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
var UNSUPPORTED_NCG = regexpUnsupportedNcg;
var nativeReplace = shared("native-string-replace", String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt = uncurryThis$1("".charAt);
var indexOf = uncurryThis$1("".indexOf);
var replace = uncurryThis$1("".replace);
var stringSlice = uncurryThis$1("".slice);
var UPDATES_LAST_INDEX_WRONG = function() {
  var re1 = /a/;
  var re2 = /b*/g;
  call$2(nativeExec, re1, "a");
  call$2(nativeExec, re2, "a");
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
}();
var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;
var NPCG_INCLUDED = /()??/.exec("")[1] !== void 0;
var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;
if (PATCH) {
  patchedExec = function exec2(string) {
    var re = this;
    var state = getInternalState(re);
    var str = toString$1(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match2, i, object, group;
    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call$2(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }
    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = call$2(regexpFlags, re);
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
    match2 = call$2(nativeExec, sticky ? reCopy : re, strCopy);
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
      call$2(nativeReplace, match2[0], reCopy, function() {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === void 0)
            match2[i] = void 0;
        }
      });
    }
    if (match2 && groups) {
      match2.groups = object = create2(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match2[group[1]];
      }
    }
    return match2;
  };
}
var regexpExec$2 = patchedExec;
var $ = _export;
var exec = regexpExec$2;
$({
  target: "RegExp",
  proto: true,
  forced: /./.exec !== exec
}, {
  exec
});
var uncurryThis = functionUncurryThis;
var defineBuiltIn = defineBuiltIn$2;
var regexpExec$1 = regexpExec$2;
var fails = fails$c;
var wellKnownSymbol = wellKnownSymbol$4;
var createNonEnumerableProperty = createNonEnumerableProperty$3;
var SPECIES = wellKnownSymbol("species");
var RegExpPrototype = RegExp.prototype;
var fixRegexpWellKnownSymbolLogic = function fixRegexpWellKnownSymbolLogic2(KEY, exec2, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol(KEY);
  var DELEGATES_TO_SYMBOL = !fails(function() {
    var O = {};
    O[SYMBOL] = function() {
      return 7;
    };
    return ""[KEY](O) != 7;
  });
  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function() {
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
    var uncurriedNativeRegExpMethod = uncurryThis(/./[SYMBOL]);
    var methods = exec2(SYMBOL, ""[KEY], function(nativeMethod, regexp, str, arg2, forceStringMethod) {
      var uncurriedNativeMethod = uncurryThis(nativeMethod);
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
    defineBuiltIn(String.prototype, KEY, methods[0]);
    defineBuiltIn(RegExpPrototype, SYMBOL, methods[1]);
  }
  if (SHAM)
    createNonEnumerableProperty(RegExpPrototype[SYMBOL], "sham", true);
};
var sameValue$1 = Object.is || function is(x, y) {
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};
var call$1 = functionCall;
var anObject$1 = anObject$7;
var isCallable = isCallable$c;
var classof = classofRaw$1;
var regexpExec = regexpExec$2;
var $TypeError = TypeError;
var regexpExecAbstract = function regexpExecAbstract2(R, S) {
  var exec2 = R.exec;
  if (isCallable(exec2)) {
    var result = call$1(exec2, R, S);
    if (result !== null)
      anObject$1(result);
    return result;
  }
  if (classof(R) === "RegExp")
    return call$1(regexpExec, R, S);
  throw $TypeError("RegExp#exec called on incompatible receiver");
};
var call = functionCall;
var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
var anObject = anObject$7;
var requireObjectCoercible = requireObjectCoercible$3;
var sameValue = sameValue$1;
var toString2 = toString$2;
var getMethod = getMethod$2;
var regExpExec = regexpExecAbstract;
fixRegExpWellKnownSymbolLogic("search", function(SEARCH, nativeSearch, maybeCallNative) {
  return [
    function search2(regexp) {
      var O = requireObjectCoercible(this);
      var searcher = regexp == void 0 ? void 0 : getMethod(regexp, SEARCH);
      return searcher ? call(searcher, regexp, O) : new RegExp(regexp)[SEARCH](toString2(O));
    },
    function(string) {
      var rx = anObject(this);
      var S = toString2(string);
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
var render = function __render__() {
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
var staticRenderFns = [];
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
var __vue2_script = {
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
      default: function _default2() {
        return {};
      }
    },
    dsSortby: {
      type: Array,
      default: function _default3() {
        return [];
      }
    },
    dsSearchIn: {
      type: Array,
      default: function _default4() {
        return [];
      }
    },
    dsSearchAs: {
      type: Object,
      default: function _default5() {
        return {};
      }
    },
    dsSortAs: {
      type: Object,
      default: function _default6() {
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
      handler: function handler2(newVal, oldVal) {
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
var __cssModules = {};
var __component__ = /* @__PURE__ */ normalizeComponent(__vue2_script, render, staticRenderFns, false, __vue2_injectStyles, null, null, null);
function __vue2_injectStyles(context) {
  for (var o in __cssModules) {
    this[o] = __cssModules[o];
  }
}
var Dataset = /* @__PURE__ */ function() {
  return __component__.exports;
}();
export {
  Dataset as default
};
//# sourceMappingURL=Dataset.js.map
