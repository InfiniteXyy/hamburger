import * as React from 'react';
import { ReactElement } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { DOMElement, HamburgerPlatform, IBuildable } from '@hamburger/core';

class ReactPlatform implements HamburgerPlatform<ReactElement> {
  name = 'React';
  private roots = new Map<string, Root>();

  createElement(child: DOMElement): ReactElement {
    if (child.type === null) {
      return (child.props.content as string) as unknown as ReactElement;
    }
    const children: ReactElement[] = [];
    if (child.children && child.children.length >= 0) {
      children.push(...child.children.map((i) => this.createElement(i)));
    }
    return React.createElement(child.type, child.props as Record<string, unknown>, ...children);
  }

  render(root: ReactElement | DOMElement | IBuildable, id: string): Root {
    const element = (root && typeof root === 'object' && 'build' in root)
      ? (root as IBuildable).build()
      : root as DOMElement;

    const container = document.getElementById(id);
    if (!container) throw new Error(`Element with id "${id}" not found`);

    let reactRoot = this.roots.get(id);
    if (!reactRoot) {
      reactRoot = createRoot(container);
      this.roots.set(id, reactRoot);
    }

    const reactElement = this.createElement(element);
    reactRoot.render(reactElement);
    return reactRoot;
  }
}

export default new ReactPlatform();
