export * from './components';
export * from './themes';
import { mount, createElement, buildElement } from './core';
export { ChildElement } from './common';

// 对外 API
const hamburger = {
  mount,
  createElement,
  buildElement
};

export default hamburger;
