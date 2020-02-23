import { toCSS } from './createElement';

function needCollapse(tag) {
  if (tag === 'img') return false;
  if (tag === 'input') return false;
  return true;
}
function buildStaticElement(root) {
  // 1、根据 type 生成对应元素
  // const element = document.createElement(type);

  // 2、遍历 props 参数，应用到 element 中，对于特殊的参数名进行处理
  // Object.entries(props).forEach(([name, value]) => {
  //   if (name === 'className') element.setAttribute('class', value);
  //   else if (name === 'style') element.setAttribute('style', toCSS(value));
  //   else element.setAttribute(name, value);
  // });

  // 3、将 children 中的每一个 Element 添加到父组件中，children 默认为 []
  // const _children = Array.isArray(children[0]) ? children[0] : children;
  // _children
  //   .filter(i => !!i)
  //   .map(child => (typeof child === 'string' ? document.createTextNode(child) : child))
  //   .forEach(child => element.appendChild(child));

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
function buildStaticHTML(element) {
  // 需要每个孩子组件都实现了 IBuildable
  return buildStaticElement(element);
}

export default buildStaticHTML;
