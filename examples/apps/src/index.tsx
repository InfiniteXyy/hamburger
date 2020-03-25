import Timeline from './timeline';
import Playground from './playground';
import TodoMVC from './todoMVC';
import Blog from './blog';
import { VStack } from 'hamburger-js';

// const App = TodoMVC;
// const App = Blog;
export default function() {
  return VStack(Playground(), Blog).build();
}
