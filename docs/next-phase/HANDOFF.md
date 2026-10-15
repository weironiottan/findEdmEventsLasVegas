# edmvegas.show — Next Phase Handoff

Design and implementation brief for the next version of the site. It was produced
from a clickable prototype; the prototype source lives in `./prototype/` (see
"Prototype files" at the bottom). **The prototype is a visual reference only, not
code to copy.** Build everything in the existing SvelteKit + Tailwind + Flowbite
stack, reusing the current components.

## Goal

Today the homepage is one long list of events with a search bar that switches
between Artist / Venue / Date. The next phase adds three ways to browse the same
event data, plus two new detail pages:

1. **Dates** tab: today's event list (default).
2. **Artists** tab: one card per headliner → links to an **artist page**.
3. **Venues** tab: one card per club, split Nightclubs / Dayclubs → links to a **venue page**.
4. A **chat rail** placeholder ("Ask the lineup", marked "Soon") for the upcoming agent.
5. A site-wide **"Shows updated …"** indicator in the header.

## Routes

| Route             | Purpose                                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| `/`               | Hero + tabs. Active tab lives in the URL: `/?tab=dates` (default), `?tab=artists`, `?tab=venues`, and `?kind=night | day` for the venue toggle. Back links from detail pages must return to the tab the user came from. |
| `/artists/[slug]` | Artist page, e.g. `/artists/steve-aoki`                                                                            |
| `/venues/[slug]`  | Venue page, e.g. `/venues/omnia-nightclub`                                                                         |

Keep `+page.server.ts` fetching `/find-edm/all-events` once; derive the artist and
venue groupings from that list server-side (or in a shared `$lib` helper) rather than
adding new API calls for v1.

## Visual system (already in the codebase — match it)

Everything below maps to Tailwind classes already used in `src/`.

- **Page background:** `bg-gradient-to-br from-purple-900 via-indigo-900 to-black`
- **Glow blobs** behind the content panel: cyan-400 / pink-400 / purple-400, `opacity-50 blur-xl` (as in `+page.svelte`)
- **Hero:** `static/edm-hero-background-compressed.avif`. **Change from today:** no frosted-glass bars over the hero. The image gets a light top darkening for legibility (`black/45` → `black/5` by ~35%) and its **bottom half fades to transparent with a CSS mask** (`mask-image: linear-gradient(to bottom, #000 45%, rgba(0,0,0,.6) 70%, transparent)`), so it dissolves into the page gradient with no seam. The content below overlaps the fade by ~40px.
- **Content panel + rows** keep the existing glass: panel `bg-white/15 border-white/30 backdrop-blur-xl rounded-xl`; rows `bg-white/10 border-white/20`, hover lift `hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-white/15`.
- **Heading text:** existing `.edm-nights-text` gradient (cyan-400 → purple-500 → pink-500) for the page title, artist/venue names in detail headers, and the chat title.
- **Text:** `text-slate-200`, Tailwind default sans.

### Pill system (important — this was iterated on deliberately)

| Pill                              | Style                                                                                                                                                                                       | Used for                                                                                           |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Frosted pill**                  | `rounded-full border border-white/20 bg-white/10 text-slate-200 font-bold text-sm px-4 min-h-11` + existing glow hover `hover:border-white/40 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]` | "View event ↗", "N dates →", "Full schedule →", chat send button                                   |
| **Dark-violet pill**              | same shape, `bg-[rgba(15,10,35,0.55–0.6)] border-white/20`                                                                                                                                  | Inactive tabs/chips, header pills, event tags                                                      |
| **Gradient pill (selected only)** | `bg-gradient-to-r from-cyan-500/80 to-purple-600/80 border-white/20`                                                                                                                        | **Only** the active tab, active venue/artist filter chip. Rule: the gradient means "you are here". |

- **"View event"** replaces the current gradient `EventButton`. It uses the **frosted pill** with a diagonal ↗ arrow, because it leaves the site (club ticketing). Internal links use →.
- The old cyan→purple `EventButton` style is now reserved for selected states only.

