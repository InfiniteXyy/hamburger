import React from 'react';
import { ViewClass } from '../View';

class InputClass extends ViewClass<HTMLInputElement> {
  private _value: string;
  private _type?: string;
  private _onChange: React.ChangeEventHandler<HTMLInputElement>;

  constructor(value: string, type?: string) {
    super();
    this._value = value;
    this._onChange = () => {};
    this._type = type;
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
        className: !!this._classNames ? this._classNames : undefined,
        style: this._style,
        type: this._type,
        id: this._id,
        ...this._props,
      },
      null,
    );
  }
}

export function Input(value: string, type?: string) {
  return new InputClass(value, type);
}
