import { ChildElement, DOMElement } from './common';

export * from './components';
export * from './themes';
import { mount, createElement } from './core';
import { HamburgerPlatform, ReactPlatform } from './core/platform';
export { ChildElement } from './common';
export { listen, IHamburgerPlatform } from './core';
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
