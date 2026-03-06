import { ViewClass, ViewProps } from '../View';
import { Conditional, Primitive } from '../../types';

export class TextClass extends ViewClass {
  constructor(...content: (Primitive | TextClass)[]) {
    super();
    this._children = content;
    this._tag = 'p';
  }

  public content(content: string, when?: boolean): this {
    if (when === false) return this;
    this._children = [content];
    return this;
  }

  public bold(when?: boolean): this {
    if (when === false) return this;
    this.class('bold');
    return this;
  }

  public fontSize(value: string | number, when?: boolean): this {
    if (when === false) return this;
    this._props.style!.fontSize = value;
    return this;
  }

  public color(value: string, when?: boolean): this {
    if (when === false) return this;
    this._props.style!.color = value;
    return this;
  }

  public fontWeight(value: string | number, when?: boolean): this {
    if (when === false) return this;
    this._props.style!.fontWeight = value;
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

export function Text(props: TextProps): TextClass;
export function Text(...content: (Primitive | TextClass)[]): TextClass;
export function Text(...contentOrProps: (Primitive | TextClass | TextProps)[]): TextClass {
  if (
    contentOrProps.length === 1 &&
    typeof contentOrProps[0] === 'object' &&
    contentOrProps[0] !== null &&
    'content' in contentOrProps[0]
  ) {
    const props = contentOrProps[0] as TextProps;
    return new TextClass(props.content as string);
  }
  return new TextClass(...(contentOrProps as (Primitive | TextClass)[]));
}

(Text as { __class__?: typeof TextClass }).__class__ = TextClass;
