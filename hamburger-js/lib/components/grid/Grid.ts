import { ChildElement, IChildIterable } from '../../common';
import { ViewClass } from '../View';

class GridRowClass extends ViewClass<HTMLDivElement, ChildElement[]> implements IChildIterable<GridColClass> {
  constructor(...elements: ChildElement[]) {
    super();
    if (Array.isArray(elements[0])) elements = elements[0];
    // GridRow 的子元素必须是 GridCol，否则样式上会有问题
    this._children = elements.map(i => i instanceof GridColClass ? i : new GridColClass(i));
    this.class('row');
  }

  public mapItem(wrapper) {
    this._children = this._children.map(wrapper);
    return this;
  }
}

class GridColClass extends ViewClass<HTMLDivElement, ChildElement[]> {
  constructor(...elements: ChildElement[]) {
    super();
    if (Array.isArray(elements[0])) elements = elements[0];
    this._children = elements;
    this.class('col');
  }

  public take(count: number) {
    // 划分为 12 格，拿几格
    this.class(`col-${count}`);
    return this;
  }
}

export function GridRow(...elementsOrTag: ChildElement[]) {
  return new GridRowClass(...elementsOrTag);
}

export function GridCol(...elementsOrTag: ChildElement[]) {
  return new GridColClass(...elementsOrTag);
}
