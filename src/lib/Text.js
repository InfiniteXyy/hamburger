import React from 'react';
import { ViewClass } from './View';

class TextClass extends ViewClass {
  constructor(content) {
    super();
    this._content = content;
  }

  build() {
    return <div style={this._styleObj}>{this._content}</div>;
  }

  color(color, when?): this {
    if (when !== false) this._styleObj.color = color;

    return this;
  }

  bold(when?): this {
    if (when !== false) this._styleObj.fontWeight = 'bold';

    return this;
  }

  size(value, when?): this {
    if (when !== false) {
      this._styleObj.fontSize = value;
    }
    return this;
  }
}
export function Text(content) {
  return new TextClass(content);
}
