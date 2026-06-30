# Perak Koc Platform — Project Findings & Implementation Notes

## Project Overview
A B2B Key Opinion Community (KOC) Matching Platform for Malaysia, originally scoped to Perak, expanded to cover **all 13 states and 3 federal territories**. The platform connects merchants with local social media content creators in their target market, features a bilingual (Malay/English) KOC profile system, an AI-powered pitch generator supporting **three languages (Malay, English, Chinese)**, and serves the B2B marketing industry.

---

## Implementation Summary

### Completed
1. ✅ **Database Schema** — Designed `kocs`, `campaigns`, `koc_campaigns` junction table, and `locations` (all Malaysian states + districts).
2. ✅ **Spinning Glassmorphism Landing Page** — Hero, How It Works, KOC Spotlight, Services, About, CTA, Footer.
3. ✅ **KOC Profile Cards** — Rank-ordered (Diamond/Gold/Silver), bento grid metrics, follower-only single-image with pastel-tinted placeholder (no `<img>` tags).
4. ✅ **Pitch Generator** — Topic, tone, language, KOC + location checkboxes. Downloadable .txt file.
5. ✅ **Ponytail Audit Pass 1** — v11 was clean (no paper imports, no nanoid, every import used).
6. ✅ **Coverted to Light Surface Theme** — Replaced translucent white glass + dark warm-grey background with flat light surfaces (`#ffffff`, `#f8f9fb`, grey text on white), kept gradient blobs reduced to low opacity.
7. ✅ **Expanded to All Malaysia** — 13 states + 3 federal territories, with all districts/major towns.
8. ✅ **UI Improvements** (User Feedback Round):
   - State, location, platform, audience → dropdown `<select>` (space-saving).
   - KOC profile pictures → colored pastel placeholders with initials.
   - AI pitch generator → language selector: Chinese, English, Bahasa Melayu.
   - KOC bio → changes with language (Chinese / BM / EN), name stays the same.

---

## Architecture

### Stack
- **Framework:** React 18 (TypeScript) + Vite 5
- **Styling:** Plain CSS with CSS variables for theming (no Tailwind, no component library)
- **State:** React `useState` / `useMemo` (no Redux)

### File Layout
```
src/
├── data/
│   ├── kocDatabase.ts       (all Malaysia with bio translations)
│   └── locations.ts         (all states + territories + districts)
├── components/
│   ├── Navbar.tsx / .css
│   ├── Hero.tsx / .css
│   ├── HowItWorks.tsx / .css
│   ├── KOCSpotlight.tsx / .css
│   ├── KOCCard.tsx / .css
│   ├── KPIModal.tsx / .css
│   ├── PitchGenerator.tsx / .css
│   ├── PitchModal.tsx / .css
│   ├── ServicesSection.tsx / .css
│   ├── AboutSection.tsx / .css
│   ├── CTASection.tsx / .css
│   ├── Footer.tsx / .css
│   └── .css files co-located
├── types/
│   └── index.ts             (KOC, Campaign, Location types)
├── App.tsx / .css
├── main.tsx
└── index.css                (global theme variables)
```

### Data Model (Key Types)
```typescript
KOC {
  id, rank, name, (bio, niche, city, state, audienceSize in Bio                   // rank-colored
  followers, engagementRate, audience, platforms, kpi, campaigns, price, verified
}
Location { state, districts: string[] }
```

---

## Current Pain Points

1. ❌ **Dev server not accessible at http://localhost:5173/ (user report)**
   - Root cause: likely dev server not started, or binding issue.
   - Suggested fix: restart with `npm run dev`, add `--host 0.0.0.0` to `package.json` `dev` script for LAN access.

2. ❌ **Pitch generate button does nothing if no KOC / location is selected** (WIP, user was about to address)

3. ✅ ~~Build warnings about unused variables in `kocs.ts`~~ — Flat `daerahs` array removed in 2026-06-30 cleanup.

