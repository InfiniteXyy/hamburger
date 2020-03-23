// 元素的子元素必须是 元素 或 元素的构造器
export type ChildElement = string | number | IBuildable;

// 经过 build 后的元素
export type DOMElement = {
  type: string | null;
  props: { [key: string]: any };
  children: DOMElement[];
};

export interface IBuildable {
  build(): DOMElement;
}

export interface IThemeable {
  theme(...name: string[]): this;
}

export interface IChildIterable<ChildType> {
  mapItem(wrapper: (item: ChildType) => ChildElement);
}

export interface IFlexBox {
  nowrap(): this;
  justifyContent(position: 'center' | 'end'): this;
  alignItems(position: 'center'): this;
}
