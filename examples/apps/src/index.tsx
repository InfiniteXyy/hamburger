import Timeline from "./timeline";
import Playground from './playground'
import TodoMVC from './todoMVC'
import { VStack } from "hamburger-js";

// const App = TodoMVC;
const App = VStack(Timeline, Playground);
export default App;
