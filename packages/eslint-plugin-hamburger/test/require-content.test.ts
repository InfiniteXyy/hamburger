import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import rule from '../src/rules/require-content.js';

const tester = new RuleTester();

describe('require-content', () => {
  it('should pass valid and catch invalid cases', () => {
    tester.run('require-content', rule, {
      valid: [
        { code: `Text('Hello')` },
        { code: `Text('Hello', 'World')` },
        { code: `Button('Submit')` },
        { code: `Button('Click me').onClick(fn)` },
        // Non-content components can be called empty
        { code: `Input('', 'text')` },
        { code: `HStack()` },
        // Non-hamburger functions
        { code: `SomeFunction()` },
      ],
      invalid: [
        {
          code: `Text()`,
          errors: [{ messageId: 'missingContent', data: { name: 'Text' } }],
        },
        {
          code: `Button()`,
          errors: [{ messageId: 'missingContent', data: { name: 'Button' } }],
        },
      ],
    });
  });
});
