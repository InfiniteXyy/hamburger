import { Layout } from 'hamburger-js';
import Navbar from './components/Navbar';
import Playground from './playground';

const Timeline = Layout('top-main')
  .top(Navbar)
  .main(Playground);

export default Timeline;
