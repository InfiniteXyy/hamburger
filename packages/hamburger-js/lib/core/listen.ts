import { DOMElement, IBuildable, IView } from '../types';
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
  reactiveObj: any,
  config: ListenerConfig = {}
): (componentFn: (...args) => IView) => (...userArgs) => IBuildable {
  const dataId = randString(10);
  const consumers: Consumer[] = [];
  // 自动封装为proxy
  if (!reactiveObj._isProxy) reactiveObj = reactive(reactiveObj);

  reactiveObj.subscribe((target, property, value) => {
    const { beforeUpdate, afterUpdate } = config;
    if (beforeUpdate) beforeUpdate(target, property, value);
    // start
    document.querySelectorAll(`[data-id=${dataId}]`).forEach((item, i) => {
      const { componentFn, args, lastTree } = consumers[i];
      const tree = componentFn(reactiveObj, ...args).build();
      tree.props['data-id'] = dataId;
      rerender(item, lastTree, tree); // 添加上一次渲染的缓存
      consumers[i].lastTree = tree;
    });
    // end
    if (afterUpdate) afterUpdate(target, property, value);
  });

  return (componentFn) => {
    return (...args) => {
      consumers.push({ componentFn, args, lastTree: null });
      const index = consumers.length - 1;
      return {
        build() {
          const tree = componentFn(reactiveObj, ...args).build();
          tree.props['data-id'] = dataId;
          consumers[index].lastTree = tree;
          return tree;
        },
      };
    };
  };
}

function reactive<T extends object>(obj: T, subscribers = []): T {
  function subscribe(fn) {
    subscribers.push(fn);
    return () => (subscribers = subscribers.filter((i) => i !== fn));
  }

  for (let key of Object.keys(obj)) {
    if (typeof obj[key] === 'object') {
      obj[key] = reactive(obj[key], subscribers);
    }
  }
  return new Proxy(obj, {
    set(target, property, value, receiver) {
      const proxyValue = typeof value === 'object' ? reactive(value, subscribers) : value;
      const result = Reflect.set(target, property, proxyValue, receiver);
      if (property !== 'length') {
        subscribers.forEach((fn) => fn(target, property, value));
      }
      return result;
    },
    get(target, property, receiver) {
      if (property === 'subscribe') return subscribe;
      if (property === '_isProxy') return true;
      return Reflect.get(target, property, receiver);
    },
  });
}

export { listen, reactive };