### Header

- **Left:** "Shows updated {relative time}" in a non-interactive dark-violet pill (h-8) with a small green dot (`bg-green-400` + soft glow). Full timestamp on hover (`title` attr). Optional: dot turns amber if the scrape is older than ~3 days.
- **Right:** `about` and `contact` as dark-violet pills (h-10, clickable, glow on hover).
- **Removed:** the "find EDM shows" nav link; the frosted glass nav bar.
- Mobile: keep the existing Flowbite dropdown behavior for the links.

## Page specs

### `/` hero

Title "Find EDM Shows Las Vegas" (gradient text, ~52px), then the tab pills
(Dates / Artists N / Venues N), then the search input on a dark-violet field. The tabs
replace the Artist/Venue/Date dropdown in `SearchBar.svelte`; the search input
placeholder follows the active tab ("Search for artists...", etc.).

### Dates tab

The current `EventTable` / `EventRow`, unchanged except: the venue fix-ups from the
normalization work below, and the new frosted "View event ↗" pill.

### Artists tab

Grid of cards (`grid-cols-[repeat(auto-fill,minmax(250px,1fr))]`). Each card:

- Round hero-image avatar + artist name (capitalize, extrabold)
- "Next: **Oct 16** · Omnia"
- **One** frosted pill "**9 dates →**" linking to `/artists/[slug]`. The count _is_ the link; no separate "All dates" button.

### Artist page `/artists/[slug]`

- Hero (shorter), "← All artists" back link, avatar, gradient name,
  "9 upcoming Las Vegas dates · Next: Fri, Oct 16 at Omnia Nightclub"
- **Venue filter chips:** "All venues ×9", "Omnia Nightclub ×7", "Marquee Nightclub ×1", "Hakkasan Nightclub ×1". Selected = gradient pill.
- Event rows: date block | **venue as the main line** (artist is already in the header) + optional **tag** pill (e.g. "dawn 2 dusk · halloween weekend", "race weekend") | "View event ↗".

### Venues tab

- **Nightclubs / Dayclubs** toggle (gradient = selected).
- Card per venue:
  - Name + **resort** ("Omnia Nightclub" / "Caesars Palace")
  - **Coming up:** next 3 headliner nights (date + artist)
  - **Regulars:** top artists by count at that venue as small dark-violet chips ("Steve Aoki ×7")
  - Frosted pill "**Full schedule →**" → `/venues/[slug]`. No count here: raw venue counts include closed and unnamed nights and would mislead.
- **Removed:** the per-venue "last updated" table and freshness legend (replaced by the single header indicator).
- "Wynn Nightlife Events" (concerts like NPU Live) is excluded from the venue list.

### Venue page `/venues/[slug]` — a mirror of the artist page

- Tags: "Nightclub" + resort; gradient venue name; "33 headliner nights through Dec 31 · Next: Fri, Oct 16 — Steve Aoki"
- **Artist filter chips** (only artists with ≥2 nights, plus "All artists ×N")
- Rows: date | **artist name as a link to `/artists/[slug]`** + optional tag | "View event ↗"
- Nights without a named headliner are **hidden** (decision made; "Headliner TBA" dimmed rows were the alternative).

### Chat rail (placeholder)

Right column on `/` (stacks below on mobile): glass panel, gradient title
"Ask the lineup", "Soon" badge, three example prompts as dark-violet buttons
("Who's playing Halloween weekend?", "When is Martin Garrix next in town?",
"What's on at Omnia this Saturday?"), disabled input + frosted send button. When it
goes live, the send button switches to the gradient once there is text (consistent
with the "gradient = active" rule).

## Data work (needed before Artists/Venues are correct)

The current `EdmEventInterface` is `{ Id, ClubName, ArtistName, EventDate, TicketUrl }`,
and `ArtistName` is the raw event title. Add a normalization step (scraper side or a
`$lib` helper; scraper side is preferable so the agent sees clean data too):

