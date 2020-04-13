import { ChildElement } from './common';

export * from './components';
export * from './themes';

import { mount, createElement, IHamburgerPlatform } from './core';
import { HamburgerPlatform, ReactPlatform, VuePlatform } from './core/platform';
import { IHamburgerTheme, noTheme } from './themes';
export { ChildElement } from './common';

export { listen, reactive, meta, IHamburgerPlatform } from './core';

class Hamburger {
  platform: IHamburgerPlatform<any> = new HamburgerPlatform();
  theme: IHamburgerTheme = noTheme;

  setUp(coreEngine, domEngine?) {
    console.log(coreEngine.name);
    if (coreEngine.name === 'Vue') {
      this.platform = new VuePlatform(coreEngine);
    } else {
      this.platform = new ReactPlatform(coreEngine, domEngine);
    }
    return this;
  }

  applyTheme(theme: IHamburgerTheme) {
    this.theme = theme;
    return this;
  }

  mount(element: ChildElement, id: string) {
    return mount(element, id);
  }

  createElement(type: string, props: { [k: string]: any }, ...children) {
    return createElement(type, props, ...children);
  }
}

export default new Hamburger();
