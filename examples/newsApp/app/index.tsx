import { Layout } from 'hamburger-js';
import Navbar from './components/Navbar';
import Main from './components/Main';

const Timeline = Layout('top-main')
  .top(Navbar)
  .main(Main);

export default Timeline;
