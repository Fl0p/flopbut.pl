# Draft: signed-in form where people contribute content about Flop

Status: **draft, nothing implemented**. Written 2026-08-08.

## What this actually is

Not a contact form. People who know Flop sign in with GitHub and contribute something to put on
the site: "he is good with electronics", a recommendation, a thank you, a correction. The
submission becomes an issue authored by them. Agents downstream decide whether it belongs on the
site, in what shape, and drop the nasty ones.

So the site is partly written by other people, and the vouching is the point: a claim about
someone carries weight only when it is attached to a real person who made it.

## Scope

This side **ends when the issue exists**. Classification, deciding what goes on the site, writing
the copy and dropping abuse all happen downstream and are out of scope here.

```
/request/
   -> "Sign in with GitHub"     no anonymous path at all
   -> form                      only reachable once signed in
   -> POST /api/request         validate, then GitHub API as the user
   -> issue authored by the user
   -> [ agents downstream: classify, decide, publish or close ]
```

## Three consequences of "other people write the site"

### 1. Attribution is the feature, not a detail

An unattributed endorsement is worthless. "Someone said he is good with electronics" persuades
nobody, and a page full of anonymous praise reads as fabricated. Published contributions should
carry the author's GitHub identity, which is exactly what signing in already gives.

This also makes the whole thing self-defending: forging praise costs a real account with a real
history.

### 2. People must know their words may go public, with their name

Someone typing "thanks for the help" into a form does not automatically expect it rendered on a
public site under their handle. The form has to say so plainly, before submission, not in a
footnote. Whatever downstream decides, this end owes them that sentence.

Worth deciding early: what happens when someone later wants their contribution removed.

### 3. Agents improvise on purpose, and the guardrails are not structural

Deliberate decision by the owner: **do not** pre-define a slot for contributed content. A fixed
shape would flatten exactly what makes this worth doing, which is that a contributor describes
their point in their own terms and an agent works out how it belongs on the site. Prompts and a
custom classifier do the filtering. The bet is a wikipedia effect: enough people, and the site
converges on something truer than what one person would write about himself.

That freedom is affordable because the limits sit elsewhere and already exist:

- **Every change arrives as a pull request** and a human merges. Nothing an agent invents reaches
  the site unreviewed, and anything that lands can be reverted with its full history intact.
- **`pnpm verify` is the automatic filter**: lint, real type checking, and a build. An agent can
  restructure whatever it likes as long as the site still compiles.
- **The i18n contract holds regardless.** The English dictionary defines the shape and the other
  locales are typed against it, so a contribution added in one language fails the build until all
  three exist. That constraint survives any amount of improvisation.

Which is to say the wikipedia analogy needs its other half: what makes that model work is not
only many contributors, but full history, easy reverting and someone watching. Git and CI already
provide all three here.

## Decided

**GitHub App with user-to-server tokens, `Issues: write` scoped to one repository.**

Not an OAuth App: its `public_repo` scope grants write access to every public repository the
person owns, which is absurd for filing one issue.

Session between sign-in and submit: **signed httpOnly cookie**, Secure, SameSite=Lax, short
lived. No storage, and it leaves `session: false` in `astro.config.mjs` untouched. A `state`
parameter on the OAuth round trip, checked on callback, against CSRF.

## The issue is a contract

Downstream has to tell user-written text apart from instructions. So the body is generated from a
**fixed template**, and submitted text goes in a clearly delimited block, never into the
structural parts.

Two things only this side can get right:

- **Escape fence characters in user input.** An unescaped code fence lets someone break out of
  the quoted block and forge structure that looks like ours. Downstream cannot detect this
  afterwards.
- **Never build the title from free text.** Derive it from a fixed field, cap the length, strip
  newlines.

## What else belongs to this side

- Rate limit **per account**, which sign-in makes both possible and meaningful.
- Field validation and length caps.
- Honest failures: no success screen if the GitHub call failed, and keep their text in the form.
- No anonymous fallback path, including no "or email me instead" that quietly restores it.

## Suggested order of work

1. Register the GitHub App, install it on the target repository, store the secrets.
2. `/request/` page in three locales: signed-out and signed-in states, and the sentence about
   publication.
3. OAuth round trip: authorize, callback, `state` check, session cookie.
4. `POST /api/request`: validation, template rendering with escaping, issue creation as the user.

Four steps, no LLM on this side, and nothing here depends on the downstream design being settled.

## Open questions

- **What does the form ask?** Probably one free text field plus how the person knows Flop, given
  that agents classify rather than the submitter picking a category. Still undecided.
- Which repository receives the issues: this one, or the catalogue repo.
- Removal: if a contributor asks for their entry to be taken down, what is the path?
- Does a published contribution link back to its issue, so the provenance is checkable?
