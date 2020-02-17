export interface IBuildable {
  build(): JSX.Element;
}

export type ChildElement = JSX.Element | IBuildable;
