import { hbg } from 'hamburger-loader';
import template from './template.hbg';

const data = {
  imgLink: 'https://static.runoob.com/images/demo/demo2.jpg',
  name: 'xyy',
};

export default hbg(template).data(data);
