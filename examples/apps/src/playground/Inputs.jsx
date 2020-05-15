import { HStack, Input } from '@hamburger/core';


const Inputs = HStack(
  Input(''),
).mapItem(item => item.margin({ vertical: 10 }));

export default Inputs;
