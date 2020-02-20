import React from 'react';
import { Navbar, NavItem } from 'hamburger-js';

const MyNav = Navbar(
  NavItem('NewsApp', { isBrand: true }),
  NavItem('首页'),
  NavItem('关注'),
  NavItem('设置'),
);

export default MyNav;
