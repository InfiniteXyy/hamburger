import { ViewClass } from '../View';
import { IThemeable } from '../../common';
import theme from '../../themes';

class ImageClass extends ViewClass<HTMLImageElement> implements IThemeable {
  constructor(src: string) {
    super();
    this._props.src = src;
    this._tag = 'img';
  }

  // 样式方法
  public theme(...name: string[]) {
    this.class(...name.map(i => theme.image.variant[i]));
    return this;
  }
}

export function Image(src: string) {
  return new ImageClass(src).class(theme.image.common);
}
