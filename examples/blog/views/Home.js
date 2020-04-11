import { Button, HStack, GridCol, GridRow, VStack, Text, Link, Layout, PureHTML, List } from 'hamburger-js';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Aside from '../components/Aside';
import { JumbotronSubtitle, JumbotronTitle, mainPost, posts } from '../mockData';
import MarkdownIt from 'markdown-it';
import { Card } from '../components/PostCard';

const md = new MarkdownIt();

function Jumbotron() {
  return VStack(
    Text(JumbotronTitle).theme('italic').tag('h2'),
    Text(JumbotronSubtitle).theme('muted').fontSize(18).margin({ vertical: '3' }),
    Link('继续阅读...').bold().theme('muted').margin({ bottom: '0' })
  )
    .theme('jumbotron', 'rounded')
    .padding('4');
}

function Display() {
  return GridRow(GridCol(Card(posts[0])), GridCol(Card(posts[1]))).margin({ bottom: '2' });
}

function MainBlog(post) {
  return GridCol(
    Text(post.tag).padding({ bottom: '4' }).theme('italic').tag('h3').class('border-bottom'),
    VStack(
      Text(post.title).tag('h2').class('blog-post-title'),
      Text(post.subtitle).class('blog-post-meta'),
      PureHTML(md.render(post.content))
    ).class('blog-post'),
    HStack(
      Button('上一页').theme('primary').margin({ right: 3 }),
      Button('下一页').theme('secondary-outline', 'disabled')
    ).class('blog-pagination')
  )
    .take(2 / 3)
    .class('blog-main');
}

export default function () {
  return Layout('top-main-bottom')
    .top(VStack(Header, VStack(Jumbotron(), Display())))
    .main(VStack(GridRow(MainBlog(mainPost), Aside())))
    .bottom(Footer);
}
