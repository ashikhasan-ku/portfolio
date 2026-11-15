# ashik-hasan.netlify.app

Personal portfolio for Ashik Hasan. Plain HTML, CSS and JavaScript: no framework and no build step, so what you see in these files is exactly what goes live.

## What each file does

| File | What it holds | How often you'll touch it |
|---|---|---|
| `index.html` | All the words on the site, section by section | Often |
| `styles.css` | Colours, fonts, spacing and layout | Sometimes |
| `script.js` | Career chart, dark mode, copy-email button | Rarely |
| `404.html` | The "page not found" screen | Rarely |
| `netlify.toml` | Netlify settings (security headers, caching) | Almost never |
| `assets/` | Fonts, favicon, social share image (`og.png`) | When you add images |

## Common edits

**Change any text.** Open `index.html` and search for the sentence you want to change. Each section starts with a comment like `<!-- ============ SELECTED WORK ============ -->` so you can jump around.

**Add a new job to the career chart.** In `index.html`, find `plan-rows` and copy one `<li class="plan-row" ...>` block. Edit three things:

```html
<li class="plan-row" data-start="2027-01" data-end="now">
  <a class="plan-label" href="#exp-newco"><b>New Company</b> Job title</a>
  ...
```

- `data-start` / `data-end` use `YYYY-MM`. Use `now` for your current role.
- Milestones (the amber diamonds): `data-milestones="2027-06|Promoted;2028-01|Certification"`.
- Remove `is-current` from the old role and add it to the new one.
- If the chart needs more years, change `data-range-end` on the `<figure class="plan" ...>` line and add a year to `plan-axis`. If you add a year, also change `repeat(6, 1fr)` and `100% / 6` in `styles.css` to the new count.

**Add a role to the Experience list.** Copy one `<li id="exp-...">` block inside `<ol class="roles">`. Only the newest role should have `<details open>`.

**Change a colour.** In `styles.css`, the `:root` block at the top lists every colour once (light mode). The `[data-theme="dark"]` block below it is dark mode. Change a value there and it updates everywhere.

## Preview on your computer

Open a terminal in this folder and run:

```
python3 -m http.server 8080
```

Then visit http://localhost:8080. (Opening `index.html` by double-clicking also works, but fonts load best through the local server.)

## Publish changes

Once this folder is connected to GitHub and Netlify, every `git push` goes live in about 30 seconds. Until then, drag the whole folder onto https://app.netlify.com/drop.

## House rules for content

- Only claim what you can back up in an interview. No invented numbers.
- Client names: WPP clients are approved; keep Brain Station 23 bid clients anonymous.
- Public contact is email and LinkedIn only.
