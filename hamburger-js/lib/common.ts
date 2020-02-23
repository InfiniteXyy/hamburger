export interface IBuildable {
  build(): Element;
}

export interface IThemeable {
  useTheme(name: string, when?: boolean): this;
}

export type ChildElement = Element | IBuildable;

const isReact = true;

export { isReact };
