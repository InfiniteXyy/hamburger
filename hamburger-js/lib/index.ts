import { ChildElement, DOMElement } from './common';

export * from './components';
export * from './themes';
import { mount, createElement } from './core';
export { ChildElement } from './common';

interface IHamburger {
  core: any[];
  setUp(coreEngine: any, domEngine: any): this;
  mount(element: ChildElement, id: string): void;
  createElement(type: string, props: { [k: string]: any }, ..._children: ChildElement[]): DOMElement;
}

// 对外 API
const hamburger: IHamburger = {
  core: [],
  setUp(coreEngine, domEngine) {
    this.core = [coreEngine, domEngine];
    return this;
  },
  mount,
  createElement,
};

export default hamburger;
