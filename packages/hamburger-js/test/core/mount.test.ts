import { describe, it, expect } from 'vitest';
import { mount } from '../../lib/core/mount';

describe('mount', () => {
  it('should mount string content as text node', () => {
    const container = document.createElement('div');
    container.id = 'test-mount-string';
    document.body.appendChild(container);

    mount('Hello World', 'test-mount-string');

    expect(container.textContent).toBe('Hello World');
    document.body.removeChild(container);
  });

  it('should mount number content as text node', () => {
    const container = document.createElement('div');
    container.id = 'test-mount-number';
    document.body.appendChild(container);

    mount(42, 'test-mount-number');

    expect(container.textContent).toBe('42');
    document.body.removeChild(container);
  });

  it('should not throw when target element does not exist', () => {
    expect(() => mount('content', 'nonexistent-id')).not.toThrow();
  });
});
