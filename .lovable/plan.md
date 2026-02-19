
# Mobil Szűrő Rendszer -- Valós Idejű Termékszám Kijelzéssel

## Mi Változik

A mobil szűrő rendszer továbbfejlesztése, hogy minden szűrőopció mellett megjelenjen a hozzá tartozó elérhető termékek száma. Ha például "Férfi" van kiválasztva, akkor a "Dior" márka mellett megjelenik, hogy abból hány darab férfi termék van. A szűrés progresszíven szűkíti a kínálatot, és minden lépésben valós időben frissülnek a számok.

## Hogyan Működik

1. A felhasználó megnyitja a szűrő panelt mobilon
2. Minden szűrőopció (pl. "Férfi", "Dior", "EDP") mellett megjelenik egy szám badge, amely mutatja, hány termék felel meg annak az opciónak a jelenleg aktív szűrők kontextusában
3. Ha "Férfi" aktív, a "Dior" mellett csak a férfi Dior termékek száma jelenik meg
4. A "Szűrő" floating gomb és az "Alkalmaz" gomb is mutatja a szűrt találatok összszámát (pl. "Alkalmaz (8)")
5. Az "Alkalmaz" gomb számmal frissül animáltan

## Vizuális Megvalósítás

- A FilterChip komponens kap egy opcionális `count` propot, amely egy kis badge-ként jelenik meg a chip-en belül
- A szám gold/primary színnel jelenik meg, halványan, ha 0
- Ha egy szűrő opció 0 találatot eredményezne, az opció elhalványodik (de nem tiltódik le, hogy a felhasználó lathassa)
- Az "Alkalmaz" gomb szövege dinamikusan frissül: "Alkalmaz (X termék)" formátumra
- A floating "Szűrő" gomb is mutatja az aktuális szűrt termékszámot

## Technikai Részletek

### Módosított fájl: `src/components/ProductFilters.tsx`

1. **FilterChip komponens bovitese**: Uj `count?: number` prop, amely a chip jobb oldalán jelenik meg kis badge-ként

2. **FilterGroup komponens bovitese**: Uj `counts?: Record<string, number>` prop -- minden opcióhoz tartozó termékszám

3. **Szamlalo logika a fo komponensben**: Egy `useMemo`-ban szamitja ki az egyes szuro opciok termekszamat:
   - Vegigmegy minden szuro csoporton (gender, brand, type)
   - Minden opciohoz letrehoz egy "mi lenne ha" szurot: a jelenlegi aktiv szurok + az adott opcio
   - Az `applyFilters` fuggvennyel szamolja ki a talalatok szamat
   - Ez biztositja, hogy a szamok mindig a jelenlegi kontextust tukrozik

4. **Mobil sheet modositasok**:
   - Az "Alkalmaz" gomb szovege: `Alkalmaz (${filteredCount} termek)` -- dinamikus szam
   - A floating gomb: a szurt termekszam megjelenese az aktiv szurok szama mellett
   - SheetHeader-ben a "Szurok" cim melle kerul egy osszes szurt termek szam

5. **Uj prop**: `ProductFilters` kap egy `totalFilteredCount?: number` propot, amelyet a Products oldalrol kap meg

### Módosított fájl: `src/pages/Products.tsx`

- Kiszamolja az `applyFilters` eredmenyenek hosszat es atadja a `ProductFilters`-nek `totalFilteredCount` propkent
- A mobil nezet fejleceben is megjelenik a szurt termekszam

### Animaciok

- A szamok frissulesekor enyhe scale pulse animacio (framer-motion `AnimatePresence` + `layoutId`)
- A 0 talalatos opciok `opacity-40`-nel halvanyodnak el
- Az "Alkalmaz" gomb szama `key`-vel animalt szamcsere

### FilterChip Szam Megjelenes

A chip-en belul a szoveg utan egy kis kor jelenik meg a szammal:
- Aktiv chip: arany hatter szam
- Inaktiv chip: halvany szurke szam
- 0 talalat: az egesz chip halvanysag (`opacity-40`) de kattinthato marad
