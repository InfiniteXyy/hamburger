import React from "react";

export function Text(_content) {
  let hex = "black";
  let bold = false;
  let content = _content;
  let fontSize = 16;
  let margin = {
    left: undefined,
    right: undefined,
    top: undefined,
    bottom: undefined
  };

  let setMargin = function(_margin) {
    margin = _margin;
    return closure;
  };
  let build = function() {
    return (
      <div
        style={{
          color: hex,
          fontSize,
          marginLeft: margin.left,
          marginTop: margin.top,
          marginRight: margin.right,
          marginBottom: margin.bottom,
          fontWeight: bold ? "bold" : "400"
        }}
      >
        {content}
      </div>
    );
  };

  let color = function(_hex) {
    hex = _hex;
    return closure;
  };

  let setBold = function() {
    bold = true;
    return closure;
  };

  let size = function(_size) {
    fontSize = _size;
    return closure;
  };

  const closure = {
    color,
    bold: setBold,
    margin: setMargin,
    size,
    build
  };
  return closure;
}
