# DESIGN.md — Berco

The design system for **bercohome.com**, written so a coding agent can build matching UI
without guessing. Format follows the DESIGN.md convention (Google Stitch / `awesome-design-md`);
the *schema* is borrowed, every *value* is Berco's own.

**Every value here was read out of `app/globals.css` in `jbcunltd/berco-philippines`.** Where a
value is a *proposal* rather than current fact, it is marked **PROPOSED**. Where the audit found
a defect it is in **Known Gaps**, not written up as if it were the standard.

Strategy and words live elsewhere and outrank this file on their own ground:
`berco-brand-guidelines.md` (audience, promise, proof) and `berco-voice-brain.md` (tone,
kill-list, truth rules). This file governs surface only.

> **Canonical location.** This file and `DESIGN.md` at the root of `jbcunltd/berco-philippines`
> are the same document in two places — the workspace copy for reading, the repo copy so a coding
> agent working in the site sees it. **Change both in the same commit.**

---

## Overview

Premium custom cabinetry and interiors, Philippines. The single job of the site is **starting a
consultation** — not browsing, not dwell time. Every decision below is downstream of that.

The register is **quiet luxury** — warm, calm, editorial. Cream-and-white magazine: warm paper
ground, near-black ink, one champagne accent, Bodoni headlines against Jost small-caps. **The
photograph owns the frame**; type sits *on* the image, never in a box or coloured panel beside it.
If a choice is between more and less, choose less.

**Three rules that outrank taste:**

1. **Light only. There is no dark mode and one is not wanted.** No `prefers-color-scheme` branch.
   Dark areas exist only as *editorial inversions over imagery* — a treatment, not a theme.
2. **Mobile first, literally.** ~90% phone, much of it mid-range Android. Main-thread work is the
   enemy; a page that stutters costs consultations.
3. **Nothing may hide content.** No base state anywhere may leave real content invisible pending
   JavaScript. See **Motion**.

**The house standard.** Berco, Nautilus and Skybass share the **Motion** section and this document's
structure, so three sites read as one company. Palette, type and voice stay brand-specific and must
**not** converge — Nautilus is deliberately cool graphite where Berco is warm cream.

---

## Colors

Six ink-and-paper values, one accent. Defined once on `:root`. **Never hard-code a hex in a
component** — if a colour isn't below, it doesn't exist.

### Brand & accent

| Token | Value | Use |
|---|---|---|
| `--champ` | `#C9A863` | Champagne. **Decorative only** — underlines, hover borders, the sliding nav rule. Not for text, **not for focus rings**. |
| `--champ-ink` | `#876A30` | The text-safe champagne. Eyebrows, step numbers, meta, **and every focus ring**. 4.91:1 on ground. |
| gold-on-dark | `#EAD3A0` | The accent lifted for legibility over dark imagery. 12.18:1 on the scrim. **Only over imagery** — 1.42:1 on `--ground`. |

### Surface

| Token | Value | Use |
|---|---|---|
| `--ground` | `#FDFBF7` | The page. Warm off-white — **never `#FFF`**. |
| `--panel` | `#F8F3EA` | One step raised: chips, tap rows, quiet info cells. |
| `--beige` | `#F0E7D8` | Deepest light surface; warm block behind a loading image. |

### Text

| Token | Value | On ground | Use |
|---|---|---|---|
| `--ink` | `#2B2620` | **14.50:1** | Headlines, body, buttons. Warm near-black — **never `#000`**. |
| `--ink-soft` | `rgba(43,38,32,.72)` | **5.86:1** | Secondary copy, nav links, descriptions. |
| `--ink-faint` | `rgba(43,38,32,.66)` | **4.90:1** | Captions, legal, small labels. Passes AA with almost no margin — do not lighten, do not use below 11px. |
| `--hair` | `rgba(43,38,32,.11)` | 1.23:1 | Hairline borders **only**. Never a border that carries meaning alone. |

### Semantic

| Purpose | Value | On ground |
|---|---|---|
| Error — border / outline | `#A6402F` | 5.98:1 |
| Error — **text** | `#8E3323` | **7.67:1** |
| Invalid field ring | `rgba(166,64,47,.13)` | — |
| Success / warning / info | **none defined** | see Known Gaps |
| Photo scrim | `linear-gradient(to top, rgba(30,22,14,.62) 0%, rgba(30,22,14,.18) 40%, rgba(30,22,14,0) 66%)` | mandatory behind text on any image; the warm-brown tint is deliberate — a neutral black scrim goes cold and reads as another brand |

