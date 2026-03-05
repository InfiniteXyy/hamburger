import { DOMElement } from '../types';

function toCSS(cssObj: Record<string, string | number>): string {
  let result = '';
  for (const key in cssObj) {
    const value = cssObj[key];
    const propName = key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
    let propValue = String(value);
    if (typeof value === 'number') {
      propValue += 'px';
    }
    result += `${propName}:${propValue};`;
  }
  return result;
}

function domfy(root: DOMElement): Element | Text {
  const { type, children } = root;
  const props = root.props || {};

  if (typeof type === 'function') {
    console.error('Seems like you are using function component, please use React platform');
    return document.createElement('div');
  }
  if (type === 'svg') {
    console.error('Seems like you are using Svg in JSX, please use React platform');
  }

  if (type === null) return document.createTextNode((props.content as string) || '');

  const element = document.createElement(type);

  const htmlProp = props.dangerouslySetInnerHTML as { __html?: string } | undefined;
  if (htmlProp && htmlProp.__html) {
    element.innerHTML = htmlProp.__html;
    return element;
  }

  Object.entries(props || {}).forEach(([name, value]) => {
    if (value === null || value === undefined) return;
    if (name === 'className') element.setAttribute('class', String(value));
    else if (name === 'style') element.setAttribute('style', toCSS(value as Record<string, string | number>));
    else if (name.startsWith('on')) element.addEventListener(name.toLowerCase().slice(2), value as EventListener);
    else if (name === 'key') return;
    else element.setAttribute(name, String(value));
  });

  children.map(domfy).forEach((child) => element.appendChild(child));
  return element;
}

export { domfy, toCSS };
