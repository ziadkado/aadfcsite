# AADFC — Africans & African Descendants Friendship Club of St. Albert

The website for the **Africans & African Descendants Friendship Club of
St. Albert**, a community-based not-for-profit in St. Albert, Alberta.

A plain static site: hand-written HTML, one stylesheet, one small script. There
is no build step, no framework and no dependencies — open any `.html` file in a
browser and it works.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — mission, flagship event, programs, partners |
| `about.html` | Story, mission and vision, executive team, recognition |
| `programs.html` | Taste of Africa, youth mentorship, RoboTech, movie nights, welfare, newcomer support |
| `events.html` | Annual calendar and past events |
| `media.html` | Social channels and press coverage |
| `contact.html` | Contact details, enquiry form, ways to get involved |
| `donate.html` | E-transfer and cheque giving, what donations fund |
| `404.html` | Not-found page |

## Layout

```
assets/img/      logo, icons, favicons, social share image
css/style.css    the entire design system
js/main.js       mobile nav, scroll reveal, contact-form mailto
```

## Brand

Colours are sampled directly from the club logo:

| Token | Hex | Used for |
| --- | --- | --- |
| `--red` | `#E82741` | Primary actions, accents |
| `--gold` | `#F1B71C` | Highlights, secondary actions |
| `--plum` | `#8C2165` | Deep panels, gradients |
| `--navy` | `#213F7D` | Dark accents |
| `--ink` | `#231F20` | Body text, footer |

Type is [Fraunces](https://fonts.google.com/specimen/Fraunces) for headings and
[Inter](https://fonts.google.com/specimen/Inter) for body copy, loaded from
Google Fonts with system fallbacks.

`assets/img/logo.png` is the full-colour logo; `logo-light.png` is the same mark
with the wordmark in white, for use on dark backgrounds (it is what the footer
uses). To replace the logo, swap those two files keeping the same filenames.

## Editing content

Everything is in the HTML — open the file, find the text, change it. A few
things worth knowing:

- **The header and footer are repeated in every page.** If you change a nav
  link, change it in all eight files.
- **Event dates.** `events.html` lists the annual calendar and past events.
  Specific dates for each new edition go in the "From the archive" section as
  they pass.
- **Photos.** `media.html` contains a commented-out example showing how to add
  gallery images. Drop the files into `assets/img/gallery/` and copy the block
  once per photo.
- **The contact form** has no server behind it. It opens the visitor's email
  app with the message pre-filled and addressed to `info@aadfc.ca`. To take
  submissions properly, point the `<form>` at a form service (Formspree,
  Netlify Forms, Google Forms) and remove the `data-mailto` attribute so
  `js/main.js` stops intercepting it.

## Publishing

The repository includes a GitHub Pages workflow at
`.github/workflows/pages.yml`. It deploys the site on every push to `main`.

To turn it on: **Settings → Pages → Build and deployment → Source →
GitHub Actions**. To serve it at `aadfc.ca`, add the domain under
**Settings → Pages → Custom domain** and point the DNS record at GitHub.

The site is equally happy on Netlify, Vercel, Cloudflare Pages or any static
host — upload the folder as-is, no build command needed.

## Content sources

Content was compiled from the club's existing public material: the current
aadfc.ca pages, the City of St. Albert, the St. Albert Gazette, T8N Magazine
and the Government of Alberta's Northern Lights recognition listing. Facts
worth re-checking before launch are the event dates and the executive team
roster, both of which change year to year.
