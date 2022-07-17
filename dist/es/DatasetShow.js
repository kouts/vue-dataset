function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var check = function check2(it) {
  return it && it.Math == Math && it;
};
var global$b = check((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) == "object" && globalThis) || check((typeof window === "undefined" ? "undefined" : _typeof(window)) == "object" && window) || check((typeof self === "undefined" ? "undefined" : _typeof(self)) == "object" && self) || check(_typeof(commonjsGlobal) == "object" && commonjsGlobal) || function() {
  return this;
}() || Function("return this")();
var shared$3 = {
  exports: {}
};
var global$a = global$b;
var defineProperty$4 = Object.defineProperty;
var defineGlobalProperty$3 = function defineGlobalProperty$32(key, value) {
  try {
    defineProperty$4(global$a, key, {
      value,
      configurable: true,
      writable: true
    });
  } catch (error) {
    global$a[key] = value;
  }
  return value;
};
var global$9 = global$b;
var defineGlobalProperty$2 = defineGlobalProperty$3;
var SHARED = "__core-js_shared__";
var store$3 = global$9[SHARED] || defineGlobalProperty$2(SHARED, {});
var sharedStore = store$3;
var store$2 = sharedStore;
(shared$3.exports = function(key, value) {
  return store$2[key] || (store$2[key] = value !== void 0 ? value : {});
})("versions", []).push({
  version: "3.23.5",
  mode: "global",
  copyright: "\xA9 2014-2022 Denis Pushkarev (zloirock.ru)",
  license: "https://github.com/zloirock/core-js/blob/v3.23.5/LICENSE",
  source: "https://github.com/zloirock/core-js"
});
var fails$a = function fails$a2(exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};
var fails$9 = fails$a;
var functionBindNative = !fails$9(function() {
  var test2 = function() {
  }.bind();
  return typeof test2 != "function" || test2.hasOwnProperty("prototype");
});
var NATIVE_BIND$1 = functionBindNative;
var FunctionPrototype$1 = Function.prototype;
var bind = FunctionPrototype$1.bind;
var call$5 = FunctionPrototype$1.call;
var uncurryThis$a = NATIVE_BIND$1 && bind.bind(call$5, call$5);
var functionUncurryThis = NATIVE_BIND$1 ? function(fn) {
  return fn && uncurryThis$a(fn);
} : function(fn) {
  return fn && function() {
    return call$5.apply(fn, arguments);
  };
};
var $TypeError$6 = TypeError;
var requireObjectCoercible$2 = function requireObjectCoercible$22(it) {
  if (it == void 0)
    throw $TypeError$6("Can't call method on " + it);
  return it;
};
var requireObjectCoercible$1 = requireObjectCoercible$2;
var $Object$4 = Object;
var toObject$2 = function toObject$22(argument) {
  return $Object$4(requireObjectCoercible$1(argument));
};
var uncurryThis$9 = functionUncurryThis;
var toObject$1 = toObject$2;
var hasOwnProperty = uncurryThis$9({}.hasOwnProperty);
var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject$1(it), key);
};
var uncurryThis$8 = functionUncurryThis;
var id = 0;
var postfix = Math.random();
var toString$2 = uncurryThis$8(1 .toString);
var uid$2 = function uid$22(key) {
  return "Symbol(" + (key === void 0 ? "" : key) + ")_" + toString$2(++id + postfix, 36);
};
var isCallable$f = function isCallable$f2(argument) {
  return typeof argument == "function";
};
var global$8 = global$b;
var isCallable$e = isCallable$f;
var aFunction = function aFunction2(argument) {
  return isCallable$e(argument) ? argument : void 0;
};
var getBuiltIn$4 = function getBuiltIn$42(namespace, method) {
  return arguments.length < 2 ? aFunction(global$8[namespace]) : global$8[namespace] && global$8[namespace][method];
};
var getBuiltIn$3 = getBuiltIn$4;
var engineUserAgent = getBuiltIn$3("navigator", "userAgent") || "";
var global$7 = global$b;
var userAgent = engineUserAgent;
var process = global$7.process;
var Deno = global$7.Deno;
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
var fails$8 = fails$a;
var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$8(function() {
  var symbol = Symbol();
  return !String(symbol) || !(Object(symbol) instanceof Symbol) || !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});
