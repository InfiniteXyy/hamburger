import hamburger, { noTheme } from 'hamburger-js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';
import 'antd/dist/antd.css';
import './styles.scss';

hamburger.setUp(React, ReactDOM).applyTheme(noTheme).mount(App, 'root');
