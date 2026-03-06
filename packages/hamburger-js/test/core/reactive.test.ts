import { describe, it, expect, vi } from 'vitest';
import { reactive } from '../../lib/core/listen';

describe('reactive', () => {
  it('should create a proxy that tracks property access', () => {
    const state = reactive({ count: 0 });
    expect(state._isProxy).toBe(true);
  });

  it('should allow normal property reads', () => {
    const state = reactive({ name: 'Alice', count: 5 });
    expect(state.name).toBe('Alice');
    expect(state.count).toBe(5);
  });

  it('should allow normal property writes', () => {
    const state = reactive({ count: 0 });
    state.count = 10;
    expect(state.count).toBe(10);
  });

  it('should notify subscribers on property change', () => {
    const state = reactive({ count: 0 });
    const subscriber = vi.fn();
    (state as any).subscribe(subscriber);

    state.count = 1;

    expect(subscriber).toHaveBeenCalledTimes(1);
    expect(subscriber).toHaveBeenCalledWith(expect.objectContaining({ count: 1 }), 'count', 1);
  });

  it('should notify multiple subscribers', () => {
    const state = reactive({ value: '' });
    const sub1 = vi.fn();
    const sub2 = vi.fn();
    (state as any).subscribe(sub1);
    (state as any).subscribe(sub2);

    state.value = 'hello';

    expect(sub1).toHaveBeenCalledTimes(1);
    expect(sub2).toHaveBeenCalledTimes(1);
  });

  it('should return an unsubscribe function', () => {
    const state = reactive({ count: 0 });
    const subscriber = vi.fn();
    const unsubscribe = (state as any).subscribe(subscriber);

    state.count = 1;
    expect(subscriber).toHaveBeenCalledTimes(1);

    unsubscribe();
    state.count = 2;
    expect(subscriber).toHaveBeenCalledTimes(1); // still 1
  });

  it('should recursively proxy nested objects', () => {
    const state = reactive({ nested: { value: 'inner' } });
    const subscriber = vi.fn();
    (state as any).subscribe(subscriber);

    state.nested.value = 'changed';

    expect(subscriber).toHaveBeenCalledTimes(1);
    expect(state.nested.value).toBe('changed');
  });

  it('should proxy newly assigned objects', () => {
    const state = reactive<any>({ data: null });
    const subscriber = vi.fn();
    (state as any).subscribe(subscriber);

    state.data = { x: 1 };
    expect(subscriber).toHaveBeenCalledTimes(1);

    // The newly assigned object should also be reactive
    state.data.x = 2;
    expect(subscriber).toHaveBeenCalledTimes(2);
  });

  it('should not fire subscriber on array length changes', () => {
    const state = reactive({ items: [1, 2, 3] });
    const subscriber = vi.fn();
    (state as any).subscribe(subscriber);

    state.items.push(4);

    // push triggers both the index set and length set,
    // but length should be filtered out
    const lengthCalls = subscriber.mock.calls.filter((call) => call[1] === 'length');
    expect(lengthCalls).toHaveLength(0);
  });

  it('should handle already-proxied objects', () => {
    const state = reactive({ count: 0 });
    // Calling reactive again on an already-proxied object
    const state2 = reactive(state);
    expect(state2._isProxy).toBe(true);
  });
});
