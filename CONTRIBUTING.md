# Contributing

Thanks for helping improve `landing-kit`.

## Local Setup

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open <http://localhost:3000/pt> or <http://localhost:3000/en>.

## Quality Gate

Run these before opening a pull request:

```bash
pnpm run lint
pnpm run typecheck
pnpm run build
```

## Pull Request Expectations

- Keep changes focused and documented.
- Use `pnpm`; do not add npm or yarn lockfiles.
- Update both `messages/pt.json` and `messages/en.json` for visible copy changes.
- Include screenshots for UI changes.
- Update `README.md`, `examples/README.md`, or `CHANGELOG.md` when behavior, setup, or public-facing guidance changes.

## Starter Constraints

- Keep the default project usable without private services.
- Do not commit real API keys, customer data, or proprietary client assets.
- Keep `Typecheck, lint, build` as the CI job name unless the branch ruleset is updated at the same time.
