import { toCSS, domfy } from './domfy';
import { deepEqual } from 'fast-equals';
import { DOMElement } from '../types';

type Props = Record<string, unknown>;

const isEvent = (key: string): boolean => key.startsWith('on');
const isProperty = (key: string): boolean => !isEvent(key);
const isNew =
  (prev: Props, next: Props) =>
  (key: string): boolean =>
    prev[key] !== next[key];
const isGone =
  (_prev: Props, next: Props) =>
  (key: string): boolean =>
    !(key in next);

function updateDom(dom: Element, parentDom: Element | null, prevProps: Props, nextProps: Props): void {
  // Remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach((name) => {
      dom.removeAttribute(name);
    });

  // Set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      if (name === 'content') {
        if (parentDom) (parentDom as HTMLElement).innerText = nextProps[name] as string;
      } else if (name === 'style') {
        (dom as HTMLElement).style.cssText = toCSS(nextProps[name] as Record<string, string | number>);
      } else {
        (dom as unknown as Record<string, unknown>)[name] = nextProps[name];
      }
    });

  // Remove prev listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name] as EventListener);
    });

  // Update event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name] as EventListener);
    });
}

function replaceDOM(dom: Element | Text, newTree: DOMElement): void {
  dom.parentNode!.replaceChild(domfy(newTree), dom);
}

function reconcileChildren(
  node: Element | Text,
  prevTree: DOMElement,
  curTree: DOMElement,
  parentNode: Element | null = null,
): void {
  if (prevTree.type !== curTree.type) {
    replaceDOM(node, curTree);
  } else {
    if (!deepEqual(prevTree.props, curTree.props)) {
      updateDom(node as Element, parentNode, prevTree.props as Props, curTree.props as Props);
    }
    if (prevTree.children.length !== curTree.children.length) {
      replaceDOM(node, curTree);
    } else {
      for (let i = 0; i < prevTree.children.length; i++) {
        reconcileChildren((node as Element).children[i], prevTree.children[i], curTree.children[i], node as Element);
      }
    }
  }
}

const shouldReactive = true;

function rerender(node: Element | Text, prevTree: DOMElement | null, curTree: DOMElement): void {
  if (!prevTree) {
    replaceDOM(node, curTree);
    return;
  }
  if (shouldReactive) {
    reconcileChildren(node, prevTree, curTree);
  } else {
    const parent = node.parentNode!;
    const newNode = domfy(curTree);
    parent.replaceChild(newNode, node);
  }
}

export default rerender;
