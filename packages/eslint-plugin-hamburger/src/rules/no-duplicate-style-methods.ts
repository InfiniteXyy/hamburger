import type { Rule } from 'eslint';

const STYLE_METHODS = [
  'color',
  'fontSize',
  'fontWeight',
  'bold',
  'padding',
  'margin',
  'size',
  'opacity',
  'border',
  'hide',
  'style',
  'id',
  'tag',
];

/**
 * Rule: no-duplicate-style-methods
 *
 * Warns when the same builder method is called multiple times in a chain.
 * The second call always overwrites the first, which is likely a mistake.
 *
 * Bad:  Text('hi').color('red').bold().color('blue')
 * Good: Text('hi').color('blue').bold()
 */
const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow duplicate style method calls in a hamburger builder chain',
      recommended: true,
    },
    messages: {
      duplicateMethod:
        'Method ".{{method}}()" is called multiple times in this chain. The earlier call will be overwritten.',
    },
    schema: [],
  },

  create(context) {
    return {
      CallExpression(node) {
        // We only care about the outermost call in a chain.
        // Walk the chain from this node and collect method names.
        // Only process if the parent is NOT a MemberExpression (meaning we're at the top).
        if (
          node.parent &&
          node.parent.type === 'MemberExpression' &&
          node.parent.object === node
        ) {
          // This call is the object of a further member access -- skip, we'll process from the top.
          return;
        }

        const methodCalls: { name: string; node: Rule.Node }[] = [];
        let current: Rule.Node = node;

        while (current.type === 'CallExpression') {
          const callee = current.callee;
          if (callee.type === 'MemberExpression' && callee.property.type === 'Identifier') {
            const methodName = callee.property.name;
            if (STYLE_METHODS.includes(methodName)) {
              methodCalls.push({ name: methodName, node: callee.property });
            }
            current = callee.object;
          } else {
            break;
          }
        }

        // Check for duplicates
        const seen = new Map<string, Rule.Node>();
        // Process from bottom (earliest call) to top (latest call)
        for (let i = methodCalls.length - 1; i >= 0; i--) {
          const { name, node: methodNode } = methodCalls[i];
          if (seen.has(name)) {
            context.report({
              node: methodNode,
              messageId: 'duplicateMethod',
              data: { method: name },
            });
          }
          seen.set(name, methodNode);
        }
      },
    };
  },
};

export default rule;
