import { ViewClass } from '../View';
import { IThemeable } from '../../common';
import theme from '../../themes';

class ImageClass extends ViewClass<HTMLImageElement, null> implements IThemeable {
  constructor(src: string) {
    super();
    this._props.src = src;
    this._tag = 'img';
  }

  // 样式方法
  public theme(name: string, when?: boolean): this {
    if (when !== false) this.class(theme.image.variant[name]);
    return this;
  }
}

export function Image(src: string) {
  return new ImageClass(src).class(theme.image.common);
}
