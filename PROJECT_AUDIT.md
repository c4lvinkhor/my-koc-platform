# MY KOC Platform — Project Audit Report

**Date:** 2026-06-30
**Project:** Malaysia B2B KOC Matching Platform
**Stack:** React 18 + TypeScript + Vite 6 + Tailwind CSS v3

---

## 1. Project Summary

A single-page B2B platform connecting Malaysian businesses with Key Opinion Leaders (KOCs) across all 16 states and federal territories. Features trilingual interface (BM/EN/ZH), state-district cascading filters, colorful KOC profiles, AI-powered pitch proposals, and pagination.

---

## 2. Architecture Overview

```
src/
├── App.tsx                      # Main layout, filtering, pagination (12/page)
├── main.tsx                     # Entry point
├── index.css                    # Design system tokens, grain overlay, animations
├── components/
│   ├── Navbar.tsx               # Scroll-aware nav, BM/EN/ZH toggle, MY KOC branding
│   ├── Hero.tsx                 # Full-screen hero, KL aerial, stats bar
│   ├── FilterSidebar.tsx        # Multi-select dropdowns with negeri→daerah cascading
│   ├── KOCCard.tsx              # Influencer card with trilingual bio, colorful avatars
│   ├── PitchModal.tsx           # AI proposal generator (BM/EN/ZH language selector)
│   ├── ServicesSection.tsx      # 4 service pillars (Discovery, Storytelling, Proposal, Analytics)
│   ├── AboutSection.tsx         # Team photo, national stats (2400+ KOCs, 16 states)
│   ├── CTASection.tsx           # Call-to-action
│   └── Footer.tsx               # Links, contact info
├── data/
│   ├── kocs.ts                  # 24 KOC profiles, negeri→daerah mapping, filter lists
│   ├── i18n.ts                  # 90+ translation keys × 3 languages (BM/EN/ZH)
│   └── pitchGenerator.ts        # Malay pitch templates
├── hooks/
│   ├── useLanguage.ts           # Language state management (BM/EN/ZH)
│   └── useTheme.ts              # ⚠️ UNUSED — theme hook, zero callers
├── pages/
│   └── Home.tsx                 # ⚠️ UNUSED — empty component
├── components/
│   └── Empty.tsx                # ⚠️ UNUSED — empty placeholder component
├── lib/
│   └── utils.ts                 # ⚠️ UNUSED — cn() helper (clsx + tailwind-merge)
└── utils/
    ├── format.ts                # ✅ Active — K/M number abbreviation
    └── pitchGenerator.ts        # ⚠️ UNUSED — duplicate pitch generator
```

---

## 3. Design System

### Color Palette (Light Surface)
| Variable | Value | Usage |
|----------|-------|-------|
| `--color-surface` | `#f8f6f3` | Background (warm cream) |
| `--color-surface-raised` | `#ffffff` | Cards, dropdowns |
| `--color-surface-overlay` | `#f0ede8` | Hover states, inputs |
| `--color-border` | `#e2ddd7` | Borders, dividers |
| `--color-text-primary` | `#1a1816` | Headings, body text |
| `--color-text-secondary` | `#5c5650` | Subtitles, labels |
| `--color-text-muted` | `#8a837b` | Hints, placeholders |
| `--color-accent` | `#8b6914` | Gold buttons, highlights |
| `--color-teal` | `#0d7377` | Halal badge |
| `--color-success` | `#16a34a` | Green indicators |

### Typography
- **Display:** Fraunces (Georgia serif) — headings
- **Body:** Space Grotesk — UI text, buttons

### Key UI Features
- Grain texture overlay animation (subtle noise)
- Scroll-aware transparent → solid navbar
- Multi-select dropdowns with checkbox indicators
- Negeri→Daerah cascading filter (select state → districts auto-filter)
- Pagination with numbered page buttons

---

## 4. KOC Data

### Coverage: 24 profiles across all 16 states/territories

| State | Count | Key Areas |
|-------|-------|-----------|
| Selangor | 3 | Petaling Jaya, Shah Alam |
| W.P. Kuala Lumpur | 2 | KL, Bangsar |
| Johor | 2 | Johor Bahru |
| Pulau Pinang | 2 | Georgetown |
| Perak | 2 | Ipoh, Taiping |
| Kedah | 2 | Alor Setar, Langkawi |
| Kelantan | 1 | Kota Bharu |
| Terengganu | 1 | Kuala Terengganu |
| Pahang | 2 | Cameron Highlands, Kuantan |
| Negeri Sembilan | 1 | Port Dickson |
| Melaka | 1 | Melaka City |
| Perlis | 1 | Kangar |
| Sabah | 2 | Kota Kinabalu, Sandakan |
| Sarawak | 2 | Kuching, Miri |
| W.P. Putrajaya | 1 | Putrajaya |

### Categories Represented
Makanan (7), Pelancongan (8), Teknologi (3), Fashion (2), Gaya Hidup (3), Kesihatan (1), Kecantikan (1)

### Each KOC Includes
- Name (preserved across languages)
- Handle (@username)
- Colorful portrait image (AI-generated with vibrant background)
- Trilingual bio (BM/EN/ZH)
- District + State
- Platforms (TikTok, Instagram, YouTube, Facebook, Twitter)
- Audience age bracket
- Followers count (28K — 312K)
- Engagement rate (4.1% — 7.1%)
- Halal certification status
- Pro badge status
- Searchable tags

