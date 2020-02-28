import { ChildElement, isReact } from "../common";
import React from "react";
import { buildElement } from "./index";

/**
 * 将 styleObject 类型转变为 inline css
 */
export function toCSS(cssObj: { [k: string]: string }): string {
  let result = "";
  for (const key in cssObj) {
    const value = cssObj[key];
    const propName = key.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
    let propValue = value;
    if (Number.isInteger(+value)) {
      propValue += "px";
    }
    result += `${propName}:${propValue};`;
  }
  return result;
}

/**
 * 修改自 https://gist.github.com/sergiodxa/a493c98b7884128081bb9a281952ef33
 * 类似 React 的 createElement函数，根据配置文件，返回 JSX.Element 或普通的 Element
 *
 * 只有 React 支持函数式组件
 */
function createElement(type: string, props: { [k: string]: any }, ...children: ChildElement[]) {
  if (isReact) {
    const builtElements = children.map(buildElement);
    return React.createElement(type, props, builtElements.length === 0 ? null : builtElements);
  } else {
    if (typeof type === "function") {
      console.error("检测到使用函数组件，请使用 React 内核");
      return document.createElement("div");
    }
    if (type === "svg") {
      console.error("检测到使用 JSX SVG 组件，请使用 React 内核");
    }
    // 1、根据 type 生成对应元素
    const element = document.createElement(type);

    // 2、遍历 props 参数，应用到 element 中，对于特殊的参数名进行处理
    Object.entries(props || {}).forEach(([name, value]) => {
      if (!value) return;
      if (name === "className") element.setAttribute("class", value);
      else if (name === "style") element.setAttribute("style", toCSS(value));
      else if (name === "key") return;
      else element.setAttribute(name, value);
    });

    // 3、将 children 中的每一个 ChildElement 转变为 Element 并添加到父组件中，children 默认为 []
    children
      .map(buildElement)
      .map(child => typeof child === "string" ? document.createTextNode(child) : child)
      .forEach(child => element.appendChild(child as Element));
    return element;
  }
}

export default createElement;
