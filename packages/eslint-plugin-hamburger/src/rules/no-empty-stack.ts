import type { Rule } from 'eslint';

const STACK_COMPONENTS = ['HStack', 'VStack'];

/**
 * Rule: no-empty-stack
 *
 * Warns when HStack or VStack is called without any children.
 * Empty stacks are usually a mistake.
 */
const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow empty HStack or VStack components',
      recommended: true,
    },
    messages: {
      emptyStack: '{{name}} should have at least one child element.',
    },
    schema: [],
  },

  create(context) {
    return {
      CallExpression(node) {
        const callee = node.callee;

        // Check for direct calls: HStack() or VStack()
        if (callee.type === 'Identifier' && STACK_COMPONENTS.includes(callee.name)) {
          if (node.arguments.length === 0) {
            context.report({
              node,
              messageId: 'emptyStack',
              data: { name: callee.name },
            });
          }
        }
      },
    };
  },
};

export default rule;
