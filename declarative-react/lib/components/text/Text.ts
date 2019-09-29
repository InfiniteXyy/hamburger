import React from 'react';
import { ViewClass } from '../View';
import { FontWeightProperty, FontSizeProperty } from 'csstype';

class TextClass extends ViewClass<HTMLParagraphElement> {
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
    if (when !== false) this._style.color = color;
    return this;
  }

  public bold(when?: boolean) {
    if (when !== false) this._style.fontWeight = 'bold';
    return this;
  }

  public fontSize(value: FontSizeProperty<string | number>, when?: boolean) {
    if (when !== false) this._style.fontSize = value;
    return this;
  }

  public fontWeight(value: FontWeightProperty, when?: boolean) {
    if (when !== false) this._style.fontWeight = value;
    return this;
  }

  public build() {
    return React.createElement(
      this._tag,
      { style: this._style, className: this._classNames, id: this._id, ...this._props },
      this._content,
    );
  }
}
export function Text(content: string) {
  return new TextClass(content);
}
