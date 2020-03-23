import { HStack, Link } from 'hamburger-js';

export default function() {
  return HStack(
    Link('home').href('/'),
    Link('about').href('/about'),
  ).mapItem(i => i.margin({ right: 10 }));
}
