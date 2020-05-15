import { TextClass, TextProps } from './Text';
import { Conditional } from '../../common';

class LinkClass extends TextClass {
  constructor(content) {
    super(content);
    this._tag = 'a';
    this._props.href = '#';
  }

  href(_href: string, when?: boolean) {
    if (when !== false) this._props.href = _href;
    return this;
  }
}

type LinkProps = TextProps & { href?: Conditional<string> };
// @ts-ignore
export function Link(props: LinkProps): JSX.Element;
export function Link(content: string): LinkClass;
export function Link(content: string) {
  return new LinkClass(content);
}

Link.__class__ = LinkClass;
