import { ChildElement, DOMElement, HamburgerPlatform, IBuildable } from './types';
import { config } from './config';
import { mount, createElement } from './core';

interface HamburgerInstance {
  setPlatform(platform: HamburgerPlatform): HamburgerInstance;
  mount(child: ChildElement, id: string): void;
  createElement(type: string, props: Record<string, unknown>, ...children: ChildElement[]): DOMElement;
}

const hamburger: HamburgerInstance = {
  setPlatform(platform: HamburgerPlatform): HamburgerInstance {
    config.platform = platform;
    return this;
  },

  mount(child: ChildElement, id: string): void {
    const element = child && typeof child === 'object' && 'build' in child ? (child as IBuildable).build() : child;
    return mount(element, id);
  },

  createElement(type: string, props: Record<string, unknown>, ...children: ChildElement[]): DOMElement {
    return createElement(type, props, children);
  },
};

export * from './components';

export { listen, reactive } from './core';
export { HamburgerPlatform, ChildElement, DOMElement, IBuildable } from './types';
export default hamburger;
