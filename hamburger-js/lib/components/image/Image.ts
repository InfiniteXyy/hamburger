import { ViewClass } from '../View';
import theme, { IImageSize, IImageVariant } from '../../themes';

class ImageClass extends ViewClass<HTMLImageElement, null> {
  constructor(src: string, variant: keyof IImageVariant) {
    super();
    this._props.src = src;
    this._tag = 'img';
    this.class(theme.image.common);
    if (!!theme.image.variant[variant]) this.class(theme.image.variant[variant]);
  }

  public variant(variant: keyof IImageVariant) {
    this.class(theme.image.variant[variant]);
    return this;
  }

  public imageSize(size: keyof IImageSize) {
    this.class(theme.image.size[size]);
    return this;
  }
}

export function Image(src: string, variant: keyof IImageVariant = 'regular') {
  return new ImageClass(src, variant);
}
