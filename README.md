# Alejandro & Jacqueline · Save the Date

Save-the-date website for our wedding on **Saturday, September 4, 2027** in **Albuquerque, New Mexico**. Designed and built by **Alejandro Sandoval**.

Live site (once GitHub Pages is on): https://asandoval-3.github.io/Wedding/

## What's here

| File | What it does |
|---|---|
| `index.html` | The page: sealed envelope → tap to open → save-the-date card |
| `styles.css` | Colors, fonts, envelope animation, layout |
| `script.js` | English/Spanish toggle, live countdown, calendar links, envelope opening |
| `save-the-date.ics` | Calendar file used by the **Apple** button (also works in Outlook desktop) |
| `images/us.jpg` | Our photo |
| `images/preview.jpg` | The image shown when the link is texted/shared (1200×630) |
| `images/favicon.svg` | The little "A&J" seal in the browser tab |

## Design decisions (so far)

- **Design:** "Envelope & Wax Seal". Sage background, champagne envelope, terracotta wax seal with "A&J".
- **Sandia Mountains:** the ridge along the bottom is the Sandias at dusk in their "watermelon" dusty-rose glow, with terracotta foothills, sage in front, and a champagne moon rising over the crest. A small ridge line also divides the card.
- **Palette:** mostly sage `#8A9A7B` / `#5F6F52` and terracotta `#AD5433`, with dusty rose `#D4A09A`, champagne `#EAD9B8`, and ivory `#FBF7EF` as accents.
- **Accessibility:** text contrast ≥ 4.5:1, 44px tap targets, visible keyboard focus, reduced-motion support.
- **Fonts (Google Fonts):** Pinyon Script (names), Cormorant Garamond (body), Jost (small caps labels).
- **Name order:** Alejandro & Jacqueline.
- **Language:** English + Spanish. Auto-picks Spanish if the guest's phone is set to Spanish; the EN · ES button switches.
- **Ceremony time:** not decided yet. Calendar event is **all-day**, and the countdown runs to midnight on Sept 4.
- **Wording:** "Save the Date / Reserva la Fecha", "are getting married / ¡nos casamos!", "Formal invitation to follow / La invitación formal llegará pronto".

## Updating later

- **Ceremony time known?** In `script.js`, change `2027-09-04T00:00:00-06:00` to the time (e.g. `2027-09-04T16:30:00-06:00`). To make the calendar event timed instead of all-day, update the dates in `script.js` (Google/Outlook links) and `save-the-date.ics`.
- **Change wording?** Edit the `TEXT` block at the top of `script.js` (both `en` and `es`).
- **New photo?** Replace `images/us.jpg` (keep the name). Regenerate `images/preview.jpg` at 1200×630.

Tip: open the site with `#card` at the end of the URL to jump straight to the card, skipping the envelope.

## Publishing on GitHub Pages

1. The repo must be **Public** (free GitHub Pages needs that): *Settings → General → Danger Zone → Change visibility*.
2. *Settings → Pages* → **Source: Deploy from a branch** → pick the branch holding this site and **/ (root)** → **Save**.
3. Wait 1–2 minutes, then visit https://asandoval-3.github.io/Wedding/.

---

Made with love by Alejandro Sandoval · © 2026
