import { Text, VStack } from '@hamburger/core';
import Navbar from '../components/Navbar';

export default function() {
  return VStack(
    Navbar(),
    Text('hamburger.js').bold().fontSize(30),
    Text('by xyy'),
  );
}
