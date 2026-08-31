# Contributing to NOVA

Thank you for your interest in contributing to NOVA — THE NEW STAR.

This project is open source (AGPL-3.0) and is deliberately built to be **readable and understood by engineering students**. When you contribute, keep that goal in mind: clarity matters as much as correctness.

## Code of Conduct

By participating, you agree to follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## How to contribute

1. **Fork** the repository and create a branch from `main`:
   ```bash
   git checkout -b feat/my-description
   ```
2. **Make focused, atomic commits.** One logical change per commit, with a clear message.
3. **Write clear code and comments.** Explain the *why*, not just the *what*. The code should teach.
4. **Add or update tests** for any behavior you change.
5. **Open a Pull Request** describing what you changed and why.

## Commit message style

We use conventional, descriptive messages:

```
feat: add message read receipts
fix: prevent double-submission on send
docs: explain WebSocket signaling flow
test: cover message validation
```

## Branch naming

- `feat/...` — new feature
- `fix/...` — bug fix
- `docs/...` — documentation
- `test/...` — tests only
- `refactor/...` — code change with no behavior change

## Style

- Code and comments are in **English**.
- Run the linter before committing: `pnpm lint`.
- Run the tests before committing: `pnpm test`.
- Follow the existing structure and naming conventions (see the project `docs/`).
