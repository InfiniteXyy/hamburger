import { ChildElement } from '../types';
import { config } from '../config';

// 暴露给外部的接口，将组件挂载到网页上
function mount(element: ChildElement, id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  if (typeof element === 'string' || typeof element === 'number') {
    target.appendChild(document.createTextNode(element.toString()));
  } else {
    const platform = config.platform;
    // 对于函数式组件，直接render，通常在React中使用
    platform.render(element, id);
  }
}

export { mount };
