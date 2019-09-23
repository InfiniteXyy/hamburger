import React from 'react';
import { ViewClass } from './View';

class ButtonClass extends ViewClass {
  constructor(content) {
    super();
    this._content = content;
  }

  onClick(callback) {
    this.onClickCallback = callback;
    return this;
  }

  disabled(when) {
    this._disabled = when;
    return this;
  }

  build() {
    return React.createElement(
      'button',
      {
        onClick: this.onClickCallback,
        disabled: this._disabled,
        style: this._styleObj,
        className: this._classNames,
      },
      this._content,
    );
  }
}

export function Button(content) {
  return new ButtonClass(content);
}
