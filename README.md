# ashik-hasan.netlify.app

Personal portfolio for Ashik Hasan. Plain HTML, CSS and JavaScript, no build step: what you see in these files is exactly what goes live. Every push to `main` deploys to Netlify in about 30 seconds.

## The four pages

| Page | File |
|---|---|
| Home (summary, timeline, impact, how I can help) | `index.html` |
| Work (lifecycle and six case summaries) | `work.html` |
| Career (every role, methods, stack and domains) | `career.html` |
| Academics (degrees, CSM, maths at work) | `academics.html` |
| About (running, table tennis, gaming, photos) | `about.html` |

Shared files: `assets/css/site.css` (all styling), `assets/js/site.js` (behaviour), `assets/js/career-data.js` (career facts).

## When you change jobs (the only regular edit)

Open `assets/js/career-data.js`:

1. Copy one role block and paste it at the top of `roles`.
2. Fill in company, title, team, `start: "YYYY-MM"`, `end: "now"`, the company website (`domain`) and a one-line `highlight`.
3. On your previous role, change `end: "now"` to its last month, e.g. `"2027-03"`.

The timeline, the "Today" line, the year labels, role durations and "N+ years of experience" all update themselves from the date. Then add a role section to `career.html` (copy an existing `<article class="role">`) and a link in the `rail` list.

**Logos:** each role tries its `logos` URLs first, then the company website's icon, then shows initials. To use your own logo file, put it in `assets/logos/` and list it first, e.g. `logos: ["/assets/logos/newco.png"]`.

## Common edits

- **Add a case study:** in `work.html`, copy one `<article class="cs">` block into the right pillar section (Scope it, Ship it or Improve it) and change the text. Give it a unique `id`, so you can link to it as `/work.html#your-id`.
- **Add a table-tennis result:** in `about.html`, copy one `<li>` in `record-list`. Use `class="win"` for titles and `class="podium"` for top-three finishes, and update the totals in `record-sum`.
- **Add a race photo to the deck:** copy one `<figure class="deck-card">` in `about.html`.
- **Make a photo open larger when clicked:** put it inside any element with `data-gallery`.

## Résumé requests (Netlify Forms)

The "Request my résumé" button opens a form. Netlify stores each request and emails you. One-time setup in Netlify: **Forms → Form notifications → Add notification → Email notification**, choose the `resume-request` form, and enter your email (it must belong to your Netlify team). Requests also appear under **Forms** in the Netlify dashboard, and spam is filtered automatically.

## Adding photos (no code needed)

Save files with these exact names in `assets/photos/`. Empty slots stay hidden, so the site looks finished with or without them.

| File | Where it appears | Shape |
|---|---|---|
| `headshot.jpg` | Home hero | Portrait, 800×1000 |
| `about.jpg` | About hero | Portrait, 800×1000 |
| `home-tile.jpg` | Home "About me" tile | Any |
| `campus.jpg` | Academics banner + Home tile (not added yet) | Wide, ~1600×700 |
| `run-marathon.jpg`, `run-teatrail.jpg`, `run-ucr.jpg` | About, running mosaic | Square + 2 portrait |
| `sport-*.jpg` | About, sport strip | Landscape 4:3 |
| `game-*.jpg` | About, games strip | Landscape 4:3 |
| `gallery-1.jpg` … `gallery-6.jpg` | About, "Moments" | Landscape 4:3 |

To swap a photo, save the new one with the same name. To change a caption, edit the `<figcaption>` next to it in `about.html`.

Keep each photo under ~300 KB (squoosh.app does this in the browser).

## The 8-bit layer (v3)

The site is "professional first, pixel second". Where each pixel piece lives:

| What | File and where to edit |
|---|---|
| Menu ("level select" dock) | `_head` part of every page: the `<nav class="main-nav">` block. Icons are 16×16 pixel SVGs. On phones it becomes a bottom tab bar |
| Pixel cursor | `assets/cursor-arrow.svg` and `assets/cursor-hand.svg`; the trailing reticle is in `site.js` |
| Home portrait | `assets/photos/headshot-cutout.webp` (background removed). Replace it with any PNG/WebP that has a transparent background |
| CSM seal | `index.html`, search for `csm-seal` |
| Academics photos | Linked from Wikimedia Commons with credits on the page. To use your own, put the file in `assets/photos` and change the `src` |
| Pixel avatar | `assets/photos/avatar-pixel.png` (40×50 px, made from the headshot). Replace it with any 40×50 PNG; the browser scales it up crisply. |
| Hero title artwork (ring O, Gantt A) | `index.html`, inside `<h1 class="title-art">` |
| CSM sticker, `> ashaxel` gamer tag | `index.html` and `about.html`, search for `sticker` |
| Scoreboard (best result per company) | `index.html`, section `score`. One `score-card` per company |
| Bookshelf, tickets, tapes, manga, game discs | `about.html`, section `shelf-title`. Copy a `<li>` to add a title; `--c` sets its colour |
| RPG dialogue box | `about.html`, the three `<p data-line>` lines and the three buttons under them |
| Page transition, scroll meter, 8-bit mode | `assets/js/site.js`, the "v3" block at the bottom |

Hidden extra: type ↑ ↑ ↓ ↓ ← → ← → B A on any page (or click the arrows in the footer) to switch on 8-bit mode.
Everything moving respects the visitor's "reduce motion" setting.

## Preview on your computer

```
python3 -m http.server 8080
```

Then open http://localhost:8080.

## House rules for content

- Only claim what you can back up in an interview. Numbers come from the CV.
- Brain Station 23 bid clients stay anonymous; WPP clients are approved.
- Public contact is email and LinkedIn only.
