import { ViewClass } from '../View';

class ButtonClass extends ViewClass<HTMLButtonElement, string> {
  constructor(content: string) {
    super();
    this._children = content;
    this._tag = 'button';
  }

  public content(content: string, when?: boolean) {
    if (when !== false) this._children = content;
    return this;
  }

  public disabled(when?: boolean) {
    if (when !== false) this._props.disabled = true;
    return this;
  }
}

export function Button(content: string) {
  return new ButtonClass(content);
}
