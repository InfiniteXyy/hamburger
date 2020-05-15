// setup file
import hamburger from '../lib';
const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
import ReactPlatform from '@hamburger/platform-react';
import React from 'react';

hamburger.setPlatform(ReactPlatform);
configure({ adapter: new Adapter() });
