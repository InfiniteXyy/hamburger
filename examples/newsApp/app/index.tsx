import { Layout } from 'hamburger-js';
import Navbar from './components/Navbar';
import AsideMenu from './components/AsideMenu';
import App from './components/App';
import React from 'react';

export default function Timeline() {
  return Layout('top-aside-main-bottom')
    .top(Navbar)
    .aside(AsideMenu)
    .main(App)
    .build();
}
