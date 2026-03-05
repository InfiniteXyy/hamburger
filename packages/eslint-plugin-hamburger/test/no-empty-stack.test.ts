import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import rule from '../src/rules/no-empty-stack.js';

const tester = new RuleTester();

describe('no-empty-stack', () => {
  it('should pass valid and catch invalid cases', () => {
    tester.run('no-empty-stack', rule, {
      valid: [
        { code: `VStack(Text('hello'))` },
        { code: `HStack(Text('a'), Text('b'))` },
        { code: `VStack(someVar)` },
        { code: `HStack(getContent())` },
        // Non-hamburger functions should be ignored
        { code: `SomeOtherFunction()` },
        { code: `myStack()` },
      ],
      invalid: [
        {
          code: `VStack()`,
          errors: [{ messageId: 'emptyStack', data: { name: 'VStack' } }],
        },
        {
          code: `HStack()`,
          errors: [{ messageId: 'emptyStack', data: { name: 'HStack' } }],
        },
      ],
    });
  });
});
