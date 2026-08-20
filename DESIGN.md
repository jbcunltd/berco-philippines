# Berco — DESIGN.md

The design system for **bercohome.com**, written so a coding agent can generate new
pages that look like they were always part of the site.

**Status of this document.** Every colour, size, shadow and easing curve below was read
out of `app/globals.css` on this repo — it describes what the site *is*, not what someone
once hoped it would be. Where a value is a recommendation rather than current fact it says
so. Where the audit found a defect it says that too, and the defect is listed in
**Known Gaps** rather than quietly written up as if it were the standard.

Source of truth for *strategy and words* stays with the brand docs, not this file:
`berco-brand-guidelines.md` (audience, promise, proof) and `berco-voice-brain.md`
(tone, kill-list, truth rules). This file governs surface only.

---

## Overview

Berco sells custom cabinetry and interiors to Philippine homeowners. The site's single
job is **starting a consultation** — not browsing, not dwell time. Every design decision
below is downstream of that.

**The look:** a cream-and-white magazine. Warm paper ground, near-black ink, one
champagne accent, Bodoni headlines against Jost small-caps. Photography carries the
product; the interface gets out of its way.

**Three rules that outrank taste:**

1. **Light only.** No dark mode, no dark sections, no `prefers-color-scheme` branch.
   Standing instruction. The palette is a welcoming cream world and a dark variant would
   be a different brand.
2. **Mobile first, literally.** The audience is ~90% phone, much of it mid-range Android.
   Main-thread work is the enemy. A page that stutters costs consultations.
3. **Nothing may hide content.** No base state anywhere in the CSS may leave real content
   invisible pending JavaScript. See **Motion**.

**The house standard.** Berco, Nautilus and Skybass share one motion pattern and one
document structure, so three sites read as one company with a standard rather than three
vendors. Palette, type and voice stay brand-specific and must not converge — Nautilus is
deliberately cool graphite where Berco is warm cream.

---

## Colors

Six ink-and-paper values, one accent. Defined once on `:root`, referenced everywhere.
**Never hard-code a hex in a component** — if a colour isn't in this table it doesn't exist.

### Brand & accent

| Token | Value | Use |
|---|---|---|
| `--champ` | `#C9A863` | Champagne. Decorative only — hairline underlines, hover borders, the sliding nav rule. **Not for text. Not for focus rings** (see Known Gaps). |
| `--champ-ink` | `#876A30` | The text-safe champagne. Eyebrows, step numbers, "read more" meta, form-field markers. 4.91:1 on ground. |

### Surface

| Token | Value | Use |
|---|---|---|
| `--ground` | `#FDFBF7` | The page. Warm off-white — the whole brand sits on this. |
| `--panel` | `#F8F3EA` | One step raised: chips, tap rows, quiet info cells. |
| `--beige` | `#F0E7D8` | Warm block behind an image while it loads; flat-colour stand-ins. |

### Text

| Token | Value | Contrast on ground | Use |
|---|---|---|---|
| `--ink` | `#2B2620` | **14.50:1** | Headlines, body, buttons. Near-black, never `#000`. |
| `--ink-soft` | `rgba(43,38,32,.72)` | **5.86:1** | Secondary copy, nav links, descriptions. |
| `--ink-faint` | `rgba(43,38,32,.66)` | **4.90:1** | Captions, legal, small labels. Passes AA, but with almost no margin — do not lighten it further, and do not use it below 11px. |
| `--hair` | `rgba(43,38,32,.11)` | 1.23:1 | Hairline borders and dividers **only**. Never a border that carries meaning on its own. |

### Semantic

| Purpose | Value | Notes |
|---|---|---|
| Error / invalid | `#A6402F` | 5.98:1 on ground. Ring `0 0 0 3px rgba(166,64,47,.13)`. |
| Success | — | **Not defined.** Confirmation is currently typographic. See Known Gaps. |
| Text over photography | `#FDFBF7` headline · `rgba(253,251,247,.92)` lead · `#EAD3A0` eyebrow | Always over the scrim below, never over bare photo. |
| Photo scrim | `linear-gradient(to top, rgba(30,22,14,.62) 0%, rgba(30,22,14,.18) 40%, rgba(30,22,14,0) 66%)` | Mandatory behind any text on an image. The warm-brown tint is deliberate; a neutral black scrim goes cold and reads as another brand. |

### Focus

