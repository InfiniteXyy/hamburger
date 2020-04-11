import { VStack, GridRow, Link, Button, Text, GridCol, HStack } from 'hamburger-js';
import { links } from '../mockData';
import { Icon } from 'hamburger-js/lib';

function NavLink(navItem) {
  return Link(navItem.title).theme('muted').margin({ horizontal: '4' }).href(navItem.path);
}

const Title = VStack(
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

const Nav = VStack(HStack(links.map(NavLink)).class('nav'))
  .class('nav-scroller')
  .padding({ vertical: '1' })
  .margin({ bottom: '2' });

const Header = VStack(Title, Nav);

export default Header;
