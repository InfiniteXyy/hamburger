import { ChildElement, DOMElement } from './common';

export * from './components';
export * from './themes';

import { mount, createElement } from './core';
import { HamburgerPlatform, ReactPlatform } from './core/platform';
import { bootstrapTheme, IHamburgerTheme } from './themes';
export { ChildElement } from './common';
export { listen, IHamburgerPlatform } from './core';

// 对外 API
const hamburger = {
  platform: new HamburgerPlatform(),
  theme: bootstrapTheme,
  setUp(coreEngine, domEngine) {
    this.platform = new ReactPlatform(coreEngine, domEngine);
    return this;
  },
  applyTheme(theme: IHamburgerTheme) {
    this.theme = theme;
    return this;
  },
  mount,
  createElement,
};

export default hamburger;
