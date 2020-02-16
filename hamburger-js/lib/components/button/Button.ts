import { ViewClass } from '../View';
import theme, { IButtonVariant, IHamburgerTheme, IShadow } from '../../themes';

class ButtonClass extends ViewClass<HTMLButtonElement, string> {
  constructor(content: string, variant: keyof IButtonVariant) {
    super();
    this._children = content;
    this._tag = 'button';
    this.class('btn', theme.button.variant[variant]);
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

export function Button(content: string, variant: keyof IButtonVariant = 'primary') {
  return new ButtonClass(content, variant);
}
