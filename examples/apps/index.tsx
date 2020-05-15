import hamburger from '@hamburger/core';
import ReactPlatform from '@hamburger/platform-react';
import App from './src';

hamburger.setPlatform(ReactPlatform).mount(App, 'root');
