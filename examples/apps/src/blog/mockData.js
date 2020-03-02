export const links = ['写作', '归档', '标签', '关于'];
export const JumbotronTitle = 'TypeScript学习笔记';
export const JumbotronSubtitle =
  'TypeScript是一种开源的编程语言，该语言项目由微软进行维护和管理。TypeScript不仅包含JavaScript的语法，而且还提供...';

export const posts = [
  {
    tag: '算法',
    title: '暴力搜索',
    time: '2019年09月16日',
    description: '搜索即遍历所有情况，找到正确答案。在很多情况下，搜索又被称作暴力算法...',
    img: 'https://images.unsplash.com/photo-1582100472526-b74c63e62d35?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixlib=rb-1.2.1&q=80&w=400',
  },
  {
    tag: '算法',
    title: '动态规划',
    time: '2019年09月20日',
    description: '虽然动态规划这名字听起来挺玄乎的，但在我看来，动态规划无非是在暴力搜索下的一种优化...',
    img: 'https://images.unsplash.com/photo-1445359179985-460648949e10?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=400',
  },
];

export const mainPost = {
  tag: '学习笔记',
  title: '记 Webpack 的第一次学习',
  subtitle: '2020年1月 by InfiniteX',
  content:
    '你是否遇到过这样的情况？当你想开发一个项目。起初，你只有一个 html 文件，一切看起来都是那么简单轻松，但当代码行数逐渐变多的时候，在一个文件里面写代码已经完全吃不消了。于是，你开始把代码分散在不同的文件里，例如，样式放到 css，脚本放到 js 里，在项目比较小的时候，这似乎也没什么问题，但随着项目的变大，你的 html 里链接了各种脚本，这使你维护起来即为麻烦。\n' +
    '要是能有一个工具，能自动帮我把分散的脚本整合起来就好啦，同时我也不需要考虑引入的顺序 OMG。\n' +
    'Webpack 就是这样一个工具。\n' +
    '简单而言，它做的就是将分离的模块打包在一起的功能。这里的模块包括 css 文件、js 脚本、图片等等。\n' +
    '它有以下两个核心概念，大概就那么简单！' +
    '另外，webpack 还提供插件的功能，可以在打包的同时对代码进行各种操作，(例如压缩等等)，也可以设置不同模式，让 webpack 根据开发环境的不同选择不同的策略。\n' +
    '一句话总结\n' +
    'webpack是一个用来将多个文件打包的工具，可以设置loader来对不同种类的文件打包，同时可以用插件扩展 webpack 的打包功能。',
};
