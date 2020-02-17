import React from 'react';
import { VStack, HStack, Image, Text, Layout } from 'hamburger-js';

function NewsItemTitle() {
  return HStack(
    Image('http://img0.imgtn.bdimg.com/it/u=452966427,3842240659&fm=26&gp=0.jpg')
      .roundCrop()
      .size(40),
    VStack(Text('InfiniteX发表了话题'), Text('2小时前').color('gray')),
  );
}

function NewsItemBody() {
  return VStack(
    Text('为什么pokemmo这么好玩', 'h6'),
    Text('内容内容内容内容内容内容内容内容内容内容内容内容内容内容').color('gray'),
  );
}
function NewsItem(content) {
  return Layout('top-main')
    .top(NewsItemTitle)
    .main(NewsItemBody)
    .build();
}

export default NewsItem;
