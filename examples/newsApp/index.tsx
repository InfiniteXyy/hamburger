import React from 'react';
import App from './app';
import hamburger, { applyTheme, bootstrapTheme } from 'hamburger-js';

applyTheme(bootstrapTheme);
hamburger.mount(App, 'root');
// console.log(hamburger.buildStaticHTML(App));
