import { DOMElement } from '../common';

export function toCSS(cssObj: { [k: string]: string }): string {
  let result = '';
  for (const key in cssObj) {
    const value = cssObj[key];
    const propName = key.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
    let propValue = value;
    if (Number.isInteger(+value)) {
      propValue += 'px';
    }
    result += `${propName}:${propValue};`;
  }
  return result;
}

function domfy(root: DOMElement): Element | Text {
  // 将 DOMElement 组件转为标准的 document node
  const { type, children } = root!;
  const props = root.props || {};

  if (typeof root.type === 'function') {
    console.error('检测到使用函数组件，请使用 React 内核');
    return document.createElement('div');
  }
  if (type === 'svg') {
    console.error('检测到使用 JSX SVG 组件，请使用 React 内核');
  }

  // 1、若 type 为 null 说明是字符串
  if (type === null) return document.createTextNode(props.content || '');

  // 2、根据 type 生成对应元素
  const element = document.createElement(type);

  // 3、如果 props 中含有 html 标记，则不需要对其他内容做任何处理
  if (props.dangerouslySetInnerHTML && props.dangerouslySetInnerHTML.__html) {
    element.innerHTML = props.dangerouslySetInnerHTML.__html;
    return element;
  }

  // 4、遍历 props 参数，应用到 element 中，对于特殊的参数名进行处理
  Object.entries(props || {}).forEach(([name, value]) => {
    if (!value) return;
    if (name === 'className') element.setAttribute('class', value);
    else if (name === 'style') element.setAttribute('style', toCSS(value));
    else if (name === 'onClick') element.addEventListener('click', value);
    else if (name === 'key') return;
    else element.setAttribute(name, value);
  });

  // 5、将 children 中的每一个 DOMElement 转变为 Element 元素 并添加到父组件中，children 默认为 []
  children.map(domfy).forEach(child => element.appendChild(child));
  return element;
}

export default domfy;
