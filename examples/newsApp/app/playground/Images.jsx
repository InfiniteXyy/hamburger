import { HStack, Image } from 'hamburger-js';

const imgURL = 'https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg';

const Images = HStack(
  Image(imgURL).useTheme('circle'),
  Image(imgURL).useTheme('rounded'),
  Image(imgURL).useTheme('thumbnail'),
).mapItem(item => item.size(100).margin(10));

export default Images;
