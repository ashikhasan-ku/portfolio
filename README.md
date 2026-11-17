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
| `headshot.jpg` | Home hero | Portrait, ~800×1000 |
| `about.jpg` | About hero | Portrait, ~800×1000 |
| `campus.jpg` | Academics banner + Home tile | Wide, ~1600×700 |
| `running.jpg` | Home "About me" tile | Wide, ~1200×800 |
| `run-1.jpg` … `run-3.jpg` | About, running section | Landscape |
| `gallery-1.jpg` … `gallery-6.jpg` | About, "Moments" (section appears once one exists) | Landscape |

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
