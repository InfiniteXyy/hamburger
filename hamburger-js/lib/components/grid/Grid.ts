import { ChildElement, IChildIterable } from '../../common';
import { ViewClass } from '../View';
import { flatMap } from '../../utils';

class GridRowClass extends ViewClass<HTMLDivElement> implements IChildIterable<GridColClass> {
  constructor(elements: ChildElement[]) {
    super();
    // GridRow 的子元素必须是 GridCol，否则样式上会有问题
    this._children = elements.map(i => i instanceof GridColClass ? i : new GridColClass([i]));
    this.class('row');
  }

  public mapItem(wrapper) {
    this._children = this._children.map(wrapper);
    return this;
  }
}

class GridColClass extends ViewClass<HTMLDivElement> {
  constructor(elements: ChildElement[]) {
    super();
    this._children = elements;
    this.class('col');
  }

  public take(percent: number) {
    // 划分为 12 格，拿几格
    const takeAmount = Math.round(12 * percent);
    this.class(`col-${takeAmount}`);
    return this;
  }
}

export function GridRow(...elements: (ChildElement | ChildElement[])[]) {
  const _elements = flatMap(elements, i => Array.isArray(i) ? i : [i]);
  return new GridRowClass(_elements);
}

export function GridCol(...elements: (ChildElement | ChildElement[])[]) {
  const _elements = flatMap(elements, i => Array.isArray(i) ? i : [i]);
  return new GridColClass(_elements);
}
