# flopbut.pl

Personal site of Flop Butylkin. Astro 7, deployed to Cloudflare Workers.

## Typography rule: no em dashes

Never use the long dash character in any text on this site or in this repository.
Use a plain hyphen instead.

- Wrong: `iOS — с момента появления платформы`
- Right: `iOS - с момента появления платформы`

This applies to all three locales, to code comments, to README and commit messages.
Check with `grep -rn "—" src/` before committing.

## Name

The only name that appears anywhere public is **Flop Butylkin**. Never substitute another.

## Content

All copy lives in `src/i18n/ui.ts`. The English dictionary defines the shape and the other
locales are typed against it, so a missing translation is a build error rather than a blank
line. Tool names in `src/data/stack.ts` and agent names in `src/data/crew.ts` are not translated.

Facts that are easy to get wrong: iOS dates back to the launch of the platform, with no
specific year given; React Native is strictly since 2019; Android belongs in the stack too.

## Commands

```bash
pnpm dev       # dev server, runs as a daemon; stop with `pnpm exec astro dev stop`
pnpm verify    # lint + type check + build, same as CI
pnpm deploy    # build and push to Cloudflare
```

Deployment reads `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` from `.env`, which is
git-ignored. That token has no Workers KV permission, which is why `session: false` is set in
`astro.config.mjs`: without it the adapter tries to provision a KV namespace and the deploy
fails after uploading assets.

The apex is bound with a plain route rather than `custom_domain`, because leftover proxied A
records on `flopbut.pl` block custom domain attachment. Deleting those records and switching
to `custom_domain` is the tidier end state.
