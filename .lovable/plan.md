
# BrandIntroSection Kompaktálása (Főoldal)

## Fájl: `src/components/BrandIntroSection.tsx`

### Változások

**1. Szekció padding csökkentése (35. sor)**
- `py-12 md:py-16` --> `py-10 md:py-[60px]`

**2. Fejléc blokk margin csökkentése (39. sor)**
- `mb-10 md:mb-12` --> `mb-8`

**3. Fejléc cím méret (46. sor)**
- `text-2xl md:text-4xl` --> `text-2xl md:text-[32px]`

**4. Kártya rács gap és margin (56. sor)**
- `gap-5 md:gap-6 ... mb-8 md:mb-10` --> `gap-6 ... mb-8`

**5. Kártya belső padding (65. sor)**
- `p-6 md:p-7` --> `p-[30px]`

**6. Ikon méret (67. sor)**
- `w-10 h-10` konténer + `w-5 h-5` ikon --> `w-12 h-12` konténer + `w-6 h-6` ikon

**7. Kártya cím font-size (70. sor)**
- `text-base md:text-lg` --> `text-[20px]`

**8. Kártya leírás font-size (71. sor)**
- `text-xs md:text-sm` --> `text-[14px]`

### Ami NEM változik
- Animációk, szövegek tartalma, CTA gomb, badge stílus, színek
