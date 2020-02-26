import { ViewClass } from './components/View';

export type ChildElement = Element | IBuildable | string;

export interface IBuildable {
  build(): Element;
}

export interface IThemeable {
  theme(name: string, when?: boolean): this;
}

export interface IChildIterable<ChildType> {
  mapItem(wrapper: (item: ChildType) => ChildElement)
}

const isReact = true;

export { isReact };
