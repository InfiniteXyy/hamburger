import { describe, it, expect } from 'vitest';
import { Input } from '../lib';

describe('Input component', () => {
  it('should have correct type', () => {
    const tree = Input('value', 'checkbox').build();
    expect(tree.props.type).toBe('checkbox');
  });

  it('should set callback', () => {
    function callback(e: any) {}
    const tree = Input('value').onChange(callback).build();
    expect(tree.props.onChange).toBe(callback);
  });

  it('should set other props', () => {
    function callback(e: any) {}
    const tree = Input('value').props({ onKeyDown: callback }).build();
    expect(tree.props.onKeyDown).toBe(callback);
  });
});
