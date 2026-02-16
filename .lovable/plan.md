
# Product Filter System for the Products Page

## Overview

Add a professional, animated filter bar to the `/termekek` (Products) page. Users can combine multiple filters to narrow down products. The filter UI adapts between desktop (horizontal bar with dropdowns) and mobile (bottom sheet).

## Filter Categories

Based on your actual Shopify product data, here are the filters:

### 1. Gender (Nem)
- **Ferfi** (Men) -- e.g., Dior Sauvage, Chanel Bleu, Valentino Uomo
- **Noi** (Women) -- e.g., Chanel N5, YSL Libre, Lancome La Vie
- **Uniszex** (Unisex) -- e.g., Tom Ford Oud Wood

### 2. Brand (Marka)
- Chanel, Dior, Giorgio Armani, Givenchy, Lancome, Tom Ford, Valentino, Yves Saint Laurent
- Pulled dynamically from `vendor` field on each product

### 3. Category / Type (Tipus)
- **Dekant** -- most products
- **Ferfi Parfum** -- full bottles
- Pulled dynamically from `productType` field

## UI Design

### Desktop Layout
- A horizontal filter bar sits between the page hero and the product grid
- Contains pill-shaped toggle chips for each filter group, arranged in labeled rows
- Chips are selectable (multi-select within each group) with gold highlight when active
- An "Osszes torlese" (Clear all) button appears when any filter is active
- Active filter count badge on each group label
- Smooth `framer-motion` height animation when filters change results

### Mobile Layout
- A sticky "Szuro" (Filter) button at the bottom of the screen
- Tapping opens a **bottom sheet Dialog** with all filter groups stacked vertically
- Same chip-style selectors inside the sheet
- "Alkalmaz" (Apply) button at the bottom to close and apply
- Active filter count shown on the sticky button as a badge

### Filter Chips Design
- Rounded-full pills with `border-border` default
- Selected state: `border-primary bg-primary/15 text-primary` with subtle glow (matching the QuickBuy variant chips)
- Hover: `hover:border-primary/50 hover:text-foreground`
- Tap animation via `whileTap={{ scale: 0.95 }}`

## How Filtering Works

1. All products are fetched once from Shopify (`useProducts(50)`)
2. Filters are applied **client-side** by matching against `vendor`, `productType`, and product title/tags for gender
3. Gender mapping: since Shopify doesn't have a dedicated gender field, we'll create a simple mapping object based on product titles (e.g., "Uomo" / "Homme" / "Sauvage" = Men, "Donna" / "Libre" / "La Vie" = Women, "Oud Wood" = Unisex)
4. Multiple selections within a group use OR logic (e.g., Chanel OR Dior)
5. Across groups, AND logic (e.g., Men AND Chanel)

## Files to Create / Modify

### New: `src/components/ProductFilters.tsx`
- The filter bar component with all chip groups
- Accepts `filters` state and `onFiltersChange` callback
- Contains the gender mapping logic
- Renders desktop inline bar and mobile bottom-sheet trigger

### Modified: `src/pages/Products.tsx`
- Add `filters` state (`{ genders: string[], brands: string[], types: string[] }`)
- Place `ProductFilters` between the hero section and the grid

### Modified: `src/components/ProductGrid.tsx`
- Accept optional `filters` prop
- Increase product fetch count to 50 to get all products
- Apply client-side filtering before rendering
- Show "Nincs talalat" (No results) message when filters yield no products, with a "Szurok torlese" (Clear filters) button

## Technical Details

- **No new dependencies** -- uses existing Dialog, framer-motion, lucide icons
- **All text in Hungarian**
- **Animation**: `AnimatePresence` + `layout` prop on grid items for smooth reflow when filters change
- **State**: simple `useState` in Products page, passed down as props
- **Gender mapping**: hardcoded object mapping product handles to gender categories -- easily extendable as new products are added
