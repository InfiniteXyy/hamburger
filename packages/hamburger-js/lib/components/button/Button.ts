import { ViewClass, ViewProps } from '../View';
import { Conditional, IThemeable } from '../../common';
import hamburger from '../../index';

class ButtonClass extends ViewClass<HTMLButtonElement> implements IThemeable {
  constructor(content: string = 'button') {
    super();
    this._tag = 'button';
    this._children = [content];
  }

  // 内容方法
  public content(content: string, when?: boolean) {
    if (when !== false) this._children = [content];
    return this;
  }

  // 样式方法
  public disabled(when?: boolean) {
    if (when !== false) this._props.disabled = true;
    return this;
  }

  public theme(...name: string[]) {
    this.class(...name.map((i) => hamburger.theme.button.variant[i]));
    return this;
  }
}

type ButtonProps = ViewProps & {
  content?: Conditional<string>;
  disabled?: boolean;
  theme?: string[] | string;
};

// @ts-ignore
export function Button(props: ButtonProps): JSX.Element;
export function Button(content: string): ButtonClass;
export function Button(content: string): ButtonClass {
  return new ButtonClass(content).class(hamburger.theme.button.common);
}

Button.__class__ = ButtonClass;
