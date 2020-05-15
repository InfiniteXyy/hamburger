import Playground from './playground';
import { VStack } from '@hamburger/core';

// const App = TodoMVC;
// const App = Blog;
export default function() {
  return VStack(Playground()).build();
}
