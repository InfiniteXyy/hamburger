import { VStack } from 'hamburger-js';
import Buttons from './Buttons';
import Images from './Images';
import Inputs from './Inputs';
import Texts from './Texts';

const Playground = VStack(
  Buttons,
  Images,
  Inputs,
  Texts,
).class('container');

export default Playground;
