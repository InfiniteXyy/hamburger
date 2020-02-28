import { ChildElement, HElement, isReact } from '../common';
import { buildElement } from '../core';
import ReactDOM from 'react-dom';

/**
 *
 * @param {*} element
 * @param {string} id
 */
function mount(element: ChildElement, id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  // 根据配置的内核，buildElement 返回的 element 类型也会不同
  // React 会返回 JSX.Element，默认会返回浏览器自带的 Element，因此可以直接使用 appendChild
  if (isReact) ReactDOM.render(buildElement(element) as JSX.Element, target);
  else target.appendChild(buildElement(element) as Element);
}

export default mount;