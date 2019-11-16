import { ViewClass } from '../View';
import { FontSizeProperty, FontWeightProperty } from 'csstype';

class TextClass extends ViewClass<HTMLParagraphElement, string | number> {
  constructor(content: string | number) {
    super();
    this._children = content;
    this._tag = 'p';
  }

  public content(content: string, when?: boolean) {
    if (when !== false) this._children = content;
    return this;
  }

  public color(color: string, when?: boolean) {
    if (when !== false) this._props.style.color = color;
    return this;
  }

  public bold(when?: boolean) {
    if (when !== false) this._props.style.fontWeight = 'bold';
    return this;
  }

  public fontSize(value: FontSizeProperty<string | number>, when?: boolean) {
    if (when !== false) this._props.style.fontSize = value;
    return this;
  }

  public fontWeight(value: FontWeightProperty, when?: boolean) {
    if (when !== false) this._props.style.fontWeight = value;
    return this;
  }
}
export function Text(content: string | number) {
  return new TextClass(content);
}
