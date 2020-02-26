import theme from '../../themes';
import { FontSizeProperty, FontWeightProperty } from 'csstype';
import { ViewClass } from '../View';
import { IThemeable } from '../../common';

export class TextClass extends ViewClass<HTMLParagraphElement, any> implements IThemeable {
  constructor(...content: (string | TextClass)[]) {
    super();
    this._children = content;
    this._tag = 'p';
  }

  // 内容方法
  public content(content: string, when?: boolean) {
    if (when !== false) this._children = content;
    return this;
  }

  // 样式方法
  public bold(when?: boolean) {
    if (when !== false) this.class('font-weight-bold');
    return this;
  }

  public fontSize(value: FontSizeProperty<string | number>, when?: boolean) {
    if (when !== false) this._props.style.fontSize = value;
    return this;
  }

  public color(value: string, when?: boolean) {
    if (when !== false) this._props.style.color = value;
    return this;
  }

  public fontWeight(value: FontWeightProperty, when?: boolean) {
    if (when !== false) this._props.style.fontWeight = value;
    return this;
  }

  public theme(name: string, when?: boolean): this {
    if (when !== false) this.class(theme.text.variant[name]);
    return this;
  }
}

export function Text(...content: (string | TextClass)[]) {
  return new TextClass(...content);
}
