import hamburger, { Text, Button, reactive, listen, VStack, Input } from '@hamburger/core';

const store = reactive({
  input: 'Hamburger',
  count: 0,
});

function Component(data) {
  return VStack(
    Text(`Hello, ${data.input}!`),
    Input(data.input).bind((val) => (data.input = val)),
    Button(`count: ${data.count}`).onClick(() => data.count++)
  );
}

const SampleReactive = listen(store)(Component);
export default SampleReactive;
