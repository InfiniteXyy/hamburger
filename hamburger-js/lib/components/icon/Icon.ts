import { ViewClass } from '../View';

class IconClass extends ViewClass<any> {
  constructor(name: string) {
    super();
    this.tag('i');
    this.class('fas', `fa-${name}`); // font-awesome
  }

  color(value: string) {
    this.style({ color: value });
    return this;
  }
}

export function Icon(name: string) {
  return new IconClass(name);
}
