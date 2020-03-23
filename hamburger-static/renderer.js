function toCSS(cssObj) {
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

/**
 * 判断输入的 htmltag 是否需要反尖括号
 * @param {string} tag
 * @returns {boolean}
 */
function needCollapse(tag) {
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
 * @param {*} options
 * @returns {string}
 */
function buildStaticHTML(root, options) {
  const result = walk(root);
  if (options && options.template) {
    const content = options.template.content;
    const target = options.template.target;
    return content.replace(`{{${target}}}`, result);
  }
  return result;
}

function walk(root) {
  // 处理特殊情况
  // if (root.outerHTML) return root.outerHTML; // 在浏览器环境下
  if (typeof root === 'string') return root;
  if (!root) return '';

  // 处理 React
  // if (!root._tag) {
  //   const _children = root.props.children;
  //   let _props = { ...root.props };
  //   delete _props['children'];
  //   root = { _props, _children, _tag: root.type };
  // }

  let innerResult = '';
  // 如果 props 中含有 html 标记，则 children 即为简单的 html 块
  if ((root._props || {}).dangerouslySetInnerHTML) {
    innerResult += root._props.dangerouslySetInnerHTML.__html;
    delete root._props.dangerouslySetInnerHTML;
  }

  // 处理 props
  const props = Object.entries(root._props || {}).reduce((propString, [propName, propValue]) => {
    if (propName === 'className') propName = 'class';
    if (propName === 'style') propValue = toCSS(propValue);
    if (!propValue) return propString; // 若没有具体的值，则不显示在 props 中
    return `${propString} ${propName}="${propValue}"`;
  }, '');

  // 处理 children
  if (Array.isArray(root._children)) {
    for (const child of root._children) {
      innerResult += walk(child);
    }
  }

  let result = `<${root._tag}${props}>`;
  result += innerResult;
  if (needCollapse(root._tag)) result += `</${root._tag}>`;
  return result;
}

module.exports = buildStaticHTML;
