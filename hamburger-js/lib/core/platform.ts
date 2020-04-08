import { ChildElement, DOMElement, IBuildable } from '../common';
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
    root = 'build' in root ? root.build() : root;
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
      children.push(...child.children.map((i) => this.createElement(i)));
    }
    return React.createElement(child.type, child.props, ...children);
  }

  render(root: ReactElement | ChildElement, id: string) {
    root = 'build' in root ? root.build() : root;
    const { React, ReactDOM } = this;
    return ReactDOM.render(React.createElement(root), document.getElementById(id));
  }
}

class VuePlatform implements IHamburgerPlatform<any> {
  constructor(public Vue) {}

  createElement(child: DOMElement): DOMElement {
    return child;
  }

  render(root: any, id: string) {
    const { Vue } = this;
    const meta = root.meta || {};
    new Vue({
      ...meta,
      render(h) {
        let _root = root.build(this);
        return h(_root.type, VuePlatform.mapProps(_root.props), VuePlatform.mapChildren(_root.children, h));
      },
    }).$mount('#root');
    return document.getElementById(id);
  }

  private static mapChildren(children, h) {
    if (!children) return null;
    const result = [];
    for (let i of children) {
      if (i.type === null) result.push(i.props.content);
      else result.push(h(i.type, VuePlatform.mapProps(i.props), VuePlatform.mapChildren(i.children, h)));
    }
    return result;
  }

  private static mapProps(props) {
    if (!props) return;
    let _props: any = {};
    for (let key in props) {
      if (key === 'className') _props.class = props[key];
      else if (key.startsWith('on')) {
        if (!_props.on) _props['on'] = {};
        _props['on'][key.substring(2).toLowerCase()] = props[key];
      } else _props[key] = props;
    }
    return _props;
  }
}

export { ReactPlatform, HamburgerPlatform, VuePlatform };
