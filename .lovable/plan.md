
# Products Page Redesign -- Premium Hero + Navigation

## Overview

Redesign the Products page hero section and header navigation to be more welcoming, professional, and user-friendly. Inspired by the reference screenshot, we'll add breadcrumb navigation, a refined gold-accented background with subtle radial glow, and quick navigation links in the header for easier access.

## Changes

### 1. Header -- Add Quick Navigation Links (Desktop)

Add inline navigation links between the logo and action icons on desktop for faster access to key pages:

- **Termekek** (Products) -- link to `/termekek`
- **Rolunk** (About Us) -- link to `/rolunk`
- **Tamogatas** (Support) -- link to `/tamogatas`

These links appear only on desktop (hidden on mobile where the Toolbox menu handles navigation). Styled with subtle hover effects -- gold underline animation on hover, muted foreground color by default.

### 2. Products Page Hero Redesign

Replace the current simple dark gradient hero with a more welcoming, luminous design:

**Background:**
- Warm radial gradient: a soft gold glow from center fading into the dark background
- Subtle shimmer/sparkle effect using CSS pseudo-elements
- A faint decorative gold line accent on the left side of the heading (like the reference image's vertical bar)

**Breadcrumb Navigation:**
- Add a breadcrumb row at the top of the hero: `Fooldal / Termekek`
- "Fooldal" links back to `/` with gold hover color
- Styled with small text, muted foreground, slash separator

**Content Refinement:**
- Keep the "Kollekcio" badge, title, description, and product count
- Add staggered entrance animations for each element (badge, title, description, count) with slight delays
- The vertical gold accent bar on the left of the title (inspired by reference)

**Layout:**
- Shift content to left-aligned (like reference) instead of centered, for a more editorial/professional feel
- Increase top padding slightly for breathing room below the header

### 3. File Changes

**`src/components/Header.tsx`:**
- Add a `nav` element between logo and action icons
- 3 NavLink items (Termekek, Rolunk, Tamogatas) with hover animations
- Hidden on mobile (`hidden md:flex`)
- Each link uses gold underline-on-hover effect

**`src/pages/Products.tsx`:**
- Add breadcrumb component (Fooldal > Termekek)
- Redesign hero background with radial gold glow gradient
- Left-align hero content with gold accent bar
- Staggered framer-motion entrance animations
- Slightly more generous padding

### Technical Notes

- No new dependencies required
- Uses existing `framer-motion`, `react-router-dom`, Tailwind utilities
- Breadcrumb is built inline (no new component needed -- just a simple flex row with Link elements)
- Gold glow uses `radial-gradient` with `hsl(43 65% 52% / 0.06)` for a soft, welcoming warmth without being overwhelming
- Header nav links use the existing `story-link` underline animation class from CSS utilities
- All animations are subtle and intentional per the brand's motion principles
