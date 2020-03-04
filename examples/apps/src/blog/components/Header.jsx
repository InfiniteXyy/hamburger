import { VStack, GridRow, Link, Button, Text, GridCol, HStack } from 'hamburger-js';
import { Card } from './Card';
import { JumbotronSubtitle, JumbotronTitle, links, posts } from '../mockData';
import { Icon } from 'hamburger-js/lib';

function NavLink(text) {
  return Link(text).theme('muted').margin({ horizontal: '4' });
}

const Title = VStack(
  GridRow(
    GridCol(Link('RSS 订阅').theme('muted')),
    GridCol(Text('InfiniteX').theme('h4')).centerText(),
    GridCol(
      Icon('search').margin({ right: '3' }).color('gray'),
      Button('注册').theme('secondary-outline'),
    ).justifyContent('end').alignItems('center'),
  ).alignItems('center').nowrap(),
).class('blog-header').padding({ vertical: '3' });

const Nav = VStack(
  HStack(links.map(NavLink)).class('nav'),
).class('nav-scroller').padding({ vertical: '1' }).margin({ bottom: '2' });

const Jumbotron = VStack(
  Text(JumbotronTitle).theme('italic').tag('h2'),
  Text(JumbotronSubtitle).theme('muted').fontSize(18).margin({ vertical: '3' }),
  Link('继续阅读...').bold().theme('muted').margin({ bottom: '0' }),
).theme('jumbotron', 'rounded').padding('4');

const Display = GridRow(
  GridCol(Card(posts[0])),
  GridCol(Card(posts[1])),
).margin({ bottom: '2' });

const Header = VStack(Title, Nav, Jumbotron, Display).theme('container');

export default Header;
