import type { DOMElement } from '@hamburger/core';

function toCSS(cssObj: Record<string, string | number>): string {
  let result = '';
  for (const key in cssObj) {
    const value = cssObj[key];
    const propName = key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
    let propValue: string = String(value);
    if (Number.isInteger(+value)) {
      propValue += 'px';
    }
    result += `${propName}:${propValue};`;
  }
  return result;
}

function needCollapse(tag: string): boolean {
  switch (true) {
    case tag === 'img':
      return false;
    case tag === 'input':
      return false;
    default:
      return true;
  }
}

function walk(root: DOMElement | string): string {
  if (typeof root === 'string') return root;
  if (!root) return '';

  // text node
  if (!root.type) {
    return root.props.content as string;
  }

  let innerResult = '';
  // 如果 props 中含有 html 标记，则 children 即为简单的 html 块
  if ((root.props || ({} as Record<string, unknown>)).dangerouslySetInnerHTML) {
    innerResult += (root.props.dangerouslySetInnerHTML as { __html: string }).__html;
    delete root.props.dangerouslySetInnerHTML;
  }

  // 处理 props
  const props = Object.entries(root.props || {}).reduce((propString, [propName, propValue]) => {
    if (propName === 'className') propName = 'class';
    if (propName === 'style') propValue = toCSS(propValue as Record<string, string | number>);
    if (!propValue) return propString;
    return `${propString} ${propName}="${propValue}"`;
  }, '');

  // 处理 children
  if (Array.isArray(root.children)) {
    for (const child of root.children) {
      innerResult += walk(child as DOMElement | string);
    }
  }

  let result = `<${root.type}${props}>`;
  result += innerResult;
  if (needCollapse(root.type)) result += `</${root.type}>`;
  return result;
}

export default function buildStaticHTML(
  root: DOMElement,
  options?: { template?: { content: string; target: string } },
): string {
  const result = walk(root);
  if (options && options.template) {
    const content = options.template.content;
    const target = options.template.target;
    return content.replace(`{{${target}}}`, result);
  }
  return result;
}
