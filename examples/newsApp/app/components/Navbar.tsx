import React from 'react';
import { HStack } from 'hamburger-js';

function NavItem(text: string, isActive = false) {
  return <li className="nav-item">
    <a className="nav-link" href="#">{text}</a>
  </li>;

}

function Navbar() {
  return HStack(
    NavItem('首页'),
    NavItem('关注'),
    NavItem('推荐'),
    NavItem('设置'),
  ).class('nav');
}

export default Navbar;
