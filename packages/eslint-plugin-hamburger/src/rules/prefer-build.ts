import type { Rule } from 'eslint';

const HAMBURGER_COMPONENTS = [
  'Text',
  'Button',
  'Input',
  'Image',
  'Link',
  'HStack',
  'VStack',
  'List',
  'ListItem',
  'Table',
  'TableRow',
  'Layout',
  'PureHTML',
];

/**
 * Rule: prefer-build
 *
 * Warns when a hamburger component is used without calling .build()
 * This commonly happens when using hamburger components in JSX or
 * when forgetting to call build() before passing to mount().
 */
const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Ensure hamburger components call .build() when needed',
      recommended: true,
    },
    messages: {
      missingBuild:
        'Hamburger component "{{name}}" may need .build() when used in JSX or passed to React.',
    },
    schema: [],
  },

  create(context) {
    return {
      // Check JSX elements that use hamburger component calls
      JSXExpressionContainer(node) {
        const expression = node.expression;

        // Look for call expressions like Text('hello') without .build()
        if (expression.type === 'CallExpression') {
          const callee = expression.callee;

          // Direct call: Text('hello')
          if (callee.type === 'Identifier' && HAMBURGER_COMPONENTS.includes(callee.name)) {
            // Check if parent is a member expression ending in .build()
            const parent = node.parent;
            if (parent && parent.type !== 'CallExpression') {
              context.report({
                node: expression,
                messageId: 'missingBuild',
                data: { name: callee.name },
              });
            }
          }

          // Chained call: Text('hello').color('red') - check if ends with .build()
          if (callee.type === 'MemberExpression') {
            // Walk up the chain to find the root component
            let current = callee;
            while (current.type === 'MemberExpression' && current.object.type === 'CallExpression') {
              const innerCallee = current.object.callee;
              if (innerCallee.type === 'Identifier' && HAMBURGER_COMPONENTS.includes(innerCallee.name)) {
                // Found a hamburger component at the root
                // Check if the chain ends with .build()
                if (current.property.type === 'Identifier' && current.property.name !== 'build') {
                  // The last method in the chain is not build()
                  // But we're inside JSX, so this might be intentional
                  // Only warn if it's clearly missing
                }
                break;
              }
              if (current.object.type === 'CallExpression' && current.object.callee.type === 'MemberExpression') {
                current = current.object.callee;
              } else {
                break;
              }
            }
          }
        }
      },
    };
  },
};

export default rule;
