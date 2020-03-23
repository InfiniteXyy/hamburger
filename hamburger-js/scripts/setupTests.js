// setup file
import hamburger from '../lib';
const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

import React from 'react';
import ReactDOM from 'react-dom';

hamburger.setUp(React, ReactDOM);
configure({ adapter: new Adapter() });
