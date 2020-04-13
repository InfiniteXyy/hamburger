import { ViewClass } from '../components';
import { DOMElement, IBuildable } from '../common';
import rerender from './reactive';

interface ListenerConfig {
  beforeUpdate?: (state?, target?, value?) => void;
  afterUpdate?: (state?, target?, value?) => void;
}

interface Consumer {
  componentFn: Function;
  args: any;
  lastTree: DOMElement | null;
}

const keyPool = [];
function randString(length: number): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  if (keyPool.includes(result)) return randString(length);
  keyPool.push(result);
  return result;
}

function listen(
  dataObj: {},
  config: ListenerConfig = {}
): (componentFn: (...args) => ViewClass<any>) => (...userArgs) => IBuildable {
  const dataId = randString(10);
  const consumers: Consumer[] = [];

  function createProxy(object) {
    for (let i of Object.keys(object)) {
      if (typeof object[i] === 'object') {
        object[i] = createProxy(object[i]);
      }
    }
    return new Proxy(object, {
      set(target, p, value, receiver) {
        const { beforeUpdate, afterUpdate } = config;
        if (beforeUpdate) beforeUpdate(dataObj, p, value);
        // start
        const result = Reflect.set(target, p, typeof value === 'object' ? createProxy(value) : value, receiver);
        document.querySelectorAll(`[data-id=${dataId}]`).forEach((item, i) => {
          const { componentFn, args, lastTree } = consumers[i];
          const tree = componentFn(proxy, ...args).build();
          tree.props['data-id'] = dataId;
          // 添加上一次渲染的缓存
          rerender(item, lastTree, tree);
          consumers[i].lastTree = tree;
          // end
          if (afterUpdate) afterUpdate(dataObj, p, value);
        });
        return result;
      },
    });
  }

  const proxy = createProxy(dataObj);
  const fn = (componentFn) => {
    return (...args) => {
      consumers.push({ componentFn, args, lastTree: null });
      const index = consumers.length - 1;
      return {
        build() {
          const tree = componentFn(proxy, ...args).build();
          tree.props['data-id'] = dataId;
          consumers[index].lastTree = tree;
          return tree;
        },
      };
    };
  };
  fn.react = (effect) => effect(proxy);
  return fn;
}

function react(listener) {
  return listener.react;
}

export { listen, react };
