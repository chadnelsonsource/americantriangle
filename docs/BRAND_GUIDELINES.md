# Brand guidelines

Americantriangle should look like a serious engineering firm that employs experts, not like a generic AI template.

The mark is a three-sided geometric monogram. It refers to the name. It is not a claim about a legal trademark.

## Personality

Precise, calm, and specific. Say what a service does. Prefer short sentences. Avoid hype, urgency tricks, and metaphors about magic or sentience.

## Color

Tokens are defined in `src/styles/globals.css`.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| Paper | `#f4f1ea` | `#121614` | Workspace and fallback background |
| Canvas | `#f6f3ec` | `#141614` | Public page background |
| Card | `#fffcf8` | `#1c201e` | Quiet panels on the public site |
| Ink | `#17232b` | `#f3efe6` | Text and workspace primary buttons |
| Night | `#111216` | `#0c0d10` | Public header, footer, and editorial bands |
| Band | `#f6f3ec` | `#f6f3ec` | Text on night bands. It does not flip in dark mode |
| Accent | `#ee5a24` | `#ff6a33` | Public primary actions and short emphasis |
| Accent ink | `#111216` | `#111216` | Text on accent buttons |
| Copper | `#8d4f32` | `#e0b08a` | Focus rings, small labels, and rules |
| Pine | `#1e4642` | `#8fbfb6` | Secondary emphasis in workspaces |
| Line | `#ddd6c8` | `#2a3330` | Borders |
| Muted | `#4e5852` | `#b7c0b8` | Secondary text |
| Danger | `#8c2f2f` | `#f0b4b4` | Errors |

Public pages use a light canvas with night bands. Night bands set their own light text so a dark theme does not turn that text back to ink. Accent fills a button, not a page section. Accent buttons use accent ink so the label stays readable. Small labels on a light surface use copper. Copper stays the focus ring. Do not fill the page with gradients.

## Type

- Newsreader for headings, weight 520.
- Outfit for UI and body, weight 500 on controls.

The scale lives in `src/styles/globals.css`. Display headlines use `.heading-display`: 2.5rem, then 3.75rem from the `md` breakpoint, with a 1.05 line height. Section titles use `.heading-title`: 2.25rem, then 3rem. Body stays 1rem. Paragraphs that are read in sequence use `.measure`, 65 characters. Eyebrows use `.eyebrow`: 11px, uppercase, 0.16em tracking.

## Space, edges, and motion

Public sections sit in the `.page` container: 72rem wide, with 1.5rem of side inset. Section padding is 4rem, and 6rem from the `md` breakpoint (48rem) up. Two-column groups start at `sm` (40rem). Side-by-side text and four-column steps wait until `lg` (64rem), so a tablet does not compress a desktop row. Borders are 1px `line`. Cards share `.surface`: card background, 1px line, 0.5rem radius, and `shadow-raise`. The only shadow is that short cool shadow. Corners stay at 0.25rem and 0.5rem.

Breakpoints stay the Tailwind set: 40rem, 48rem, 64rem, 80rem. Do not add a one-off width in a page.

Motion is 180ms for color, menus, and the mobile dialog, and 420ms for a 0.4rem rise, on `cubic-bezier(0.22, 1, 0.36, 1)`. `.reveal` moves on scroll only where the browser supports view timelines. It does not fade the content out. `.pressable` moves 1px on press. Menus, the dialog, the accordion, the rise, and the loading pulse stop when `prefers-reduced-motion: reduce`. Do not add an animation library.

## Logo

The mark and wordmark are SVG components in `src/components/brand/logo.tsx`, described in [BRAND_ASSETS.md](BRAND_ASSETS.md). Do not redraw them per page. Do not place the mark on a photograph with a glow.

## Imagery

Use original diagrams of workflows, review, and tenant isolation. Photographs are files under `public/images`, rendered by `EditorialFigure` at a 3:2 crop, lazy-loaded, with alt text and a credit. The component refuses a remote URL. Do not use brain illustrations, robot portraits, stock "AI" handshakes, or customer logos.

## Components

Shared controls live in `src/components/ui`. Marketing layout lives in `src/components/marketing`: page heroes, section headings, solution, feature, industry, and note cards, a case-study card that labels demonstrations, breadcrumbs, and an FAQ. `publishedTestimonials` is empty. Do not render a quote that a real person has not approved.

## Interface

One button style, one form style, one table style, shared by the marketing site and the workspaces. Corners are slightly rounded. Focus is a visible copper outline. Light and dark follow the CSS variables and the `class` strategy on `html`.

## Voice examples

Use: "Human preference feedback is a reviewed set of rankings. It is not a training run."

Avoid: "Unlock next-generation intelligence with our revolutionary AI brain."
