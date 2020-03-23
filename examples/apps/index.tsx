import React from 'react';
import hamburger, { applyTheme, bootstrapTheme } from 'hamburger-js';
import App from './src';

applyTheme(bootstrapTheme);
hamburger.mount(App, 'root');
