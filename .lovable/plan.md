

# Gyors Választás Gomb + Quick Buy Pop-up Rendszer

## Mi Valtozik

1. **ProductCard "Gyors Valasztas" gomb ujratervezese** -- professzionalis design, jobb animaciok, reszponziv megjelenes
2. **A gomb mostantol pop-up-ot nyit** a kozvetlen kosarazas helyett, igy a felhasznalo kivalaszthatja a meretet (ml), mennyiseget, es lathatja a reszleteket
3. **ProductQuickBuy pop-up luxus ujratervezese** -- framer-motion animaciok, szebb layout, tobb informacio megjelenites

---

## 1. ProductCard Gomb Ujratervezes (`src/components/ProductCard.tsx`)

### Desktop gomb:
- A "Gyors Valasztas" szoveg helyett **"Gyors Valasztas"** marad, de szebb tipografia es gold glow
- `backdrop-blur-xl` erosebb hatter, sima felcsuszo animacio
- Hover-re enyhe scale (1.02) es intenzivebb glow
- A gomb kattintasra **megallitja a Link navigaciot** (`e.preventDefault()`) es **megnyitja a QuickBuy pop-up-ot**

### Mobil gomb:
- Marad a kerek ikon gomb, de szebb gold shadow-val
- Szinten pop-up-ot nyit kozvetlen kosarazas helyett

### Uj state es callback:
- `onQuickBuy` callback prop hozzaadasa a ProductCard-hoz
- A ProductGrid-ben es Products oldalon kezeljuk a `quickBuyProduct` state-et

## 2. ProductGrid + Products Oldal Integralas

### `src/components/ProductGrid.tsx`:
- Uj `quickBuyProduct` allapot a grid-ben
- `ProductQuickBuy` rendereles a grid aljara
- `ProductCard`-nak `onQuickBuy` prop atadasa

### `src/components/ProductCard.tsx`:
- Uj prop: `onQuickBuy?: (product: ShopifyProduct) => void`
- A gomb kattintaskor meghivja `onQuickBuy(product)` a direkt `addItem` helyett

## 3. ProductQuickBuy Pop-up Luxus Ujratervezes (`src/components/ProductQuickBuy.tsx`)

### Vizualis valtozasok:
- **Nagyobb kep**: 24x24 (96px) meretu, kerekitett, enyhe arany szegely
- **Vendor + cim** professzionalisabb tipografiaval
- **Ar kiemelese** arany glow-val
- **Variant (meret) selector**: Pill-stilusu gombok, az aktiv kivalasztas arany hatterrel es finom glow-val, minden variant mellett az adott meret ara is megjelenik
- **Mennyiseg valaszto**: Szebb rounded gombok arany hover efektussal
- **Osszeg kijelzes**: A variant ar x mennyiseg = vegosszeg kijelzese a CTA gombok felett
- **"Reszletek megtekintese" link**: Kicsi link a termek reszletes oldalara (`/product/[handle]`)
- **Elerheto badge**: Ha a kivalasztott variant elerheto, zold "Keszleten" jelzo; ha nem, piros "Elfogyott"

### Animaciok (framer-motion):
- Dialog tartalom: `scale` 0.95-rol 1-re + `opacity` fade-in, spring animacio
- Variant gombok: staggered megjelenes (egyenkent)
- CTA gombok: enyhe slide-up a variant kivalasztas utan
- Ar frissulese: `AnimatePresence` szam-csere animacio meret valtas eseten

### Megjelenendo informaciok osszefoglalva:
- Termek kep (nagyobb)
- Marka (vendor)
- Termek nev
- Kivalasztott meret ara (dinamikus)
- Meret valaszto (5ml, 10ml, 15ml stb.)
- Mennyiseg valaszto (+/-)
- Vegosszeg (ar x mennyiseg)
- Elerheto allapot jelzo
- "Kosarazas" es "Vasarlas" CTA gombok
- "Reszletek" link a termek oldalra

---

## Technikai Osszefoglalo

| Fajl | Valtozas |
|------|----------|
| `src/components/ProductCard.tsx` | Uj `onQuickBuy` prop, gomb ujratervezes, pop-up megnyitas direkt kosarazas helyett |
| `src/components/ProductGrid.tsx` | `quickBuyProduct` state, `ProductQuickBuy` rendereles, `onQuickBuy` callback |
| `src/components/ProductQuickBuy.tsx` | Teljes vizualis ujratervezes: nagyobb kep, ar animaciok, vegosszeg, elerheto badge, reszletek link, framer-motion |

