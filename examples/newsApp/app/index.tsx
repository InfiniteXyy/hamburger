import { Layout, VStack } from 'hamburger-js';
import Navbar from './components/Navbar';
import Playground from './playground';
import Main from './components/Main';

const Timeline = VStack(Navbar, Main, Playground);

export default Timeline;
