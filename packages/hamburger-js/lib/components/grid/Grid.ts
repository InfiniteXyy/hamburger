import { ChildElement, IChildIterable, IFlexBox } from '../../common';
import { ViewClass } from '../View';
import { flatMap } from '../../utils';

class GridRowClass extends ViewClass<HTMLDivElement> implements IChildIterable<GridColClass>, IFlexBox {
  private isFlexBox;

  constructor(elements: ChildElement[]) {
    super();
    this.isFlexBox = false;
    // GridRow 的子元素必须是 GridCol，否则样式上会有问题
    this._children = elements.map((i) => (i instanceof GridColClass ? i : new GridColClass([i])));
    this.class('row');
  }

  public mapItem(wrapper) {
    this._children = this._children.map(wrapper);
    return this;
  }

  // 布局方法
  public justifyContent(position) {
    if (!this.isFlexBox) {
      this.isFlexBox = true;
      this.class('flex');
    }
    this.class(`justify-${position}`);
    return this;
  }

  public alignItems(position) {
    if (!this.isFlexBox) {
      this.isFlexBox = true;
      this.class('flex');
    }
    this.class(`items-${position}`);
    return this;
  }

  public nowrap() {
    this.class('flex-nowrap');
    return this;
  }
}

class GridColClass extends ViewClass<HTMLDivElement> implements IFlexBox {
  private isFlexBox;
  constructor(elements: ChildElement[]) {
    super();
    this.isFlexBox = false;
    this._children = elements;
    this.class('col');
  }

  public take(percent: number) {
    // 划分为 12 格，拿几格
    const takeAmount = Math.round(12 * percent);
    this.class(`col-${takeAmount}`);
    return this;
  }

  // 布局方法
  public justifyContent(position) {
    if (!this.isFlexBox) {
      this.isFlexBox = true;
      this.class('flex');
    }
    this.class(`justify-${position}`);
    return this;
  }

  public alignItems(position) {
    if (!this.isFlexBox) {
      this.isFlexBox = true;
      this.class('d-flex');
    }
    this.class(`items-${position}`);
    return this;
  }

  public nowrap() {
    this.class('flex-nowrap');
    return this;
  }

  public centerText() {
    this.class('center');
    return this;
  }
}

export function GridRow(...elements: (ChildElement | ChildElement[])[]) {
  const _elements = flatMap(elements, (i) => (Array.isArray(i) ? i : [i]));
  return new GridRowClass(_elements);
}

export function GridCol(...elements: (ChildElement | ChildElement[])[]) {
  const _elements = flatMap(elements, (i) => (Array.isArray(i) ? i : [i]));
  return new GridColClass(_elements);
}

GridRow.__class__ = GridRowClass;
GridCol.__class__ = GridColClass;
