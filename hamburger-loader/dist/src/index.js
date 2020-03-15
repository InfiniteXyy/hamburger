"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _syntaxParser = _interopRequireDefault(require("./syntaxParser"));

var _lexicalParser = _interopRequireDefault(require("./lexicalParser"));

var _codeGenerator = _interopRequireDefault(require("./codeGenerator"));

var _hamburgerJs = _interopRequireWildcard(require("hamburger-js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  console.info('eval: ' + jsCodeObj.content);

  for (var i of jsCodeObj.argList) {
    if (!argObj.hasOwnProperty(i)) {
      if (i.startsWith('fake')) {
        argObj[i] = fakerArgs[i.replace('fake', '')] || i;
      } else {
        argObj[i] = i;
      }
    }
  }

  return new Function(...Object.keys(argObj), "return ".concat(jsCodeObj.content))(...Object.values(argObj));
}

function hbg(hbgSource) {
  var code;

  for (var _len = arguments.length, keys = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    keys[_key - 1] = arguments[_key];
  }

  if (typeof hbgSource === 'string') code = hbgSource;else code = String.raw(hbgSource, ...keys);
  var tokens = (0, _lexicalParser.default)(code);
  var ast = (0, _syntaxParser.default)(tokens);
  var jsCode = (0, _codeGenerator.default)(ast);
  return {
    userArgs: {},

    build() {
      return betterEval(jsCode, this.userArgs).build();
    },

    data(args) {
      this.userArgs = args;
      return this;
    }

  };
}

var _default = hbg;
exports.default = _default;