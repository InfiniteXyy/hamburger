import { hbg } from '@hamburger/loader';

export default function SampleDSL() {
  return hbg({ name: 'xyy' })`
VStack {             @alignItems=center
  Text("Hello")      @color=pink @fontSize=20 @bold
  Text(name)         @color=pink @fontSize=20 @bold
}
`;
}
