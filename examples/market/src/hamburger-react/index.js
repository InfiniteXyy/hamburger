import hamburger, { noTheme } from 'hamburger-js';
import React from 'react';
import ReactDOM from 'react-dom';
import Market from './Market';

hamburger.applyTheme(noTheme).setUp(React, ReactDOM).mount(Market, 'hamburger-react-app');
