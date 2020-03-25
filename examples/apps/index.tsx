import React from 'react';
import ReactDOM from 'react-dom';
import hamburger, { applyTheme, bootstrapTheme } from 'hamburger-js';
import App from './src';

applyTheme(bootstrapTheme);
hamburger.setUp(React, ReactDOM).mount(App, 'root');
