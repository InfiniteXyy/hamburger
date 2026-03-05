import { TextClass, TextProps } from './Text';
import { Conditional, Primitive } from '../../types';

class LinkClass extends TextClass {
  constructor(content: Primitive) {
    super(content);
    this._tag = 'a';
    this._props.href = '#';
  }

  href(_href: string, when?: boolean): this {
    if (when === false) return this;
    this._props.href = _href;
    return this;
  }
}

type LinkProps = TextProps & { href?: Conditional<string> };

export function Link(props: LinkProps): LinkClass;
export function Link(content: string): LinkClass;
export function Link(contentOrProps: string | LinkProps): LinkClass {
  if (typeof contentOrProps === 'object') {
    return new LinkClass((contentOrProps.content as string) || '');
  }
  return new LinkClass(contentOrProps);
}

(Link as { __class__?: typeof LinkClass }).__class__ = LinkClass;
