import { ChildElement, DOMElement } from './common';

export * from './components';
export * from './themes';

import { mount, createElement } from './core';
import { HamburgerPlatform, ReactPlatform, VuePlatform } from './core/platform';
import { bootstrapTheme, IHamburgerTheme } from './themes';
export { ChildElement } from './common';
export { listen, meta, IHamburgerPlatform } from './core';

// 对外 API
const hamburger = {
  platform: new HamburgerPlatform(),
  theme: bootstrapTheme,
  setUp(coreEngine, domEngine?) {
    console.log(coreEngine.name);
    if (coreEngine.name === 'Vue') {
      this.platform = new VuePlatform(coreEngine);
    } else {
      this.platform = new ReactPlatform(coreEngine, domEngine);
    }
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
