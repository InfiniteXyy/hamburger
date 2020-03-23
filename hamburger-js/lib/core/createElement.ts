import { ChildElement, DOMElement } from '../common';
import middleware from './platformMiddleware';
import hamburger from '../index';

function createElement(type: string, props: { [k: string]: any }, ..._children: ChildElement[]): DOMElement {
  let children = Array.isArray(_children) ? _children : [_children];
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
  if (hamburger.core.length === 0) {
    return result;
  } else {
    return middleware.createElement(result);
  }
}

export default createElement;
