import { AlignItemsProperty, JustifyContentProperty } from 'csstype';
import { ChildElement } from '../../common';
import { buildElement } from '../../utils';
import { ViewClass } from '../View';

class StackClass extends ViewClass<HTMLDivElement, ChildElement[]> {
  constructor(private isHorizontal: boolean, ...elements: ChildElement[]) {
    super();
    if (Array.isArray(elements[0])) elements = elements[0];
    this._children = elements;
    this.class(isHorizontal ? 'hbg-row' : 'hbg-col');
  }

  // 功能方法
  public mapItem(wrapper: (item: ViewClass<any, any>) => ChildElement) {
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
    this.class('hbg-align-center');
    return this;
  }

  public expandItems() {
    this.class('hbg-space-between');
    return this;
  }

  public inflate() {
    if (!this.isHorizontal) {
      this.class('hbg-inflate-horizontal');
    } else {
      this.class('hbg-inflate-vertical');
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
