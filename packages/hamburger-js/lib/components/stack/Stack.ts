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
    this._props.style!.flexDirection = this.isHorizontal ? 'row-reverse' : 'column-reverse';
    return this;
  }

  public mapItem(wrapper: (item: ViewClass) => ChildElement): this {
    this._children = this._children.map(wrapper as (item: ChildElement) => ChildElement);
    return this;
  }

  public justifyContent(position: string, when?: boolean): this {
    if (when === false) return this;
    if (!this.isFlex) {
      this.isFlex = true;
      this.class('flex', 'flex-column');
    }
    this.class(`justify-${position}`);
    return this;
  }

  public alignItems(position: string, when?: boolean): this {
    if (when === false) return this;
    if (!this.isFlex) {
      this.isFlex = true;
      this.class('flex', 'flex-column');
    }
    this.class(`items-${position}`);
    return this;
  }

  public nowrap(when?: boolean): this {
    if (when === false) return this;
    this.class('flex-nowrap');
    return this;
  }

  public inflate(when?: boolean): this {
    if (when === false) return this;
    this.class('fit');
    return this;
  }
}

export type StackProps = ViewProps & {
  reverse?: boolean;
  mapItem?: (item: ViewClass) => ChildElement;
  justifyContent?: Conditional<string>;
  alignItems?: Conditional<string>;
  nowrap?: boolean;
  inflate?: boolean;
};

export function HStack(props: StackProps): StackClass;
export function HStack(...elements: (ChildElement | ChildElement[])[]): StackClass;
export function HStack(first?: StackProps | ChildElement | ChildElement[], ...rest: (ChildElement | ChildElement[])[]): StackClass {
  if (first && typeof first === 'object' && !Array.isArray(first) && 'children' in first && !('build' in first)) {
    return new StackClass(true, (first as StackProps).children || []);
  }
  const all = first !== undefined ? [first as ChildElement | ChildElement[], ...rest] : rest;
  const _elements = flatMap(all, (i) => (Array.isArray(i) ? i : [i]));
  return new StackClass(true, _elements);
}

export function VStack(props: StackProps): StackClass;
export function VStack(...elements: (ChildElement | ChildElement[])[]): StackClass;
export function VStack(first?: StackProps | ChildElement | ChildElement[], ...rest: (ChildElement | ChildElement[])[]): StackClass {
  if (first && typeof first === 'object' && !Array.isArray(first) && 'children' in first && !('build' in first)) {
    return new StackClass(false, (first as StackProps).children || []);
  }
  const all = first !== undefined ? [first as ChildElement | ChildElement[], ...rest] : rest;
  const _elements = flatMap(all, (i) => (Array.isArray(i) ? i : [i]));
  return new StackClass(false, _elements);
}

(VStack as { __class__?: typeof StackClass }).__class__ = StackClass;
(HStack as { __class__?: typeof StackClass }).__class__ = StackClass;
