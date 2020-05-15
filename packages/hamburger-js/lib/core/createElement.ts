import hamburger from '../index';

// 由组件的build方法调用，不建议直接使用
function createElement(type: string, props: { [k: string]: any }, ...children) {
  if (Array.isArray(children[0])) children = children[0]; // 适配 JSX 语法
  const hamburgerChildren = children.map(i => {
    if (typeof i === 'string' || typeof i === 'number') {
      return { type: null, props: { content: i.toString() }, children: [] };
    } else if ('build' in i) {
      return i.build();
    } else {
      return i;
    }
  });

  const result = {
    type,
    props,
    children: hamburgerChildren,
  };

  return hamburger.platform.createElement(result);
}

export default createElement;
