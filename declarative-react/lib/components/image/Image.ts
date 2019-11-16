import { ViewClass } from '../View';

class ImageClass extends ViewClass<HTMLImageElement, null> {
  constructor(src: string) {
    super();
    this._props.src = src;
    this._tag = 'img';
  }

  public round() {
    this._props.style.borderRadius = '100%';
    return this;
  }

  public roundCrop() {
    this.round();
    this._props.style.objectFit = 'cover';
    return this;
  }
}

export function Image(src: string) {
  return new ImageClass(src);
}
