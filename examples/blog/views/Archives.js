import { GridRow, Layout, VStack, Text } from '@hamburger/core';
import Header from '../components/Header';

import Footer from '../components/Footer';

function About() {
  return VStack(
    Text('归档').tag('h2'),
    Text('这是归档界面')
  );
}

export default function() {
  return Layout('top-main-bottom')
    .top(Header())
    .main(About())
    .bottom(Footer);
}

