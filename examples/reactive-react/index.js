import hamburger from '@hamburger/core';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';

hamburger.setUp(React, ReactDOM).mount(App, 'root');
