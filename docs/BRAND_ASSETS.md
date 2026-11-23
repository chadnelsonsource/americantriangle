# Brand assets

Assets in the repository:

| Asset | Location | Notes |
| --- | --- | --- |
| Mark and wordmark | `public/images/logo1.png` | Transparent lockup. Triangle, wordmark, and “Talent. Technology. Opportunity.” Rendered by `src/components/brand/logo.tsx` |
| Favicon | `public/favicon_io` | Triangle mark from the favicon set. `src/app/favicon.ico` is the same file for `/favicon.ico` |
| Color and type tokens | `src/styles/globals.css` | Consumed by Tailwind via `@theme` |
| Open Graph image | `src/app/opengraph-image.tsx` | Wordmark on paper, no stock photography |

There is no separate font file. Newsreader and Outfit are loaded from Google Fonts through `next/font`.

No trademark registration, logotype license, or corporate legal name is recorded. Do not add a trademark symbol.

Do not add customer logos to this folder.
