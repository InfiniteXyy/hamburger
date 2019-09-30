import React from 'react';
import { ViewClass } from '../View';
import { generateChildKey } from '../../utils';
import { AlignItemsProperty, JustifyContentProperty } from 'csstype';

type ChildElement = JSX.Element | ViewClass<any, any>;

class StackClass extends ViewClass<HTMLDivElement, React.FunctionComponentElement<any>[]> {
  constructor(...elements: ChildElement[]) {
    super();
    this._props.style.display = 'flex';
    this._props.style.flexDirection = 'column';
    this._children = elements.map(i => (i instanceof ViewClass ? i.build() : i)).map(generateChildKey);
  }

  public align(alignItems: AlignItemsProperty, when?: boolean) {
    if (when !== false) this._props.style.alignItems = alignItems;
    return this;
  }

  public justify(justifyContent: JustifyContentProperty, when?: boolean) {
    if (when !== false) this._props.style.justifyContent = justifyContent;
    return this;
  }

  public horizontal(when?: boolean) {
    if (when !== false) this._props.style.flexDirection = 'row';
    return this;
  }
}

export function HStack(tag: string): (...elements: ChildElement[]) => StackClass;
export function HStack(...elements: ChildElement[]): StackClass;

export function HStack(...elementsOrTag: (ChildElement | string)[]) {
  if (typeof elementsOrTag[0] === 'string') {
    return (...elements: ChildElement[]) => {
      return VStack(...elements).tag(elementsOrTag[0] as string);
    };
  }
  return new StackClass(...(elementsOrTag as ChildElement[])).horizontal();
}

export function VStack(tag: string): (...elements: ChildElement[]) => StackClass;
export function VStack(...elements: ChildElement[]): StackClass;

export function VStack(...elementsOrTag: (ChildElement | string)[]) {
  if (typeof elementsOrTag[0] === 'string') {
    return (...elements: ChildElement[]) => {
      return VStack(...elements).tag(elementsOrTag[0] as string);
    };
  }
  return new StackClass(...(elementsOrTag as ChildElement[]));
}
