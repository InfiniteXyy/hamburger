"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "hbg", {
  enumerable: true,
  get: function get() {
    return _src["default"];
  }
});

var _src = _interopRequireDefault(require("./src"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function dfs(current, resultObject) {
  resultObject.content += "".concat(current.title);
  var decorators = '';

  for (var key in current.decorator) {
    switch (_typeof(current.decorator[key])) {
      case 'boolean':
        decorators += ".".concat(key, "()");
        break;

      case 'object':
        decorators += ".".concat(key, "(").concat(JSON.stringify(current.decorator[key]), ")");
        break;

      default:
        decorators += ".".concat(key, "(\"").concat(current.decorator[key], "\")");
        break;
    }
  }

  if (current.children.length === 0) {
    // 将所有需要的参数添加到 args 列表
    if (!/"/.test(current.param)) resultObject.argList.push(current.param);
    resultObject.content += "(".concat(current.param || '""', ")").concat(decorators, ",\n");
    return;
  }

  resultObject.content += '(\n';
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = current.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var child = _step.value;
      dfs(child, resultObject);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (current.children.length !== 0) {
    resultObject.content += ")".concat(decorators);
  }

  if (current.father.title !== 'root') resultObject.content += ',\n';
}

function codeGenerator(ast) {
  var resultObject = {
    content: '',
    argList: []
  };
  dfs(ast, resultObject);
  return resultObject;
}

var _default = codeGenerator;
exports["default"] = _default;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _syntaxParser = _interopRequireDefault(require("./syntaxParser"));

var _lexicalParser = _interopRequireDefault(require("./lexicalParser"));

var _codeGenerator = _interopRequireDefault(require("./codeGenerator"));

var _hamburgerJs = _interopRequireWildcard(require("hamburger-js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var HamburgerComponents = {
  Text: _hamburgerJs.Text,
  Image: _hamburgerJs.Image,
  HStack: _hamburgerJs.HStack,
  Button: _hamburgerJs.Button,
  VStack: _hamburgerJs.VStack,
  Link: _hamburgerJs.Link,
  GridRow: _hamburgerJs.GridRow,
  GridCol: _hamburgerJs.GridCol,
  PureHTML: _hamburgerJs.PureHTML,
  ListItem: _hamburgerJs.ListItem,
  Layout: _hamburgerJs.Layout,
  Icon: _hamburgerJs.Icon,
  Input: _hamburgerJs.Input,
  List: _hamburgerJs.List
};
var fakerArgs = {
  Time: '2019年10月3日',
  Name: 'xyy',
  Email: 'xuyiyangwing@gmail.com'
};

function betterEval(jsCodeObj) {
  var userArgs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var argObj = _objectSpread({}, HamburgerComponents, {}, userArgs);

  console.log('eval: ' + jsCodeObj.content);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = jsCodeObj.argList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var i = _step.value;

      if (!argObj.hasOwnProperty(i)) {
        if (i.startsWith('fake')) {
          argObj[i] = fakerArgs[i.replace('fake', '')] || i;
        } else {
          argObj[i] = i;
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return _construct(Function, _toConsumableArray(Object.keys(argObj)).concat(["return ".concat(jsCodeObj.content)])).apply(void 0, _toConsumableArray(Object.values(argObj)));
}

function hbg(hbgSource) {
  for (var _len = arguments.length, keys = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    keys[_key - 1] = arguments[_key];
  }

  var code = String.raw.apply(String, [hbgSource].concat(keys));
  var tokens = (0, _lexicalParser["default"])(code);
  var ast = (0, _syntaxParser["default"])(tokens);
  var jsCode = (0, _codeGenerator["default"])(ast);
  return {
    userArgs: {},
    build: function build() {
      return betterEval(jsCode, this.userArgs).build();
    },
    data: function data(args) {
      this.userArgs = args;
      return this;
    }
  };
}

var _default = hbg;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var AnnotationRegExp = /@([\w\\.]+)(=(\w+))?/g;

function lexParse(code) {
  var lines = code.split('\n').map(function (i) {
    return i.trim();
  }).filter(function (i) {
    return i !== '';
  });
  var result = lines.map(function (source, index) {
    return {
      index: index,
      source: source,
      annotations: [],
      define: null,
      depthDelta: 0
    };
  }); // 预处理：获取每一行的注解

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = result[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var line = _step.value;
      var match = AnnotationRegExp.exec(line.source);

      while (match != null) {
        // 获取注解 Value 值
        var value = match[3]; // 获取注解 Key 值

        var key = match[1];
        line.annotations.push({
          value: value,
          key: key
        });
        match = AnnotationRegExp.exec(line.source);
      }
    } // 获取声明：Element(Parameter)

  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = result[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _line = _step2.value;
      var matchKey = /^(\w+)/g.exec(_line.source);
      var matchValue = /\(([\w"']+)\)/g.exec(_line.source);
      if (matchKey) _line.define = {
        key: matchKey[1]
      };
      if (matchValue && matchKey) _line.define.value = matchValue[1];
    } // 判断深度变化

  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = result[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _line2 = _step3.value;
      if (_toConsumableArray(_line2.source).some(function (i) {
        return i === '{';
      })) _line2.depthDelta = 1;else if (_toConsumableArray(_line2.source).some(function (i) {
        return i === '}';
      })) _line2.depthDelta = -1;
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return result;
}

var _default = lexParse;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function syntaxParse(lines) {
  var root = {
    title: 'root',
    param: '',
    children: [],
    decorator: {},
    father: null
  };
  var fatherItem = root;
  var lastItem = root;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = lines[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var line = _step.value;

      // 若改行没有元素，则只判断深度变化
      if (!line.define) {
        if (line.depthDelta === -1) {
          fatherItem = fatherItem.father;
        } else if (line.depthDelta === 1) {
          fatherItem = lastItem;
        }

        continue;
      } // 创建新的元素


      var currentItem = {
        title: line.define.key,
        param: line.define.value,
        children: [],
        decorator: {},
        father: fatherItem
      };
      fatherItem.children.push(currentItem); // 赋予样式参数

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = line.annotations[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var annotationToken = _step2.value;
          var value = annotationToken.value || true;
          var key = annotationToken.key; // 链式参数例如 padding.right=3，要修改对应的keyValue

          if (/\./.test(key)) {
            var temp = key.split('.');
            key = temp[0];
            if (!currentItem.decorator[key]) currentItem.decorator[key] = {};
            currentItem.decorator[key][temp[1]] = value;
          } else {
            currentItem.decorator[key] = value;
          }
        } // 根据层级的上升下降变更 fatherItem

      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      if (line.depthDelta === -1) {
        fatherItem = fatherItem.father;
      } else if (line.depthDelta === 1) {
        fatherItem = currentItem;
      }

      lastItem = currentItem;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return root.children[0];
}

var _default = syntaxParse;
exports["default"] = _default;
