import { ChildElement, HElement } from '../common';

function buildElement(child: ChildElement): HElement {
  // Element 或 string 不需要进行 build，否则调用它的 build
  if (typeof child === 'string') return child;
  if ('build' in child) return child.build();
  return child;
}

export default buildElement;
