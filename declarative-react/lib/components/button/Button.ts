import React from 'react';
import { ViewClass } from '../View';

class ButtonClass extends ViewClass<HTMLButtonElement> {
  private _content: string;
  private _disabled: boolean;
  private _onClick?: (e: React.MouseEventHandler<HTMLInputElement>) => void;
  constructor(content: string) {
    super();
    this._content = content;
    this._disabled = false;
    this._onClick = undefined;
    this._tag = 'button';
  }

  public content(content: string, when?: boolean) {
    if (when !== false) this._content = content;
    return this;
  }

  public disabled(when?: boolean) {
    if (when === undefined) this._disabled = true;
    else this._disabled = when;
    return this;
  }

  public onClick(callback: (e: React.MouseEventHandler<HTMLInputElement>) => void) {
    this._onClick = callback;
    return this;
  }

  public build() {
    return React.createElement(
      this._tag,
      {
        onClick: this._onClick,
        disabled: this._disabled,
        style: this._style,
        className: this._classNames,
        id: this._id,
        ...this._props,
      },
      this._content,
    );
  }
}

export function Button(content: string) {
  return new ButtonClass(content);
}
