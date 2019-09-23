import React from 'react';
import { ViewClass } from './View';

class InputClass extends ViewClass {
  constructor(value, onChange, type, props) {
    super();
    this._value = value;
    this._onChange = onChange;
    this._type = type;
    this._props = props;
  }

  build() {
    return (
      <input
        value={this._value}
        onChange={this._onChange}
        style={this._styleObj}
        type={this._type}
        {...this._props}
      />
    );
  }
}

export function Input(value, onChange, type, props) {
  return new InputClass(value, onChange, type, props);
}
