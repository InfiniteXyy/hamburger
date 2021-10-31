import App from './src/App';
import hamburger from '@hamburger/core';

hamburger.mount(App(), 'root');

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept(function () {
    window.location.reload();
  });
}