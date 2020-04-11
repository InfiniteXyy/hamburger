import { GridRow, Layout, VStack, Text } from 'hamburger-js';
import Header from '../components/Header';
import md from 'markdown-it'

import Footer from '../components/Footer';

export default function (post) {
  return Layout('top-main-bottom')
    .top(Header)
    .main(Text(md().render(post.content)))
    .bottom(Footer);
}

