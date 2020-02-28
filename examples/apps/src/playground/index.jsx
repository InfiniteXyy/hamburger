import { VStack } from 'hamburger-js';
import Buttons from './Buttons';
import Images from './Images';
import Inputs from './Inputs';
import Texts from './Texts';
import Grids from './Grids';
import Reactive from './Reactive';
import hamburger from 'hamburger-js';
const Playground = VStack(
  Buttons,
  Images,
  Inputs,
  Texts,
  Grids,
  <Reactive />,
).class('container');

export default Playground;