var NATIVE_SYMBOL$1 = nativeSymbol;
var useSymbolAsUid = NATIVE_SYMBOL$1 && !Symbol.sham && _typeof(Symbol.iterator) == "symbol";
var global$6 = global$b;
var shared$2 = shared$3.exports;
var hasOwn$8 = hasOwnProperty_1;
var uid$1 = uid$2;
var NATIVE_SYMBOL = nativeSymbol;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;
var WellKnownSymbolsStore = shared$2("wks");
var Symbol$1 = global$6.Symbol;
var symbolFor = Symbol$1 && Symbol$1["for"];
var createWellKnownSymbol = USE_SYMBOL_AS_UID$1 ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;
var wellKnownSymbol$8 = function wellKnownSymbol$82(name) {
  if (!hasOwn$8(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == "string")) {
    var description = "Symbol." + name;
    if (NATIVE_SYMBOL && hasOwn$8(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name];
    } else if (USE_SYMBOL_AS_UID$1 && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  }
  return WellKnownSymbolsStore[name];
};
var wellKnownSymbol$7 = wellKnownSymbol$8;
var TO_STRING_TAG$3 = wellKnownSymbol$7("toStringTag");
var test = {};
test[TO_STRING_TAG$3] = "z";
var toStringTagSupport = String(test) === "[object z]";
var objectDefineProperty = {};
var fails$7 = fails$a;
var descriptors = !fails$7(function() {
  return Object.defineProperty({}, 1, {
    get: function get2() {
      return 7;
    }
  })[1] != 7;
});
var isCallable$d = isCallable$f;
var isObject$5 = function isObject$52(it) {
  return _typeof(it) == "object" ? it !== null : isCallable$d(it);
};
var global$5 = global$b;
var isObject$4 = isObject$5;
var document$1 = global$5.document;
var EXISTS$1 = isObject$4(document$1) && isObject$4(document$1.createElement);
var documentCreateElement$2 = function documentCreateElement$22(it) {
  return EXISTS$1 ? document$1.createElement(it) : {};
};
var DESCRIPTORS$8 = descriptors;
var fails$6 = fails$a;
var createElement = documentCreateElement$2;
var ie8DomDefine = !DESCRIPTORS$8 && !fails$6(function() {
  return Object.defineProperty(createElement("div"), "a", {
    get: function get2() {
      return 7;
    }
  }).a != 7;
});
var DESCRIPTORS$7 = descriptors;
var fails$5 = fails$a;
var v8PrototypeDefineBug = DESCRIPTORS$7 && fails$5(function() {
  return Object.defineProperty(function() {
  }, "prototype", {
    value: 42,
    writable: false
  }).prototype != 42;
});
var isObject$3 = isObject$5;
var $String$2 = String;
var $TypeError$5 = TypeError;
var anObject$5 = function anObject$52(argument) {
  if (isObject$3(argument))
    return argument;
  throw $TypeError$5($String$2(argument) + " is not an object");
};
var NATIVE_BIND = functionBindNative;
var call$4 = Function.prototype.call;
var functionCall = NATIVE_BIND ? call$4.bind(call$4) : function() {
  return call$4.apply(call$4, arguments);
};
var uncurryThis$7 = functionUncurryThis;
var objectIsPrototypeOf = uncurryThis$7({}.isPrototypeOf);
var getBuiltIn$2 = getBuiltIn$4;
var isCallable$c = isCallable$f;
var isPrototypeOf = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID = useSymbolAsUid;
var $Object$3 = Object;
var isSymbol$2 = USE_SYMBOL_AS_UID ? function(it) {
  return _typeof(it) == "symbol";
} : function(it) {
  var $Symbol = getBuiltIn$2("Symbol");
  return isCallable$c($Symbol) && isPrototypeOf($Symbol.prototype, $Object$3(it));
};
var $String$1 = String;
var tryToString$1 = function tryToString$12(argument) {
  try {
    return $String$1(argument);
  } catch (error) {
    return "Object";
  }
};
var isCallable$b = isCallable$f;
var tryToString = tryToString$1;
var $TypeError$4 = TypeError;
var aCallable$1 = function aCallable$12(argument) {
  if (isCallable$b(argument))
    return argument;
  throw $TypeError$4(tryToString(argument) + " is not a function");
};
var aCallable = aCallable$1;
var getMethod$1 = function getMethod$12(V, P) {
  var func = V[P];
  return func == null ? void 0 : aCallable(func);
};
var call$3 = functionCall;
var isCallable$a = isCallable$f;
var isObject$2 = isObject$5;
var $TypeError$3 = TypeError;
var ordinaryToPrimitive$1 = function ordinaryToPrimitive$12(input, pref) {
  var fn, val;
  if (pref === "string" && isCallable$a(fn = input.toString) && !isObject$2(val = call$3(fn, input)))
    return val;
  if (isCallable$a(fn = input.valueOf) && !isObject$2(val = call$3(fn, input)))
    return val;
  if (pref !== "string" && isCallable$a(fn = input.toString) && !isObject$2(val = call$3(fn, input)))
    return val;
  throw $TypeError$3("Can't convert object to primitive value");
};
var call$2 = functionCall;
var isObject$1 = isObject$5;
var isSymbol$1 = isSymbol$2;
var getMethod = getMethod$1;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$6 = wellKnownSymbol$8;
var $TypeError$2 = TypeError;
var TO_PRIMITIVE = wellKnownSymbol$6("toPrimitive");
var toPrimitive$1 = function toPrimitive$12(input, pref) {
  if (!isObject$1(input) || isSymbol$1(input))
    return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === void 0)
      pref = "default";
    result = call$2(exoticToPrim, input, pref);
    if (!isObject$1(result) || isSymbol$1(result))
      return result;
    throw $TypeError$2("Can't convert object to primitive value");
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
var DESCRIPTORS$6 = descriptors;
var IE8_DOM_DEFINE$1 = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
var anObject$4 = anObject$5;
var toPropertyKey$1 = toPropertyKey$2;
var $TypeError$1 = TypeError;
var $defineProperty = Object.defineProperty;
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
var ENUMERABLE = "enumerable";
var CONFIGURABLE$1 = "configurable";
var WRITABLE = "writable";
objectDefineProperty.f = DESCRIPTORS$6 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
  anObject$4(O);
  P = toPropertyKey$1(P);
  anObject$4(Attributes);
  if (typeof O === "function" && P === "prototype" && "value" in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor$1(O, P);
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
  anObject$4(O);
  P = toPropertyKey$1(P);
  anObject$4(Attributes);
  if (IE8_DOM_DEFINE$1)
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
var makeBuiltIn$2 = {
  exports: {}
};
var DESCRIPTORS$5 = descriptors;
var hasOwn$7 = hasOwnProperty_1;
var FunctionPrototype = Function.prototype;
var getDescriptor = DESCRIPTORS$5 && Object.getOwnPropertyDescriptor;
var EXISTS = hasOwn$7(FunctionPrototype, "name");
var PROPER = EXISTS && function something() {
}.name === "something";
var CONFIGURABLE = EXISTS && (!DESCRIPTORS$5 || DESCRIPTORS$5 && getDescriptor(FunctionPrototype, "name").configurable);
var functionName = {
  EXISTS,
  PROPER,
  CONFIGURABLE
};
var uncurryThis$6 = functionUncurryThis;
var isCallable$9 = isCallable$f;
var store$1 = sharedStore;
var functionToString = uncurryThis$6(Function.toString);
if (!isCallable$9(store$1.inspectSource)) {
  store$1.inspectSource = function(it) {
    return functionToString(it);
  };
}
var inspectSource$2 = store$1.inspectSource;
var global$4 = global$b;
var isCallable$8 = isCallable$f;
var inspectSource$1 = inspectSource$2;
var WeakMap$1 = global$4.WeakMap;
var nativeWeakMap = isCallable$8(WeakMap$1) && /native code/.test(inspectSource$1(WeakMap$1));
var createPropertyDescriptor$3 = function createPropertyDescriptor$32(bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value
  };
};
var DESCRIPTORS$4 = descriptors;
var definePropertyModule$3 = objectDefineProperty;
var createPropertyDescriptor$2 = createPropertyDescriptor$3;
var createNonEnumerableProperty$4 = DESCRIPTORS$4 ? function(object, key, value) {
  return definePropertyModule$3.f(object, key, createPropertyDescriptor$2(1, value));
} : function(object, key, value) {
  object[key] = value;
  return object;
};
var shared$1 = shared$3.exports;
var uid = uid$2;
var keys = shared$1("keys");
var sharedKey$3 = function sharedKey$32(key) {
  return keys[key] || (keys[key] = uid(key));
};
var hiddenKeys$4 = {};
var NATIVE_WEAK_MAP = nativeWeakMap;
var global$3 = global$b;
var uncurryThis$5 = functionUncurryThis;
var isObject = isObject$5;
var createNonEnumerableProperty$3 = createNonEnumerableProperty$4;
var hasOwn$6 = hasOwnProperty_1;
var shared = sharedStore;
var sharedKey$2 = sharedKey$3;
var hiddenKeys$3 = hiddenKeys$4;
var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
var TypeError$1 = global$3.TypeError;
var WeakMap = global$3.WeakMap;
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
if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
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
    if (hasOwn$6(it, STATE))
      throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$3(it, STATE, metadata);
    return metadata;
  };
  get = function get2(it) {
    return hasOwn$6(it, STATE) ? it[STATE] : {};
  };
  has = function has2(it) {
    return hasOwn$6(it, STATE);
  };
}
var internalState = {
  set,
  get,
  has,
  enforce,
  getterFor
};
var fails$4 = fails$a;
var isCallable$7 = isCallable$f;
var hasOwn$5 = hasOwnProperty_1;
var DESCRIPTORS$3 = descriptors;
var CONFIGURABLE_FUNCTION_NAME$1 = functionName.CONFIGURABLE;
var inspectSource = inspectSource$2;
var InternalStateModule$1 = internalState;
var enforceInternalState = InternalStateModule$1.enforce;
var getInternalState$1 = InternalStateModule$1.get;
var defineProperty$3 = Object.defineProperty;
var CONFIGURABLE_LENGTH = DESCRIPTORS$3 && !fails$4(function() {
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
  if (!hasOwn$5(value, "name") || CONFIGURABLE_FUNCTION_NAME$1 && value.name !== name) {
    if (DESCRIPTORS$3)
      defineProperty$3(value, "name", {
        value: name,
        configurable: true
      });
    else
      value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn$5(options, "arity") && value.length !== options.arity) {
    defineProperty$3(value, "length", {
      value: options.arity
    });
  }
  try {
    if (options && hasOwn$5(options, "constructor") && options.constructor) {
      if (DESCRIPTORS$3)
        defineProperty$3(value, "prototype", {
          writable: false
        });
    } else if (value.prototype)
      value.prototype = void 0;
  } catch (error) {
  }
  var state = enforceInternalState(value);
  if (!hasOwn$5(state, "source")) {
    state.source = TEMPLATE.join(typeof name == "string" ? name : "");
  }
  return value;
};
Function.prototype.toString = makeBuiltIn$1(function toString() {
  return isCallable$7(this) && getInternalState$1(this).source || inspectSource(this);
}, "toString");
var isCallable$6 = isCallable$f;
var definePropertyModule$2 = objectDefineProperty;
var makeBuiltIn = makeBuiltIn$2.exports;
var defineGlobalProperty$1 = defineGlobalProperty$3;
var defineBuiltIn$4 = function defineBuiltIn$42(O, key, value, options) {
  if (!options)
    options = {};
  var simple = options.enumerable;
  var name = options.name !== void 0 ? options.name : key;
  if (isCallable$6(value))
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
var uncurryThis$4 = functionUncurryThis;
var toString$1 = uncurryThis$4({}.toString);
var stringSlice = uncurryThis$4("".slice);
var classofRaw$1 = function classofRaw$12(it) {
  return stringSlice(toString$1(it), 8, -1);
};
var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
var isCallable$5 = isCallable$f;
var classofRaw = classofRaw$1;
var wellKnownSymbol$5 = wellKnownSymbol$8;
var TO_STRING_TAG$2 = wellKnownSymbol$5("toStringTag");
var $Object$2 = Object;
var CORRECT_ARGUMENTS = classofRaw(function() {
  return arguments;
}()) == "Arguments";
var tryGet = function tryGet2(it, key) {
  try {
    return it[key];
  } catch (error) {
  }
};
var classof$2 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function(it) {
  var O, tag, result;
  return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (tag = tryGet(O = $Object$2(it), TO_STRING_TAG$2)) == "string" ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) == "Object" && isCallable$5(O.callee) ? "Arguments" : result;
};
var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
var classof$1 = classof$2;
var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString2() {
  return "[object " + classof$1(this) + "]";
};
var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var defineBuiltIn$3 = defineBuiltIn$4;
var toString3 = objectToString;
if (!TO_STRING_TAG_SUPPORT) {
  defineBuiltIn$3(Object.prototype, "toString", toString3, {
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
var documentCreateElement$1 = documentCreateElement$2;
var classList = documentCreateElement$1("span").classList;
var DOMTokenListPrototype$1 = classList && classList.constructor && classList.constructor.prototype;
var domTokenListPrototype = DOMTokenListPrototype$1 === Object.prototype ? void 0 : DOMTokenListPrototype$1;
var uncurryThis$3 = functionUncurryThis;
var fails$3 = fails$a;
var classof = classofRaw$1;
var $Object$1 = Object;
var split = uncurryThis$3("".split);
var indexedObject = fails$3(function() {
  return !$Object$1("z").propertyIsEnumerable(0);
}) ? function(it) {
  return classof(it) == "String" ? split(it, "") : $Object$1(it);
} : $Object$1;
var IndexedObject = indexedObject;
var requireObjectCoercible = requireObjectCoercible$2;
var toIndexedObject$5 = function toIndexedObject$52(it) {
  return IndexedObject(requireObjectCoercible(it));
};
var objectDefineProperties = {};
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
var toIndexedObject$4 = toIndexedObject$5;
var toAbsoluteIndex = toAbsoluteIndex$1;
var lengthOfArrayLike = lengthOfArrayLike$1;
var createMethod = function createMethod2(IS_INCLUDES) {
  return function($this, el, fromIndex) {
    var O = toIndexedObject$4($this);
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
var uncurryThis$2 = functionUncurryThis;
var hasOwn$4 = hasOwnProperty_1;
var toIndexedObject$3 = toIndexedObject$5;
var indexOf = arrayIncludes.indexOf;
var hiddenKeys$2 = hiddenKeys$4;
var push = uncurryThis$2([].push);
var objectKeysInternal = function objectKeysInternal2(object, names) {
  var O = toIndexedObject$3(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) {
    !hasOwn$4(hiddenKeys$2, key) && hasOwn$4(O, key) && push(result, key);
  }
  while (names.length > i) {
    if (hasOwn$4(O, key = names[i++])) {
      ~indexOf(result, key) || push(result, key);
    }
  }
  return result;
};
var enumBugKeys$3 = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
var internalObjectKeys$1 = objectKeysInternal;
var enumBugKeys$2 = enumBugKeys$3;
var objectKeys$1 = Object.keys || function keys2(O) {
  return internalObjectKeys$1(O, enumBugKeys$2);
};
var DESCRIPTORS$2 = descriptors;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var definePropertyModule$1 = objectDefineProperty;
var anObject$3 = anObject$5;
var toIndexedObject$2 = toIndexedObject$5;
var objectKeys = objectKeys$1;
objectDefineProperties.f = DESCRIPTORS$2 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject$3(O);
  var props = toIndexedObject$2(Properties);
  var keys3 = objectKeys(Properties);
  var length = keys3.length;
  var index = 0;
  var key;
  while (length > index) {
    definePropertyModule$1.f(O, key = keys3[index++], props[key]);
  }
  return O;
};
var getBuiltIn$1 = getBuiltIn$4;
var html$1 = getBuiltIn$1("document", "documentElement");
var anObject$2 = anObject$5;
var definePropertiesModule = objectDefineProperties;
var enumBugKeys$1 = enumBugKeys$3;
var hiddenKeys$1 = hiddenKeys$4;
var html = html$1;
var documentCreateElement = documentCreateElement$2;
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
  var length = enumBugKeys$1.length;
  while (length--) {
    delete _NullProtoObject[PROTOTYPE][enumBugKeys$1[length]];
  }
  return _NullProtoObject();
};
hiddenKeys$1[IE_PROTO$1] = true;
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject$2(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    result[IE_PROTO$1] = O;
  } else
    result = _NullProtoObject();
  return Properties === void 0 ? result : definePropertiesModule.f(result, Properties);
};
var wellKnownSymbol$4 = wellKnownSymbol$8;
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
var objectGetOwnPropertyDescriptor = {};
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
var DESCRIPTORS$1 = descriptors;
var call$1 = functionCall;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var createPropertyDescriptor$1 = createPropertyDescriptor$3;
var toIndexedObject$1 = toIndexedObject$5;
var toPropertyKey = toPropertyKey$2;
var hasOwn$3 = hasOwnProperty_1;
var IE8_DOM_DEFINE = ie8DomDefine;
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$1 ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$1(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE)
    try {
      return $getOwnPropertyDescriptor(O, P);
    } catch (error) {
    }
  if (hasOwn$3(O, P))
    return createPropertyDescriptor$1(!call$1(propertyIsEnumerableModule.f, O, P), O[P]);
};
var objectGetOwnPropertyNames = {};
var internalObjectKeys = objectKeysInternal;
var enumBugKeys = enumBugKeys$3;
var hiddenKeys = enumBugKeys.concat("length", "prototype");
objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};
var objectGetOwnPropertySymbols = {};
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;
var getBuiltIn = getBuiltIn$4;
var uncurryThis$1 = functionUncurryThis;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var anObject$1 = anObject$5;
var concat = uncurryThis$1([].concat);
var ownKeys$1 = getBuiltIn("Reflect", "ownKeys") || function ownKeys(it) {
  var keys3 = getOwnPropertyNamesModule.f(anObject$1(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys3, getOwnPropertySymbols(it)) : keys3;
};
var hasOwn$2 = hasOwnProperty_1;
var ownKeys2 = ownKeys$1;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var definePropertyModule = objectDefineProperty;
var copyConstructorProperties$1 = function copyConstructorProperties$12(target, source, exceptions) {
  var keys3 = ownKeys2(source);
  var defineProperty4 = definePropertyModule.f;
  var getOwnPropertyDescriptor3 = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys3.length; i++) {
    var key = keys3[i];
    if (!hasOwn$2(target, key) && !(exceptions && hasOwn$2(exceptions, key))) {
      defineProperty4(target, key, getOwnPropertyDescriptor3(source, key));
    }
  }
};
var fails$2 = fails$a;
var isCallable$4 = isCallable$f;
var replacement = /#|\.prototype\./;
var isForced$1 = function isForced$12(feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : isCallable$4(detection) ? fails$2(detection) : !!detection;
};
var normalize = isForced$1.normalize = function(string) {
  return String(string).replace(replacement, ".").toLowerCase();
};
var data = isForced$1.data = {};
var NATIVE = isForced$1.NATIVE = "N";
var POLYFILL = isForced$1.POLYFILL = "P";
var isForced_1 = isForced$1;
var global$2 = global$b;
var getOwnPropertyDescriptor2 = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$4;
var defineBuiltIn$2 = defineBuiltIn$4;
var defineGlobalProperty = defineGlobalProperty$3;
var copyConstructorProperties = copyConstructorProperties$1;
var isForced = isForced_1;
var _export = function _export2(options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global$2;
  } else if (STATIC) {
    target = global$2[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global$2[TARGET] || {}).prototype;
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
        createNonEnumerableProperty$2(sourceProperty, "sham", true);
      }
      defineBuiltIn$2(target, key, sourceProperty, options);
    }
};
var fails$1 = fails$a;
var correctPrototypeGetter = !fails$1(function() {
  function F() {
  }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});
