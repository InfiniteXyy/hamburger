import React from "react";
export function Button(content) {
  let onClick;
  function build() {
    return <button onClick={onClick}>{content}</button>;
  }
  function setOnClick(_onClick) {
    onClick = _onClick;
    return closure;
  }
  const closure = {
    build,
    onClick: setOnClick
  };
  return closure;
}
