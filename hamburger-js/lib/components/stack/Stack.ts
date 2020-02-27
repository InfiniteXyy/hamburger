import { AlignItemsProperty, JustifyContentProperty } from 'csstype';
import { ChildElement, IChildIterable } from '../../common';
import { ViewClass } from '../View';
import { flatMap } from '../../utils';

class StackClass extends ViewClass<HTMLDivElement> implements IChildIterable<ViewClass<any>> {
  constructor(private isHorizontal: boolean, elements: ChildElement[]) {
    super();
    this._children = elements;
    this.class(isHorizontal ? 'd-flex' : null);
  }

  // 功能方法
  public mapItem(wrapper) {
    this._children = this._children.map(wrapper);
    return this;
  }

  // 布局方法
  public align(alignItems: AlignItemsProperty) {
    this._props.style.alignItems = alignItems;
    return this;
  }

  public justify(justifyContent: JustifyContentProperty) {
    this._props.style.justifyContent = justifyContent;
    return this;
  }

  public centerItems() {
    this.class('align-items-center');
    return this;
  }

  public expandItems() {
    this.class('justify-content-between');
    return this;
  }

  public inflate() {
    if (this.isHorizontal) {
      // 上下布局，宽度撑满
      this.class('h-100');
    } else {
      // 左右布局，高度撑满
      this.class('w-100');
    }
    return this;
  }
}

export function HStack(...elements: (ChildElement | ChildElement[])[]) {
  const _elements = flatMap(elements, i => Array.isArray(i) ? i : [i]);
  return new StackClass(true, _elements);
}

export function VStack(...elements: (ChildElement | ChildElement[])[]) {
  const _elements = flatMap(elements, i => Array.isArray(i) ? i : [i]);
  return new StackClass(false, _elements);
}
