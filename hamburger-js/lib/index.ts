import { ChildElement, DOMElement } from './common';

export * from './components';
export * from './themes';
import { mount, createElement, IHamburgerPlatform } from './core';
import { HamburgerPlatform, ReactPlatform } from './core/platform';
export { ChildElement } from './common';

// 对外 API
const hamburger = {
  platform: new HamburgerPlatform(),
  setUp(coreEngine, domEngine) {
    this.platform = new ReactPlatform(coreEngine, domEngine);
    return this;
  },
  mount,
  createElement,
};

export default hamburger;
