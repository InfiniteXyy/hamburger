import { VStack, GridRow, Link, Button, Text, GridCol, HStack, Icon } from '@hamburger/core';
import { links } from '../mockData';


function NavLink(navItem) {
  return Link(navItem.title).theme('muted').margin({ horizontal: '4' }).href(navItem.path);
}

function Title() {
  return VStack(
    GridRow(
      GridCol(Link('RSS 订阅').theme('muted')),
      GridCol(Text('InfiniteX').tag('h4')).centerText(),
      GridCol(Icon('search').margin({ right: '3' }).color('gray'), Button('注册').theme('secondary-outline'))
        .justifyContent('end')
        .alignItems('center')
    )
      .alignItems('center')
      .nowrap()
  )
    .class('blog-header')
    .padding({ vertical: '3' });
}

function Nav() {
  return VStack(HStack(links.map(NavLink)).class('nav'))
    .class('nav-scroller')
    .padding({ vertical: '1' })
    .margin({ bottom: '2' });
}

function Header() {
  return VStack(Title(), Nav());
}

export default Header;