The focus indicator is a **brand-critical, non-negotiable component**, not decoration.

```css
a:focus-visible, button:focus-visible { outline: 2px solid var(--champ-ink); outline-offset: 3px }
```

> ⚠️ **The live site currently uses `var(--champ)` here, which measures 2.19:1 against the
> ground and fails WCAG 2.2 SC 1.4.11 (3:1 minimum for non-text).** `--champ-ink` is the
> corrected value shown above and reaches 4.91:1. Fix pending — see Known Gaps #1.

---

## Typography

Two families, loaded through `next/font/google` so they self-host and never flash.

| Role | Token | Family | Weights |
|---|---|---|---|
| Display | `--serif` | **Libre Bodoni** → `'Bodoni 72', Didot, Georgia, serif` | 400, 500 |
| Interface | `--sans` | **Jost** → `Futura, 'Avenir Next', system-ui, sans-serif` | 400, 500, 600 |

### Hierarchy

Every display size is fluid. The pattern is always `clamp(mobile, viewport, desktop)` —
there are no fixed heading sizes on this site.

| Element | Size | Line-height | Notes |
|---|---|---|---|
| Hero `h1` (over photo) | `clamp(38px, 6vw, 78px)` | `1.0` | Serif 500, `letter-spacing:-.01em` |
| Manifesto `h2` | `clamp(34px, 6.4vw, 74px)` | `1` | The single-line statement |
| Feature `h2` (over photo) | `clamp(30px, 5.4vw, 60px)` | `.98` | |
| Closing `h2` | `clamp(26px, 4.4vw, 48px)` | `1.1` | `max-width:20ch`, centred |
| Section `h2` | `clamp(22px, 3.4vw, 34px)` | — | The workhorse |
| Card title | `clamp(17px, 1.8vw, 21px)` | `1.2` | Serif |
| Body | `14–15px` | `1.5–1.6` | Sans 400, `--ink-soft` |
| Small body / card copy | `13–13.5px` | `1.5` | |
| **Eyebrow** | `11px` | — | `.28em` tracking, uppercase, 600, `--champ-ink` |
| **Caption** (`.cap`) | `9.5px` | — | `.16em`, uppercase, `--ink-faint` |
| Button / link / nav | `12px` | — | `.08–.09em`, uppercase, 600 |
| Field label | `11px` | — | `.16em`, uppercase, 600, `--ink-soft` |
| Form input | `15px` → **`16px` below 820px** | — | The 16px is load-bearing, see below |

### Principles

- **Serif headlines, sans everything else.** `h1,h2,h3` are serif by global rule. Small
  uppercase labels that happen to be an `h3` (footer column heads) must restate
  `font-family:var(--sans)` — this is intentional, not an oversight.
- **Headings use `text-wrap: balance`.** Bodoni at 70px with a one-word last line looks
  broken. Balance it.
- **Tracking scales inversely with size.** Big serif is tight (`-.01em`); small sans caps
  are wide (`.08em` → `.28em`). Never track a headline out or a label in.
- **Measure is capped in `ch`** — `38ch` manifesto, `42ch` hero lead, `48ch` form intro,
  `62ch` body. Except where the container font-size makes `ch` unreliable: the hero type
  block uses `min(88%, 640px)` in px on purpose. Don't "tidy" that back to `ch`.
- **Never go below 16px on a form field on a phone.** iOS Safari zooms the viewport on
  focus for anything smaller. On a ~90% mobile audience that is a jolt on every tap.
- **Never below 11px for `--ink-faint`.** It clears AA by a hair at best.

---

## Layout

### Spacing

The system is **fluid clamps, not a fixed 4/8 scale** — stated plainly so nobody
"corrects" it into one. Vertical rhythm scales with viewport height, horizontal with width.

| Slot | Value |
|---|---|
| Section (default) | `clamp(46px, 7vh, 86px)` top & bottom |
| Section (statement — manifesto) | `clamp(64px, 11vh, 124px)` |
| Section (closing CTA) | `clamp(72px, 12vh, 140px)` |
| Grid gap | `clamp(14px, 2vw, 24px)` |
| Form field gap | `clamp(16px, 2.4vh, 22px)` |
| Shell inline padding | `clamp(18px, 4vw, 52px)` |

Fixed values inside components cluster on **2 · 4 · 6 · 8 · 11 · 12 · 14 · 16 · 20 · 22 · 26**.
Pick from that set; don't invent a 15 or a 19.

