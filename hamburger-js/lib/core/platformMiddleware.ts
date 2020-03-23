import { DOMElement } from '../common';
import hamburger from '../index';

const middleware = {
  createElement(child: DOMElement) {
    const [React] = hamburger.core;
    if (child.type === null) {
      return child.props.content; // TextNode
    }
    let children: any = [];
    if (child.children && child.children.length >= 0) {
      children.push(...child.children.map(this.createElement));
    }
    return React.createElement(child.type, child.props, ...children);
  },
  mount(root, id) {
    const [React, ReactDOM] = hamburger.core;
    ReactDOM.render(React.createElement(root), document.getElementById(id));
  },
};

export default middleware;
