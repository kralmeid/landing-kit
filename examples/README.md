# Examples

Preset configurations that show how `landing-kit` adapts to specific verticals. Each example is a drop-in replacement for the root `site.config.ts` and `messages/{en,pt}.json` — no code changes required.

## Available presets

| Preset | Use case | Default locale |
|---|---|---|
| [`engineering/`](./engineering) | Engineering consultancies, technical services firms, B2B automation shops | EN |

More presets (creative agency, professional services, restaurant, etc.) land in this folder as they are added.

## How to apply a preset

From the repo root:

```bash
# Replace the root config + messages with the engineering preset
cp examples/engineering/site.config.ts site.config.ts
cp examples/engineering/messages/en.json messages/en.json
cp examples/engineering/messages/pt.json messages/pt.json

pnpm dev
```

That is the entire adoption flow. The preset overwrites the placeholder copy with vertical-specific defaults; you then tune `brand`, `contact`, and `social` in `site.config.ts` to your own values, drop your own images into `public/placeholders/`, and ship.

## How to contribute a preset

1. Create `examples/<your-vertical>/` with:
   - `site.config.ts` — typed configuration with vertical-appropriate defaults
   - `messages/en.json` and `messages/pt.json` — full key parity with the root messages files
2. Open a pull request that updates the table above with your preset.

Keep presets opinionated. A good preset reads as "here is how a serious business in this vertical would describe itself" — not as another set of generic placeholders.