### Grid & container

```css
--maxw: 1240px;
.shell { max-width: var(--maxw); margin: 0 auto; padding: 0 clamp(18px,4vw,52px) }
```

Collection grid steps `4 → 3 → 2 → 1` at `1080 / 820 / 520`. Process steps `4 → 2 → 1`
at `720 / 420`. Footer is `1.5fr 1fr 1fr .9fr` — the brand column is deliberately widest.

> `.wrap` uses `overflow-x: clip`, **not `hidden`**. `hidden` forces `overflow-y` to
> compute as `auto`, which makes `.wrap` a scroll container, which makes the sticky nav
> resolve against a scrollport that never scrolls — the nav then rides away with the page.
> Measured. Do not change this back.

### Whitespace philosophy

Air is the luxury signal, and it is spent unevenly on purpose. The manifesto and the
closing CTA get roughly **1.5×** the padding of an ordinary section, because those are the
two moments the reader is asked to feel something rather than scan. Everything else is
tight, hairline-divided, and dense — closer to a magazine contents page than a landing page.

---

## Elevation & Depth

Shadows are **tinted with the ink colour, never black** — `rgba(43,38,32,…)`. Black
shadows go grey-blue on a cream ground and instantly cheapen it.

The signature is a **long, soft, heavily-inset shadow**: large blur, large *negative*
spread, low opacity. It reads as diffuse daylight rather than a drop shadow.

| Level | Value | Use |
|---|---|---|
| 0 — flat | none | Default. Most of the site has no shadow at all. |
| 1 — hover lift | `0 14px 30px -16px rgba(43,38,32,.55)` | Buttons on hover, paired with `translateY(-2px)` |
| 2 — card raise | `0 22px 44px -28px rgba(43,38,32,.45)` | Collection / download cards on hover |
| 3 — panel | `0 24px 46px -26px rgba(43,38,32,.5)` | Catalogue pages, reference cards |
| 4 — overlay | `0 22px 44px -30px rgba(43,38,32,.5)` | Open mobile menu |
| Chrome | `0 1px 0 var(--hair), 0 12px 34px -26px rgba(43,38,32,.55)` | Sticky nav once scrolled |

**Depth is mostly *not* shadow.** It is hairlines (`--hair`), a one-step surface change
(`--ground` → `--panel`), and image scale on hover. Reach for those first.

---

## Shapes

| Radius | Use |
|---|---|
| **`2px`** | The brand default — buttons, inputs, tap rows, small CTAs. Almost square. |
| `4px` | Grid containers with a hairline border |
| `6px` | Image cards and tiles |
| `5px` | Hero image only |
| `30px` (pill) | Chips |
| `50%` | Circular carousel controls (46px) |

The near-square `2px` is the point: it is what keeps the site reading as architecture
rather than as a SaaS product. **Do not round a button to 8px.**

> Current CSS also contains stray `3px`, `5px` and `8px` values. Target scale is
> **2 / 4 / 6 / pill / circle** — see Known Gaps #4.

---

## Components

### Buttons

```css
.btn { display:inline-flex; align-items:center; gap:9px;
       font-size:12px; letter-spacing:.09em; text-transform:uppercase; font-weight:600;
       padding:14px 22px; border-radius:2px;
       background:var(--ink); color:var(--ground);
       transition:opacity .3s var(--ease), transform .35s var(--ease), box-shadow .35s var(--ease) }
.btn:hover { opacity:.85; transform:translateY(-2px); box-shadow:0 14px 30px -16px rgba(43,38,32,.55) }
```

- **Primary** — ink fill, ground text. 14.50:1. One per screen.
- **Ghost** (`.navcta`) — `1px solid var(--ink)`, transparent, inverts on hover.
- **Text link** (`.link`) — 12px uppercase with a `--champ` bottom rule; on hover the
  tracking opens `.09em → .12em` and the rule darkens to ink. That letter-spacing shift
  is the site's most characteristic micro-interaction. Keep it.
- **Over photography** — the fill flips to `#FDFBF7` on `#2B2620` text.

### Inputs & forms

```css
.fld input, .fld select, .fld textarea {
  font:inherit; font-size:15px; color:var(--ink); background:var(--ground);
  border:1px solid var(--hair); border-bottom-color:rgba(43,38,32,.28);
  border-radius:2px; padding:13px 14px; width:100% }
```