### Focus — ✅ fixed 2026-08-23

```css
a:focus-visible, button:focus-visible { outline: 2px solid var(--champ-ink); outline-offset: 3px }
```

The ring previously used `--champ`, which measures **2.19:1** against `--ground` and failed
WCAG 2.2 SC 1.4.11 (3:1 minimum for a non-text indicator). It now uses `--champ-ink` at **4.91:1**
on ground and **4.60:1** on panel. The field focus border and its tint moved with it.
**All five focus indicators now pass.** `--champ` stays decorative. Do not "restore" the brand gold
to the ring — there is a comment in `globals.css` saying so.

---

## Typography

Two families, via `next/font/google` so they self-host and never flash.

| Role | Token | Family | Weights |
|---|---|---|---|
| Display | `--serif` | **Libre Bodoni** → `'Bodoni 72', Didot, Georgia, serif` | 400, 500 |
| Interface | `--sans` | **Jost** → `Futura, 'Avenir Next', system-ui, sans-serif` | 400, 500, 600 |

A high-contrast Didone against a geometric sans. **That pairing is the brand's visual signature.**

### Hierarchy

Every display size is fluid — `clamp(mobile, viewport, desktop)`. There are no fixed heading sizes.

| Element | Size | Line-height |
|---|---|---|
| Hero `h1` (over photo) | `clamp(38px, 6vw, 78px)` | `1.0` |
| Manifesto `h2` | `clamp(34px, 6.4vw, 74px)` | `1` |
| Feature `h2` (over photo) | `clamp(30px, 5.4vw, 60px)` | `.98` |
| Closing `h2` | `clamp(26px, 4.4vw, 48px)` | `1.1` |
| **Section `h2`** — the workhorse | `clamp(22px, 3.4vw, 34px)` | — |
| Card / slide `h3` | `clamp(17px, 1.8vw, 21px)` · slides `clamp(21px, 2.5vw, 27px)` | `1.08–1.2` |
| Body | `14–15px` | `1.5–1.6` |
| Small body | `13–13.5px` | `1.5` |
| **Eyebrow** | **`11px`**, `.28em`, uppercase, 600, `--champ-ink` | — |
| **Caption** (`.cap`) | **`9.5px`**, `.16em`, uppercase, `--ink-faint` | — |
| Button / link / nav | `12px`, `.08–.09em`, uppercase, 600 | — |
| Field label | `11px`, `.16em`, uppercase, 600 | — |
| Form input | `15px` → **`16px` below 820px** | — |

### Principles

- **Serif headlines, sans everything else.** `h1,h2,h3` are serif by global rule. Small uppercase
  labels that happen to be an `h3` (footer column heads) **must restate `font-family:var(--sans)`** —
  intentional, not an oversight.
- **Headings are never bold.** Weight 500 on the Didone reads more expensive than 700.
- **Headings set tight** (0.98–1.15) and use `text-wrap: balance` — Bodoni at 70px with a one-word
  last line looks broken.
- **Tracking scales inversely with size.** Big serif is tight (`-.01em`); small sans caps are wide
  (`.08em` → `.28em`). Never track a headline out or a label in.
- **Sentence case in body copy. The eyebrow and small labels are the only uppercase.**
- **Measure capped in `ch`** — 38ch manifesto, 42ch hero lead, 48ch form intro, 62ch body. Except
  the hero type block, which uses `min(88%, 640px)` in px on purpose: `ch` computes against the
  16px container font and was collapsing the column. Don't "tidy" that back to `ch`.
- **Never below 16px on a form field on a phone** — iOS Safari zooms the viewport on focus.
- **Never below 11px for `--ink-faint`.** It clears AA by a hair at best.

---

## Layout

### Spacing

Current system is **fluid clamps, not a fixed scale** — stated plainly so nobody "corrects" it
into one. Vertical rhythm scales with viewport height, horizontal with width.

| Slot | Value |
|---|---|
| Section (default) | `clamp(46px, 7vh, 86px)` |
| Section (statement — manifesto) | `clamp(64px, 11vh, 124px)` |
| Section (closing CTA) | `clamp(72px, 12vh, 140px)` |
| Grid gap | `clamp(14px, 2vw, 24px)` |
| Form field gap | `clamp(16px, 2.4vh, 22px)` |
| Shell inline padding | `clamp(18px, 4vw, 52px)` |

