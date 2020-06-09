import { ViewClass } from '../View';

class ImageClass extends ViewClass {
  constructor(src: string) {
    super();
    this._props.src = src;
    this._tag = 'img';
  }
}

export function Image(src: string) {
  return new ImageClass(src);
}

Image.__class__ = ImageClass;
