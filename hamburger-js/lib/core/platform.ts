import { DOMElement } from '../common';
import { ReactElement } from 'react';
import domfy from './domfy';

export interface IHamburgerPlatform<PElement> {
  createElement(child: DOMElement): PElement; // platform element
  render(root: PElement, id: string): any;
}

class HamburgerPlatform implements IHamburgerPlatform<DOMElement> {
  createElement(child) {
    return child;
  }

  render(root, id) {
    const target = document.getElementById(id)!;
    target.appendChild(domfy(root));
    return target;
  }
}

class ReactPlatform implements IHamburgerPlatform<ReactElement> {
  constructor(public React, public ReactDOM) {}
  createElement(child: DOMElement): ReactElement {
    const { React } = this;
    if (child.type === null) {
      return child.props.content; // TextNode
    }
    let children: any = [];
    if (child.children && child.children.length >= 0) {
      // map 一定要谨慎使用！有可能会把子函数的 this 覆盖了
      children.push(...child.children.map(i => this.createElement(i)));
    }
    return React.createElement(child.type, child.props, ...children);
  }

  render(root: ReactElement, id: string) {
    const { React, ReactDOM } = this;
    return ReactDOM.render(React.createElement(root), document.getElementById(id));
  }
}

export { ReactPlatform, HamburgerPlatform };
