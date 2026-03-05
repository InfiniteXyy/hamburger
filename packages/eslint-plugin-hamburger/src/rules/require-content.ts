import type { Rule } from 'eslint';

const CONTENT_COMPONENTS = ['Text', 'Button'];

/**
 * Rule: require-content
 *
 * Warns when Text() or Button() is called without any arguments.
 * These components need content to be meaningful.
 *
 * Bad:  Text()
 * Bad:  Button()
 * Good: Text('Hello')
 * Good: Button('Submit')
 */
const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Require content argument for Text and Button components',
      recommended: true,
    },
    messages: {
      missingContent: '{{name}}() should be called with content. An empty {{name}} renders nothing useful.',
    },
    schema: [],
  },

  create(context) {
    return {
      CallExpression(node) {
        const callee = node.callee;

        if (callee.type === 'Identifier' && CONTENT_COMPONENTS.includes(callee.name)) {
          if (node.arguments.length === 0) {
            context.report({
              node,
              messageId: 'missingContent',
              data: { name: callee.name },
            });
          }
        }
      },
    };
  },
};

export default rule;
