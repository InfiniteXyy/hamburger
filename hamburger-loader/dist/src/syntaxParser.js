"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function assignDecorations(target) {
  for (var _len = arguments.length, decorators = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    decorators[_key - 1] = arguments[_key];
  }

  for (var decorator of decorators) {
    var value = decorator.value || true;
    var key = decorator.key; // 链式参数例如 padding.right=3，要修改对应的keyValue

    if (/\./.test(key)) {
      var temp = key.split('.');
      key = temp[0];
      if (!target.decorator[key]) target.decorator[key] = {};
      target.decorator[key][temp[1]] = value;
    } else {
      target.decorator[key] = value;
    }
  }
}

function syntaxParse(lines) {
  var root = {
    title: 'VStack',
    param: '',
    children: [],
    decorator: {},
    father: null
  };
  var fatherItem = root;
  var lastItem = root;

  for (var line of lines) {
    // 若改行没有元素，判断深度变化和样式赋予
    if (!line.define) {
      if (line.depthDelta === -1) {
        fatherItem = fatherItem.father;
      } else if (line.depthDelta === 1) {
        fatherItem = lastItem;
      }

      assignDecorations(lastItem, ...line.annotations);
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

    assignDecorations(currentItem, ...line.annotations); // 根据层级的上升下降变更 fatherItem

    if (line.depthDelta === -1) {
      fatherItem = fatherItem.father;
    } else if (line.depthDelta === 1) {
      fatherItem = currentItem;
    }

    lastItem = currentItem;
  } // 当根节点只有一个孩子的时候，就不需要根节点了


  return root.children.length === 1 ? root.children[0] : root;
}

var _default = syntaxParse;
exports.default = _default;