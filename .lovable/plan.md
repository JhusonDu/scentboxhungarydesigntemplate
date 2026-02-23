

# Szuro Rendszer Egysegesitese a Fooldali Termekeknel

## Attekintes

A fooldali "Legnepszerubb Termekek" szekcionak a jelenlegi egyszeru szuro dialogusat (kereso mezo + marka chipek) lecserelni a Termekek oldal (`/termekek`) professzionalis szurorendszerere. Ez tartalmazza a Nem, Marka, Koncentracio es Ar szuroket, strukturalt chip-ekkel es csuszkaval.

## Mi Valtozik

**Jelenlegi allapot:** A FeaturedProducts-ben egy egyszeru Dialog van kereso mezovel es marka gombokkal, ami a Shopify API-t hivja keresessel.

**Uj allapot:** A meglevo `ProductFilters` komponens ujrahasznalasa, amely a kliens oldalon szur. A szekcioba tobb termeket toltunk be (pl. 50), es a `ProductFilters` + `applyFilters` segitsegevel szurjuk oket helyben, majd az elso 6-ot jelenaitjuk meg.

## Technikai Reszletek

### Modositott fajl: `src/components/FeaturedProducts.tsx`

1. **Torolni:** A teljes `FilterCatalog` komponens (119-222. sor) -- mar nem szukseges
2. **Torolni:** A `searchQuery`, `debouncedQuery`, `activeVendor` state-ek es a debounce useEffect -- a szures helyben tortenik
3. **Hozzaadni:** `ProductFiltersState` import es a `ProductFilters` komponens importja
4. **Hozzaadni:** `applyFilters` import a szurt termekek szamitasahoz
5. **Modositani:** A `useProducts` hivast fix 50-re allitani (kereses nelkul), hogy legyen eleg termek a szureshez
6. **Hozzaadni:** `filters` state (`ProductFiltersState` tipussal)
7. **Hozzaadni:** `useMemo` a szurt termekek szamitasahoz: `applyFilters(products, filters).slice(0, 6)`
8. **Csere:** A Szuro gomb es a FilterCatalog helyett a `ProductFilters` komponens kerul be:
   - Mobilon: A `ProductFilters` automatikusan a ragados also gombot es a Sheet-et hasznalja (meglevo viselkedes)
   - Desktopon: A Szuro gomb kattintasra egy Dialog-ban jelenik meg a `ProductFilters` tartalma (mivel a fooldali szekcionak nincs oldalsavja)
9. **Modositani:** A grid a szurt termekeket jelenitse meg (max 6 db)
10. **Aktiv szuro jelzo:** Megmarad, de a `ProductFiltersState` alapjan szamolja az aktiv szurok szamat

### Mobil elrendezés

- A `ProductFilters` komponens mobilon mar kezeli a ragados also "Szuro" gombot es az also Sheet-et -- ez marad valtozatlanul
- Ugyanaz a luxus megjelenes, mint a Termekek oldalon

### Desktop elrendezés

- A jelenlegi "Szuro" gombra kattintva egy Dialog nyilik meg a `ProductFilters` tartalmaval
- Alternativakent: a "Szuro" gomb helyett kozvetlenul egy kis horizontal filter bar jelenik meg a szekcion belul a chipekkel

### Osszefoglalo

| Elem | Valtozas |
|------|----------|
| FilterCatalog komponens | Torolve, lecserelve ProductFilters-re |
| searchQuery/debouncedQuery/activeVendor state | Torolve, lecserelve filters (ProductFiltersState) state-re |
| useProducts hivas | 6 + query helyett 50 (fix), kliens oldali szures |
| Szuro gomb (mobil) | ProductFilters kezeli (ragados also gomb + Sheet) |
| Szuro gomb (desktop) | Dialog-ban jelenik meg a ProductFilters |
| Szurt termek megjelenites | applyFilters + slice(0, 6) |

