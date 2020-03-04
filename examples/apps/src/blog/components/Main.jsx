import hamburger, { Button, HStack } from 'hamburger-js';
import { GridCol, GridRow, VStack, Text, Link } from 'hamburger-js';
import { List, PureHTML } from "hamburger-js/lib";
import { mainPost } from '../mockData';
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt();

function ItalicTitle(text) {
  return Text(text)
    .tag('h4')
    .theme('italic');
}

const Aside = GridCol(
  VStack(
    ItalicTitle('关于'),
    Text(
      '这是 ',
      Link('hamburger.js'),
      ' 的试验性博客界面，基于 Bootstrap，使用该框架复刻了 Bootstrap Examples 中的一个例子',
    ).margin({ bottom: 0 }),
  )
    .padding('4')
    .theme('rounded', 'bg-light'),
  VStack(ItalicTitle('归档'), List(Link('2020 三月'), Link('2020 二月'))).padding('4'),
  VStack(ItalicTitle('链接'), List(Link('Github'), Link('Twitter'))).padding('4'),
)
  .take(1 / 3)
  .class('blog-sidebar');

function MainBlog(post) {
  return GridCol(
    Text(post.tag).padding({ bottom: '4' }).theme('italic').tag('h3').class('border-bottom'),
    VStack(
      Text(post.title).tag('h2').class('blog-post-title'),
      Text(post.subtitle).class('blog-post-meta'),
      PureHTML(md.render(post.content)),
    ).class('blog-post'),
    HStack(
      Button('上一页').theme('primary').margin({ right: 3 }),
      Button('下一页').theme('secondary-outline', 'disabled'),
    ).class('blog-pagination'),
  )
    .take(2 / 3)
    .class('blog-main');
}

const Main = VStack(GridRow(MainBlog(mainPost), Aside)).class('container');

export default Main;
