import React from 'react';
import { ViewClass } from '../View';
import { buildElement, generateChildKey, wrapContainer } from '../../utils';
import { AlignItemsProperty, JustifyContentProperty } from 'csstype';
import theme from '../../themes';
import { ChildElement } from '../../common';

class StackClass extends ViewClass<HTMLDivElement, React.FunctionComponentElement<any>[]> {
  constructor(isHorizontal: boolean, ...elements: ChildElement[]) {
    super();
    this._children = elements.map(buildElement).map(generateChildKey);
    this.class(isHorizontal ? theme.layout.horizontal || 'hbg-row' : theme.layout.vertical);
  }

  public align(alignItems: AlignItemsProperty, when?: boolean) {
    if (when !== false) this._props.style.alignItems = alignItems;
    return this;
  }

  public justify(justifyContent: JustifyContentProperty, when?: boolean) {
    if (when !== false) this._props.style.justifyContent = justifyContent;
    return this;
  }
}

export function HStack(...elementsOrTag: ChildElement[]) {
  return new StackClass(true, ...elementsOrTag);
}

export function VStack(...elementsOrTag: ChildElement[]) {
  return new StackClass(false, ...elementsOrTag);
}
