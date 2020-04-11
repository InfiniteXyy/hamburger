import { GridCol, Link, List, Text, VStack } from 'hamburger-js';

function ItalicTitle(text) {
  return Text(text).tag('h4').theme('italic');
}

function Aside() {
  return GridCol(
    VStack(
      ItalicTitle('关于'),
      Text(
        '这是 ',
        Link('hamburger.js'),
        ' 的试验性博客界面，基于 Bootstrap，使用该框架复刻了 Bootstrap Examples 中的一个例子'
      ).margin({ bottom: 0 })
    )
      .padding('3')
      .theme('rounded', 'bg-light'),
    VStack(ItalicTitle('归档'), List(Link('2020 三月'), Link('2020 二月'))).padding('4'),
    VStack(ItalicTitle('链接'), List(Link('Github'), Link('Twitter'))).padding('4')
  )
    .take(1 / 3)
    .class('blog-sidebar');
}

export default Aside;
