
# Featured Products Showcase Section

## Overview
Create a new `FeaturedProducts` component that renders a visually stunning, static product showcase grid right after the Hero section on the homepage. This uses hardcoded sample data with local product images, Framer Motion animations, wishlist toggle, quick-view modal, and add-to-cart toast notifications.

## Files to Create / Modify

### 1. New file: `src/components/FeaturedProducts.tsx`
The main section component containing:

**Section layout:**
- `py-16 md:py-24` padding, gradient background from `bg-background` to a slightly lighter dark tone
- Max-width container with `max-w-7xl mx-auto px-6`

**Header area:**
- Flex row with text left, "Osszes Megtekintese" link right-aligned on desktop
- Gold badge "LEGNEPSZERUBB", heading "Kedvenceink" in Playfair Display, subtitle in muted text

**Product grid:**
- `grid-cols-2 md:grid-cols-3 lg:grid-cols-4` responsive grid
- 8 hardcoded sample products with data matching the specification (Dior Sauvage, Valentino Donna, YSL Libre, Chanel Bleu, etc.)
- Maps available local images from `src/assets/products/` to the sample products; products without local images (Prada Paradoxe, Versace Eros, Gucci Bloom) will use a fallback placeholder

**Each product card (inline within the component):**
- `bg-card rounded-xl overflow-hidden` with Framer Motion `whileHover={{ scale: 1.03, y: -5 }}`
- Staggered fade-in using `whileInView` with `viewport={{ once: true }}`
- Image section: aspect-square, hover scale on image, discount badge top-left, wishlist heart top-right (toggleable with local state), hover overlay with "Gyors Megtekintes" button
- Content section: brand name in gold, title, description (hidden on mobile), price with optional strikethrough, "Kosarba" button
- Quick view button opens a Dialog modal showing product details

**Interactions:**
- Wishlist heart toggles filled/outlined with a scale animation
- Add to cart triggers a `sonner` toast
- Quick view opens a `Dialog` (from existing ui/dialog)
- All transitions smooth with `duration-300`

**Mobile optimizations:**
- Smaller padding (`p-3`), font sizes (`text-sm`, `text-xl`), button sizes
- Description hidden on mobile
- Price and button stack on very small screens

**Accessibility:**
- Alt text on all images, aria-labels on icon buttons
- `focus-visible:ring-2 ring-primary` on interactive elements

### 2. Modify: `src/pages/Index.tsx`
- Import `FeaturedProducts`
- Place `<FeaturedProducts />` between `<Hero />` and `<BestsellersSection />`

## Technical Details

- Uses existing design tokens: `primary` (gold), `card`, `background`, `muted-foreground`, `badge-gold` class
- Uses existing dependencies: `framer-motion`, `lucide-react` (Heart, ShoppingBag, Eye icons), `sonner` toast, `@radix-ui/react-dialog`
- Local product images mapped where available; ShoppingBag icon placeholder for missing ones
- No new dependencies required
- No backend/database changes needed -- purely static/presentational component
