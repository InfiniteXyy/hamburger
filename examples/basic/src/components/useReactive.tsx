import hamburger, { Text, Button, reactive, listen, VStack, Input } from "@hamburger/core";

const store = reactive({
  input: "Hamburger",
  count: 0,
  timer: 0
});

function startTimer() {
  store.timer += 1;
  return setInterval(() => {
    store.timer += 1;
  }, 1000);
}

function Component(data) {
  const computedTimer = Math.floor(data.timer / 60).toString().padStart(2, "0") +
    ":" + (data.timer % 60).toString().padStart(2, "0");

  return VStack(
    // 倒计时
    Text("计时器: " + computedTimer).fontSize(20).bold(),
    Button("Start").onClick(startTimer).disabled(data.timer !== 0),

    // 用户输入响应
    Text(`Hello, ${data.input}!`).margin({ top: 30 }),
    Input(data.input).bind((val) => (data.input = val))
  );
}

const SampleReactive = listen(store)(Component);
export default SampleReactive;
