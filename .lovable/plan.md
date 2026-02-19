
# Szekciók Sorrendjének Cseréje a Főoldalon

## Mi Változik

A főoldalon (`src/pages/Index.tsx`) a "Legnépszerűbb Termékek" (FeaturedProducts) és a "Miért Minket?" (BrandIntroSection) szekciók sorrendjének felcserélése.

**Jelenlegi sorrend:**
1. Hero
2. BrandIntroSection ("Miért Minket?")
3. FeaturedProducts ("Legnépszerűbb Termékek")
4. BundleBuilder (Dekant blokk)
5. ...

**Új sorrend:**
1. Hero
2. FeaturedProducts ("Legnépszerűbb Termékek")
3. BrandIntroSection ("Miért Minket?")
4. BundleBuilder (Dekant blokk)
5. ...

## Technikai Részletek

### Módosított fájl: `src/pages/Index.tsx`

Egyetlen változás: a `<BrandIntroSection />` és `<FeaturedProducts />` sorok felcserélése a JSX-ben.
