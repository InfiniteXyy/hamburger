import React from 'react';
import { ViewClass } from './View';
import { FontWeightProperty, FontSizeProperty } from 'csstype';

class TextClass extends ViewClass {
  private _content: string;
  constructor(content: string) {
    super();
    this._content = content;
    this._tag = 'p';
  }

  public content(content: string, when?: boolean) {
    if (when !== false) this._content = content;
    return this;
  }

  public color(color: string, when?: boolean) {
    if (when !== false) this._styleObj.color = color;
    return this;
  }

  public bold(when?: boolean) {
    if (when !== false) this._styleObj.fontWeight = 'bold';
    return this;
  }

  public fontSize(value: FontSizeProperty<string | number>, when?: boolean) {
    if (when !== false) this._styleObj.fontSize = value;
    return this;
  }

  public fontWeight(value: FontWeightProperty, when?: boolean) {
    if (when !== false) this._styleObj.fontWeight = value;
    return this;
  }

  public build() {
    return React.createElement(
      this._tag,
      { style: this._styleObj, className: this._classNames },
      this._content,
    );
  }
}
export function Text(content: string) {
  return new TextClass(content);
}
