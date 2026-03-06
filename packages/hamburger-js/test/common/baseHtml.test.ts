import { describe, it, expect } from 'vitest';
import { HStack, VStack, Text, Button, Input } from '../../lib';

describe.each([
  ['HStack', HStack],
  ['VStack', VStack],
  ['Text', Text],
  ['Button', Button],
  ['Input', Input],
])('base HTML props for %s', (_name, Type: any) => {
  it.each(['padding', 'margin'] as const)('should apply box model (%s)', (name) => {
    const cases: (number | string[])[] = [
      10,
      ['left'],
      ['top'],
      ['bottom'],
      ['right'],
      ['right', 'bottom'],
      ['horizontal'],
      ['vertical'],
    ];

    for (const i of cases) {
      let inputObj: any;
      if (Array.isArray(i)) {
        inputObj = {};
        for (const key of i) {
          inputObj[key] = 10;
        }
      } else {
        inputObj = 10;
      }

      const tree = Type()[name](inputObj).build();

      if (i === 10) {
        expect(tree.props.style).toHaveProperty(name, 10);
      } else {
        const dirs = i as string[];
        if (dirs.includes('top') || dirs.includes('vertical'))
          expect(tree.props.style).toHaveProperty(`${name}Top`, 10);
        if (dirs.includes('right') || dirs.includes('horizontal'))
          expect(tree.props.style).toHaveProperty(`${name}Right`, 10);
        if (dirs.includes('bottom') || dirs.includes('vertical'))
          expect(tree.props.style).toHaveProperty(`${name}Bottom`, 10);
        if (dirs.includes('left') || dirs.includes('horizontal'))
          expect(tree.props.style).toHaveProperty(`${name}Left`, 10);
      }
    }
  });

  it('should apply size', () => {
    const tree = Type().size({ width: 10, height: 20 }).build();
    expect(tree.props.style).toMatchObject({
      width: 10,
      height: 20,
    });
  });

  it('should apply border', () => {
    const tree = Type().border({ radius: 10, color: 'red', width: 1 }).build();
    expect(tree.props.style).toMatchObject({
      borderRadius: 10,
      borderColor: 'red',
      border: 'solid',
      borderWidth: 1,
    });
  });

  it('should apply className', () => {
    const tree = Type().class('class-1', 'class-2').build();
    expect(tree.props.className).toContain('class-1 class-2');
  });

  it('should apply id', () => {
    const tree = Type().id('myId').build();
    expect(tree.props.id).toBe('myId');
  });

  it('should apply style object', () => {
    const tree = Type().style({ height: 10, color: 'red' }).build();
    expect(tree.props.style).toMatchObject({ height: 10, color: 'red' });
  });

  it('should set arbitrary props', () => {
    function callback(e: any) {}
    const tree = Type().props({ onClick: callback }).build();
    expect(tree.props.onClick).toBe(callback);
  });
});
