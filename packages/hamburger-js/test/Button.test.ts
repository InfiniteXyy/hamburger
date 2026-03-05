import { describe, it, expect } from 'vitest';
import { Button } from '../lib';

describe('Button component', () => {
  it('should add callback', () => {
    function callback() {}
    const tree = Button('click').onClick(callback).build();
    expect(tree.props.onClick).toBe(callback);
  });

  it('should disable', () => {
    const tree = Button('click').disabled().build();
    expect(tree.props.disabled).toBe(true);
  });

  it.each([true, false])('should disable conditionally (when=%s)', (shouldDisable) => {
    const tree = Button('click').disabled(shouldDisable).build();
    expect(!!tree.props.disabled).toBe(shouldDisable);
  });
});
