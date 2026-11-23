# Brand guidelines

Americantriangle should look like a serious engineering firm that employs experts, not like a generic AI template.

The mark is a triangle. It has two readings. Talent, Technology, and Opportunity are the principles: how the company thinks. AI Data Infrastructure, AI Model Training, Research & Evaluation, and Enterprise AI Applications are the divisions: what a customer can hire. One principle does not belong to one division. The mark is not a claim about a legal trademark.

## Personality

Precise, calm, and specific. Say what a service does. Prefer short sentences. Avoid hype, urgency tricks, and metaphors about magic or sentience.

## Color

Tokens are defined in `src/styles/globals.css`.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| Paper | `#f3f6fb` | `#070d18` | Workspace and fallback background |
| Canvas | `#f7fafc` | `#08101c` | Public page background |
| Card | `#ffffff` | `#101a2e` | Glass panels |
| Ink | `#0c1730` | `#f4f8ff` | Text and workspace primary buttons |
| Night | `#07111f` | `#050a14` | Public header, footer, and editorial bands |
| Band | `#f7fbff` | `#f7fbff` | Text on night bands. It does not flip in dark mode |
| Accent | `#0891b2` | `#22d3ee` | Cyan primary actions and short emphasis |
| Accent ink | `#07111f` | `#07111f` | Text on accent buttons |
| Copper | `#5b4cdb` | `#b7a6ff` | Violet labels and small rules |
| Pine | `#1d4ed8` | `#7cb7ff` | Blue secondary emphasis |
| Line | `#d5e1ef` | `#24344d` | Thin borders |
| Muted | `#3e516b` | `#a9b8cc` | Secondary text |
| Danger | `#9f2d3a` | `#f0b4c0` | Errors |

Public pages use a cool canvas with deep navy bands. Night bands set their own white text so a dark theme does not turn that text back to ink. Accent is cyan and fills a button, not a page section. Accent buttons use accent ink so the label stays readable. Small labels use the violet token. Focus rings use the cyan accent. Soft gradients stay on the homepage hero and as a highlight on glass cards.

## Type

- Newsreader for headings, weight 520.
- Outfit for UI and body, weight 500 on controls.

The scale lives in `src/styles/globals.css`. Display headlines use `.heading-display`: 2.5rem, then 3.75rem from the `md` breakpoint, with a 1.05 line height. Section titles use `.heading-title`: 2.25rem, then 3rem. Body stays 1rem. Paragraphs that are read in sequence use `.measure`, 65 characters. Eyebrows use `.eyebrow`: 11px, uppercase, 0.16em tracking.

## Space, edges, and motion

Public sections sit in the `.page` container: 72rem wide, with 1.5rem of side inset. Section padding is 4rem, and 6rem from the `md` breakpoint (48rem) up. Two-column groups start at `sm` (40rem). Side-by-side text and four-column steps wait until `lg` (64rem), so a tablet does not compress a desktop row. Borders are 1px. Cards share `.surface`: a thin border, a soft top highlight, and a translucent card fill. Corners stay at 0.25rem and 0.75rem.

Breakpoints stay the Tailwind set: 40rem, 48rem, 64rem, 80rem. Do not add a one-off width in a page.

Motion is 180ms for color, menus, and the mobile dialog, and 420ms for a 0.4rem rise, on `cubic-bezier(0.22, 1, 0.36, 1)`. `.reveal` moves on scroll only where the browser supports view timelines. It does not fade the content out. `.pressable` moves 1px on press. Menus, the dialog, the accordion, the rise, and the loading pulse stop when `prefers-reduced-motion: reduce`. Do not add an animation library.

## Logo

The logo is `public/images/logo1.png`, rendered by `src/components/brand/logo.tsx` and described in [BRAND_ASSETS.md](BRAND_ASSETS.md). The file includes the triangle and the line “Talent. Technology. Opportunity.” Do not redraw it per page. Do not place the mark on a photograph with a glow. The file is transparent in both themes. Do not put a plate behind it.

## Imagery

Use original diagrams of workflows, review, and tenant isolation. Photographs are files under `public/images`, rendered by `EditorialFigure` at a 3:2 crop, lazy-loaded, with alt text and a credit. The component refuses a remote URL. Do not use brain illustrations, robot portraits, stock "AI" handshakes, or customer logos.

## Components

Shared controls live in `src/components/ui`. Marketing layout lives in `src/components/marketing`: page heroes, section headings, solution, feature, industry, and note cards, a case-study card that labels demonstrations, breadcrumbs, and an FAQ. `publishedTestimonials` is empty. Do not render a quote that a real person has not approved.

## Interface

One button style, one form style, one table style, shared by the marketing site and the workspaces. Corners are slightly rounded. Focus is a visible cyan outline. Light and dark follow the CSS variables and the `class` strategy on `html`.

## Voice examples

Use: "Human preference feedback is a reviewed set of rankings. It is not a training run."

Avoid: "Unlock next-generation intelligence with our revolutionary AI brain."
