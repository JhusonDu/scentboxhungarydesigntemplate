
# Bundle Builder: Convert to "Coming Soon" Inquiry System

## Overview
Transform the Bundle Builder from a cart-adding purchase flow into a **"Coming Soon" inquiry form** that collects customer interest data. Users go through the same selection steps (size + perfumes) but instead of adding to cart, they **submit their preferences** as an inquiry. This data is stored in the database so you can gauge demand before launching.

---

## What Changes

### 1. "Coming Soon" Banner
Add a prominent banner at the top of the Bundle Builder section (before the stepper) that clearly communicates:
- **Badge**: "Hamarosan Erkezik" (Coming Soon) instead of "Egyedi Osszeallitas"
- **Subtitle update**: Explain that users can submit their preferences now and will receive a discount when the service launches
- A small highlighted info box: "Jelezd az erdeklodesedet es **2000 Ft kedvezmenyt kapsz** az indulaskor!"

### 2. Size Step Update
Expand the size options to include larger bottle sizes alongside decants:

| Option | Label | Description |
|---|---|---|
| 5ml | 5ml dekant | Tokeletes kiprobalashoz |
| 10ml | 10ml dekant | Idealis mindennapi hasznalatra |
| 3x 10ml | 3x 10ml csomag | 3 db 10ml-es dekant kedvezmenyesen (-2000 Ft) |
| 3x 50ml | 3x 50ml csomag | 3 db 50ml-es uveg kedvezmenyesen (-2000 Ft) |

The bundle options (3x 10ml, 3x 50ml) will show the discount badge directly on the card.

### 3. Perfume Step -- No Changes Needed
The perfume selection grid remains the same -- users pick which perfumes they are interested in. The max selection limits will be adjusted:
- 5ml: 1-5 perfumes
- 10ml: 1-3 perfumes  
- 3x 10ml: exactly 3 perfumes
- 3x 50ml: exactly 3 perfumes

### 4. Review Step Redesign
Replace the current review with an improved overview:
- Show selected size and all chosen perfumes with images, names, vendors
- Instead of showing real prices, show **estimated/indicative pricing** with a note that final prices will be confirmed at launch
- For bundle options, show the discount line item (e.g., "Csomag kedvezmeny: -2 000 Ft")
- Add **email and name input fields** for the inquiry submission
- Replace the "Kosarba" button with **"Erdeklodes Beküldese"** (Submit Interest)

### 5. Replace Cart Logic with Database Submission
- Remove all `useCartStore` / `addItem` calls from `BundleBuilder.tsx`
- Create a new database table `bundle_inquiries` to store submissions
- On submit, insert a row with: name, email, selected size, selected product IDs/titles, timestamp
- Step 4 becomes a **thank-you confirmation** instead of cart success

### 6. Success Step Update
Replace cart-related messaging with:
- Checkmark animation (keep existing)
- Title: "Koszonjuk az erdeklodesedet!"
- Text: "Amint elerheto lesz ez a szolgaltatas, ertesitunk es automatikusan megkapod a 2000 Ft kedvezmenyt."
- Remove "Tovabb a fizeteshez" button
- Keep "Folytasd a bongeszes" button

### 7. Step Progress Labels
Update step 4 label from "Kosarba" to "Elkuldés"

---

## Database

Create a new `bundle_inquiries` table:

```
bundle_inquiries
- id (uuid, primary key)
- name (text, not null)
- email (text, not null)
- selected_size (text, not null) -- e.g. "5ml", "10ml", "3x10ml", "3x50ml"
- selected_products (jsonb, not null) -- array of {id, title, vendor}
- created_at (timestamptz, default now())
```

RLS: Allow anonymous inserts (no auth required), no select/update/delete for anon users. This is a public-facing inquiry form.

---

## Files to Modify

| File | Changes |
|---|---|
| `src/components/BundleBuilder.tsx` | Remove cart store imports, replace `handleAddToCart` with `handleSubmitInquiry` that inserts into database, add name/email state, pass to ReviewStep |
| `src/components/bundle-builder/StepProgress.tsx` | Change step 4 label from "Kosarba" to "Elkuldes" |
| `src/components/bundle-builder/SizeStep.tsx` | Add 2 new bundle options (3x10ml, 3x50ml) with discount badges, update to 2x2 grid on desktop |
| `src/components/bundle-builder/PerfumeStep.tsx` | Update MAX_SELECTIONS to include new bundle sizes (3x10ml = exactly 3, 3x50ml = exactly 3) |
| `src/components/bundle-builder/ReviewStep.tsx` | Add name + email input fields, show discount line for bundle options, change button text to "Erdeklodes Bekuldese", remove cart-related UI |
| `src/components/bundle-builder/SuccessStep.tsx` | Replace cart/checkout messaging with thank-you + discount promise, remove "Tovabb a fizeteshez" button |

### No changes to:
- `src/pages/Index.tsx` -- section order stays the same
- `src/stores/cartStore.ts` -- untouched, still used by other parts of the app
- `src/components/CartDrawer.tsx` -- untouched

---

## New Database Migration
One migration to create the `bundle_inquiries` table with an anon-insert RLS policy.
