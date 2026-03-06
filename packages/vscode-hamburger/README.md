# vscode-hamburger

VSCode extension for hamburger.js - IntelliSense, snippets, and documentation.

## Features

### Snippets

Type `@` followed by a component name to get code snippets:

| Prefix               | Description                   |
| -------------------- | ----------------------------- |
| `@text`              | Text component                |
| `@button`            | Button component              |
| `@input`             | Input component               |
| `@image`             | Image component               |
| `@link`              | Link component                |
| `@vstack`            | Vertical stack container      |
| `@hstack`            | Horizontal stack container    |
| `@layout`            | Layout component              |
| `@list`              | List component                |
| `@table`             | Table component               |
| `@hamburger-app`     | Full app boilerplate          |
| `@hamburger-react`   | React integration boilerplate |
| `@hamburger-counter` | Reactive counter example      |

### IntelliSense

- Type `@` to see all available hamburger components
- Type `.` after a component to see available methods
- Hover over component names to see documentation

### Auto-completion

The extension provides intelligent auto-completion for:

- Component names
- Method chaining
- Common style patterns

## Installation

### From VSIX

1. Download the `.vsix` file
2. Open VS Code
3. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
4. Type "Install from VSIX"
5. Select the downloaded file

### From Source

```bash
cd packages/vscode-hamburger
npm install
npm run compile
# Then package with vsce
```

## Requirements

- VS Code 1.85.0 or higher
- Works with TypeScript, JavaScript, TSX, and JSX files

## License

MIT
