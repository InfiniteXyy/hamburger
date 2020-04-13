import { ChildElement, IChildIterable, IFlexBox, IThemeable } from '../../common';
import { ViewClass } from '../View';
import { flatMap } from '../../utils';
import hamburger from '../../index';

class StackClass extends ViewClass<HTMLDivElement> implements IChildIterable<ViewClass<any>>, IFlexBox, IThemeable {
  private isFlex: boolean;

  constructor(private isHorizontal: boolean, elements: ChildElement[]) {
    super();
    this._children = elements;
    this.isFlex = isHorizontal;
    this.class(isHorizontal ? 'flex' : null);
  }

  reverse(when?: boolean): this {
    if (when === false) return this;
    if (!this.isFlex) {
      this.isFlex = true;
      this.class('flex', 'flex-column');
    }
    this._props.style.flexDirection = this.isHorizontal ? 'row-reverse' : 'column-reverse';
    return this;
  }

  // 功能方法
  public mapItem(wrapper) {
    this._children = this._children.map(wrapper);
    return this;
  }

  // 布局方法
  public justifyContent(position, when?: boolean) {
    if (when === false) return this;
    if (!this.isFlex) {
      this.isFlex = true;
      this.class('flex', 'flex-column');
    }
    this.class(`justify-${position}`);
    return this;
  }

  public alignItems(position, when?: boolean) {
    if (when === false) return this;
    if (!this.isFlex) {
      this.isFlex = true;
      this.class('flex', 'flex-column');
    }
    this.class(`items-${position}`);
    return this;
  }

  public nowrap() {
    this.class('flex-nowrap');
    return this;
  }

  public inflate() {
    this.class('fit');
    return this;
  }

  public theme(...name: string[]): this {
    this.class(...name.map((i) => hamburger.theme.stack.variant[i]));
    return this;
  }
}

export function HStack(...elements: (ChildElement | ChildElement[])[]) {
  const _elements = flatMap(elements, (i) => (Array.isArray(i) ? i : [i]));
  return new StackClass(true, _elements);
}

export function VStack(...elements: (ChildElement | ChildElement[])[]) {
  const _elements = flatMap(elements, (i) => (Array.isArray(i) ? i : [i]));
  return new StackClass(false, _elements);
}
