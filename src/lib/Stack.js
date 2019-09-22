import React from "react";
export function VStack(...elements) {
  let padding;
  function setPadding(_padding) {
    padding = _padding;
    return closure;
  }
  function build() {
    return (
      <div style={{ padding }}>
        {elements.map(i => (i.build ? i.build() : i))}
      </div>
    );
  }
  const closure = {
    build,
    padding: setPadding
  };
  return closure;
}
export function HStack(...elements) {
  function build() {
    return (
      <div style={{ display: "flex" }}>
        {elements.map(i => (i.build ? i.build() : i))}
      </div>
    );
  }
  const closure = {
    build
  };
  return closure;
}