```ts
interface EdmEvent {
	id: string;
	clubName: string; // existing
	clubSlug: string; // "omnia-nightclub"
	title: string; // raw title, unchanged
	artist: string | null; // clean headliner, null for unnamed nights
	artistSlug: string | null;
	tag: string | null; // "halloween weekend", "race weekend", "w/ justin mylo"
	eventDate: string;
	ticketUrl: string;
}
```

Rules derived from real titles in the current dataset:

- `"steve aoki - race weekend"` → artist `steve aoki`, tag `race weekend`
- `"dawn 2 dusk - steve aoki - halloween weekend"` → artist `steve aoki`, tag `dawn 2 dusk · halloween weekend`
- `"martin garrix w/ justin mylo - halloween weekend"` → artist `martin garrix`, tag `w/ justin mylo · halloween weekend`
- `"official designercon kick off party with steve aoki"` → artist `steve aoki`, tag `designercon kick off party`
- `"house every weekend - kuta"` → artist `kuta`
- `"r&bae wednesdays w/ dj franzen"`, `"ritual sundays - dj franzen"` → artist `dj franzen` (residency nights count for the DJ)
- **Unnamed nights → `artist: null`** (hidden on artist/venue pages, excluded from counts): `closed`, `closed for dome installation`, `<club> <weekday>` (e.g. `omnia nightclub thursday`, `marquee dome saturday`), and named recurring parties with no DJ (`deseo: latin sundays`, `thursdays on the terrace`, `lowkey in the library`, `marquee mondays`).
- Rule-based parsing covers most cases; an LLM pass at scrape time is a good fallback for the long tail.

Venue metadata (static map in `$lib` is fine):

| Venue                      | Resort           | Kind  |
| -------------------------- | ---------------- | ----- |
| omnia nightclub            | Caesars Palace   | night |
| marquee nightclub          | The Cosmopolitan | night |
| hakkasan nightclub         | MGM Grand        | night |
| tao nightclub              | The Venetian     | night |
| liv las vegas              | Fontainebleau    | night |
| xs nightclub               | Wynn             | night |
| encore beach club at night | Encore           | night |
| jewel nightclub            | Aria             | night |
| zouk nightclub             | Resorts World    | night |
| marquee dayclub            | The Cosmopolitan | day   |
| omnia dayclub              | Caesars Palace   | day   |
| encore beach club          | Encore           | day   |
| palm tree beach club       | MGM Grand        | day   |
| ayu dayclub                | Resorts World    | day   |

**Last updated:** the scrape job writes one timestamp (e.g. a Firestore doc
`meta/scrape { lastUpdated }`) at the end of each successful run; the API exposes it
and the header renders it as relative time.

## Suggested build order

1. Header changes (remove glass + "find EDM shows", add pills, add updated indicator with a stubbed timestamp) and the hero fade mask.
2. Pill system: update `EventButton` to the frosted ↗ pill; create shared pill components/classes.
3. Tabs on `/` with `?tab=` in the URL; Dates tab = current `EventTable`.
4. Normalization helper + unit tests using the title rules above (vitest is already set up).
5. Artists tab + `/artists/[slug]`.
6. Venues tab + `/venues/[slug]`.
7. Chat rail placeholder.
8. API/scraper: `lastUpdated`, and move normalization server-side.

Run `npm run check`, `npm run lint`, `npm test` after each step; existing tests for
`EventRow`, `EventTable`, `SearchBar`, layout and page will need updating.

## Prototype files

`./prototype/` holds the three prototype screens as self-contained HTML
(`Main.dc.html` = `/` with all three tabs, `Artist.dc.html` = Steve Aoki,
`Venue.dc.html` = Omnia Nightclub). They contain the exact colors, spacing, copy and
real sample data used. They use a custom templating runtime (`{{holes}}`,
`<sc-for>`, `<sc-if>`), so **read them for values, don't run or port them literally**.
The hero image URL inside them points to the prototype host; use
`static/edm-hero-background-compressed.avif` instead.
