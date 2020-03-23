import { Text, VStack } from 'hamburger-js';
import Navbar from '../components/Navbar';

export default function() {
  return VStack(
    Navbar(),
    Text('声明式语法介绍'),
  );
}
