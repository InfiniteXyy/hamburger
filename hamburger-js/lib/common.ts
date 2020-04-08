import { ViewClass } from "./components";

// 元素 或 元素的构造器，用 any 兼容第三方框架类型
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