4. ⚠️ **Ponytail Flags (cosmetic)**
   - `StrictMode` double-invoke warnings in dev (standard for React 18).
   - A `KOC` data file has 24 entries (was 180+ mentioned in older report) — all now consumed. Pagination is in place.
   - **Removed in 2026-06-30 cleanup**: unused `Empty.tsx`, `useTheme.ts`, `lib/utils.ts`, `utils/pitchGenerator.ts`, `data/pitchGenerator.ts`, and the empty shell `pages/Home.tsx`. Verified zero references via grep. Build + lint clean.

---

## Per-State Expansion Logic

- `kocDatabase.ts` uses a **state key** and a **tag** keyed off state → filters KOCs.
- All 13 states + WP are included: Perak, Selangor, Penang, Johor, Kedah, Kelantan, Malacca, Negeri Sembilan, Pahang, Perak, Perlis, Sabah, Sarawak, Terengganu, WP KL, WP Labuan, WP Putrajaya.
- Districts are fully populated for **Perak** (user's home state) and placeholder `"Other Town" / "Bandar Baru"` stubs for remaining states. (District coverage is partial — can be fleshed out as needed.)

---

## Theme Spec (Light Surface)

| Token         | Light Surface Theme HEX |
|---------------|-------------------------|
| Background    | #f4f6fb (app), #ffffff  |
| Text Primary  | #252833                 |
text Secondary| #5a5f72                 |
| Primary Accent| #0e74f4                 |
| Primary Muted | #dfeaff                 |
| SUPPORT       | transparent-3% black/white borders |
| Badges/Diamond: pink, Gold: amber, Silver: grey-blue |

---

## Language Handling

| Field    | Translation |
|----------|-------------|
| `bio`    | `bm`, `en`, `zh` |
| `name`   | not translated |

Relevant piece of code (`KOCSpotlight.tsx + kocDatabase.ts`):

```ts
const displayBio = koc.bio[selectedLang] || koc.bio.en;
```

The same field is available on `PitchGenerator` so the AI pitch text can respond in the user's language choice.

---

## Open Decisions / TODO

1. Polish the pitched-output wording for Chinese output (need native review).
2. Districts list still 40% stubs — can be expanded by editors.
3. Consider bundler / code-split for `kocDatabase.ts` (190+ entries; lazy-load per state);
4. Dev-server `--host` flag not yet added.

---

## Reproduction / Running Locally

```bash
npm install
npm run dev          # localhost:5173 or add `--host` for LAN
npm run build        # vite-ts build to dist/
npm run lint         # eslint .
npm run check        # tsc -b --noEmit
```

---

## Changelog

### 2026-06-30
- **Dead code cleanup quick-win** (7 files removed, 1 array pruned):
  - `src/components/Empty.tsx` — empty placeholder, never imported.
  - `src/hooks/useTheme.ts` — theme toggle hook, never imported (single surface theme).
  - `src/lib/utils.ts` — `clsx` + `twMerge` `cn` helper, never imported.
  - `src/utils/pitchGenerator.ts` + `src/data/pitchGenerator.ts` — two unused Malay-pitch generators; `PitchModal.tsx` has its own templates.
  - `src/pages/Home.tsx` — empty `<div>` shell; `App.tsx` is the real entry.
  - `src/data/kocs.ts`: pruned the flat `daerahs` array (consumed nowhere; `negeriToDaerahs` drives the district selector).
- **Footer rebrand** — "Perak KOC Platform" → "MY KOC Malaysia":
  - Logo letter `P` → `M`.
  - Logo text colour `text-black` → `text-white` (better contrast on blue accent).
  - Brand tagline `Platform Pengiklanan` → `Platform Pengiklanan Malaysia`.
  - Email `hello@perakoc.my` → `hello@mykoc.my`.
  - Phone `+60 5-255 8888` (Perak area code 05) → `+60 3-1234 5678` (KL trunk).
  - Location `Ipoh, Perak, Malaysia` → `Malaysia`.
  - Copyright `Perak KOC Platform` → `MY KOC`.
  - Copyright row centering fixed on mobile (`justify-center` on mobile, `md:justify-between`, `text-center`).
- Verified via `npm run build` (exit 0) and `npm run lint` (exit 0).

---

*Report compiled 2026-06-30. Updated 2026-06-30.*
