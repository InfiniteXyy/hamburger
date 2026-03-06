import type { Rule } from 'eslint';

/**
 * Rule: no-raw-html
 *
 * Warns when PureHTML() is used, as it injects raw HTML without sanitization.
 * This is an XSS risk if the content comes from user input.
 * Prefer using structured hamburger components instead.
 *
 * Bad:  PureHTML(userInput)
 * Good: Text(userInput)
 */
const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Discourage use of PureHTML() due to XSS risk',
      recommended: false,
    },
    messages: {
      avoidRawHtml:
        'PureHTML() injects raw HTML without sanitization, which is an XSS risk. Prefer structured hamburger components.',
    },
    schema: [],
  },

  create(context) {
    return {
      CallExpression(node) {
        const callee = node.callee;

        if (callee.type === 'Identifier' && callee.name === 'PureHTML') {
          context.report({
            node,
            messageId: 'avoidRawHtml',
          });
        }
      },
    };
  },
};

export default rule;
