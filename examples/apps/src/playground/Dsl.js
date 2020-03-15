import { hbg } from 'hamburger-loader';
const Element = hbg`
VStack {             @padding=3 @border.color=gray @border.width=3      
  Image(imgLink)     @theme=thumbnail @size.width=300px
  HStack {           
    Text(name)       @margin.right=2
    Link(fakeEmail)  @bold
  }
  Text(fakeTime)
Button("Follow")     @theme=primary
}
`.data({
  imgLink: 'https://static.runoob.com/images/demo/demo2.jpg',
  name: 'xyy',
});

export default Element;