**PROPOSED** — discrete values inside components currently cluster on 2 · 4 · 6 · 8 · 11 · 12 · 14 ·
16 · 20 · 22 · 26. Normalise toward a **4px base** (4 / 8 / 12 / 16 / 24 / 32 / 48 / 64). The fluid
section clamps stay as they are; this proposal governs component internals only.

### Grid & container

```css
--maxw: 1240px;
.shell { max-width: var(--maxw); margin: 0 auto; padding: 0 clamp(18px,4vw,52px) }
```

Collection grid steps `4 → 3 → 2 → 1` at `1080 / 820 / 520`. Process steps `4 → 2 → 1` at
`720 / 420`. Footer is `1.5fr 1fr 1fr .9fr` — the brand column is deliberately widest.

> `.wrap` uses `overflow-x: clip`, **not `hidden`**. `hidden` forces `overflow-y` to compute as
> `auto`, making `.wrap` a scroll container, so the sticky nav resolves against a scrollport that
> never scrolls and rides away with the page. Measured. Do not change this back.

### Whitespace philosophy

Air is the luxury signal, spent unevenly on purpose. The manifesto and the closing CTA get ~**1.5×**
an ordinary section, because those are the two moments the reader is asked to feel something rather
than scan. Everything else is tight, hairline-divided and dense — closer to a magazine contents page
than a landing page. **When a layout feels wrong, remove an element before adding one.**

---

## Elevation & Depth

Shadows are **tinted with the ink colour, never black** — `rgba(43,38,32,…)`. Black goes grey-blue
on a cream ground and cheapens it instantly.

The signature is a **long, soft, heavily-inset shadow**: large blur, large *negative* spread, low
opacity. It reads as diffuse daylight, not a drop shadow.

| Level | Value | Use |
|---|---|---|
| 0 — flat | none | Default. Most of the site has no shadow at all. |
| 1 — hover lift | `0 14px 30px -16px rgba(43,38,32,.55)` | Buttons on hover, with `translateY(-2px)` |
| 2 — card raise | `0 22px 44px -28px rgba(43,38,32,.45)` | Collection / download cards on hover |
| 3 — panel | `0 24px 46px -26px rgba(43,38,32,.5)` | Catalogue pages, reference cards |
| 4 — overlay | `0 22px 44px -30px rgba(43,38,32,.5)` | Open mobile menu |
| Chrome | `0 1px 0 var(--hair), 0 12px 34px -26px rgba(43,38,32,.55)` | Sticky nav once scrolled |

**Depth is mostly *not* shadow.** It is hairlines, a one-step surface change (`--ground` → `--panel`),
and image scale on hover. Reach for those first. **No hard drop shadows. No glows. Ever** — this
extends the plain-white-lockup rule.

---

## Shapes

| Radius | Use |
|---|---|
| **`2px`** | The brand default — buttons, inputs, tap rows, small CTAs. Almost square. |
| `4px` | Grid containers with a hairline border; small cards |
| `6px` | Image cards and tiles |
| `5px` | Hero image only |
| `30px` (pill) | Chips |
| `50%` | Circular carousel controls (46px) |

The near-square `2px` is the point: it keeps the site reading as **architecture**, not as a SaaS
product. **Do not round a button to 8px.**

**PROPOSED target scale: `2 / 4 / 8 / pill / 50%`.** Live code uses 2, 3, 4, 5, 6, 8 and 30px with no
system. Migrating means deciding where the image cards land — 6px → 8px makes media softer, 6px → 4px
makes it crisper. **That is a visible design decision, not a find-and-replace.** See Known Gaps #2.

### Photography geometry

Full-bleed wherever possible. Type goes on the image in a clean luminance band; **never** a solid
panel beside the photo. Uniform aspect ratio across any one grid — mixed ratios turn a considered
collection into a Pinterest board.

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

- **Primary** — ink fill, ground text, 14.50:1. One per screen.
- **Ghost** (`.navcta`) — `1px solid var(--ink)`, transparent, inverts on hover.
- **Text link** (`.link`) — 12px uppercase with a `--champ` bottom rule; on hover the tracking opens
  `.09em → .12em` and the rule darkens to ink. **The site's most characteristic micro-interaction —
  keep it.** Secondary action is this, never an outlined box.
- **Over photography** — the fill flips to `#FDFBF7` on `#2B2620`.

### Inputs & forms

```css
.fld input, .fld select, .fld textarea {
  font:inherit; font-size:15px; color:var(--ink); background:var(--ground);
  border:1px solid var(--hair); border-bottom-color:rgba(43,38,32,.28);
  border-radius:2px; padding:13px 14px; width:100% }
```

