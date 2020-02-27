export * from './components';
export * from './themes';
import { mount, buildStaticHTML, createElement } from './core';

// 对外 API
const hamburger = {
  mount,
  buildStaticHTML,
  createElement,
};

export default hamburger;
