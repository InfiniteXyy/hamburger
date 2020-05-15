import { TextClass } from './Text';

class LinkClass extends TextClass {
  constructor(content) {
    super(content);
    this._tag = 'a';
    this._props.href = '#';
  }

  href(_href: string) {
    this._props.href = _href;
    return this;
  }
}

export function Link(content) {
  return new LinkClass(content);
}
