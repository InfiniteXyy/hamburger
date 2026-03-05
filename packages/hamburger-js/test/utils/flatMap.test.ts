import { describe, it, expect } from 'vitest';
import { flatMap } from '../../lib/utils';

describe('flatMap', () => {
  it('should map and flatten results', () => {
    const result = flatMap([1, 2, 3], (x) => [x, x * 2]);
    expect(result).toEqual([1, 2, 2, 4, 3, 6]);
  });

  it('should handle identity mapping', () => {
    const result = flatMap([1, 2, 3], (x) => [x]);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should handle empty array', () => {
    const result = flatMap([], (x) => [x]);
    expect(result).toEqual([]);
  });

  it('should handle callbacks that return empty arrays', () => {
    const result = flatMap([1, 2, 3], () => []);
    expect(result).toEqual([]);
  });

  it('should handle callbacks that return multiple items', () => {
    const result = flatMap(['hello', 'world'], (s) => s.split(''));
    expect(result).toEqual(['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']);
  });

  it('should handle mixed return lengths', () => {
    const result = flatMap([1, 2, 3], (x) => (x === 2 ? [x, x] : [x]));
    expect(result).toEqual([1, 2, 2, 3]);
  });
});
