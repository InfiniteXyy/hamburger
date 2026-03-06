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

type ASTNode = Rule.Node & Record<string, unknown>;

function getCallee(node: ASTNode): ASTNode | null {
  if (node.type === 'CallExpression' && node.callee) return node.callee as ASTNode;
  return null;
}

function getIdentifierName(node: ASTNode): string | null {
  if (node.type === 'Identifier' && typeof node.name === 'string') return node.name;
  return null;
}

function getMemberParts(node: ASTNode): { object: ASTNode; property: ASTNode } | null {
  if (node.type === 'MemberExpression' && node.object && node.property) {
    return { object: node.object as ASTNode, property: node.property as ASTNode };
  }
  return null;
}

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
      JSXExpressionContainer(node: Rule.Node) {
        const expression = (node as ASTNode).expression as ASTNode | undefined;
        if (!expression || expression.type !== 'CallExpression') return;

        const callee = getCallee(expression);
        if (!callee) return;

        // Direct call: Text('hello')
        const directName = getIdentifierName(callee);
        if (directName && HAMBURGER_COMPONENTS.includes(directName)) {
          context.report({
            node: expression,
            messageId: 'missingBuild',
            data: { name: directName },
          });
          return;
        }

        // Chained call: Text('hello').color('red') - check if ends with .build()
        const memberParts = getMemberParts(callee);
        if (!memberParts) return;

        const lastMethodName = getIdentifierName(memberParts.property);

        // If the chain ends with .build(), it's fine
        if (lastMethodName === 'build') return;

        // Walk the chain to find if a hamburger component is at the root
        let current: ASTNode = callee;
        while (true) {
          const parts = getMemberParts(current);
          if (!parts) break;

          const obj = parts.object;
          if (obj.type === 'CallExpression') {
            const innerCallee = getCallee(obj);
            if (!innerCallee) break;

            const name = getIdentifierName(innerCallee);
            if (name && HAMBURGER_COMPONENTS.includes(name)) {
              // Found a hamburger component at the root without .build()
              context.report({
                node: expression,
                messageId: 'missingBuild',
                data: { name },
              });
              return;
            }

            const innerParts = getMemberParts(innerCallee);
            if (innerParts) {
              current = innerCallee;
            } else {
              break;
            }
          } else {
            break;
          }
        }
      },
    };
  },
};

export default rule;
