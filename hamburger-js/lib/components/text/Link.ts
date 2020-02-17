import { ViewClass } from '../View';
import { ITextVariant } from '../../themes';
import { TextClass } from './Text';

class LinkClass extends TextClass {
  constructor(content: string | number, variant: keyof ITextVariant) {
    super(content, variant);
    this._tag = 'a';
    this._props.href = '#';
  }

  href(_href: string) {
    this._props.href = _href;
    return this;
  }
}

export function Link(content: string | number, variant: keyof ITextVariant = 'p') {
  return new LinkClass(content, variant);
}
