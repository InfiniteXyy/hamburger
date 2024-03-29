import { DOMElement } from '../types';

function toCSS(cssObj: { [k: string]: string }): string {
  let result = '';
  for (const key in cssObj) {
    const value = cssObj[key];
    const propName = key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
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
    console.error('Seems like you are using function component, please use React platform');
    return document.createElement('div');
  }
  if (type === 'svg') {
    console.error('Seems like you are using Svg in JSX, please use React platform');
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
    else if (name.startsWith('on')) element.addEventListener(name.toLowerCase().slice(2), value);
    else if (name === 'key') return;
    else element.setAttribute(name, value);
  });

  // 5、将 children 中的每一个 DOMElement 转变为 Element 元素 并添加到父组件中，children 默认为 []
  children.map(domfy).forEach((child) => element.appendChild(child));
  return element;
}

export { domfy, toCSS };
