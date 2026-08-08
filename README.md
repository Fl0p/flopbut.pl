# flopbut.pl

Personal site of Flop Butylkin. Astro, deployed to Cloudflare Workers.

Static by default - every page is prerendered and served from Workers Static Assets. Only
`/api/contact` runs on the worker, and only once its secrets are set.

## Stack

| Piece      | Choice                                                            |
| ---------- | ----------------------------------------------------------------- |
| Framework  | Astro 7, static output with an SSR escape hatch per route          |
| Hosting    | Cloudflare Workers (`@astrojs/cloudflare`)                         |
| Styling    | Tailwind 4 tokens over hand-written component CSS                  |
| Fonts      | Geologica, Golos Text, IBM Plex Mono - self-hosted, subset at build |
| Languages  | English at the root, Russian under `/ru/`, Polish under `/pl/`     |
| Tooling    | TypeScript strict, Biome, GitHub Actions                          |

## Commands

```bash
pnpm dev       # dev server at localhost:4321
pnpm build     # production build into dist/
pnpm preview   # run the built site on the real workerd runtime
pnpm verify    # lint + type check + build, same as CI
pnpm deploy    # build and push to Cloudflare
```

## Content

All copy lives in `src/i18n/ui.ts`. The English dictionary defines the shape; the other two
locales are typed against it, so a missing translation is a build error rather than a blank
line on the page. The agent roster is `src/data/crew.ts`.

The catalogue this site links out to lives at [stuff.flopbut.pl](https://stuff.flopbut.pl).

## Deployment

Pushes to `main` build and deploy through `.github/workflows/deploy.yml`. Two repository
secrets are required:

- `CLOUDFLARE_API_TOKEN` - a token with the *Edit Cloudflare Workers* template
- `CLOUDFLARE_ACCOUNT_ID`

The custom domain is not bound yet. Once `flopbut.pl` is on the account, uncomment the
`routes` block in `wrangler.jsonc`.

## Contact form

`src/pages/api/contact.ts` is written and dormant. It answers 503 until three secrets exist:
`TURNSTILE_SECRET`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` - see `.dev.vars.example`. The
pipeline is validation → honeypot → Turnstile siteverify → Telegram. Turning it on means
setting the secrets and adding the form markup; the endpoint itself needs no changes.

## Licence

MIT - see [LICENSE](LICENSE).
