

# Segítség Oldal -- Teljes Újratervezés

## Jelenlegi Állapot
A jelenlegi `/tamogatas` oldal egy egyszerű, 5 elemből álló FAQ lista egy kontakt kártyával. Az új verzió egy komplex, interaktív támogatási központ lesz.

## Struktúra

Az oldal a meglévő sötét luxus témát fogja használni (fekete + arany), NEM kék-lila gradienst, hogy összhangban maradjon a ScentBox brand arculatával.

### Szekciók (felülről lefelé):

1. **Hero** -- "Hogyan segíthetünk?" + keresőmező
2. **Statisztikák** -- 4 kártya (válaszidő, ügyfélszolgálat, elégedett ügyfelek, elégedettség)
3. **FAQ szekció** -- 6 kategória fülekkel + akkordeon kérdések + kereső szűrés + "Hasznos volt?" gombok
4. **Kapcsolat kártyák** -- 4 módszer (Chat, Email, Telefon, Súgó)
5. **Jegy beküldés űrlap** -- Validált form (Név, Email, Kategória, Tárgy, Üzenet, Fájl feltöltés)
6. **Tudásbázis gyorslinkek** -- 8 kártya rács
7. **Népszerű cikkek** -- 6-8 cikk badge-ekkel és megtekintési számmal
8. **"Még mindig segítség kell?"** -- CTA szekció értékeléssel

### A meglévő Footer megmarad, nem lesz duplikálva.

## Technikai Részletek

### Fájlok:

**Új fájlok:**
- `src/components/support/SupportHero.tsx` -- Hero + kereső
- `src/components/support/SupportStats.tsx` -- Statisztikai kártyák
- `src/components/support/SupportFAQ.tsx` -- Kategorizált FAQ akkordeonokkal, szűréssel, "Hasznos volt?" gombokkal
- `src/components/support/SupportContact.tsx` -- 4 kapcsolat kártya
- `src/components/support/SupportTicketForm.tsx` -- Jegy beküldés form (zod validáció, react-hook-form)
- `src/components/support/SupportKnowledgeBase.tsx` -- Tudásbázis gyorslinkek
- `src/components/support/SupportArticles.tsx` -- Népszerű cikkek
- `src/components/support/SupportCTA.tsx` -- "Még mindig segítség kell?" CTA

**Módosított fájl:**
- `src/pages/Support.tsx` -- Teljes újraírás, az új alkomponensek kompozíciója

### Technológiák:
- `framer-motion` -- Animációk (whileInView, stagger)
- `react-hook-form` + `zod` -- Űrlap validáció magyar hibaüzenetekkel
- `lucide-react` -- Ikonok (Search, Clock, Users, Star, MessageCircle, Mail, Phone, BookOpen, ThumbsUp, ThumbsDown, Upload, stb.)
- `sonner` -- Toast értesítés a form beküldés után
- Meglévő UI komponensek: Accordion, Button, Input, Textarea, Select, Tabs, Card, Badge

### Interaktív funkciók:
- **Valós idejű keresés**: A Hero keresőmezőbe gépelt szöveg szűri az FAQ kérdéseket
- **Kategória fülek**: Kattintásra csak az adott kategória kérdései jelennek meg
- **Akkordeon**: Kattintásra nyílik/záródik animációval
- **"Hasznos volt?"**: Thumbs up/down gombok toast visszajelzéssel
- **Form validáció**: Magyar nyelvű hibaüzenetek (pl. "A név megadása kötelező")
- **Vissza a tetejére gomb**: Fix pozíciójú gomb, ami görgés után jelenik meg
- **Fájl feltöltés**: Frontend-only fájl kiválasztó (képernyőképekhez)

### Design:
- A meglévő `card-luxury`, `badge-gold`, `noise-texture` stílusokat használja
- Arany/champagne hover effektek, sötét háttér
- Reszponzív: mobilon 1 oszlop, tableten 2, asztali gépen 3-4 oszlop
- `font-display` (Playfair Display) a címekhez, Manrope a szövegtörzshöz

