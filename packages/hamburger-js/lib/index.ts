import { mount, createElement, HamburgerPlatform } from './core';
import { IHamburgerTheme, noTheme } from './themes';
import { ChildElement, DOMElement } from './common';

interface IHamburgerPlatform<PElement = any> {
  name: string;
  createElement(child: DOMElement): PElement; // platform element
  render(root: PElement, id: string): any;
}

class Hamburger {
  platform: IHamburgerPlatform<any> = HamburgerPlatform;
  theme: IHamburgerTheme = noTheme;

  setPlatform(platform: IHamburgerPlatform) {
    this.platform = platform;
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

export * from './components';
export * from './themes';

export { listen, reactive, meta } from './core';
export { ChildElement, DOMElement } from './common';
export { IHamburgerPlatform };
export default new Hamburger();
