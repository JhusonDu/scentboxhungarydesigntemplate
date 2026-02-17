

# ScentBox Products Page Redesign - Phase 1: Layout and Product Cards

## Overview

The uploaded spec describes a complete luxury e-commerce products page with ~15 major features. Implementing everything at once would be risky, so I recommend breaking it into 5 phases. Here is **Phase 1** — the foundation that everything else builds on.

## Current State vs. Target

| Feature | Current | Target (Phase 1) |
|---------|---------|-------------------|
| Page layout | Full-width filter bar + 3-col grid | Sidebar (280px) + 4-col grid |
| Product cards | Basic (image, title, price, quick add) | Luxury (brand label, hover lift, image zoom, quick add overlay, size pills) |
| Hero section | Simple centered text | Badge + large title + subtitle + result count |
| Mobile grid | 1 column | 1 column (unchanged) |
| Mobile filters | Bottom sheet | Bottom sheet (unchanged, will enhance later) |

## What Phase 1 Covers

### 1. Products Page Layout Restructure (`Products.tsx`)
- Desktop: flex row with sticky 280px sidebar + fluid grid area
- Mobile: stays single column, no sidebar (filter button opens sheet as now)
- Grid changes from 3 columns to 4 columns on desktop (3 on laptop, 2 on tablet, 1 on mobile)

### 2. Enhanced Hero Section (`Products.tsx`)
- "KOLLEKCIO" pill badge at top
- "Osszes Termek" heading at 56px desktop / 40px mobile
- Subtitle text below
- Product count display (e.g., "42 termek")
- Bottom border with subtle gold line

### 3. Product Card Redesign (`ProductCard.tsx`)
- Brand label (uppercase, small, muted) above title
- Title with Playfair Display font, max 2 lines
- Price in gold, larger (24px)
- Hover effects: card lifts -8px with gold shadow, image scales 1.08x
- Quick add button slides up from bottom on hover
- HUF price formatting (e.g., "4 990 Ft" instead of "HUF 4990.00")

### 4. Filter Sidebar (Desktop) (`ProductFilters.tsx`)
- Move from horizontal bar to vertical sidebar layout on desktop
- Same filter groups (Gender, Brand, Type) but stacked vertically
- Add sort dropdown (Popularity, Price asc/desc, Name A-Z)
- Mobile stays as bottom sheet (no change)

## What is NOT in Phase 1 (later phases)

- Phase 2: Wishlist, badges (New/Popular/Limited), active filter chips
- Phase 3: Quick View modal
- Phase 4: Pagination, URL params for filters, price range slider
- Phase 5: Extra features (recently viewed, compare, social sharing)

## Technical Details

### Files to modify:
1. **`src/pages/Products.tsx`** - Restructure layout to sidebar + grid, update hero
2. **`src/components/ProductCard.tsx`** - Redesign card with brand label, better pricing, hover effects
3. **`src/components/ProductGrid.tsx`** - Update grid columns (4 on desktop), pass sort state
4. **`src/components/ProductFilters.tsx`** - Desktop: vertical sidebar layout; add sort dropdown

### Files to create:
- None in Phase 1 (reusing existing components)

### No dependency changes needed
- All animations use existing `framer-motion`
- All UI components use existing shadcn/ui

