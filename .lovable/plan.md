

# Hero CTA Redesign with AI Perfume Finder

## Overview
Redesign the Hero section's action area into a polished three-part layout: a prominent search bar with an integrated "help me choose" link, two high-quality CTA buttons, and an enhanced AI-powered perfume finder inside the search dialog. The finder will use a guided questionnaire with smooth animations, then display curated results with rich product introductions.

---

## New Hero Layout (top to bottom)

```text
[Search Bar with integrated "Nem tudom, mit keresek" link]
[Primary CTA: Bongeszd az Illatokat]  [Secondary CTA: Allitsd Ossze a Dobozod]
[Trust signals]
```

### Search Bar Enhancements
- Keep the current clickable fake-input design but make it taller (py-4) with a slightly stronger gold border glow
- Below the search bar, add a small animated text link: **"Nem tudod, mit keresel? Segitunk megtalalni!"** with a Sparkles icon
- Clicking this link opens the SearchCommand dialog directly on the **Finder tab** instead of the Search tab
- The link has a subtle shimmer/pulse animation to draw attention

### Two Main Buttons Side by Side
- Both buttons rendered at equal width on desktop (side-by-side in a row)
- On mobile, they stack vertically, both full-width
- **Primary** ("Bongeszd az Illatokat"): Solid gold background, bold uppercase, arrow icon, hover glow animation
- **Secondary** ("Allitsd Ossze a Dobozod"): Gold outline style, same height and text size as primary, hover fill animation
- Both buttons get a subtle `framer-motion` scale-on-hover effect (`whileHover={{ scale: 1.02 }}`) and press effect (`whileTap={{ scale: 0.98 }}`)

---

## Enhanced SearchCommand Dialog

### Tab System
Keep the existing two-tab design (Search / Finder) but improve the Finder tab:

### Improved Finder ("Talald meg az illatodat")
1. **Progress bar**: Animated segmented progress (already exists), add framer-motion `layoutId` transition when advancing
2. **Question cards**: Each question slides in from the right with a `framer-motion` `AnimatePresence` transition (exit left, enter right)
3. **Option buttons**: Grid of styled cards with hover border-glow effect; on selection, a brief gold flash/check animation before advancing
4. **Results view**: After all 3 questions answered, show results with:
   - A heading: "Neked ajanlott illatok"
   - Each product card shows: image, title, vendor, price, and a **short description** (pulled from the Shopify product description, truncated to ~80 chars)
   - A "Ujrakezdes" button to retake the quiz

### Opening Directly to Finder Tab
- Add an optional `initialTab` prop to `SearchCommand`: `initialTab?: "search" | "finder"`
- When the Hero's "Nem tudod, mit keresel?" link is clicked, it opens the dialog with `initialTab="finder"`
- When the search bar itself is clicked, it opens with `initialTab="search"` (default)

---

## Technical Changes

### File: `src/components/Hero.tsx`
- Add a new `onFinderOpen` callback prop (or reuse `onSearchOpen` with a parameter)
- Replace the single search bar + separated buttons layout with the new grouped layout
- Add the "Nem tudod, mit keresel?" animated link below the search bar
- Place both CTA buttons in a flex row (`flex-col sm:flex-row`) with equal sizing
- Move trust signals below the buttons
- Add `motion` hover/tap animations to both buttons
- Remove the old separated secondary CTA block

### File: `src/components/SearchCommand.tsx`
- Add `initialTab` prop, default to `"search"`
- Use `initialTab` in the `useEffect` that resets state when dialog opens
- Add `AnimatePresence` + `motion.div` transitions for finder question steps (slide left/right)
- Show product description snippet in finder results (already available from Shopify data as `p.description`)
- Add a subtle entry animation for the results list

### File: `src/pages/Index.tsx`
- Add a new state or callback to support opening search with a specific tab
- Pass the tab preference down to `Header` which renders `SearchCommand`
- Two functions: `handleSearchOpen()` (opens search tab) and `handleFinderOpen()` (opens finder tab)

### No new dependencies
- `framer-motion` already installed for `AnimatePresence` transitions
- All UI components (`CommandDialog`, etc.) already available

