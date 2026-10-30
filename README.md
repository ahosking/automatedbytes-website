# Automated Bytes - website redesign

A from-scratch, static, multi-page site for Automated Bytes. Plain HTML +
one shared CSS file + one shared JS file. No framework, no build step -
open any `.html` file directly in a browser, or serve the folder as-is
(e.g. GitHub Pages).

## Structure

```
automatedbytes-website/
├── index.html              Home - hero, three pillars, open-source proof section, CTA
├── services.html           What we do: automation, managed IT, cybersecurity, custom builds
├── projects.html           Health Flare, Inner Flare, Open Health Index (all live/active)
├── security-privacy.html   Security & privacy principles (dedicated, front-and-center page)
├── about.html              Founder-led origin story + background
├── contact.html            mailto: contact (no backend - static site)
├── styles.css              Shared stylesheet: design tokens, layout, components, 3 themes
├── script.js               Shared script: theme toggle + nav current-page marking
├── assets/img/
│   ├── logo.svg                       Brand mark (split gear, dashed arcs)
│   ├── illustration-automation.svg    Home hero
│   ├── illustration-security.svg      Security & Privacy page
│   ├── illustration-people.svg        Home pillar / About page
│   ├── illustration-opensource.svg    Projects page
│   └── CREDITS.md                     Image sourcing notes
└── README.md                this file
```

## Theming

Three modes - Light, Dark, High Contrast - switched via a visible toggle
in the header on every page. Implementation:

- CSS custom properties per mode under `:root`, `[data-theme="dark"]`,
  `[data-theme="contrast"]` in `styles.css`.
- An inline script in each page's `<head>` reads `localStorage` and sets
  `data-theme` on `<html>` **before** the stylesheet paints, to avoid a
  flash of the wrong theme.
- `script.js` builds the three toggle buttons, applies clicks, and
  persists the choice back to `localStorage` (`ab-theme` key).
- High Contrast is a genuinely distinct mode: pure black/white, no
  gradients, thicker (3px) focus outlines, and the highest-contrast
  accent color of the three modes - not a relabeled dark mode.

All three modes were checked against WCAG 2.1 AA contrast minimums
(4.5:1 body text, 3:1 large text/UI elements) using the actual hex
values in `styles.css`.

## Accessibility notes

- Semantic landmarks: `header` / `nav` / `main` / `footer` on every page.
- Visible "Skip to content" link, first focusable element on every page.
- Logical heading order (one `h1` per page, `h2`/`h3` nested correctly).
- All interactive elements are native `<a>`/`<button>` elements, reachable
  by keyboard, with a visible `:focus-visible` outline (thicker in
  High Contrast mode).
- Images: decorative logo use has empty `alt=""`; content illustrations
  have descriptive `alt` text.
- No information is conveyed by color alone (status badges on the
  Projects page use text labels, not just color; nav current-page state
  uses `aria-current="page"` plus an underline, not color alone).
- `prefers-reduced-motion` is respected (smooth-scroll and any transition
  durations are collapsed for users who've asked for reduced motion).

## Launch status

All copy and links are confirmed live: the contact email, the
Health Flare / Inner Flare GitHub repos, and the Open Health Index
domain. No outstanding placeholders.

## Design notes

- Color system is derived entirely from the existing logo: amber→orange
  gradient (`#F7941E` → `#E8590C`) as the single accent, near-black
  charcoal (`#2A2A2D`) as the dark-mode base and light-mode ink, clean
  neutrals/white as the light surface. No additional accent hues were
  introduced.
- Home (`index.html`) is the one Decide/Learn surface and the only page
  with a hero. The other five pages are informational/Configure-leaning:
  content-first, no feature-tile grids, no icon-topper cards, no fake
  stats, no stock photography.
- Illustrations are original flat-style SVGs in the brand palette (see
  `assets/img/CREDITS.md` for why they're hand-built rather than
  downloaded unDraw files, and how to swap in real unDraw assets later).
