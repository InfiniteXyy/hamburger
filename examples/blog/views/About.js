import { GridRow, Layout, VStack, Text } from 'hamburger-js';
import Header from '../components/Header';

import Footer from '../components/Footer';

function About() {
  return VStack(
    Text('关于').tag('h2'),
    Text('这是一个静态博客项目')
  );
}

export default function() {
  return Layout('top-main-bottom')
    .top(Header)
    .main(About())
    .bottom(Footer);
}

