import { ViewClass } from '../View';
import { ChildElement } from '../../types';
import { flatMap } from '../../utils';

class ListClass extends ViewClass {
  constructor(elements: ChildElement[]) {
    super();
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

export function List(...elements: (ChildElement | ChildElement[])[]): ListClass {
  const _elements = flatMap(elements, (i) => (Array.isArray(i) ? i : [i]));
  return new ListClass(_elements);
}

export function ListItem(element: ChildElement): ListItemClass {
  return new ListItemClass(element);
}

(List as { __class__?: typeof ListClass }).__class__ = ListClass;
(ListItem as { __class__?: typeof ListItemClass }).__class__ = ListItemClass;
