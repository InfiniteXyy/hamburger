import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import rule from '../src/rules/no-raw-html.js';

const tester = new RuleTester();

describe('no-raw-html', () => {
  it('should pass valid and catch invalid cases', () => {
    tester.run('no-raw-html', rule, {
      valid: [
        { code: `Text('Hello')` },
        { code: `Button('Click')` },
        { code: `VStack(Text('hi'))` },
        // Non-hamburger functions
        { code: `parseHTML('<div>')` },
      ],
      invalid: [
        {
          code: `PureHTML('<b>bold</b>')`,
          errors: [{ messageId: 'avoidRawHtml' }],
        },
        {
          code: `PureHTML(userInput)`,
          errors: [{ messageId: 'avoidRawHtml' }],
        },
      ],
    });
  });
});
