
# Redesign FeaturedProducts Section

## Overview
Completely rewrite `FeaturedProducts.tsx` to be a product-first, minimal-text showcase that loads **real Shopify products** instead of hardcoded data. Add a pop-up filter for instant product search, quick add-to-cart via the existing cart store, and a "Buy Now" button that adds to cart and opens checkout immediately.

## Key Changes

### 1. Replace hardcoded data with real Shopify products
- Use the existing `useProducts()` hook to fetch products from Shopify
- Show loading skeletons while data loads
- Display "Nincs termek" empty state if no products exist

### 2. Minimal header text
- Remove the large heading and subtitle paragraph
- Keep only a small "KEDVENCEINK" badge and a compact one-line heading
- "Osszes Megtekintese" link stays, but everything is tighter

### 3. Pop-up filter (works on both mobile and desktop)
- A filter/search button at the top of the section that opens a `Popover` (or small `Dialog` on mobile)
- Contains a text input for instant search across all products (uses the `query` parameter of `useProducts`)
- Filter results update the grid in real-time via debounced search
- Filter chips for vendor/brand if available from the product data

### 4. Product card redesign -- product-emphasized
- Larger image area, smaller text footprint
- Brand name (vendor) as tiny label
- Product title -- one line, truncated
- Price prominent
- Two quick-action buttons on hover (desktop) / always visible (mobile):
  - **"+ Kosar"** -- adds the first available variant to the Shopify cart via `useCartStore.addItem()` with toast confirmation
  - **"Vasarlas"** -- adds to cart, then immediately opens the Shopify checkout URL in a new tab (uses `getCheckoutUrl()` after addItem completes)

### 5. Mobile-first layout
- `grid-cols-2` on mobile with compact `gap-3`, cards with `p-2`
- Action buttons always visible on mobile (no hover-dependent UI)
- Smaller image aspect ratio on mobile (`aspect-[3/4]`) for better scroll density
- Filter button is a sticky floating pill at the top of the section on mobile

## Files to Modify

### `src/components/FeaturedProducts.tsx` -- full rewrite
- Import `useProducts` from hooks, `useCartStore` from stores
- Import `Popover`/`PopoverTrigger`/`PopoverContent` from UI for the filter
- State: `searchQuery`, `debouncedQuery` (with 300ms debounce)
- Fetch: `useProducts(12, debouncedQuery || undefined)`
- Grid: responsive `grid-cols-2 md:grid-cols-3 lg:grid-cols-4`
- Each card renders real Shopify product data with image, vendor, title, price
- Quick actions: "+ Kosar" calls `addItem()` with first variant, "Vasarlas" calls `addItem()` then opens checkout
- Framer Motion kept for stagger entry and hover lift
- Filter popover: text input + optional vendor chips extracted from loaded products

### `src/pages/Index.tsx` -- no changes needed
Already imports and renders `<FeaturedProducts />`

## Technical Details

- Real Shopify cart integration via existing `useCartStore` (Zustand) -- same flow as `ProductCard.tsx`
- "Buy Now" flow: `addItem()` -> wait for cart creation -> `getCheckoutUrl()` -> `window.open(url, '_blank')`
- Filter uses the Shopify Storefront API `query` parameter (e.g. `title:sauvage` or free text search)
- Debounced search prevents excessive API calls
- Loading state shows skeleton cards (4-8 placeholders matching grid)
- No new dependencies needed -- uses existing `Popover`, `framer-motion`, `sonner`, `useProducts`, `useCartStore`
