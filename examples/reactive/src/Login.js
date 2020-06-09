import { Button, HStack, VStack, Input } from "@hamburger/core";
import { Text, listen, reactive } from "@hamburger/core";

// Model
const store = reactive({
  username: "",
  password: "",
  reset() {
    this.username = "";
    this.password = "";
  },
  submit() {
    console.log({ username: this.username, password: this.password });
  }
});

// Function
function Login() {
  return VStack(
    Text("登录"),
    Input(store.username).bind(val => store.username = val),
    Input(store.password).bind(val => store.password = val),
    HStack(
      Button("提交").onClick(() => store.submit()),
      Button("重置").onClick(() => store.reset())
    )
  );
}

// subscribe: View = Function(Store)
export default listen(store)(Login);
