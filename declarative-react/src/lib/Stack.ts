import React from 'react';
import { ViewClass } from './View';
import { generateChildKey } from './utils';
import { AlignItemsProperty, JustifyContentProperty } from 'csstype';

type ChildElement = JSX.Element | ViewClass;

abstract class StackClass extends ViewClass {
  protected _elements: ChildElement[];
  constructor(...elements: ChildElement[]) {
    super();
    this._elements = elements;
  }

  public align(alignItems: AlignItemsProperty, when?: boolean) {
    if (when !== false) this._styleObj.alignItems = alignItems;
    return this;
  }

  public justify(justifyContent: JustifyContentProperty, when?: boolean) {
    if (when !== false) this._styleObj.justifyContent = justifyContent;
    return this;
  }
}

class VStackClass extends StackClass {
  public build() {
    return React.createElement(
      this._tag,
      {
        style: this._styleObj,
        className: !!this._classNames ? this._classNames : undefined,
      },
      this._elements
        .map(i => (i instanceof ViewClass ? i.build() : i))
        .map(generateChildKey),
    );
  }
}

class HStackClass extends StackClass {
  public build() {
    return React.createElement(
      this._tag,
      {
        style: { ...this._styleObj, ...{ display: 'flex' } },
        className: !!this._classNames ? this._classNames : undefined,
      },
      this._elements
        .map(i => (i instanceof ViewClass ? i.build() : i))
        .map(generateChildKey),
    );
  }
}

export function HStack(...elements: ChildElement[]) {
  return new HStackClass(...elements);
}

export function VStack(
  tag: string,
): (...elements: ChildElement[]) => VStackClass;
export function VStack(...elements: ChildElement[]): VStackClass;

export function VStack(...elementsOrTag: (ChildElement | string)[]) {
  if (typeof elementsOrTag[0] === 'string') {
    return (...elements: ChildElement[]) => {
      return VStack(...elements).tag(elementsOrTag[0] as string);
    };
  }
  return new VStackClass(...(elementsOrTag as ChildElement[]));
}
