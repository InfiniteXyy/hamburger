import React from 'react';
import { ViewClass } from './View';

class InputClass extends ViewClass {
  private _value: string;
  private _type?: string;
  private _props: React.HTMLProps<HTMLInputElement>;
  private _onChange: React.ChangeEventHandler<HTMLInputElement>;

  constructor(value: string, type?: string) {
    super();
    this._value = value;
    this._onChange = () => {};
    this._type = type;
    this._props = {};
  }

  public props(props: React.HTMLProps<HTMLInputElement>, when?: boolean) {
    if (when !== false) this._props = props;
    return this;
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
        style: this._styleObj,
        type: this._type,
        ...this._props,
      },
      null,
    );
  }
}

// TODO: use higher order function to specify type
export function Input(value: string, type?: string) {
  return new InputClass(value, type);
}
