import { AlignItemsProperty, JustifyContentProperty } from 'csstype';
import { ChildElement, IChildIterable } from '../../common';
import { ViewClass } from '../View';

class StackClass extends ViewClass<HTMLDivElement, ChildElement[]> implements IChildIterable<ViewClass<any, any>> {
  constructor(private isHorizontal: boolean, ...elements: ChildElement[]) {
    super();
    if (Array.isArray(elements[0])) elements = elements[0];
    this._children = elements;
    this.class(isHorizontal ? 'd-flex' : '');
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

export function HStack(...elementsOrTag: ChildElement[]) {
  return new StackClass(true, ...elementsOrTag);
}

export function VStack(...elementsOrTag: ChildElement[]) {
  return new StackClass(false, ...elementsOrTag);
}
