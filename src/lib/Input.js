import React from 'react';
import { ViewClass } from './View';

class InputClass extends ViewClass {
  constructor(value, onChange, type) {
    super();
    this._value = value;
    this._onChange = onChange;
    this._type = type;
  }

  build() {
    return (
      <input
        value={this._value}
        onChange={this._onChange}
        style={this._styleObj}
      />
    );
  }
}

export function Input(value, onChange, type) {
  return new InputClass(value, onChange, type);
}
