import { isReact } from '../common';
import ReactDOM from 'react-dom';
import { buildElement } from '../utils';

function mount(element, id) {
  const target = document.getElementById(id);
  if (!target) return;
  // 根据配置的内核，buildElement 返回的 element 类型也会不同
  // React 会返回 JSX.Element，默认会返回浏览器自带的 Element，因此可以直接使用 appendChild
  if (isReact) ReactDOM.render(buildElement(element), target);
  else target.appendChild(buildElement(element));
}

export default mount;
