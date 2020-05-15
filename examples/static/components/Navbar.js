import { HStack, Link } from '@hamburger/core';

export default function() {
  return HStack(
    Link('home').href('/'),
    Link('detail').href('/detail.html'),
    Link('about').href('/about.html'),
  ).mapItem(i => i.margin({ right: 10 })).margin({ bottom: '3' });
}
