import { ViewClass } from '../View';

class ImageClass extends ViewClass {
  constructor(src: string) {
    super();
    this._props.src = src;
    this._tag = 'img';
  }
}

export function Image(src: string): ImageClass {
  return new ImageClass(src);
}

(Image as { __class__?: typeof ImageClass }).__class__ = ImageClass;
