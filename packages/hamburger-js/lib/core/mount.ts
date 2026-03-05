import { ChildElement, DOMElement } from '../types';
import { config } from '../config';

function mount(element: ChildElement, id: string): void {
  const target = document.getElementById(id);
  if (!target) return;
  if (typeof element === 'string' || typeof element === 'number') {
    target.appendChild(document.createTextNode(element.toString()));
  } else {
    const platform = config.platform;
    platform.render(element as DOMElement, id);
  }
}

export { mount };
