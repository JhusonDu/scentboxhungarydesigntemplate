
# Asztali Navigáció Teljes Újratervezés -- Pop-up Menu + Termékek Dropdown

## Mi Változik

Két fő változtatás az asztali (desktop) navigációban:

1. **ToolboxPanel (hamburger menü)**: A jobbról becsúszó Sheet panel helyett egy középre pozicionált, lebegő pop-up modal, amely mögött látható marad a weboldal -- hasonlóan a mobil verzióhoz, de asztali méretezéssel
2. **"Termékek" nav link**: Hover-re animáltan lecsúszó dropdown menü közvetlenül a fejléc alá, professzionális mega-menu stílusban

---

## 1. Termékek Dropdown a Header-ben (`src/components/Header.tsx`)

A jelenlegi egyszerű "Termékek" link helyett egy hover-aktivált dropdown:

- **Trigger**: "Termékek" szöveg + ChevronDown ikon, hover-re a dropdown megjelenik
- **Panel**: A fejléc alá pozicionálva, `absolute` elhelyezés
- **Tartalom 2 oszlopban**:
  - **Bal oszlop "Kategóriák"**: Férfi, Női, Uniszex linkek arany hover-rel
  - **Jobb oszlop "Népszerű"**: Kedvenceink, Doboz Összeállítása, Összes Termék
- **Stílus**: Sötét háttér (`bg-[#0c0c0c]`), arany szegély (`border-primary/20`), `rounded-xl`, `backdrop-blur-xl`, finom arany box-shadow
- **Animáció**: Framer Motion `opacity + y` (fentről lefelé csúszik, 0.2s spring)
- **Bezárás**: Mouse leave-re eltűnik

## 2. ToolboxPanel Pop-up Átalakítás (`src/components/ToolboxPanel.tsx`)

A Sheet/SheetContent teljes cseréje saját pop-up modalra:

- **Layout**: `fixed inset-0` konténer, flexbox center -- a weboldal átlátszik a háttérben
- **Backdrop**: `bg-black/60 backdrop-blur-sm` -- enyhébb blur mint mobilon, hogy a háttér látszódjon
- **Panel méret**: `max-w-[480px] w-[85vw]`, `max-h-[80vh]` -- asztali méretezés
- **Panel stílus**:
  - `bg-[#0c0c0c]` háttér, `border border-primary/20`, `rounded-2xl`
  - Arany glow shadow: `0 0 80px rgba(212,175,55,0.06)`
- **Animáció**: Scale-up + fade-in (0.88-ról 1-re, spring), staggered menüpont megjelenés
- **Fejléc**: Logo + "ScentBox Hungary" + elegáns X bezáró gomb arany hover-rel
- **Tab rendszer megtartása** (Termékek, Kategóriák, Infó, Rólunk) de szebb pill-stílusú tabokkal:
  - Arany aktív állapot (`bg-primary/15 text-primary border-primary/30`)
  - Hover effekt a nem aktív tabokon
- **Menüpont stílus**:
  - Nagyobb padding, arany hover szín + háttér (`bg-primary/5`)
  - Arany pont indikátor hover-re
  - ChevronRight ikon arany hover animációval
- **Escape + backdrop kattintás bezárás**
- **Body scroll lock**

## 3. Header Módosítások (`src/components/Header.tsx`)

- A "Termékek" link cseréje hover-dropdown triggerre (csak desktop)
- "Rólunk" és "Kapcsolat" linkek maradnak egyszerű linkeknek
- A hamburger ikon gomb megmarad -- ToolboxPanel-t nyitja desktopon

---

## Technikai Összefoglaló

| Fájl | Változás |
|------|----------|
| `src/components/Header.tsx` | "Termékek" dropdown hozzáadása hover-re, framer-motion animáció |
| `src/components/ToolboxPanel.tsx` | Sheet teljes cseréje pop-up modalra, saját backdrop, scale animáció |

A dropdown a Header-ben megoldja a gyors navigációt a termék kategóriákhoz, míg a ToolboxPanel pop-up az összes menüpontot tartalmazza professzionális elrendezésben.
