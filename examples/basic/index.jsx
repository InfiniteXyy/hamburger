import App from './app/App';
import hamburger from '@hamburger/core';
import ReactPlatform from '@hamburger/platform-react';

hamburger.setPlatform(ReactPlatform).mount(App, 'root');
