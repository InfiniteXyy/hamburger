import { VStack } from 'hamburger-js';
import Buttons from './Buttons';
import Images from './Images';
import Inputs from './Inputs';
import Texts from './Texts';
import Grids from './Grids';

const Playground = VStack(
  Buttons,
  Images,
  Inputs,
  Texts,
  Grids
).class('container');

export default Playground;