var hasOwn$1 = hasOwnProperty_1;
var isCallable$3 = isCallable$f;
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
var fails = fails$a;
var isCallable$2 = isCallable$f;
var getPrototypeOf$1 = objectGetPrototypeOf;
var defineBuiltIn$1 = defineBuiltIn$4;
var wellKnownSymbol$3 = wellKnownSymbol$8;
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
var hasOwn2 = hasOwnProperty_1;
var wellKnownSymbol$2 = wellKnownSymbol$8;
var TO_STRING_TAG$1 = wellKnownSymbol$2("toStringTag");
var setToStringTag$2 = function setToStringTag$22(target, TAG, STATIC) {
  if (target && !STATIC)
    target = target.prototype;
  if (target && !hasOwn2(target, TO_STRING_TAG$1)) {
    defineProperty$1(target, TO_STRING_TAG$1, {
      configurable: true,
      value: TAG
    });
  }
};
var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
var create2 = objectCreate;
var createPropertyDescriptor = createPropertyDescriptor$3;
var setToStringTag$1 = setToStringTag$2;
var Iterators$2 = iterators;
var returnThis$1 = function returnThis$12() {
  return this;
};
var createIteratorConstructor$1 = function createIteratorConstructor$12(IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  var TO_STRING_TAG2 = NAME + " Iterator";
  IteratorConstructor.prototype = create2(IteratorPrototype$1, {
    next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next)
  });
  setToStringTag$1(IteratorConstructor, TO_STRING_TAG2, false);
  Iterators$2[TO_STRING_TAG2] = returnThis$1;
  return IteratorConstructor;
};
var isCallable$1 = isCallable$f;
var $String = String;
var $TypeError = TypeError;
var aPossiblePrototype$1 = function aPossiblePrototype$12(argument) {
  if (_typeof(argument) == "object" || isCallable$1(argument))
    return argument;
  throw $TypeError("Can't set " + $String(argument) + " as a prototype");
};
var uncurryThis = functionUncurryThis;
var anObject = anObject$5;
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
var isCallable = isCallable$f;
var createIteratorConstructor = createIteratorConstructor$1;
var getPrototypeOf = objectGetPrototypeOf;
var setPrototypeOf = objectSetPrototypeOf;
var setToStringTag = setToStringTag$2;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$4;
var defineBuiltIn = defineBuiltIn$4;
var wellKnownSymbol$1 = wellKnownSymbol$8;
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
        return function keys3() {
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
var defineProperty3 = objectDefineProperty.f;
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
    defineProperty3(values, "name", {
      value: "values"
    });
  } catch (error) {
  }
var global$1 = global$b;
var DOMIterables = domIterables;
var DOMTokenListPrototype = domTokenListPrototype;
var ArrayIteratorMethods = es_array_iterator;
var createNonEnumerableProperty = createNonEnumerableProperty$4;
var wellKnownSymbol = wellKnownSymbol$8;
var ITERATOR = wellKnownSymbol("iterator");
var TO_STRING_TAG = wellKnownSymbol("toStringTag");
var ArrayValues = ArrayIteratorMethods.values;
var handlePrototype = function handlePrototype2(CollectionPrototype, COLLECTION_NAME) {
  if (CollectionPrototype) {
    if (CollectionPrototype[ITERATOR] !== ArrayValues)
      try {
        createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
      } catch (error) {
        CollectionPrototype[ITERATOR] = ArrayValues;
      }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME])
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
export {
  DatasetShow as default
};
//# sourceMappingURL=DatasetShow.js.map
