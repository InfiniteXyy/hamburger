import { ChildElement } from 'hamburger-js';

interface IRoute {
  path: string;
  view: ChildElement;
}

declare class HamburgerStaticConfig {
  private config;
  route(routeMap: IRoute[]): this;
  output(path: ChildElement): void;
  template(file: string, target: string): this;
}

export default function staticWebManager(): HamburgerStaticConfig;
