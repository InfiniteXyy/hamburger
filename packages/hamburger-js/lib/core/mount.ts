import { ChildElement } from '../common';
import hamburger from '../index';

// 暴露给外部的接口，将组件挂载到网页上
function mount(element: ChildElement, id: string) {
  // @ts-ignore
  import('basscss/css/basscss.min.css');
  const target = document.getElementById(id);
  if (!target) return;
  if (typeof element === 'string' || typeof element === 'number') {
    target.appendChild(document.createTextNode(element.toString()));
  } else {
    const platform = hamburger.platform;
    // 对于函数式组件，直接render，通常在React中使用
    platform.render(element, id);
  }
}

export default mount;