- **The heavier bottom border is deliberate** — a printed-form feel without a full box outline.
- **Focus:** `border-color:var(--champ-ink)` + `box-shadow:0 0 0 3px rgba(135,106,48,.30)`.
- **Invalid:** `#A6402F` border + ring, driven off `aria-invalid="true"` so the state is announced,
  with a visible `#8E3323` message — **never colour alone**.
- **Optional fields sit behind a native `<details>/<summary>`** — no JS, nothing to read past.
- **Labels always visible. No placeholder-as-label, ever.**
- Two-column rows collapse to one at 560px.

### Cards

Image, then label beneath. **Never text over the photo in a grid.**

`aspect-ratio:16/9`, `border-radius:6px`, `1px solid var(--hair)`, `--beige` ground. Hover: border →
`--champ`, shadow level 2, image `scale(1.04)` over `.9s`, arrow nudges `translateX(4px)`.

### Inline

- **Eyebrow** — 11px `.28em` uppercase `--champ-ink`, above a headline. Never alone.
- **Caption** (`.cap`) — 9.5px `.16em` `--ink-faint`, in an image corner. Metadata only, never
  information the reader needs.
- **Chip** — `--panel` fill, `--hair` border, pill, 13px. Hover lifts 1px to white, champagne border.
- **Links** inherit ink with a champagne underline. Numerals in the serif.

### Navigation

Sticky, `z-index:30`, `backdrop-filter: blur(9px)` over a 90%-opaque ground.

- 66px tall; shrinks to **54px** past 12px of scroll, gains a shadow, loses its border.
- Links get a **champagne underline wiping in from the left** (`scaleX` on `::after`).
- **Collapses to a hamburger at 860px** — a real `<button>` at 44×44 with `aria-expanded` kept in
  sync, panel closing on link click.
- Tap-to-call and Messenger appear **in the mobile menu only** — on desktop "tap to call" is
  meaningless and they clutter the bar.
- A `.skip` link precedes the nav and becomes visible on focus.

### Footer

Four columns (`1.5fr 1fr 1fr .9fr`), lockup + contact widest, hairline top border, generous top
padding, `--ink-faint` small text. Column heads are **`h3`, not `h4`** — jumping h2→h4 skips a level
and fails WCAG heading order — and they restate `font-family:var(--sans)`.

---

## Motion

**This section is the house standard — copy it verbatim into Nautilus and Skybass.** Everything
above is Berco-specific; this is not.

### The easing curve

```css
--ease: cubic-bezier(.2, .7, .2, 1);
```

One curve, everything. Fast out, long settle — expensive, not bouncy. **Never** `ease-in-out`, never
a spring or overshoot on this brand.

### Duration scale

| Duration | Use |
|---|---|
| `.2s` | Field borders, immediate state |
| `.3s` | Hover — colour, opacity, tracking |
| `.35–.45s` | Chrome — nav height, background, shadow |
| `.7s` | Scroll reveal |
| `.9s` | Image drift inside a card |

### The four scroll patterns

1. **Fade + rise** ~15px, on headings and paragraphs.
2. **Image unmask** — `clip-path: inset()` opening with a slight scale-down.
3. **Sticky hero with slow background drift** — restrained parallax, never more than a few percent
   of element height.
4. **Staggered grid** — each tile animates on **its own scroll position**, never a JS timer or an
   `nth-child` delay chain.

Sample: `public/review-da6c008edc417460.html`.

### Implementation — judge by MECHANISM, not by whether it is a library

| | Verdict |
|---|---|
| **CSS `animation-timeline: view()` / `scroll()`** | ✅ **First choice.** Zero KB, compositor-run, cannot jank. Nothing beats it for the four patterns above. |
| **Motion (motion.dev) `mini` build** | ✅ **Permitted, 2.3kb** — Web Animations API, hardware-accelerated. Use **only where CSS genuinely cannot reach**: orchestrated sequences, gesture/drag, shared-element and layout transitions. |
| **GSAP ScrollTrigger** | ❌ Banned. Main-thread rAF, and importing any part pulls in all of it. |
| **Smooth-scroll hijacking** (Lenis et al) | ❌ Banned. Never about bundle size: overriding native scroll feels wrong under a thumb and breaks find-in-page. |

