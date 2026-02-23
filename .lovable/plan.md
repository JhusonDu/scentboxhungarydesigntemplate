

# Featured Products Section -- Denser Grid + Stronger CTA

## Changes

### 1. Denser Desktop Grid (src/components/FeaturedProducts.tsx)

- **More products:** Show **8 products** instead of 6 (`.slice(0, 8)`)
- **More columns:** Grid changes from `md:grid-cols-3` to `md:grid-cols-4` on desktop
- **Tighter gaps:** Reduce gap from `md:gap-5` to `md:gap-4`
- **Skeleton loader** updated to match (8 skeletons, 4 columns)

### 2. Compact Featured Cards (src/components/FeaturedProducts.tsx)

- **Smaller image:** Desktop aspect ratio from `md:aspect-[3/4]` to `md:aspect-[4/5]` (slightly taller/narrower for compact feel)
- **Tighter text:** Reduce card padding from `md:p-4` to `md:p-3`, title from `md:text-base` to `text-sm`, price from `text-lg` to `text-base`
- **Quick buy button:** Smaller text and padding to fit the compact cards

### 3. Redesigned CTA -- Centered "View All" Button (src/components/FeaturedProducts.tsx)

Replace the small inline "Osszes Megtekintese" link in the header with a prominent, centered CTA button below the grid:

- Remove the desktop "Osszes Megtekintese" link from the header row
- Add a centered block after the grid with a styled button:
  - Full-width on mobile, auto-width on desktop
  - Primary outline style with arrow icon
  - Gold glow hover effect matching brand aesthetic
  - Text: "Osszes Termek Megtekintese" with ArrowRight icon

### 4. Mobile stays 2 columns, mobile CTA merges with the new centered one

The existing mobile "Osszes Megtekintese" div gets replaced by the new universal centered CTA that works on both mobile and desktop.

## Result

- **Before:** 6 products in 3 columns, small text link for "view all" tucked in the header
- **After:** 8 products in 4 columns (desktop), compact cards, prominent centered CTA button below the grid pushing users to the full catalog

