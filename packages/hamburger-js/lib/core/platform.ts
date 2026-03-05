import { DOMElement, HamburgerPlatform } from '../types';
import { domfy } from './domfy';

class DefaultPlatform implements HamburgerPlatform<DOMElement> {
  name = 'Hamburger';
  createElement(child: DOMElement): DOMElement {
    return child;
  }
  render(root: DOMElement, id: string): HTMLElement {
    const target = document.getElementById(id);
    if (!target) throw new Error(`Element with id "${id}" not found`);
    target.appendChild(domfy(root));
    return target;
  }
}

export { DefaultPlatform };
