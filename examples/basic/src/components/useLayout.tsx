import { Text, Layout } from '@hamburger/core';

export default function SampleLayout() {
  return (
    Layout('top-aside-main')
      .main(Text('some content...'))
  );
}
