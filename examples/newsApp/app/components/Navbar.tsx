import React from 'react';
import { Navbar, NavItem } from 'hamburger-js';


function MyNav() {
  return Navbar(
    NavItem('首页'),
    NavItem('关注'),
    NavItem('推荐'),
    NavItem('设置'),
  );
}

export default MyNav;
