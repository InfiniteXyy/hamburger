import { GridRow, Layout, VStack, Text } from 'hamburger-js';
import Header from '../components/Header';

import Footer from '../components/Footer';

function About() {
  return VStack(
    Text('标签').tag('h2'),
    Text('这是标签界面')
  );
}

export default function() {
  return Layout('top-main-bottom')
    .top(Header)
    .main(About())
    .bottom(Footer);
}

