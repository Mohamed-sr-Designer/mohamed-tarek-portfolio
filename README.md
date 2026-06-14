# Mohamed Tarek — Jr. Art Director · Portfolio

A premium, cinematic, narrative-driven portfolio built with **Next.js (App Router)
· TypeScript · Tailwind CSS · Framer Motion**, with light/dark themes, smooth
scrolling (Lenis), blur-up images, full SEO, and statically generated case-study
pages.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

Asset scripts (only needed if you change the source art):

```bash
npm run optimize            # source images/_raw -> optimized WebP in /public
node scripts/build-raw-assets.mjs   # rasterize branding PDFs + portrait + clients board
```

---

## Where things live

```
app/
  layout.tsx              fonts, SEO, theme no-flash script
  page.tsx                home (Hero, Visual Index, About, Clients, Work,
                          Process, Experience, Skills, Toolkit, Vision, Contact)
  work/[slug]/page.tsx    case study (Challenge → Strategy → Direction → Execution → Impact)
components/               all sections + ThemeToggle + animation helpers
lib/
  site.ts                 ← name, role, contacts (email/WhatsApp/phone/LinkedIn)
  projects.ts             ← all project content + galleries + the visual-index mosaic
  assets.json             auto-generated image dimensions + blur placeholders
scripts/                  image pipeline (sharp) + PDF rasterizers (pdf-to-img)
public/work/              optimized, web-ready images (committed)
public/me/                portrait + "brands I've worked with" board (dark + light)
```

## Light / dark mode

The whole UI is driven by CSS variables that flip on `data-theme` (`dark`
default). Toggle is in the nav; the choice is saved to `localStorage`. Tokens
live in `app/globals.css`; Tailwind maps `ink` / `bone` / `line` / `mint` /
`electric` to them in `tailwind.config.ts`.

## Editing content

- **Contact info / title / location** → `lib/site.ts`
- **Projects, copy, galleries** → `lib/projects.ts`
- **About bio + traits** → `components/About.tsx`
- **Experience / Toolkit / Skills** → the matching component files

To swap or add project images: drop new source files in the asset library,
update the manifest in `scripts/optimize-assets.mjs`, run `npm run optimize`.

---

## Deployment

Best on **Vercel** (zero config for Next.js). Import the repo, set your
production domain, then update `url` in `lib/site.ts`.

## Note on `npm audit`

`npm audit` lists Next.js advisories whose only fix is Next 16 (a major upgrade
needing React 19 + an async-`params` migration). They concern features this
static site does not use (middleware, rewrites, i18n, remote images, server
actions), so practical risk is negligible. **Do not run `npm audit fix --force`**
— it force-installs Next 16 and breaks the build.
