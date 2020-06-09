import { ChildElement, Conditional, IChildIterable, IFlexBox } from '../../types';
import { ViewClass, ViewProps } from '../View';
import { flatMap } from '../../utils';

class StackClass extends ViewClass implements IChildIterable<ViewClass>, IFlexBox {
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

  public nowrap(when?: boolean) {
    if (when !== false) this.class('flex-nowrap');
    return this;
  }

  public inflate(when?: boolean) {
    if (when !== false) this.class('fit');
    return this;
  }
}

export type StackProps = ViewProps & {
  reverse?: boolean;
  mapItem?: any;
  justifyContent?: Conditional<string>;
  alignItems?: Conditional<string>;
  nowrap?: boolean;
  inflate?: boolean;
};

// @ts-ignore
export function HStack(props: StackProps): JSX.Element;
export function HStack(...elements: (ChildElement | ChildElement[])[]);
export function HStack(...elements: (ChildElement | ChildElement[])[]) {
  const _elements = flatMap(elements, (i) => (Array.isArray(i) ? i : [i]));
  return new StackClass(true, _elements);
}

// @ts-ignore
export function VStack(props: StackProps): JSX.Element;
export function VStack(...elements: (ChildElement | ChildElement[])[]);
export function VStack(...elements: (ChildElement | ChildElement[])[]) {
  const _elements = flatMap(elements, (i) => (Array.isArray(i) ? i : [i]));
  return new StackClass(false, _elements);
}

VStack.__class__ = StackClass;
HStack.__class__ = StackClass;
