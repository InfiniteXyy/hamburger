import hamburger from '@hamburger/core';
import React from 'react';
import ReactPlatform from '@hamburger/platform-react';
import App from './src/App';

hamburger.setPlatform(ReactPlatform).mount(App, 'root');
