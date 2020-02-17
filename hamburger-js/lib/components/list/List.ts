import { ViewClass } from '../View';
import { ChildElement } from '../../common';
import { generateChildKey } from '../../utils';

class ListClass extends ViewClass<HTMLUListElement, any> {
  constructor(...listItems: ChildElement[]) {
    super();
    this._children = listItems.map(i => ('build' in i ? i.build() : i)).map(generateChildKey);
    this._tag = 'ul';
  }
}

class ListItemClass extends ViewClass<HTMLLIElement, any> {
  constructor(child: ChildElement) {
    super();
    this._children = 'build' in child ? child.build() : child;
    this._tag = 'li';
  }
}

export function List(...listItems: ChildElement[]) {
  return new ListClass(...listItems);
}

export function ListItem(item: ChildElement) {
  return new ListItemClass(item);
}
