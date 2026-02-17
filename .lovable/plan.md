

# Header Toolbox Redesign -- Settings Menu, Login, and Improved Navigation

## Overview

Replace the current hamburger menu (mobile) and desktop nav with a unified **toolbox system**: a settings/hamburger icon in the header that opens a polished slide-out panel (Sheet) containing organized tabs for navigation, account management, and site info. The cart icon stays always visible. A login/account button is added to the header on all devices.

## Current State

- **Desktop**: Logo + 4 nav links (Kezdolap, Illatok, Rolunk, Kapcsolat) + User icon + Cart icon
- **Mobile**: Hamburger (left) opens a Sheet with the same 4 links + User icon at bottom; Cart on right
- No login functionality, no organized tabs/categories, no settings panel

## New Design

### Header Bar (all devices)

```text
[Logo: ScentBox Hungary]          [User/Login]  [Cart]  [Settings]
```

- **Logo**: stays on the left, unchanged
- **User/Login button**: visible on all devices (not just desktop). Opens a login popup (Dialog) with email + password fields, or shows account info if logged in later
- **Cart icon**: always visible, unchanged -- stays as-is with badge
- **Settings icon** (hamburger/gear): top-right, visible on ALL devices (mobile AND desktop). Opens the toolbox panel

Desktop no longer shows inline nav links -- everything goes through the toolbox panel for a clean, minimal header.

### Toolbox Panel (Sheet from right)

Opens as a right-side Sheet (matching the cart drawer style) with **4 tabs** using Radix Tabs:

**Tab 1: Termekek (Products)**
- Link to "Osszes Termek" (/termekek)
- Link to "Kedvenceink" (bestsellers section)
- Link to "Doboz Osszeallitasa" (bundle builder section)

**Tab 2: Kategoriak (Categories)**
- Gender links: Ferfi, Noi, Uniszex (navigate to /termekek with pre-set filter)
- Brand shortcuts: top 3-4 brands as quick links

**Tab 3: Informacio (Info)**
- Eredetiseg (Authenticity) -- scrolls to section
- Hogyan Mukodik (How it works) -- scrolls to section
- Szallitas es Visszakuldesi (Shipping & Returns) -- placeholder

**Tab 4: Rolunk (About Us)**
- About text/description
- Kapcsolat (Contact) -- scrolls to footer
- Social links placeholder

### Login Popup (Dialog)

- Triggered by the User icon in the header
- Simple Dialog with:
  - Email input field
  - Password input field
  - "Bejelentkezes" (Login) button
  - "Regisztracio" (Register) link text below
- For now this is UI-only (no backend auth wired yet) -- just the professional popup shell
- Can be connected to authentication later

## Responsive Behavior

- **Desktop**: Header shows Logo + Login + Cart + Settings. Toolbox opens as a wide Sheet (~400px) from the right
- **Mobile**: Same header layout but tighter spacing. Toolbox Sheet is full-width. Tabs stack content vertically
- Cart icon is ALWAYS visible on both platforms (already the case)

## Files to Create / Modify

### New: `src/components/ToolboxPanel.tsx`
- The Sheet + Tabs component
- Contains all 4 tab contents
- Accepts `onClose` callback and `onNavigate` for closing on link click
- Uses existing Sheet, Tabs, and motion components

### New: `src/components/LoginDialog.tsx`
- Dialog with email/password form
- UI-only for now (no auth backend)
- "Bejelentkezes" button + "Regisztracio" text
- Animated entrance with framer-motion

### Modified: `src/components/Header.tsx`
- Remove the inline desktop nav links
- Remove the existing mobile hamburger Sheet
- Add the Settings icon (Menu or Settings lucide icon) on the right side, visible on all devices
- Move User icon to be visible on all devices (remove `hidden md:flex`)
- Wire User icon to open LoginDialog
- Wire Settings icon to open ToolboxPanel
- Keep CartDrawer as-is

### Modified: `src/App.tsx`
- No changes needed -- routing stays the same

## Visual Design

- **Toolbox panel**: dark glassmorphic background (`bg-card/95 backdrop-blur-xl`), matching the existing cart drawer and mobile menu aesthetic
- **Tabs**: use the existing Tabs component, styled with gold active indicator matching the site's primary color
- **Tab content links**: same style as current mobile nav links (icon dot + text, hover gold)
- **Login dialog**: clean, minimal form with gold accent on the button, matching the site's premium feel
- **Settings icon**: uses `Settings` or `Menu` icon from lucide, with hover glow animation matching other header icons
- **Animations**: staggered entrance for tab items using framer-motion, same pattern as existing mobile menu

## No New Dependencies

Uses only existing components: Sheet, Dialog, Tabs, Button, Input, framer-motion, lucide icons.

