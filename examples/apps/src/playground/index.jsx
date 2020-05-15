import { VStack } from '@hamburger/core';
import Buttons from './Buttons';
import Images from './Images';
import Inputs from './Inputs';
import Texts from './Texts';
import Grids from './Grids';
import Reactive from './Reactive';

function Playground() {
  return VStack(Dsl, Buttons, Images, Inputs, Texts, Grids, <Reactive />).class('container');
}

export default Playground;