⚠️ **One caveat on the WAAPI claim:** the Web Animations API only runs **off the main thread for
compositable properties** — `transform`, `opacity`, `filter`. A WAAPI animation of width, height,
top/left or any layout property still lands on the main thread. **"Uses WAAPI" is not by itself a
guarantee of off-main-thread.** Animate transform and opacity and the guarantee holds.

`html { scroll-behavior: smooth }` is fine — native anchor behaviour, not hijacking.

### The three non-negotiables

**1. The default state is VISIBLE.** The animation goes *inside* `@supports`; the resting state
outside it is the finished, readable page.

```css
/* correct */
.reveal { opacity: 1 }
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

Not defensive style. **Firefox stable does not ship `animation-timeline` at all**, and Safari only
gained it in **26**. A large minority never run the animation and must get a complete static page —
which they do, automatically, because the base state *is* the finished state.

**2. `prefers-reduced-motion: reduce` kills all of it** — and **only** motion. A reduced-motion user
keeps every carousel, every image viewer, every control. **Motion preference is not a feature flag.**
Already honoured in the live CSS — keep it that way.

**3. Nothing animates on text the reader must read first.** Hero headline, manifesto line, offer copy
and form labels are static, always. Motion is for the second screen onward.

### Browser support — verified, not assumed

| Browser | `animation-timeline` |
|---|---|
| Chrome / Edge (+ Android, Samsung Internet) | **115+** ✅ |
| Safari / iOS Safari | **26+** ✅ |
| Firefox (desktop & Android) | **preview only — not in stable** ❌ |

*Source: MDN browser-compat-data, read 2026-08-20 and unchanged 2026-08-23.* ⚠️ The widely-repeated
"Safari 18+" figure is wrong. **This question is settled — stop re-listing it as unverified.**

---

## Do's and Don'ts

**Do** — let the photograph own the frame · keep type on the image · use one accent · set headings
tight and unbold · scale section padding with the viewport · use hairlines and a surface step before
a shadow · keep the focus ring visible and ≥3:1 · keep tap targets ≥44px · write `alt` that describes
the cabinetry · cap measure in `ch` and balance headline wraps · state the material honestly.

**Don't** — add a dark mode · put type in a coloured box beside a photo · use pure `#FFF` or `#000` ·
add a second accent · use bold serif headings · use `--champ` for text or a focus ring · set
`opacity: 0` as a base state on anything containing content · add GSAP or a smooth-scroll hijacker ·
round a button past 2px · mix aspect ratios inside one grid · use a placeholder as a label · convey
state by colour alone · **put price or cost anywhere in public UI** · imply a completed project that
isn't real · borrow another JBC brand's palette or track record.

---

## Responsive Behavior

### Breakpoints

Max-width, mobile-first content order. **Thirteen distinct widths are in use** — 420 · 440 · 520 ·
560 · 600 · 640 · 700 · 720 · 760 · 820 · 860 · 900 · 1080. (A `max-height: 620px` query also exists,
for short landscape phones — it is **not** a width breakpoint.)

**PROPOSED target: `520 / 700 / 900 / 1240`.** ⚠️ Not a rename — two live behaviours sit on widths
that would move: **the nav collapses at 860** and **inputs go 16px at 820**, both of which would
shift to 900. Migrate deliberately and re-test the nav, or keep 820/860 as documented exceptions.
See Known Gaps #3.

### Touch targets

Minimum **44×44** on phone. Met by the hamburger (44), tap rows (60) and carousel controls (46).
**Not** met by footer links (~31px) and the `<summary>` disclosure (30px) — Known Gaps #4.

### Collapsing strategy

Grids step down one column at a time. Two-column form rows go single at **560px**. Nav becomes a
panel at **860px**. The hero switches to a viewport-height clamp so the headline never outgrows a
short phone screen.

### Image behavior

- Every image is `object-fit: cover` on an explicit `aspect-ratio` — no layout shift.
- Warm `--beige` placeholder behind every slot. `max-width:100%`, height auto.
- Real `<img>` tags, not CSS backgrounds, wherever the image is content (SEO + alt text). The `Pic`
  component makes `width`/`height` mandatory — **keep it that way**; it is the reason Berco has no CLS.
- **Never letterbox a room render.**
- **Every photograph carries the Berco lockup: plain white, top-left, 15% of width, 3.5% margin,
  hard-edged. No shadow, no glow, no stroke, ever** — including where it lands on a blown-out white
  area and becomes invisible. Accepted trade-off; the only permitted remedies are re-crop or photo swap.

---

## Iteration Guide

