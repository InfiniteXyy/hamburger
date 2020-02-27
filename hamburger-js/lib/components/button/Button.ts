import { ViewClass } from '../View';
import { IThemeable } from '../../common';
import theme from '../../themes';

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

  public theme(name: string, when?: boolean) {
    if (when !== false) this.class(theme.button.variant[name]);
    return this;
  }
}

export function Button(content: string) {
  return new ButtonClass(content).class(theme.button.common);
}
