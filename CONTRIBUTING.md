# Contributing to hamburger.js

Thank you for your interest in contributing to hamburger.js!

## Development Setup

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/hamburger.git
   cd hamburger
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Build the project**

   ```bash
   pnpm build
   ```

4. **Run tests**
   ```bash
   pnpm test
   ```

## Project Structure

```
packages/
  hamburger-js/       # @hamburger/core - Main library
  platform-react/     # @hamburger/platform-react - React adapter
  platform-vue/       # @hamburger/platform-vue - Vue adapter
  hamburger-loader/   # @hamburger/loader - DSL parser
  hamburger-static/   # @hamburger/static - Static site generator
  hamburger-cli/      # @hamburger/cli - CLI scaffolding tool
examples/
  basic/              # Basic example
  reactive-react/     # Reactive mode example
  static/             # Static site example
```

## Making Changes

1. **Create a branch**

   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make your changes** following the code style of the project

3. **Run tests** to ensure nothing is broken

   ```bash
   pnpm test
   ```

4. **Format your code**

   ```bash
   pnpm prettier --write .
   ```

5. **Commit your changes**
   ```bash
   git commit -m "feat: add my feature"
   ```

## Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `chore:` - Maintenance tasks
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests

## Pull Requests

1. Push your branch to your fork
2. Open a Pull Request against the `master` branch
3. Describe your changes in the PR description
4. Wait for CI to pass and for review

## Code Style

- TypeScript strict mode is enabled
- Use explicit return types on public methods
- Follow the existing patterns for component implementations
- Add tests for new features

## Questions?

Open an issue if you have questions or need help!
