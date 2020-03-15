"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function dfs(current, resultObject) {
  resultObject.content += "".concat(current.title);
  var decorators = '';

  for (var key in current.decorator) {
    switch (typeof current.decorator[key]) {
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

  for (var child of current.children) {
    dfs(child, resultObject);
  }

  if (current.children.length !== 0) {
    resultObject.content += ")".concat(decorators);
  }

  resultObject.content += ',\n';
}

function codeGenerator(ast) {
  var resultObject = {
    content: '',
    argList: []
  };
  dfs(ast, resultObject); // 去除最后一个逗号

  resultObject.content = resultObject.content.substr(0, resultObject.content.lastIndexOf(','));
  return resultObject;
}

var _default = codeGenerator;
exports.default = _default;