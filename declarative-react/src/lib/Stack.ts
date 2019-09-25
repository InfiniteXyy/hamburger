import React from 'react';
import { ViewClass } from './View';
import { generateChildKey } from './utils';
import { AlignItemsProperty, JustifyContentProperty } from 'csstype';

abstract class StackClass extends ViewClass {
  protected _elements: (JSX.Element | ViewClass)[];
  constructor(...elements: (JSX.Element | ViewClass)[]) {
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
      'div',
      {
        style: this._styleObj,
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
      'div',
      {
        style: { ...this._styleObj, ...{ display: 'flex' } },
      },
      this._elements
        .map(i => (i instanceof ViewClass ? i.build() : i))
        .map(generateChildKey),
    );
  }
}

export function HStack(...elements: (JSX.Element | ViewClass)[]) {
  return new HStackClass(...elements);
}

export function VStack(...elements: (JSX.Element | ViewClass)[]) {
  return new VStackClass(...elements);
}
