import { HStack, Input } from 'hamburger-js';


const Inputs = HStack(
  Input(''),
).mapItem(item => item.margin({ vertical: 10 }));

export default Inputs;
