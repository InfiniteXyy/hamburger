import { VStack, Text, Button } from 'hamburger-js';
import domfy from 'hamburger-js/src/core/domfy';

function counter(data) {
  return VStack(
    Text(data.count).theme('h1'),
    Button('add')
      .onClick(() => data.count++)
      .theme('primary'),
  );
}

function anotherList({ count }) {
  return VStack(
    Text('something').fontSize(count),
  );
}

function randString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function listen(dataObj) {
  const dataId = randString(10);
  const consumers = [];
  const proxy = new Proxy(dataObj, {
    set(target, p, value, receiver) {
      const result = Reflect.set(target, p, value, receiver);
      document.querySelectorAll(`[data-id=${dataId}]`).forEach((item, i) => {
        const parent = item.parentNode;
        parent.replaceChild(domfy(consumers[i](proxy).props({ 'data-id': dataId }).build()), item);
      });
      return result;
    },
  });
  return component => () => {
    consumers.push(component);
    return component(proxy).props({ 'data-id': dataId });
  };
}


function root() {
  const binder = listen({ count: 10 });

  return VStack(
    binder(counter)(),
    Text("divider"),
    binder(anotherList)(),
  );
}

export default root;
