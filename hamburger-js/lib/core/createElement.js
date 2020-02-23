import { isReact } from '../common';
import React from 'react';

/**
 * 将 styleObject 类型转变为 inline css
 */
function toCSS(cssObj) {
  return Object.entries(cssObj).reduce((styleString, [propName, propValue]) => {
    const _propName = propName.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
    if (Number.isInteger(+propValue)) {
      propValue = propValue + 'px';
    }
    return `${styleString}${_propName}:${propValue};`;
  }, '');
}

/**
 * 修改自 https://gist.github.com/sergiodxa/a493c98b7884128081bb9a281952ef33
 * 类似 React 的 createElement函数，根据配置文件，返回 JSX.Element 或普通的 Element
 * @param type
 * @param props
 * @param children
 */
function createElement(type, props, ...children) {
  if (isReact) {
    return React.createElement(type, props, ...children);
  } else {
    // 1、根据 type 生成对应元素
    const element = document.createElement(type);

    // 2、遍历 props 参数，应用到 element 中，对于特殊的参数名进行处理
    Object.entries(props).forEach(([name, value]) => {
      if (name === 'className') element.setAttribute('class', value);
      else if (name === 'style') element.setAttribute('style', toCSS(value));
      else element.setAttribute(name, value);
    });

    // 3、将 children 中的每一个 Element 添加到父组件中，children 默认为 []
    const _children = Array.isArray(children[0]) ? children[0] : children;
    _children
      .filter(i => !!i)
      .map(child => (typeof child === 'string' ? document.createTextNode(child) : child))
      .forEach(child => element.appendChild(child));

    return element;
  }
}

export default createElement;
