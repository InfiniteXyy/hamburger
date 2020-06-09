import { toCSS, domfy } from './domfy';
import { deepEqual } from 'fast-equals';

// fork of didact
const isEvent = (key) => key.startsWith('on');
const isProperty = (key) => !isEvent(key);
const isNew = (prev, next) => (key) => prev[key] !== next[key];
const isGone = (prev, next) => (key) => !(key in next);

function updateDom(dom, parentDom, prevProps, nextProps) {
  // Remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach((name) => {
      dom.removeAttribute(name);
    });

  // Set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      if (name === 'content') {
        // for text node
        parentDom.innerText = nextProps[name];
      } else if (name === 'style') {
        dom[name] = toCSS(nextProps[name]);
      } else {
        dom[name] = nextProps[name];
      }
    });

  // Remove prev listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });

  // Update event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
}

function replaceDOM(dom, newTree) {
  dom.parentNode.replaceChild(domfy(newTree), dom);
}

function reconcileChildren(node, prevTree, curTree, parentNode = null) {
  let curNode = node;
  if (prevTree.type !== curTree.type) {
    // 若标签不同，则直接重新渲染
    replaceDOM(node, curTree);
  } else {
    // 若props不同，则对原来元素进行更新
    if (!deepEqual(prevTree.props, curTree.props)) {
      updateDom(curNode, parentNode, prevTree.props, curTree.props);
    }
    // 结构性变化，直接重新渲染
    if (prevTree.children.length !== curTree.children.length) {
      replaceDOM(node, curTree);
    } else {
      // 若子元素个数相同，则一一比较
      for (let i = 0; i < prevTree.children.length; i++) {
        reconcileChildren(curNode.children[i], prevTree.children[i], curTree.children[i], curNode);
      }
    }
  }
}

let shouldReactive = true;
function rerender(node, prevTree, curTree) {
  if (shouldReactive) {
    reconcileChildren(node, prevTree, curTree);
  } else {
    const parent = node.parentNode;
    const newNode = domfy(curTree);
    parent.replaceChild(newNode, node);
  }
}

export default rerender;
