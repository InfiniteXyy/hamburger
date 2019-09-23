import React from 'react';
import { ViewClass } from './View';
import { generateChildKey } from './utils';

class StackClass extends ViewClass {
  constructor(...elements) {
    super();
    this._elements = elements;
  }
}

class VStackClass extends StackClass {
  build() {
    return (
      <div style={this._styleObj}>
        {this._elements
          .map(i => (i.build ? i.build() : i))
          .map(generateChildKey)}
      </div>
    );
  }
}

class HStackClass extends StackClass {
  build() {
    return (
      <div style={{ ...this._styleObj, display: 'flex' }}>
        {this._elements
          .map(i => (i.build ? i.build() : i))
          .map(generateChildKey)}
      </div>
    );
  }
}

export function HStack(...elements) {
  return new HStackClass(...elements);
}

export function VStack(...elements) {
  return new VStackClass(...elements);
}
