import { toCSS } from './createElement';

/**
 * 判断输入的 htmltag 是否需要反尖括号
 * @param {string} tag 
 * @returns {boolean}
 */
function needCollapse(tag) {
  if (tag === 'img') return false;
  if (tag === 'input') return false;
  return true;
}


/**
 * 将 DOM 树输出为 html 文档
 * @param {*} root 
 * @returns {string}
 */
function buildStaticHTML(root) {

  // 需要每个孩子组件都实现了 IBuildable


  const props = Object.entries(root._props).reduce((propString, [propName, propValue]) => {
    if (propName === 'className') propName = 'class';
    if (propName === 'style') propValue = toCSS(propValue);
    if (!propValue) return propString; // 若没有具体的值，则不显示在 props 中
    return `${propString} ${propName}="${propValue}"`;
  }, '');

  let result = `<${root._tag}${props}>`;
  if (Array.isArray(root._children)) {
    for (const child of root._children) {
      result += buildStaticElement(child);
    }
  } else if (typeof root._children === 'string') {
    result += root._children;
  }

  if (needCollapse(root._tag)) result += `</${root._tag}>`;
  return result;
}

export default buildStaticHTML;
