import { HStack, Image } from 'hamburger-js';

const imgURL = 'https://images.unsplash.com/photo-1583052236333-f76c5be4e076?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixlib=rb-1.2.1&q=80&w=400';

const Images = HStack(
  Image(imgURL).theme('circle'),
  Image(imgURL).theme('rounded'),
  Image(imgURL).theme('thumbnail'),
).mapItem(item => item.size(100).margin(10));

export default Images;
