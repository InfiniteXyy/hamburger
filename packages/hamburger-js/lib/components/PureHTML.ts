import { ViewClass } from './View';

class PureHTMLClass extends ViewClass<HTMLElement> {
  constructor(html: string) {
    super();
    this._props.dangerouslySetInnerHTML = { __html: html };
  }
}

export function PureHTML(html: string) {
  return new PureHTMLClass(html);
}
