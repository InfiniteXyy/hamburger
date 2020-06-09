import { ViewClass, ViewProps } from '../View';
import { Conditional, Primitive } from '../../types';

export class TextClass extends ViewClass {
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

  public fontSize(value: string | number, when?: boolean) {
    if (when !== false) this._props.style.fontSize = value;
    return this;
  }

  public color(value: string, when?: boolean) {
    if (when !== false) this._props.style.color = value;
    return this;
  }

  public fontWeight(value: string, when?: boolean) {
    if (when !== false) this._props.style.fontWeight = value;
    return this;
  }
}

export type TextProps = ViewProps & {
  color?: Conditional<string>;
  content?: Conditional<string>;
  bold?: boolean;
  fontSize?: Conditional<string | number>;
  fontWeight?: Conditional<string>;
  theme?: string[] | string;
};

// @ts-ignore
export function Text(props: TextProps): JSX.Element;
export function Text(...content: (Primitive | TextClass)[]): TextClass;
export function Text(...content: (Primitive | TextClass)[]) {
  return new TextClass(...content);
}

Text.__class__ = TextClass;
