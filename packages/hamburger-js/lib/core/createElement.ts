import hamburger from '../index';

// 由组件的build方法调用，不建议直接使用
function createElement(type: string | Function, props: { [k: string]: any }, ...children) {
  if (Array.isArray(children[0])) children = children[0]; // 适配 JSX 语法
  const hamburgerChildren = children.map((i) => {
    if (typeof i === 'string' || typeof i === 'number') {
      return { type: null, props: { content: i.toString() }, children: [] };
    } else if ('build' in i) {
      return i.build();
    } else {
      return i;
    }
  });

  let result;
  if (hamburger.platform.name === 'Hamburger' && typeof type === 'function') {
    // handle JSX in hamburger
    if ('__class__' in (type as object)) {
      // if Hamburger component builder
      let component = type(...children);
      for (let builder in props) {
        if (builder in component) {
          component[builder].call(component, props[builder]);
        }
      }
      result = component.build();
    } else {
      // just run it with props
      result = type({ ...props, children });
    }
  } else {
    result = {
      type,
      props,
      children: hamburgerChildren,
    };
  }

  return hamburger.platform.createElement(result);
}

export default createElement;
