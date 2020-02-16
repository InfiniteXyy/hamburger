import { Layout } from 'hamburger-js';
import Navbar from './components/Navbar';
import App from './components/App';
import React from 'react';

export default function Timeline() {
  return Layout('top-aside-main-bottom')
    .top(Navbar())
    .main(App())
    .build();
}
