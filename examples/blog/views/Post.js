import { GridRow, Layout, VStack, Text, PureHTML } from '@hamburger/core';
import Header from '../components/Header';
import md from 'markdown-it'

import Footer from '../components/Footer';

export default function (post) {
  return Layout('top-main-bottom')
    .top(Header())
    .main(PureHTML(md().render(post.content)))
    .bottom(Footer);
}

