import * as React from 'react';
import { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { DOMElement, ChildElement, IHamburgerPlatform } from '@hamburger/core';

class ReactPlatform implements IHamburgerPlatform<ReactElement> {
  name = 'React';
  constructor() {}
  createElement(child: DOMElement): ReactElement {
    if (child.type === null) {
      return child.props.content; // TextNode
    }
    let children: any = [];
    if (child.children && child.children.length >= 0) {
      children.push(...child.children.map((i) => this.createElement(i)));
    }
    return React.createElement(child.type, child.props, ...children);
  }

  render(root: ReactElement | ChildElement, id: string) {
    // build it first when render Hamburger child element
    root = 'build' in root ? root.build() : root;
    return ReactDOM.render(React.createElement(root), document.getElementById(id));
  }
}

export default new ReactPlatform();
