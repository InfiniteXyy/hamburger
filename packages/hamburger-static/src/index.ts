import buildStaticHTML from './renderer';
import fs from 'node:fs';
import path from 'node:path';
import type { DOMElement, IBuildable } from '@hamburger/core';

interface IRoute {
  path: string;
  view: IBuildable | DOMElement;
}

interface StaticConfig {
  outputPath: string;
  template: { content: string; target: string } | null;
  assetsFolder: string | null;
  routeMap: IRoute[];
}

class HamburgerStaticConfig {
  private config: StaticConfig;

  constructor() {
    this.config = {
      outputPath: 'dist',
      template: null,
      assetsFolder: null,
      routeMap: [],
    };
  }

  output(outputPath: string): void {
    this.config.outputPath = outputPath;
    this.config.routeMap.forEach((route) => {
      const pagePath = path.join(outputPath, `${route.path || 'index'}.html`);
      const node =
        route.view && typeof route.view === 'object' && 'build' in route.view
          ? (route.view as IBuildable).build()
          : (route.view as DOMElement);
      const html = buildStaticHTML(node, {
        template: this.config.template ?? undefined,
      });
      const dir = path.dirname(pagePath);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(pagePath, html);
    });
    if (this.config.assetsFolder) {
      fs.cpSync(this.config.assetsFolder, this.config.outputPath, { recursive: true });
    }
  }

  route(routeMap: IRoute[]): this {
    this.config.routeMap = routeMap;
    return this;
  }

  template(file: string, target: string): this {
    const content = fs.readFileSync(file).toString();
    this.config.template = { content, target };
    return this;
  }

  assets(folder: string): this {
    this.config.assetsFolder = folder;
    return this;
  }
}

export default function staticWebManager(): HamburgerStaticConfig {
  return new HamburgerStaticConfig();
}
