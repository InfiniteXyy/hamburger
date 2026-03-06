import { config } from '../config';
import { ChildElement, DOMElement, IBuildable } from '../types';

type ComponentFunction = ((...args: unknown[]) => IBuildable) & { __class__?: unknown };

function createElement(
  type: string | ComponentFunction,
  props: Record<string, unknown>,
  children: ChildElement[],
): DOMElement {
  if (Array.isArray(children[0])) children = children[0] as ChildElement[];

  const hamburgerChildren: DOMElement[] = children.map((i) => {
    if (typeof i === 'string' || typeof i === 'number' || typeof i === 'boolean') {
      return { type: null, props: { content: String(i) }, children: [] };
    } else if (i && typeof i === 'object' && 'build' in i) {
      return (i as IBuildable).build();
    } else {
      return i as DOMElement;
    }
  });

  let result: DOMElement;
  if (config.platform.name === 'Hamburger' && typeof type === 'function') {
    if ('__class__' in type) {
      const component = type(...children) as IBuildable & Record<string, unknown>;
      for (const builder in props) {
        if (builder in component && typeof component[builder] === 'function') {
          (component[builder] as (v: unknown) => void).call(component, props[builder]);
        }
      }
      result = component.build();
    } else {
      result = type({ ...props, children }) as unknown as DOMElement;
    }
  } else {
    result = {
      type: type as string,
      props,
      children: hamburgerChildren,
    };
  }

  return config.platform.createElement(result) as DOMElement;
}

export { createElement };
