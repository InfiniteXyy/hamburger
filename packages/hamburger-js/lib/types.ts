export type Conditional<T> = T | [T, boolean];
export type Primitive = string | number | boolean;

export type ChildElement = Primitive | IBuildable | DOMElement;

export type HamburgerPlatform<PElement = unknown> = {
  name: string;
  createElement(child: DOMElement): PElement;
  render(root: PElement, id: string): unknown;
};

export type DOMElement = {
  type: string | null;
  props: { [key: string]: unknown };
  children: DOMElement[];
};

export interface IView extends IBuildable {}

export interface IBuildable {
  build(): DOMElement;
}

export interface IChildIterable<ChildType extends IView> {
  mapItem(wrapper: (item: ChildType) => ChildElement): this;
}

export interface IFlexBox {
  nowrap(): this;
  justifyContent(position: 'center' | 'end', when?: boolean): this;
  alignItems(position: 'center', when?: boolean): this;
}
