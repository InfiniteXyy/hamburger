export * from './components/View';             // 空组件

export * from './components/input/Input';      // 输入框
export * from './components/image/Image';      // 图像
export * from './components/text/Text';        // 文字
export * from './components/text/Link';        // 超链接

export * from './components/stack/Stack';      // 栈布局
export * from './components/grid/Grid';        // 栅格布局
export * from './components/layout/Layout';    // 页面布局

export * from './components/button/Button';    // 按钮
export * from './components/nav/Navbar';       // 导航栏

export * from './themes';
import { mount, buildStaticHTML, createElement } from './core';

export default { mount, buildStaticHTML, createElement };


// const DefaultWhitelist = {
//   // Global attributes allowed on any supplied element below.
//   '*': ['class', 'dir', 'id', 'lang', 'role'],
//   a: ['target', 'href', 'title', 'rel'],
//   area: [],
//   b: [],
//   br: [],
//   col: [],
//   code: [],
//   div: [],
//   em: [],
//   hr: [],
//   h1: [],
//   h2: [],
//   h3: [],
//   h4: [],
//   h5: [],
//   h6: [],
//   i: [],
//   img: ['src', 'alt', 'title', 'width', 'height'],
//   li: [],
//   ol: [],
//   p: [],
//   pre: [],
//   s: [],
//   small: [],
//   span: [],
//   sub: [],
//   sup: [],
//   strong: [],
//   u: [],
//   ul: [],
// };
