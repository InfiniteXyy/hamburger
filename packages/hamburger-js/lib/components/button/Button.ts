import { ViewClass, ViewProps } from '../View';
import { Conditional } from '../../types';

class ButtonClass extends ViewClass {
  constructor(content: string = 'button') {
    super();
    this._tag = 'button';
    this._children = [content];
  }

  public content(content: string, when?: boolean): this {
    if (when === false) return this;
    this._children = [content];
    return this;
  }

  public disabled(when?: boolean): this {
    if (when === false) return this;
    this._props.disabled = true;
    return this;
  }
}

type ButtonProps = ViewProps & {
  content?: Conditional<string>;
  disabled?: boolean;
  theme?: string[] | string;
};

export function Button(props: ButtonProps): ButtonClass;
export function Button(content?: string): ButtonClass;
export function Button(contentOrProps?: string | ButtonProps): ButtonClass {
  if (typeof contentOrProps === 'object') {
    return new ButtonClass(contentOrProps.content as string | undefined);
  }
  return new ButtonClass(contentOrProps);
}

(Button as { __class__?: typeof ButtonClass }).__class__ = ButtonClass;
