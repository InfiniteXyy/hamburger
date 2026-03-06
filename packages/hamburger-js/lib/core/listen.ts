import { DOMElement, IBuildable, IView } from '../types';
import rerender from './reactive';

type SubscriberFn = (target: object, property: string | symbol, value: unknown) => void;

interface ReactiveProxy {
  _isProxy: boolean;
  subscribe: (fn: SubscriberFn) => () => void;
}

interface ListenerConfig {
  beforeUpdate?: (state: unknown, target: unknown, value: unknown) => void;
  afterUpdate?: (state: unknown, target: unknown, value: unknown) => void;
}

interface Consumer {
  componentFn: (...args: unknown[]) => IView;
  args: unknown[];
  lastTree: DOMElement | null;
}

const keyPool: string[] = [];

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
  reactiveObj: Record<string, unknown>,
  config: ListenerConfig = {},
): (componentFn: (...args: unknown[]) => IView) => (...userArgs: unknown[]) => IBuildable {
  const dataId = randString(10);
  const consumers: Consumer[] = [];

  const proxy = reactiveObj as unknown as ReactiveProxy;
  if (!proxy._isProxy) reactiveObj = reactive(reactiveObj) as Record<string, unknown>;
  const reactiveProxy = reactiveObj as unknown as ReactiveProxy;

  reactiveProxy.subscribe((target: object, property: string | symbol, value: unknown) => {
    const { beforeUpdate, afterUpdate } = config;
    if (beforeUpdate) beforeUpdate(target, property, value);
    document.querySelectorAll(`[data-id=${dataId}]`).forEach((item, i) => {
      const { componentFn, args, lastTree } = consumers[i];
      const tree = componentFn(reactiveObj, ...args).build();
      tree.props['data-id'] = dataId;
      rerender(item, lastTree, tree);
      consumers[i].lastTree = tree;
    });
    if (afterUpdate) afterUpdate(target, property, value);
  });

  return (componentFn: (...args: unknown[]) => IView) => {
    return (...args: unknown[]): IBuildable => {
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

function reactive<T extends object>(obj: T, subscribers: SubscriberFn[] = []): T {
  function subscribe(fn: SubscriberFn): () => void {
    subscribers.push(fn);
    return () => {
      subscribers = subscribers.filter((i) => i !== fn);
    };
  }

  for (const key of Object.keys(obj)) {
    const val = (obj as Record<string, unknown>)[key];
    if (val && typeof val === 'object') {
      (obj as Record<string, unknown>)[key] = reactive(val as object, subscribers);
    }
  }
  return new Proxy(obj, {
    set(target: T, property: string | symbol, value: unknown, receiver: unknown) {
      const proxyValue = value && typeof value === 'object' ? reactive(value as object, subscribers) : value;
      const result = Reflect.set(target, property, proxyValue, receiver);
      if (property !== 'length') {
        subscribers.forEach((fn) => fn(target, property, value));
      }
      return result;
    },
    get(target: T, property: string | symbol, receiver: unknown) {
      if (property === 'subscribe') return subscribe;
      if (property === '_isProxy') return true;
      return Reflect.get(target, property, receiver);
    },
  });
}

export { listen, reactive };
