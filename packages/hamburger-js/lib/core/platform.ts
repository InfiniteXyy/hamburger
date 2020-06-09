import { DOMElement, HamburgerPlatform } from '../types';
import { domfy } from './domfy';

class DefaultPlatform implements HamburgerPlatform<DOMElement> {
  name = 'Hamburger';
  createElement(child) {
    return child;
  }
  render(root, id) {
    const target = document.getElementById(id)!;
    target.appendChild(domfy(root));
    return target;
  }
}

export { DefaultPlatform };
