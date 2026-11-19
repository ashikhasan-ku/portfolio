# ashik-hasan.netlify.app

Personal portfolio for Ashik Hasan. Plain HTML, CSS and JavaScript, no build step: what you see in these files is exactly what goes live. Every push to `main` deploys to Netlify in about 30 seconds.

## The four pages

| Page | File |
|---|---|
| Home (summary, timeline, impact, selected work) | `index.html` |
| Career (every role with outcomes, toolkit) | `career.html` |
| Academics (degrees, CSM, maths at work) | `academics.html` |
| About (running, games, reading, photos) | `about.html` |

Shared files: `assets/css/site.css` (all styling), `assets/js/site.js` (behaviour), `assets/js/career-data.js` (career facts).

## When you change jobs (the only regular edit)

Open `assets/js/career-data.js`:

1. Copy one role block and paste it at the top of `roles`.
2. Fill in company, title, team, `start: "YYYY-MM"`, `end: "now"`, the company website (`domain`) and a one-line `highlight`.
3. On your previous role, change `end: "now"` to its last month, e.g. `"2027-03"`.

The timeline, the "Today" line, the year labels, role durations and "N+ years of experience" all update themselves from the date. Then add a role section to `career.html` (copy an existing `<article class="role">`) and a link in the `rail` list.

**Logos:** each role tries its `logos` URLs first, then the company website's icon, then shows initials. To use your own logo file, put it in `assets/logos/` and list it first, e.g. `logos: ["/assets/logos/newco.png"]`.

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

## Preview on your computer

```
python3 -m http.server 8080
```

Then open http://localhost:8080.

## House rules for content

- Only claim what you can back up in an interview. Numbers come from the CV.
- Brain Station 23 bid clients stay anonymous; WPP clients are approved.
- Public contact is email and LinkedIn only.
