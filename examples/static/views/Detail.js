import { hbg } from 'hamburger-loader';
import { VStack } from 'hamburger-js';
import Navbar from '../components/Navbar';

export default function Detail() {
  const data = {
    imgLink: 'https://static.runoob.com/images/demo/demo2.jpg',
    name: 'xyy',
  };
  return VStack(
    Navbar(),
    hbg(data)`
    HStack {               @padding=3 @margin.vertical=3 @size.width=550px @shadow @border.radius=10px
      Image(imgLink)       @theme=thumbnail @size.width=300px @margin.right=3
      VStack {
        Text(name)         @margin.right=3 @margin.bottom=0 @theme=h3
        Link(fakeEmail)    @bold @margin.bottom=3
        Text(fakeTime)
        Button("Follow")   @theme=primary
      }
    }
    
    PureHTML("<h1 class='display-4'>using <b>hamburger-lang</b> template</h1>")
    `,
  );
}
