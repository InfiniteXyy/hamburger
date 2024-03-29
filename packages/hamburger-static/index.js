const buildStaticHTML = require('./renderer');
const fse = require('fs-extra');
const fs = require('fs');
const path = require('path');

class HamburgerStaticConfig {
  constructor() {
    this.config = {
      outputPath: 'dist',
      template: null,
      assetsFolder: null,
      routeMap: {},
    };
  }
  output(outputPath) {
    this.config.outputPath = outputPath;
    this.config.routeMap.forEach((route) => {
      const pagePath = path.join(outputPath, `${route.path || 'index'}.html`);
      const Node = 'build' in route.view ? route.view.build() : route.view;
      const html = buildStaticHTML(Node, { template: this.config.template });
      fse.outputFileSync(pagePath, html, console.error);
    });
    if (this.config.assetsFolder) {
      fse.copySync(this.config.assetsFolder, this.config.outputPath);
    }
  }

  route(routeMap) {
    this.config.routeMap = routeMap;
    return this;
  }

  template(file, target) {
    const content = fs.readFileSync(file).toString();
    this.config.template = { content, target };
    return this;
  }

  assets(folder) {
    this.config.assetsFolder = folder;
    return this;
  }
}

module.exports = function staticWebManager() {
  return new HamburgerStaticConfig();
};