---

## 5. Features Implemented

| Feature | Status | Notes |
|---------|--------|-------|
| Trilingual UI (BM/EN/ZH) | ✅ | All labels, sections, KOC bios |
| Negeri filter (state) | ✅ | Multi-select dropdown |
| Daerah filter (district) | ✅ | Cascading — filters by selected negeri |
| Platform filter | ✅ | Multi-select |
| Audience filter | ✅ | Multi-select |
| Halal/Non-Halal toggle | ✅ | Two-button toggle |
| Search | ✅ | Name, handle, bio, tags |
| KOC cards | ✅ | 3-column grid, colorful avatars |
| AI Pitch Generator | ✅ | Trilingual output selector |
| Pagination (12/page) | ✅ | Numbered navigation |
| Scroll-aware navbar | ✅ | Transparent → solid on scroll |
| Responsive layout | ✅ | Mobile → desktop |

---

## 6. Dead Code — Files to Delete

| File | Reason |
|------|--------|
| `src/components/Empty.tsx` | Empty component, zero imports anywhere |
| `src/pages/Home.tsx` | Empty `<div></div>`, zero imports |
| `src/hooks/useTheme.ts` | Theme toggle hook — app is light-only, zero callers |
| `src/utils/pitchGenerator.ts` | Duplicate pitch generator — `data/pitchGenerator.ts` is the one used |
| `src/lib/utils.ts` | `cn()` helper only used by `Empty.tsx` (which is itself dead) |

**Net: —5 files**

---

## 7. Un to Remove

| Package | Reason |
|---------|--------|
| `lucide-react` | Zero imports — all icons are inline SVGs |
| `zustand` | Zero imports — state is `useState` in App.tsx |
| `react-router-dom` | Zero imports — single page with anchor nav |
| `clsx` | Only used by dead `lib/utils.ts` |
| `tailwind-merge` | Only used by dead `lib/utils.ts` |

**Net: —5 dependencies**

---

## 8. Bugs & Inconsistencies to Fix

### Footer Issues (`src/components/Footer.tsx`)

| Line | Current | Fix |
|------|---------|-----|
| L13 | `text-black` on "P" mark | → `text-white` |
| L16 | "MY KOC" ✅ | Already rebrand |
| L17 | "Platform Pengiklanan" | Subtitle OK |
| L37 | `hello@perakoc.my` | → `hello@mykoc.my` |
| L38 | `+60 5-255 8888` | Perak area code → use generic MY number |
| L39 | `Ipoh, Perak, Malaysia` | → `Malaysia-wide` |
| L46 | `© 2026 Perak KOC Platform` | → `© 2026 MY KOC` |

### FilterSidebar Issue (`src/components/FilterSidebar.tsx`)

| Line | Current | Fix |
|------|---------|-----|
| `placeholder` | `'All areas'` hardcoded | → Add `filter_all_areas` i18n key for BM/EN/ZH |

### Navbar Subtitle (`src/components/Navbar.tsx`)

| Line | Current | Fix |
|------|---------|-----|
| L34 | `"Platform Pengiklanan"` | OK for BM, but EN/ZH switch doesn't change it |

---

## 9. Build Status

```
✅ Build passes clean
   → 40 modules transformed
   → JS: 298.91 kB (gzip: 70.58 kB)
   → CSS: 23.08 kB (gzip: 5.48 kB)
   → TypeScript: zero errors
```

---

## 10. Recommended Next Steps

### Quick Wins (low effort, high impact)
1. **Delete 5 dead files + 5 unused deps** — cleaner repo, faster installs
2. **Fix footer branding** — email, copyright, location, "P" mark color
3. **Add i18n for "All areas"** placeholder in FilterSidebar

### Medium Effort
4. **Add KOC profile detail** — clicking "Profile" opens expanded view with portfolio, past campaigns, audience demographics
5. **Add loading skeleton** — shimmer placeholders while AI-generated images load
6. **Connect Supabase backend** — schema already exists in `supabase-schema.sql`; replace mock data with live queries

### Big Features
7. **Merchant auth** — login/dashboard to save favorite KOCs, track campaigns
8. **KOC self-registration** — form for influencers to join the platform
9. **Analytics dashboard** — campaign performance tracking
10. **Deploy** — push to production (Vercel/Netlify + Supabase)

---

## 11. Database Schema (Already Prepared)

`supabase-schema.sql` includes:
- `merchants` table (id, business_name, contact_email, preferred_language)
- `kocs` table (id, name, handle, bio, followers, engagement, halal_certified)
- `koc_platforms` junction table
- `koc_tags` junction table
- `proposals` table (merchant_id, koc_id, status, pitch_text)
- Row Level Security policies
- `preferred_language` ENUM ('BM', 'EN', 'ZH')

**Ready for Supabase integration when backend work begins.**

---

## 12. Estimated Tech Debt Score

| Category | Score | Notes |
|----------|-------|-------|
| Dead code | Low | 5 files, easy cleanup |
| Unused deps | Low | 5 packages, easy removal |
| UX polish | Medium | Loading states, error boundaries missing |
| Testing | None | Zero tests currently |
| Backend | None | Frontend only, all mock data |
| Overall | **Functional MVP** | Clean frontend, ready for backend |
