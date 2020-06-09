import { ChildElement, HamburgerPlatform } from './types';
import { config } from './config';
import { mount, createElement } from './core';

const hamburger = {
  setPlatform(platform: HamburgerPlatform) {
    config.platform = platform;
    return this;
  },

  mount(child: ChildElement, id: string) {
    const element = 'build' in child ? child.build() : child;
    return mount(element, id);
  },

  createElement(type: string, props: { [k: string]: any }, ...children) {
    return createElement(type, props, ...children);
  },
};

export * from './components';

export { listen, reactive } from './core';
export { HamburgerPlatform, ChildElement } from './types';
export default hamburger;