**When this file conflicts with the live CSS, this file wins for new work** and the old value gets
migrated — except where a value is marked **PROPOSED**, which is a decision not yet taken.
**Update this file in the same commit that changes a token.** A design system that lags the code is
worse than none.

**Adding a component**
1. Start from the nearest existing component's spec.
2. Compose from tokens only.
3. Radius from the scale. Shadow only if hairline + surface step genuinely won't do.
4. Every interactive element: visible focus ring, ≥44px on phone, keyboard operable.
5. If it animates on scroll: base state visible, `@supports` wrapper, reduced-motion kill.
6. Run `/web-design-guidelines` before shipping.
7. Update this file **and** the repo copy.

**Changing a token.** `--ground`, `--ink` and `--champ-ink` are load-bearing site-wide. Changing one
means re-checking contrast for `--ink-soft`, `--ink-faint`, `--champ-ink` and every focus indicator,
and re-checking the over-photo palette. Record the new ratios here.

**Porting to another brand.** Copy **Motion** verbatim. Copy the *structure* of every other section
but refill from that brand's own sources. **Nautilus is cool graphite on white by explicit decision,
precisely so it does not read as Berco — do not harmonise the palettes.**

**Deploying.** Commit as `Berco Catalogue <bercohomeph@gmail.com>` via `GIT_AUTHOR_*` /
`GIT_COMMITTER_*`. Vercel silently marks an unknown author's deploy BLOCKED — the push succeeds and
the site never changes. Poll the live URL to HTTP 200 **and** confirm the new content is present.

---

## Known Gaps

1. ✅ **Focus ring — FIXED 2026-08-23.** Was `--champ` at 2.19:1, failing SC 1.4.11. Now `--champ-ink`
   at 4.91:1 across all five indicators. Verified in the deployed CSS.
2. **Radius scale scattered** across 2/3/4/5/6/8/30px. Target `2/4/8/pill/50%` is **PROPOSED** —
   migrating the 5px hero and 6px media is a visible design call.
3. **Thirteen breakpoints** where four would do. Target `520/700/900/1240` is **PROPOSED**; the nav
   (860) and input-size (820) behaviours must move deliberately.
4. **Sub-44px tap targets** — footer links ~31px, `<summary>` 30px.
5. **No success / warning / info semantic colours** — only error exists. Inquiry confirmation is
   typographic only.
6. **No spacing scale in code.** The 4px base is **PROPOSED**, not enforced. Section clamps stay.
7. **Type scale is per-component `clamp()`**, not a named scale. Works, but not portable.
8. **`--ink-faint` used at 9.5px.** Contrast passes (4.90:1); the size does not serve a mostly-mobile
   audience.
9. 🚨 **`.reveal` / `.stag > *` are `opacity:0` by default, gated on JS.** Violates non-negotiable #1
   above. Guarded by `<noscript>` and `@media (scripting:none)`, which cover JS *disabled* but not JS
   *failing*. **Nautilus already solves this correctly** with `html.reveal-armed [data-reveal]`.
   Fixed by the CSS scroll-driven migration.
10. 🚨 **Reduced-motion users lose functionality.** The inline script `return`s early before the
    carousel, image-viewer and parallax wiring — so on the homepage the planning carousel's arrows
    and dots are dead, and the reference-page thumbnail viewer does nothing, for those users only.
11. 🚨 **The multi-view image switcher is broken for everyone.** It sets `img.src`, but `#refmain` is
    an `<img>` inside `<picture>` with a matching WebP `<source>` — the source wins, so the pixels
    never change while `aria-current` moves to the clicked thumb. **The UI signals success while
    nothing happens.** Verified live. Fix: update the `<source>` srcset too, and the `alt`.
12. **Carousel is swipe-only on phones.** `.pcar-nav` is `display:none` below 720px, the scrollbar is
    hidden, and the track has no `tabindex` — no tap or keyboard alternative for ~90% of the audience.
13. **`.consent` is fixed to `bottom:0` with no `env(safe-area-inset-bottom)`** — the buttons sit in
    the iPhone home-indicator zone.
14. **No `<meta name="theme-color">`** (should be `#FDFBF7`); no `preconnect` for the tracker hosts.
15. **Duplicate `next.config.mjs`** at both repo root and `app/`.
16. **Nautilus and Skybass have no DESIGN.md yet.** This is the template — their values must be read
    from their own sources, never copied. ⚠️ **Skybass is WordPress + WooCommerce with no repo**, so
    it cannot consume a repo-side DESIGN.md the way the other two can.
