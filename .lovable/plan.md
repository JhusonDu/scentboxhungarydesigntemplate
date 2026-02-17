
# Desktop Products Page -- Premium Shopping Experience Upgrade

## What Changes

### 1. Hero Section -- Tighter, Trust-Forward
- Reduce the hero height on desktop (less padding) so products are visible sooner
- Add a subtle **trust strip** below the hero title: three inline badges -- "100% Eredeti", "Gyors Szallitas", "14 Nap Visszakuldes" -- with small icons (Shield, Truck, RotateCcw) in a horizontal row
- This immediately communicates trustworthiness and professionalism before the user even scrolls

### 2. Product Grid -- Desktop Sort Bar Above Grid
- Add a **top bar** above the product grid on desktop showing: product count on the left, sort dropdown on the right
- This is the standard luxury e-commerce pattern (like Net-a-Porter, Sephora) -- gives users immediate control
- The sort dropdown moves from the sidebar filter to this top bar on desktop, keeping filters focused on filtering

### 3. Product Card -- Enhanced Luxury Desktop Experience
- Add a subtle **border glow** on hover using `box-shadow` with gold tint
- Show the **"Kosarba"** button text as "Gyors Valasztas" (Quick Buy) to be more inviting and less transactional
- Add a subtle **price "tol" (from) prefix** when there are multiple variants: "tol 3 490 Ft"
- Increase card info spacing for a more breathable, editorial layout on desktop

### 4. Filter Sidebar -- Polished Desktop Card
- Add a subtle **gold top border** accent to the filter card for visual hierarchy
- Slightly increase the card's border radius and add a subtle inner shadow for depth
- Add a small **active filter count** badge next to the "Szurok" heading

### 5. Background Enhancement -- Subtle Luxury Texture
- Add a very faint **noise texture** overlay to the products section background using CSS for a premium tactile feel
- Add a subtle **gradient separator** between the hero and grid sections -- a thin gold-to-transparent line

## Technical Details

### Files to modify:

1. **`src/pages/Products.tsx`**
   - Reduce desktop hero padding from `md:pb-16` to `md:pb-10`
   - Add trust badges row after the description (Shield, Truck, RotateCcw icons with text)
   - Add a sort/count top bar above the ProductGrid on desktop
   - Add subtle noise texture CSS to the grid section background
   - Add gold gradient separator between hero and grid

2. **`src/components/ProductCard.tsx`**
   - Change "Kosarba" button text to "Gyors Valasztas" on desktop
   - Add gold border glow on hover (`box-shadow: 0 0 0 1px hsl(43 65% 52% / 0.15)`)
   - Add "tol" prefix for price when multiple variants exist
   - Increase desktop spacing in the info section (`space-y-2` instead of `space-y-1.5`)

3. **`src/components/ProductGrid.tsx`**
   - Accept and display a sort bar prop area (count + sort) above the grid on desktop

4. **`src/components/ProductFilters.tsx`**
   - Add gold top border accent to the desktop filter card
   - Show active filter count badge next to heading
   - Remove sort from sidebar (moved to top bar)

5. **`src/index.css`**
   - Add a `noise-texture` utility class with a CSS pseudo-element for subtle grain overlay

### No new dependencies needed
- Uses existing `lucide-react` icons, `framer-motion`, Tailwind utilities
- All changes are CSS/layout refinements for desktop breakpoints only
