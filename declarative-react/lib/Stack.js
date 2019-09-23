import React from 'react';
import { ViewClass } from './View';
import { generateChildKey } from './utils';

class StackClass extends ViewClass {
  constructor(...elements) {
    super();
    this._elements = elements;
  }

  align(alignItems, when) {
    if (when !== false) this._styleObj.alignItems = alignItems;
    return this;
  }

  justify(justifyContent, when) {
    if (when !== false) this._styleObj.justifyContent = justifyContent;
    return this;
  }
}

class VStackClass extends StackClass {
  build() {
    return React.createElement(
      'div',
      {
        style: this._styleObj,
      },
      this._elements.map(i => (i.build ? i.build() : i)).map(generateChildKey),
    );
  }
}

class HStackClass extends StackClass {
  build() {
    return React.createElement(
      'div',
      {
        style: { ...this._styleObj, ...{ display: 'flex' } },
      },
      this._elements.map(i => (i.build ? i.build() : i)).map(generateChildKey),
    );
  }
}

export function HStack(...elements) {
  return new HStackClass(...elements);
}

export function VStack(...elements) {
  return new VStackClass(...elements);
}
