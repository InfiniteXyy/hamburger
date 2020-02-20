import { ViewClass } from '../View';
import { FontSizeProperty, FontWeightProperty } from 'csstype';
import theme, { ITextVariant } from '../../themes';

export class TextClass extends ViewClass<HTMLParagraphElement, string | number> {
  constructor(content: string | number, variant: keyof ITextVariant) {
    super();
    this._children = content;
    this._tag = 'div';
    if (!!theme.text.variant[variant]) this.class(theme.text.variant[variant]);
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
export function Text(content: string | number, variant: keyof ITextVariant = 'p') {
  return new TextClass(content, variant);
}
