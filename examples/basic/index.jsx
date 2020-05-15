import App from './app/App';
import hamburger from '@hamburger/core';
import React from 'react';
import ReactDOM from 'react-dom';

hamburger.setUp(React, ReactDOM).mount(App, 'root');
