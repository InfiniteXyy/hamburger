import React from 'react';
import ReactDOM from 'react-dom';
import hamburger from 'hamburger-js';
import App from './src';

hamburger.setUp(React, ReactDOM).mount(App, 'root');
