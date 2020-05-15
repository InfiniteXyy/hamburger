import { ViewClass } from '../View';

class IconClass extends ViewClass<any> {
  constructor(name: string) {
    super();
    this.tag('i');
    this.class(`gg-${name}`); // css.gg
  }

  color(value: string) {
    this.style({ color: value });
    return this;
  }
}

export function Icon(name: string) {
  return new IconClass(name);
}
