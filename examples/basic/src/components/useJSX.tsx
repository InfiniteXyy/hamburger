// JSX tag can be Hamburger Builder Function / html tag / plain function
// can use JSX together with builder function
import hamburger, { Text, VStack, Button } from '@hamburger/core';

function Counter() {
  return VStack(
    <Text color={'gray'}>
      created By <span style={{ textDecoration: 'underline' }}>hello</span>
    </Text>,
    Text('use together!')
  );
}

export default function SampleJSX() {
  return (
    <VStack alignItems={'end'}>
      <Counter />
      <Text bold fontSize={40}>
        Title
      </Text>
      <Button disabled onClick={console.log}>
        click
      </Button>
    </VStack>
  );
}
