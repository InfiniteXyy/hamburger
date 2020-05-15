import { VStack, Text, Link } from '@hamburger/core';

const Footer = VStack(
  Text('Blog template built for ', Link('Bootstrap'), ' by ', Link('@mdo')),
  Text(
    'Sample by ',
    Link('InfiniteX')
      .href('https://github.com/infiniteXyy')
      .theme('muted')
      .bold(),
  ),
).class('blog-footer');

export default Footer;
