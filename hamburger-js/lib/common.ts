import { ViewClass } from "./components";

// 元素的子元素必须是 元素 或 元素的构造器，这里元素可能是 ReactElement等第三方类型，所以用any
export type ChildElement = string | number | IBuildable | any;

// Platform 中间层元素
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

export interface IChildIterable<ChildType extends ViewClass<any>> {
  mapItem(wrapper: (item: ChildType) => ChildElement);
}

export interface IFlexBox {
  nowrap(): this;
  justifyContent(position: 'center' | 'end'): this;
  alignItems(position: 'center'): this;
}
