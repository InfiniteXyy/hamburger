import { FontSizeProperty, FontWeightProperty } from 'csstype';
import { ViewClass, ViewProps } from '../View';
import { Conditional, IThemeable, Primitive } from '../../common';
import hamburger from '../../index';

export class TextClass extends ViewClass<HTMLParagraphElement> implements IThemeable {
  constructor(...content: (Primitive | TextClass)[]) {
    super();
    this._children = content;
    this._tag = 'p';
  }

  // 内容方法
  public content(content: string, when?: boolean) {
    if (when !== false) this._children = [content];
    return this;
  }

  // 样式方法
  public bold(when?: boolean) {
    if (when !== false) this.class('bold');
    return this;
  }

  public fontSize(value: FontSizeProperty<string | number>, when?: boolean) {
    if (when !== false) this._props.style.fontSize = value;
    return this;
  }

  public color(value: string, when?: boolean) {
    if (when !== false) this._props.style.color = value;
    return this;
  }

  public fontWeight(value: FontWeightProperty, when?: boolean) {
    if (when !== false) this._props.style.fontWeight = value;
    return this;
  }

  public theme(...name: string[]): this {
    this.class(...name.map((i) => hamburger.theme.text.variant[i]));
    return this;
  }
}

export type TextProps = ViewProps & {
  color?: Conditional<string>;
  content?: Conditional<string>;
  bold?: boolean;
  fontSize?: Conditional<FontSizeProperty<string | number>>;
  fontWeight?: Conditional<FontWeightProperty>;
  theme?: string[] | string;
};

// @ts-ignore
export function Text(props: TextProps): JSX.Element;
export function Text(...content: (Primitive | TextClass)[]): TextClass;
export function Text(...content: (Primitive | TextClass)[]) {
  return new TextClass(...content);
}

Text.__class__ = TextClass;
