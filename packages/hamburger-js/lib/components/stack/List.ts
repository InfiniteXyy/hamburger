import { ViewClass } from '../View';
import { ChildElement } from '../../types';
import { flatMap } from '../../utils';

class ListClass extends ViewClass {
  constructor(elements: ChildElement[]) {
    super();
    // GridRow 的子元素必须是 GridCol，否则样式上会有问题
    this._children = elements.map((i) => (i instanceof ListItemClass ? i : new ListItemClass(i)));
    this.tag('ol');
    this.class('list-reset');
  }
}

class ListItemClass extends ViewClass {
  constructor(element: ChildElement) {
    super();
    this.tag('li');
    this._children = [element];
  }
}

export function List(...elements: (ChildElement | ChildElement[])[]) {
  const _elements = flatMap(elements, (i) => (Array.isArray(i) ? i : [i]));
  return new ListClass(_elements);
}

export function ListItem(element: ChildElement) {
  return new ListItemClass(element);
}

List.__class__ = ListClass;
ListItem.__class__ = ListItemClass;
