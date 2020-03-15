"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var AnnotationRegExp = /@([\w\\.]+)(=(\w+))?/g;

function lexParse(code) {
  var lines = code.split('\n').map(i => i.trim()).filter(i => i !== '');
  var result = lines.map((source, index) => ({
    index,
    source,
    annotations: [],
    define: null,
    depthDelta: 0
  })); // 预处理：获取每一行的注解

  for (var line of result) {
    var match = AnnotationRegExp.exec(line.source);

    while (match != null) {
      // 获取注解 Value 值
      var value = match[3]; // 获取注解 Key 值

      var key = match[1];
      line.annotations.push({
        value,
        key
      });
      match = AnnotationRegExp.exec(line.source);
    }
  } // 获取声明：Element(Parameter)


  for (var _line of result) {
    var matchKey = /^(\w+)/g.exec(_line.source);
    var matchValue = /\(([\w"']+)\)/g.exec(_line.source);
    if (matchKey) _line.define = {
      key: matchKey[1]
    };
    if (matchValue && matchKey) _line.define.value = matchValue[1];
  } // 判断深度变化


  for (var _line2 of result) {
    if ([..._line2.source].some(i => i === '{')) _line2.depthDelta = 1;else if ([..._line2.source].some(i => i === '}')) _line2.depthDelta = -1;
  }

  return result;
}

var _default = lexParse;
exports.default = _default;