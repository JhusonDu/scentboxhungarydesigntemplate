

# GYIK Oldal Bovitese — 27 Kerdes, 5 Kategoria

## Attekintes

A jelenlegi 5 egyszeru FAQ bejegyzes helyett 27 reszletes kerdes-valasz par kerul az oldalra, 5 kategoriaval csoportositva. Minden kategoria egy kulon szekciokent jelenik meg sajat cimmel, es azon belul az egyes kerdesek Accordion elemkent nyilnak meg.

## Struktura

A `faqSections` tomb atalakul: minden elem egy **kategoria** lesz, amely tartalmaz egy `title` (kategoria nev) es egy `questions` tombot (kerdes-valasz parok).

### Kategoriak es kerdesek:

**1. Hogyan Rendeljek? (5 kerdes)**
- Q1–Q5: Parfum kivalasztas, dekant magyarazat, meretek, rendeles leadasa, modositas/torles

**2. Szallitas (6 kerdes)**
- Q6–Q11: Szallitasi ido, modok, koltseg, kulfoldi szallitas, nyomkovetes, tavolleti kezbesites

**3. Fizetesi Modok (5 kerdes)**
- Q12–Q16: Elfogadott modok, biztonsag, utanvet, szamla, kuponkodok

**4. Visszakuldes & Garancia (6 kerdes)**
- Q17–Q22: Visszakuldes szabalyzat, illatpreferencia, serult termek, eredetiseg, garancia, ellenorzes

**5. Kapcsolat & Ugyfelszolgalat (5 kerdes)**
- Q23–Q27: Kapcsolatfelvetel, valaszido, elo chat, uzletek, hirlevel

## Technikai Valtozasok

### Modositott fajl: `src/pages/Support.tsx`

1. **Adatstruktura:** A `faqSections` tomb atalakul kategoriak + kerdesek formatura:
```
const faqSections = [
  {
    category: "Hogyan Rendeljek?",
    icon: ShoppingBag,
    questions: [
      { question: "Hogyan valasszam ki...", answer: "..." },
      ...
    ]
  },
  ...
]
```

2. **Megjelenites:** Minden kategoria kulon blokkban jelenik meg egy cimmel es ikonnal, alatta az Accordion elemek a kerdesekkel. A jelenlegi egyretegu Accordion struktura ketreteguve valik (kategoria cim + kerdesek).

3. **Uj importok:** Lucide ikonok a kategoriakhoz (ShoppingBag, Truck, CreditCard, RotateCcw, Headphones).

4. **Valaszok tartalma:** Reszletes, informativ valaszok minden kerdesre, a ScentBox branddel osszhangban (dekant magyarazat, GLS szallitas, 14 napos elallas, stb).

A Hero szekció, a Contact Card szekció es a Footer valtozatlan marad.
