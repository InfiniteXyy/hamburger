import { Text, VStack, Input } from '@hamburger/core';
import Navbar from '../components/Navbar';

export default function() {
  return VStack(
    Navbar(),
    Text('声明式语法介绍').theme('h1')
  );
}
