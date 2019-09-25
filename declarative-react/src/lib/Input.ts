import React from 'react';
import { ViewClass } from './View';

class InputClass extends ViewClass {
  private _value: string;
  private _type?: string;
  private _props: {};
  private _onChange: React.ChangeEventHandler<HTMLInputElement>;

  constructor(value: string, type?: string, props?: any) {
    super();
    this._value = value;
    this._onChange = () => {};
    this._type = type;
    this._props = props;
  }

  public onChange(callback: React.ChangeEventHandler<HTMLInputElement>) {
    this._onChange = callback;
    return this;
  }

  public build() {
    return React.createElement(
      'input',
      {
        value: this._value,
        onChange: this._onChange,
        style: this._styleObj,
        type: this._type,
        ...this._props,
      },
      null,
    );
  }
}

export function Input(value: string, type?: string, props?: any) {
  return new InputClass(value, type, props);
}
