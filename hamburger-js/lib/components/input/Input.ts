import React from 'react';
import { ViewClass } from '../View';

type HookModel<T> = [T, (value: T) => void];

class InputClass extends ViewClass<HTMLInputElement, null> {
  constructor(value: string, type?: string) {
    super();
    this._props.value = value;
    this._props.type = type;
    this._tag = 'input';
  }

  public onChange(callback: React.ChangeEventHandler<HTMLInputElement>) {
    this._props.onChange = callback;
    return this;
  }

  public bind<T>(onChange: (value: T) => void) {
    this._props.onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value as any);
    };
    return this;
  }
}

export function Input(value: string, type?: string) {
  return new InputClass(value, type);
}
