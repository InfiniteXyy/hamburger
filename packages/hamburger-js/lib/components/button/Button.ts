import { ViewClass, ViewProps } from '../View';
import { Conditional } from '../../types';

class ButtonClass extends ViewClass {
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
  return new ButtonClass(content);
}

Button.__class__ = ButtonClass;
