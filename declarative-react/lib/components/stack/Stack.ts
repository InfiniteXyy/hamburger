import React from 'react';
import { ViewClass } from '../View';
import { generateChildKey } from '../../utils';
import { AlignItemsProperty, JustifyContentProperty } from 'csstype';

type ChildElement = JSX.Element | ViewClass<any>;

class StackClass extends ViewClass<HTMLDivElement> {
  protected _elements: ChildElement[];
  constructor(...elements: ChildElement[]) {
    super();
    this._style.display = 'flex';
    this._style.flexDirection = 'column';
    this._elements = elements;
  }

  public align(alignItems: AlignItemsProperty, when?: boolean) {
    if (when !== false) this._style.alignItems = alignItems;
    return this;
  }

  public justify(justifyContent: JustifyContentProperty, when?: boolean) {
    if (when !== false) this._style.justifyContent = justifyContent;
    return this;
  }

  public build() {
    return React.createElement(
      this._tag,
      {
        style: this._style,
        className: !!this._classNames ? this._classNames : undefined,
        id: this._id,
        ...this._props,
      },
      this._elements.map(i => (i instanceof ViewClass ? i.build() : i)).map(generateChildKey),
    );
  }

  public horizontal(when?: boolean) {
    if (when !== false) this._style.flexDirection = 'row';
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
