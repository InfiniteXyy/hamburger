import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import rule from '../src/rules/no-duplicate-style-methods.js';

const tester = new RuleTester();

describe('no-duplicate-style-methods', () => {
  it('should pass valid and catch invalid cases', () => {
    tester.run('no-duplicate-style-methods', rule, {
      valid: [
        { code: `Text('hi').color('red').bold()` },
        { code: `Text('hi').color('red').fontSize(16)` },
        { code: `Button('ok').padding(10).margin(5)` },
        { code: `VStack(Text('a')).padding(10)` },
        // Different methods are fine
        { code: `Text('hi').bold().fontSize(16).color('red')` },
        // Non-style methods can repeat
        { code: `obj.foo().foo()` },
      ],
      invalid: [
        {
          code: `Text('hi').color('red').color('blue')`,
          errors: [{ messageId: 'duplicateMethod', data: { method: 'color' } }],
        },
        {
          code: `Text('hi').padding(10).bold().padding(20)`,
          errors: [{ messageId: 'duplicateMethod', data: { method: 'padding' } }],
        },
        {
          code: `Text('hi').fontSize(12).bold().fontSize(16)`,
          errors: [{ messageId: 'duplicateMethod', data: { method: 'fontSize' } }],
        },
      ],
    });
  });
});
