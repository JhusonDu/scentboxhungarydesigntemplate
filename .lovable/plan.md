

# Professional Luxury Footer Redesign with Contact Modal

## Overview

A teljes Footer komponens ujraepitese a megadott reszletes specifikacio alapjan, kiegeszitve egy uj ContactModal komponenssel, amely a "Kapcsolatfelvétel" gombra kattintva jelenik meg.

## Modositott es Uj Fajlok

### 1. Uj fajl: `src/components/ContactModal.tsx`

Egy onallo modal komponens a kapcsolatfelvételi urlappal:

- **Radix Dialog** alapu (a meglevo `Dialog` UI komponenst hasznalja)
- **Urlap mezok:** Nev (kotelezo), Email (kotelezo), Telefonszam (opcionalis), Targy (Select dropdown 6 opcio), Uzenet (kotelezo textarea)
- **Zod validacio** a kliens oldalon (nev max 100, email formatum, uzenet max 1000 karakter)
- **react-hook-form** integraciohoz a meglevo Form komponensek
- **Targy opciok:** Altalanos kerdes, Termek informacio, Rendeles statusz, Szallitas, Eredetiseg ellenorzes, Egyeb
- **Submit:** `console.log` a form adatokkal + sikeres toast uzenet ("Koszonjuk! Hamarosan valaszolunk.")
- **Alternativ kapcsolat szekció** az urlap alatt: mailto link (info@scentbox.hu) es valaszido ikon
- **Stilusok:** Luxury tema — sotet hatterek, arany akcentusok, #141414 modal hatter, arany focus border, premium tipografia
- **Animaciok:** Framer Motion slide-up + fade-in a modal megnyitasakor

### 2. Modositott fajl: `src/components/Footer.tsx`

Teljes ujraepites a 4-oszlopos layout-tal:

**Pre-Footer CTA Banner:**
- Gradiens hatter (135deg, #141414 -> #0a0a0a)
- Nagyobb meretu cimsor (Playfair Display, 32px desktop / 24px mobil)
- "Kapcsolatfelvétel" gomb → ContactModal megnyitasa (nem navigacio)
- Hover: felfele mozgas effekt

**Main Footer (4 oszlop):**
- **Oszlop 1 - Brand:** Logo, uj tagline ("Premium parfumok, autentikus elmenyek..."), szocialis ikonok kerek arany haetru gombokban (Instagram, Facebook, TikTok)
- **Oszlop 2 - Termekek:** Fooldal, Kollekcik, Ferfi Parfumok, Noi Parfumok, Uj Erkezesek, Akciok
- **Oszlop 3 - Segitseg:** GYIK, Kapcsolat, Szallitas & Visszakuldes, Merettabla, Eredetiseg Ellenorzese
- **Oszlop 4 - Ceg:** Rolunk, Adatvedelmi Iranyelevek, Felhasznalasi Feltetelek, Cookie Szabalyzat + email es valaszido info

**Bottom Bar:**
- Copyright (2024)
- Fizetesi modok ikonjai (Visa, Mastercard, PayPal, ApplePay SVG ikonok, grayscale + opacity filter)

**Responsive:**
- Desktop: 4 oszlop grid
- Tablet: 2 oszlop
- Mobil: 1 oszlop, kozepre igazitva

### 3. Modositott fajl: `src/pages/Support.tsx`

A Support oldal "Nem talaltad a valaszt?" szekcio gombja is megnyitja a ContactModal-t (opcionalis, konzisztencia erdekeben).

## Technikai Megjegyzesek

- A meglevo Radix Dialog, Form, Input, Textarea, Select, Label UI komponenseket hasznalja — nincs uj fuggoseg
- Zod schema a form validaciohoz (mar telepitve)
- react-hook-form (mar telepitve)
- Framer Motion animaciok (mar telepitve)
- A form jelenleg `console.log`-gal menti az adatokat — kesobb backend integracio lehetseges
- Sonner toast a sikeres kuldeshez (mar telepitve)

