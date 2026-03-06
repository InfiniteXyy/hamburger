import type { ESLint, Linter } from 'eslint';
import preferBuild from './rules/prefer-build.js';
import noEmptyStack from './rules/no-empty-stack.js';
import noDuplicateStyleMethods from './rules/no-duplicate-style-methods.js';
import noConflictingVisibility from './rules/no-conflicting-visibility.js';
import requireContent from './rules/require-content.js';
import noRawHtml from './rules/no-raw-html.js';

const plugin: ESLint.Plugin = {
  meta: {
    name: 'eslint-plugin-hamburger',
    version: '0.0.1',
  },
  rules: {
    'prefer-build': preferBuild,
    'no-empty-stack': noEmptyStack,
    'no-duplicate-style-methods': noDuplicateStyleMethods,
    'no-conflicting-visibility': noConflictingVisibility,
    'require-content': requireContent,
    'no-raw-html': noRawHtml,
  },
};

// Recommended config for flat config format (ESLint 9+)
const recommended: Linter.Config = {
  plugins: {
    hamburger: plugin,
  },
  rules: {
    'hamburger/prefer-build': 'warn',
    'hamburger/no-empty-stack': 'error',
    'hamburger/no-duplicate-style-methods': 'warn',
    'hamburger/no-conflicting-visibility': 'warn',
    'hamburger/require-content': 'warn',
    'hamburger/no-raw-html': 'off',
  },
};

export default plugin;
export { plugin, recommended };
