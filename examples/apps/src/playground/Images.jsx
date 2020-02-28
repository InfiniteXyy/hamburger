import { HStack, Image } from 'hamburger-js';

const imgURL = 'https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg';

const Images = HStack(
  Image(imgURL).theme('circle'),
  Image(imgURL).theme('rounded'),
  Image(imgURL).theme('thumbnail'),
).mapItem(item => item.size(100).margin(10));

export default Images;
