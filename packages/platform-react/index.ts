import * as React from 'react';
import { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { ChildElement, HamburgerPlatform } from '@hamburger/core';

class ReactPlatform implements HamburgerPlatform<ReactElement> {
  name = 'React';
  constructor() {}
  createElement(child: ChildElement): ReactElement {
    if (child.type === null) {
      return child.props.content; // TextNode
    }
    let children: any = [];
    if (child.children && child.children.length >= 0) {
      children.push(...child.children.map((i: any) => this.createElement(i)));
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
