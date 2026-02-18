
# Bemutatkozó Szekció a Főoldalra -- Hero és Termékek Között

## Cél

Egy kompakt, professzionális "Ki vagyunk?" blokk közvetlenül a Hero szekció alatt és a FeaturedProducts felett, amely azonnal bemutatkozik az új látogatóknak: 100% eredeti termékek, minősített magyar forgalmazó, kedvező árak, vásárlóközpontúság.

## Design

- **Háttér**: `noise-texture` osztály (sötét, finom textúra -- ugyanaz, mint a Rólunk oldalon)
- **Elrendezés**: Középre igazított szöveges blokk + alatta 3 kompakt kiemelő kártya (ikon + cím + 1 mondat)
- **Badge**: `badge-gold` -- "MIÉRT MINKET?"
- **Cím**: Playfair Display (`font-display`), pl. "Prémium Parfümök, Tisztességes Áron"
- **Alcím**: 2-3 mondat a márka lényegéről (eredeti termékek, legjobb árak, vásárló az első)
- **3 kiemelő kártya** (ikonnal):
  1. **100% Eredeti** (`ShieldCheck`) -- Minősített magyarországi hivatalos forgalmazótól
  2. **Legjobb Árak** (`Tag`) -- 20-40%-kal kedvezőbb, mert nem dolgozunk magas árrésekkel
  3. **Vásárló az Első** (`Heart`) -- Kiváló ügyfélszolgálat, megbízható szállítás
- **"Rólunk" link gomb**: Outline stílusú gomb, ami a `/rolunk` oldalra visz
- **Animáció**: `framer-motion` `whileInView` fade-up, staggered kártyák

## Technikai Részletek

### Új fájl:
- **`src/components/BrandIntroSection.tsx`** -- Önálló komponens a bemutatkozó szekcióhoz

### Módosított fájl:
- **`src/pages/Index.tsx`** -- Import + a komponens beillesztése a `<Hero />` és `<FeaturedProducts />` közé

### Felhasznált minták:
- `badge-gold`, `noise-texture` -- meglévő CSS utility-k
- `framer-motion` -- `whileInView` animáció
- `lucide-react` -- `ShieldCheck`, `Tag`, `Heart` ikonok
- `Link` (`react-router-dom`) -- "/rolunk" oldalra navigáció
