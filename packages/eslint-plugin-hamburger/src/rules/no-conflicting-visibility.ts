import type { Rule } from 'eslint';

/**
 * Rule: no-conflicting-visibility
 *
 * Warns when .hide() and .opacity() are both used in the same chain.
 * .hide() sets display:none which makes opacity meaningless,
 * and using both suggests confusion about intent.
 *
 * Bad:  Text('hi').hide().opacity(0.5)
 * Good: Text('hi').hide()
 * Good: Text('hi').opacity(0)
 */
const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow using .hide() and .opacity() together in a hamburger builder chain',
      recommended: true,
    },
    messages: {
      conflictingVisibility:
        'Using .hide() with .opacity() is contradictory. .hide() sets display:none, making opacity irrelevant. Use one or the other.',
    },
    schema: [],
  },

  create(context) {
    return {
      CallExpression(node) {
        // Only process the outermost call in a chain
        if (node.parent && node.parent.type === 'MemberExpression' && node.parent.object === node) {
          return;
        }

        const methods: string[] = [];
        let current: Rule.Node = node;

        while (current.type === 'CallExpression') {
          const callExpr = current as Rule.Node & { callee: Rule.Node };
          const callee = callExpr.callee;
          if (callee.type === 'MemberExpression') {
            const member = callee as Rule.Node & { property: Rule.Node; object: Rule.Node };
            if (member.property.type === 'Identifier') {
              methods.push((member.property as Rule.Node & { name: string }).name);
              current = member.object;
            } else {
              break;
            }
          } else {
            break;
          }
        }

        const hasHide = methods.includes('hide');
        const hasOpacity = methods.includes('opacity');

        if (hasHide && hasOpacity) {
          context.report({
            node,
            messageId: 'conflictingVisibility',
          });
        }
      },
    };
  },
};

export default rule;
