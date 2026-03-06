import * as vscode from 'vscode';

const HAMBURGER_COMPONENTS = {
  Text: {
    description: 'Creates a <p> element with text content',
    methods: ['color', 'fontSize', 'fontWeight', 'bold', 'content'],
  },
  Button: {
    description: 'Creates a <button> element',
    methods: ['onClick', 'disabled', 'content'],
  },
  Input: {
    description: 'Creates an <input> element',
    methods: ['onChange', 'onInput', 'onKeyPress', 'placeholder', 'bind', 'wrapLabel'],
  },
  Image: {
    description: 'Creates an <img> element',
    methods: ['size', 'border'],
  },
  Link: {
    description: 'Creates an <a> element (extends Text)',
    methods: ['href', 'color', 'fontSize', 'fontWeight', 'bold'],
  },
  HStack: {
    description: 'Horizontal flex container',
    methods: ['justifyContent', 'alignItems', 'reverse', 'nowrap', 'inflate', 'mapItem'],
  },
  VStack: {
    description: 'Vertical flex container',
    methods: ['justifyContent', 'alignItems', 'reverse', 'nowrap', 'inflate', 'mapItem'],
  },
  Layout: {
    description: 'Page layout from predefined template',
    methods: ['top', 'bottom', 'main', 'aside', 'build'],
  },
  List: {
    description: 'Creates an <ol> element',
    methods: [],
  },
  Table: {
    description: 'Creates a <table> element',
    methods: [],
  },
  PureHTML: {
    description: 'Renders raw HTML string (use with caution)',
    methods: [],
  },
};

const COMMON_METHODS = [
  { name: 'padding', description: 'Set padding (number, string, or BoxModel)' },
  { name: 'margin', description: 'Set margin (number, string, or BoxModel)' },
  { name: 'size', description: 'Set size (number or SizeModel)' },
  { name: 'border', description: 'Set border (BorderModel)' },
  { name: 'opacity', description: 'Set opacity (0-1)' },
  { name: 'hide', description: 'Hide element (optional condition)' },
  { name: 'class', description: 'Add CSS class(es)' },
  { name: 'style', description: 'Add inline styles' },
  { name: 'id', description: 'Set element ID' },
  { name: 'tag', description: 'Change HTML tag' },
  { name: 'props', description: 'Set arbitrary HTML attributes' },
  { name: 'onClick', description: 'Add click handler' },
  { name: 'build', description: 'Build the component (returns DOMElement)' },
];

export function activate(context: vscode.ExtensionContext) {
  console.log('hamburger.js extension activated');

  // Register completion provider for @ trigger
  const completionProvider = vscode.languages.registerCompletionItemProvider(
    ['typescript', 'javascript', 'typescriptreact', 'javascriptreact'],
    {
      provideCompletionItems(document, position) {
        const linePrefix = document.lineAt(position).text.slice(0, position.character);

        // Trigger on @ for component suggestions
        if (linePrefix.endsWith('@')) {
          return Object.entries(HAMBURGER_COMPONENTS).map(([name, info]) => {
            const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.Class);
            item.detail = `hamburger.js component`;
            item.documentation = new vscode.MarkdownString(info.description);
            item.insertText = new vscode.SnippetString(`${name}('\${1:content}')\$0`);
            return item;
          });
        }

        // Trigger on . for method suggestions
        if (linePrefix.match(/\)\s*\.$/)) {
          return COMMON_METHODS.map((method) => {
            const item = new vscode.CompletionItem(method.name, vscode.CompletionItemKind.Method);
            item.detail = method.description;
            return item;
          });
        }

        return undefined;
      },
    },
    '@',
    '.'
  );

  // Register hover provider for documentation
  const hoverProvider = vscode.languages.registerHoverProvider(
    ['typescript', 'javascript', 'typescriptreact', 'javascriptreact'],
    {
      provideHover(document, position) {
        const range = document.getWordRangeAtPosition(position);
        const word = document.getText(range);

        if (word in HAMBURGER_COMPONENTS) {
          const info = HAMBURGER_COMPONENTS[word as keyof typeof HAMBURGER_COMPONENTS];
          const markdown = new vscode.MarkdownString();
          markdown.appendMarkdown(`**hamburger.js: ${word}**\n\n`);
          markdown.appendMarkdown(`${info.description}\n\n`);
          if (info.methods.length > 0) {
            markdown.appendMarkdown(`**Methods:** ${info.methods.join(', ')}\n\n`);
          }
          markdown.appendMarkdown(`Plus all common ViewClass methods: padding, margin, size, etc.`);
          return new vscode.Hover(markdown);
        }

        return undefined;
      },
    }
  );

  context.subscriptions.push(completionProvider, hoverProvider);
}

export function deactivate() {
  console.log('hamburger.js extension deactivated');
}
