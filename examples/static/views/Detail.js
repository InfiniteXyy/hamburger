import { hbg } from 'hamburger-loader';
import Navbar from '../components/Navbar';

export default function () {
  const data = {
    imgLink: 'https://static.runoob.com/images/demo/demo2.jpg',
    name: 'xyy',
    fakeEmail: 'myfake@fake.com', // 替换默认的 fake 值
    Navbar, // 在 dsl 中使用自定义组件需要显式声明
  };
  return hbg(data)`
    Navbar() 
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
    `;
}
