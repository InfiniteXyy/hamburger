import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import rule from '../src/rules/no-conflicting-visibility.js';

const tester = new RuleTester();

describe('no-conflicting-visibility', () => {
  it('should pass valid and catch invalid cases', () => {
    tester.run('no-conflicting-visibility', rule, {
      valid: [
        { code: `Text('hi').hide()` },
        { code: `Text('hi').opacity(0.5)` },
        { code: `Text('hi').color('red').bold()` },
        // Only hide or only opacity is fine
        { code: `VStack(Text('a')).hide().padding(10)` },
        { code: `Button('ok').opacity(0).margin(5)` },
      ],
      invalid: [
        {
          code: `Text('hi').hide().opacity(0.5)`,
          errors: [{ messageId: 'conflictingVisibility' }],
        },
        {
          code: `Text('hi').opacity(0).color('red').hide()`,
          errors: [{ messageId: 'conflictingVisibility' }],
        },
        {
          code: `Button('ok').hide().bold().opacity(1)`,
          errors: [{ messageId: 'conflictingVisibility' }],
        },
      ],
    });
  });
});
