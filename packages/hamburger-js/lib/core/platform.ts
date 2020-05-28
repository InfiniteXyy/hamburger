import { DOMElement } from '../common';
import domfy from './domfy';
import { IHamburgerPlatform } from '../index';

class HamburgerPlatform implements IHamburgerPlatform<DOMElement> {
  name = 'Hamburger';
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

const hamburgerPlatform = new HamburgerPlatform();
export default hamburgerPlatform;
