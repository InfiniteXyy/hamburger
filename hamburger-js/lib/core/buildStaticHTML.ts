import { toCSS } from './createElement';
import { ViewClass } from '../components';

/**
 * 判断输入的 htmltag 是否需要反尖括号
 * @param {string} tag
 * @returns {boolean}
 */
function needCollapse(tag: string) {
  switch (true) {
    case tag === 'img':
      return false;
    case tag === 'input':
      return false;
    default:
      return true;
  }
}


/**
 * 将 DOM 树输出为 html 文档
 * @param {*} root
 * @returns {string}
 */
function buildStaticHTML(root: any) {
  // 处理特殊情况
  if (root.outerHTML) return root.outerHTML;
  if (typeof root === 'string') return root;
  if (!root) return '';

  // 处理 React
  if (!root._tag) {
    const _children = root.props.children;
    let _props = { ...root.props };
    delete _props['children'];
    root = { _props, _children, _tag: root.type };
  }

  // 处理 props
  const props = Object.entries(root._props || {}).reduce((propString, [propName, propValue]) => {
    if (propName === 'className') propName = 'class';
    if (propName === 'style') propValue = toCSS(propValue as any);
    if (!propValue) return propString; // 若没有具体的值，则不显示在 props 中
    return `${propString} ${propName}="${propValue}"`;
  }, '');

  // 处理 children
  let childrenResult = '';
  if (Array.isArray(root._children)) {
    for (const child of root._children) {
      childrenResult += buildStaticHTML(child);
    }
  }

  let result = `<${root._tag}${props}>`;
  result += childrenResult;
  if (needCollapse(root._tag)) result += `</${root._tag}>`;
  return result;
}

export default buildStaticHTML;