- **The heavier bottom border is deliberate** — it gives a printed-form feel without a
  full box outline.
- **Focus:** `border-color` + `box-shadow: 0 0 0 3px rgba(201,168,99,.26)`. Same 1.4.11
  problem as the global ring — the border must move to `--champ-ink` (Known Gaps #1).
- **Invalid:** `#A6402F` border + `0 0 0 3px rgba(166,64,47,.13)`, driven off
  `aria-invalid="true"` so the state is announced, not merely coloured.
- **Optional fields live behind `<details>/<summary>`** — a native disclosure, no JS,
  nothing to read past. Keep it native.
- **Labels are always visible.** No placeholder-as-label, ever.
- **Two-column rows collapse to one at 560px.**

### Cards

`.ccard` — image, then label beneath. Never text over the photo in a grid.

- `aspect-ratio:16/9`, `border-radius:6px`, `1px solid var(--hair)`, `--beige` ground.
- Hover: border → `--champ`, shadow level 2, image `scale(1.04)` over `.9s`.
- The "go" arrow nudges `translateX(4px)`.
- **Uniform aspect ratio across the grid is a rule.** Mixed ratios turn a considered
  collection into a Pinterest board.

### Inline

- **Eyebrow** — 11px `.28em` uppercase `--champ-ink`. Sits above a headline. Never alone.
- **Caption** (`.cap`) — 9.5px `.16em` `--ink-faint`, absolutely positioned in an image
  corner. Metadata only, never information the reader needs.
- **Chip** — `--panel` fill, `--hair` border, pill, 13px. Hover lifts 1px to white with a
  champagne border.

### Navigation

Sticky, `z-index:30`, `backdrop-filter: blur(9px)` over a 90%-opaque ground.

- 66px tall; shrinks to **54px** past 12px of scroll, gains a shadow, loses its border.
- Links get a **champagne underline that wipes in from the left** (`scaleX` on `::after`).
- **Below 860px** the links become a full-width dropdown panel; hamburger is a real
  `<button>` at **44×44** with `aria-expanded` kept in sync, and the panel closes on
  link click.
- Tap-to-call and Messenger appear **in the mobile menu only** — on desktop "tap to call"
  is meaningless and they clutter the bar.
- A `.skip` link precedes the nav and becomes visible on focus.

### Footer

Four columns (`1.5fr 1fr 1fr .9fr`), lockup + contact in the widest. Column heads are
`h3` — **not `h4`** — because jumping h2→h4 skips a level and fails WCAG heading order.
They restate `font-family:var(--sans)`.

---

## Motion

**This is the section that carries the house standard across all three brand sites.**
Copy it verbatim into Nautilus and Skybass. Everything above this line is Berco-specific;
this is not.

### The easing curve

```css
--ease: cubic-bezier(.2, .7, .2, 1);
```

One curve, everything. Fast out, long settle — expensive, not bouncy. **Never** use
`ease-in-out`, and never a spring or an overshoot on this brand.

### Duration scale

| Duration | Use |
|---|---|
| `.2s` | Field borders, immediate state |
| `.3s` | Hover — colour, opacity, tracking |
| `.35–.45s` | Chrome — nav height, background, shadow |
| `.7s` | Scroll reveal |
| `.9s` | Image drift inside a card |

### The four scroll patterns

1. **Fade + rise** — opacity 0→1 with a ~15px translate, on headings and paragraphs.
2. **Image unmask** — `clip-path: inset()` opening, with a slight scale-down.
3. **Sticky hero with slow background drift** — the restrained parallax. Never more than
   a few percent of element height.
4. **Staggered grid** — each tile animates on **its own scroll position**, never on a
   JS timer or an `nth-child` delay chain.

### Implementation — CSS only, no exceptions

Use native **`animation-timeline: view()` / `scroll()`**. These run on the compositor, so
they physically cannot jank on a mid-range Android.

**Banned, permanently:**

- **JS animation libraries** — GSAP ScrollTrigger, Framer Motion, AOS. 30–100KB of
  JavaScript plus main-thread scroll handlers, on the exact audience that can least
  afford it.
- **Smooth-scroll hijacking** — Lenis and equivalents. Overrides native scroll, feels
  rubbery under a thumb, breaks find-in-page, and is an accessibility problem.
- **`window.addEventListener('scroll', …)` driving visual state.** If something must
  respond to scroll position, it is a `scroll()` timeline.

`html { scroll-behavior: smooth }` is fine — that is native anchor behaviour, not hijacking.

### The three non-negotiables

**1. The default state is VISIBLE.** The animation goes *inside* `@supports`; the resting
state outside it is the finished, readable page.

```css
/* correct */
.reveal { opacity: 1 }                                  /* base: readable */
@supports (animation-timeline: view()) {
  @media not (prefers-reduced-motion: reduce) {
    .reveal { animation: rise linear both; animation-timeline: view();
              animation-range: entry 5% cover 28% }
  }
}
@keyframes rise { from { opacity:0; transform:translateY(15px) } to { opacity:1; transform:none } }
```

```css
/* WRONG — this is how a page ships blank */
.reveal { opacity: 0 }
.reveal.in { opacity: 1 }   /* requires JS that may never run */
```

This is not defensive style. **Firefox stable does not ship `animation-timeline` at all**,
and Safari only gained it in **26**. A large minority of visitors will never run the
animation — they must get a complete, static, correct page, and they do, automatically,
because the base state is the finished state.

**2. `prefers-reduced-motion: reduce` kills all of it** — reveals, drift, unmask, stagger.
And it must kill *only motion*. A reduced-motion user keeps every carousel, every image
viewer, every control. Motion preference is not a feature flag.

**3. Nothing animates on text the reader must read first.** The hero headline, the
manifesto line, the price-free offer copy and any form label are static, always. Motion is
for the second screen onward.

### Browser support — verified, not assumed

| Browser | `animation-timeline` |
|---|---|
| Chrome / Edge (+ Android, Samsung Internet) | **115+** ✅ |
| Safari / iOS Safari | **26+** ✅ |
| Firefox (desktop & Android) | **preview only — not in stable** ❌ |

*Source: MDN browser-compat-data, read 2026-08-20.*

Everything below those versions gets the static page. That is the designed outcome.

---

## Do's and Don'ts

**Do**

- Reference tokens. If a colour, radius or duration isn't in this document, don't use it.
- Let photography carry the product and keep the interface quiet around it.
- Use hairlines and a one-step surface change before reaching for a shadow.
- Keep the focus ring visible and high-contrast on every interactive element.
- Keep every tap target ≥44px on a phone.
- Write `alt` text that describes the cabinetry, not the file.
- Cap measure in `ch`, and balance headline wraps.

**Don't**

- Don't add a dark mode, a dark section, or a `prefers-color-scheme` branch.
- Don't use `--champ` for text or for a focus ring — it is 2.19:1.
- Don't set `opacity: 0` as a base state on anything containing content.
- Don't add a JavaScript animation or smooth-scroll library.
- Don't round buttons past 2px or mix aspect ratios inside one grid.
- Don't use a placeholder as a label, or convey a state by colour alone.
- Don't put a price, a cost, or a competitor comparison on any public page — standing
  brand rule; reframe to value, durability and craft.
- Don't borrow another JBC brand's palette, project history, or track record.

---

## Responsive Behavior

### Breakpoints

Max-width, mobile-first content order. In use: **1080 · 900 · 860 · 820 · 760 · 720 ·
700 · 640 · 600 · 560 · 520 · 440 · 420**.

That is more than a system needs. The **canonical four** for new work are:

| Breakpoint | Meaning |
|---|---|
| `1080px` | Desktop → narrow desktop |
| `860px` | **Navigation collapses to hamburger** |
| `820px` | Tablet → phone. Also where inputs go 16px. |
| `520px` | Single column |

Use an existing value before adding a new one.

### Touch targets

Minimum **44×44** on phone. Currently met by the hamburger (44), tap rows (60) and
carousel controls (46). Currently **not** met by footer links (~31px) and the disclosure
summary (30px) — Known Gaps #3.

### Collapsing strategy

Grids step down one column at a time. Two-column form rows go single at 560px. Nav becomes
a panel at 860px. The hero switches to a viewport-height clamp so the headline never
outgrows a short phone screen.

### Image behavior

- Every image is `object-fit: cover` on an explicit `aspect-ratio` — no layout shift.
- Warm `--beige` placeholder behind every slot.
- Real `<img>` tags, not CSS backgrounds, wherever the image is content (SEO + alt text).
- **Every photograph carries the Berco lockup: plain white, top-left, 15% of width, 3.5%
  margin, hard-edged. No shadow, no glow, no stroke, ever** — including when it lands on
  a blown-out white area and becomes invisible. That is an accepted trade-off; the only
  permitted remedies are re-cropping or swapping the photo.

---

## Iteration Guide

**Adding a component**

1. Find the nearest existing component and start from its spec.
2. Compose from tokens only.
3. Radius from the scale. Shadow only if hairline + surface change genuinely won't do.
4. Every interactive element: visible focus ring, ≥44px on phone, keyboard operable.
5. If it animates on scroll: base state visible, `@supports` wrapper, reduced-motion kill.
6. Run `/web-design-guidelines` before shipping.
7. Update this file in the same commit.

**Changing a token**

`--ground`, `--ink` and `--champ-ink` are load-bearing across every page. Changing one is
a site-wide change: re-check contrast for `--ink-soft`, `--ink-faint` and `--champ-ink`,
and re-check the over-photo palette. Record the new ratios here.

**Porting to Nautilus or Skybass**

Copy **Motion** verbatim — that is the shared house standard. Copy the *structure* of
every other section but refill it from that brand's own palette and type. Nautilus is
cool graphite on white by explicit decision, precisely so it does not read as Berco; do
not "harmonise" the palettes.

**Deploying**

Commit as `Berco Catalogue <bercohomeph@gmail.com>` via `GIT_AUTHOR_*` / `GIT_COMMITTER_*`.
Vercel silently marks an unknown git author's deploy BLOCKED — the push succeeds and the
site never changes. Always poll the live URL until it returns 200 *and* the new content is
actually present before calling it done.

---

## Known Gaps

Open defects and inconsistencies, found by audit on **2026-08-20**. Ranked.

**1. 🚨 The global focus ring fails WCAG 2.2 SC 1.4.11.**
`a:focus-visible, button:focus-visible { outline: 2px solid var(--champ) }` measures
**2.19:1** against `--ground` — the minimum for a non-text indicator is 3:1. This affects
every keyboard user on every page. The form-field focus border has the same problem.
*Fix:* move both to `--champ-ink` (**4.91:1**). Same colour family, no visual cost.

**2. 🚨 `.reveal` and `.stag > *` are `opacity: 0` by default, gated on JavaScript.**
Directly violates the non-negotiable in **Motion**. Guarded today by `<noscript>` and
`@media (scripting:none)`, which cover JS *disabled* but not JS *failing* — a throw
anywhere earlier in the inline script leaves real content invisible with no fallback.
*Fix:* the CSS scroll-driven migration, which removes the JS dependency entirely.
*Note:* **Nautilus already solves this correctly** with `html.reveal-armed [data-reveal]`
— the hiding rule only applies once JS has armed it. Berco should match that pattern at
minimum, and preferably skip straight to native CSS.

**3. 🚨 Reduced-motion users lose functionality, not just motion.**
The inline script returns early under `prefers-reduced-motion: reduce`, before the
carousel, the product-image viewer and the parallax handler are wired. Result: on the
homepage the planning carousel's arrows and dots are **dead**, and on collection reference
pages the thumbnail viewer does **nothing** — for reduced-motion users only. Confirmed
present in the live served HTML. Violates non-negotiable #2 in **Motion**.
*Fix:* handle motion preference per-feature; never `return` out of shared wiring.

**4. Sub-44px tap targets.** Footer links (`padding:5px 0` on 14px ≈ 31px) and the
`<summary>` disclosure (`min-height:30px`).

**5. Radius drift.** `3px`, `5px` and `8px` are in use outside the 2/4/6/pill/circle scale.

**6. Breakpoint sprawl.** Thirteen distinct max-widths where four would do.

**7. No success/confirmation colour.** The semantic palette has an error state and no
positive counterpart. Inquiry confirmation is typographic only.

**8. `--ink-faint` is used at 9.5px.** Contrast passes (4.90:1); the size does not serve
a mostly-mobile audience. Caption text should not go below 11px.

**9. Duplicate `next.config.mjs`** at both repo root and `app/`. Harmless today; a trap
for the next person editing the wrong one.

**10. Not yet audited against `/web-design-guidelines`.** This document was written from
the CSS; the formal audit is the next gate and will likely add to this list.

**11. Skybass has no site repository.** The house-standard motion pattern can be applied
to Berco and Nautilus today. Skybass is named in the plan but there is nothing to apply
it to yet.
