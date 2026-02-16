
# ScentBox Hungary -- Produkcios Fejlesztesi Terv

## Jelenlegi Allapot Osszefoglalasa

A projekt mar rendelkezik egy mukodo alappal: React + Vite + Tailwind CSS + Shopify Storefront API integracio. A kovetkezo komponensek mar keszen allnak:
- Header navigacioval es kosar funkcionalitassal
- Hero szekció ("The Art of Authenticity")
- Kedvenceink (Bestsellers) szekció Shopify termekekkel
- Doboz Osszeallitas (Bundle Builder) 4 lepessel
- Eredetiseg es Bizalom szekció
- Hogyan Mukodik szekció
- Hirlevel szekció
- Footer
- Termekoldal (/termekek) es Termek Reszletek oldal (/product/:handle)
- Kosar rendszer Zustand + Shopify Cart API

## A PRD es a Jelenlegi Allapot Kozotti Kulonbsegek

A feltoltott PRD reszletes design specifikaciot tartalmaz, amely tobb ponton elter a jelenlegi implementaciotol. Az alabbi terv ezeket az eltoreseket rendezi prioritas szerint.

---

## 1. FAZIS: Design Finomhangolas es Brand Konzisztencia
**Prioritas: Magas | Becslés: 3-5 uzenet**

### 1.1 Szinpaletta Igazitas
A PRD mas hatter szineket hasznal, mint a jelenlegi tema:
- PRD: `#0a0a0a` (hatter), `#1a1a1a` (kozepes), `#141414` (kartya)
- Jelenlegi: `#0F0F14` (hatter), `#1A1C22` (kartya)

**Tennivalo:** Az `src/index.css` CSS valtozoinak frissitese a PRD szinpalettajahoz, megtartva a jelenlegi arany akcentusokat (#d4af37), amelyek mar egyeznek.

### 1.2 Border-Radius Egesyitese
- PRD: 2-4px gombok, 4-8px kartyak (minimalis lekerekites)
- Jelenlegi: 1rem (16px) globalis radius, rounded-2xl kartyak

**Tennivalo:** A `--radius` valtozo es a komponensek border-radius ertekeinek csokkentese a PRD-nek megfelelo ertekekre.

### 1.3 Tipografia Finomitas
- A PRD Cormorant Garamond-ot javasol (a jelenlegi Playfair Display helyett)
- A PRD Inter-t javasol body fontnak (a jelenlegi Manrope helyett)

**Ajanlás:** A Playfair Display es Manrope paros mar luxus erzetet ad es jol mukodik. Ha ragaszkodunk a PRD-hez, cserelhetjuk, de ez nem kritikus.

---

## 2. FAZIS: Hero Szekció Fejlesztese
**Prioritas: Magas | Becslés: 2-3 uzenet**

### 2.1 Parallax Hatter Effekt
A PRD parallax scroll effektet ir elo a hero hatterkepehez (0.5x sebesseggel).

### 2.2 Scroll Indikator
Animalt lefele nyil vagy eger ikon a hero aljan, arany szinben, pulzalo animacioval, kattintasra smooth scroll a kovetkezo szekciohoz.

### 2.3 Scroll Fade-Out
A hero tartalom elhalvanyul 20%-ra amikor a felhasznalo 50%-ot gorgetett.

---

## 3. FAZIS: Termek Kartya es Kollekcio Fejlesztes
**Prioritas: Magas | Becslés: 3-4 uzenet**

### 3.1 Termek Kartya Ujratervezes
A PRD reszletesebb kartya dizajnt ir le:
- Brand nev kulon sorban (uppercase, halvany, letter-spacing)
- Termek nev Cormorant/Playfair Display betutiupussal
- Rovid leiras megjelenitese (max 2 sor)
- Ar arany szinnel, "HUF 3490.00" formatumban
- Reszletfizetesi opcio szoveg ("vagy 4x 872 Ft reszletben")
- "UJ" / "NEPSZERU" / "LIMITALT" badge-ek a kep bal felso sarkaban

### 3.2 Quick Add Gomb Finomitas
A PRD "+ Quick Add" szoveget es #0a0a0a (fekete) szoveget ir elo arany hatterre, 2px border-radius-szal.

### 3.3 Carousel Navigacio
Lapozas pontok (pagination dots) hozzaadasa a mobil nezethez, arany szinu aktiv pont jelolessel.

---

## 4. FAZIS: Doboz Osszeallitas (Bundle Builder) Bovites
**Prioritas: Kozepes | Becslés: 2-3 uzenet**

### 4.1 Meret Kartyak Fejlesztese
A PRD reszletesebb kartya dizajnt ir le:
- Checkmark lista az elonyokkel (arany pipak)
- "NEPSZERU" badge a kozepso/ajanlott kartyan
- Kiemelt kartya kissé nagyobb meretu (scale 1.05)
- Aktiv allapot jelzes ("KIVALASZTVA" badge)

### 4.2 Hangulat Valaszto Bovites
A jelenlegi grid layout megfelelo, de a PRD reszletesebb hover allapotokat es animaciokat ir elo.

---

## 5. FAZIS: Termekoldal Fejlesztes
**Prioritas: Magas | Becslés: 3-4 uzenet**

### 5.1 Ertekelesek Megjelenitese
- 5 arany csillag + "(127 velemenyek)" szoveg
- Jelenleg nincs ilyen funkcionalitas

### 5.2 Reszletfizetesi Opcio
- "vagy 4 x 1.247 Ft kamatmentes reszletben" szoveg az ar alatt

### 5.3 Termek Tabok Hozzaadasa
A PRD 4 tabot ir elo:
- "Leiras" -- teljes termekleiras
- "Jegyek" -- illat piramis reszletes bontasban
- "Hasznalat" -- alkalmazasi javaslatok
- "Szallitas" -- szallitasi informaciok, visszakuldes

### 5.4 "Kedvencekhez Ad" Gomb
Masodlagos CTA gomb sziv ikonnal a "Kosarba" gomb alatt.

---

## 6. FAZIS: Footer Bovites
**Prioritas: Kozepes | Becslés: 1-2 uzenet**

### 6.1 Social Media Ikonok
Instagram, Facebook, TikTok, Email ikonok hozzaadasa arany szinnel es hover animaciokkal.

### 6.2 Hirlevel Feliratkozas
A footer negyedik oszlopaként hirlevel email input mezo es feliratkozas gomb.

### 6.3 Fizetesi Modok Ikonok
Visa, Mastercard, PayPal, Apple Pay ikonok a copyright sor mellett.

### 6.4 Bovitett Link Struktura
Tobb link hozzaadasa: Ferfi Parfumok, Noi Parfumok, Uj Erkezesek, GYIK, Szallitas es Visszakuldes, Merettabla.

---

## 7. FAZIS: Kereso Funkcio es Navigacio
**Prioritas: Kozepes | Becslés: 2-3 uzenet**

### 7.1 Kereso Funkcionalitas
A header kereso ikonjanak megvalositasa -- jelenleg csak vizualis elem, nem funkcionalis. Kereso modal vagy overlay implementalasa Shopify kereso API-val.

### 7.2 Navigacios Menupont Bovites
"Rolunk" es "Kapcsolat" oldalak letrehozasa es navigaciohoz adasa.

---

## 8. FAZIS: Teljesitmeny es Produkcio
**Prioritas: Magas | Becslés: 2-3 uzenet**

### 8.1 Kep Optimalizalas
- Lazy loading minden termekképhez
- Skeleton loader allapotok finomitasa
- WebP formatum tamogatas

### 8.2 SEO Meta Adatok
- Oldal cimek es meta leirasok hozzaadasa minden oldalhoz
- Open Graph kepek es adatok
- Strukturalt adatok (JSON-LD) a termekekhez

### 8.3 Mobil Reszponzivitas Ellenorzese
- Minden szekció tesztelese mobil nezeten
- Touch interakciok (swipe a carousel-nel)
- Gombok es inputok megfelelo merete

---

## 9. FAZIS: Bovitett Funkciok (Opcionalis)
**Prioritas: Alacsony | Jovoben**

### 9.1 Kedvencek Lista
Felhasznaloi kedvencek mentese (backend tarolassal)

### 9.2 Blog / Magazin Oldal
Parfum guide-ok, illat tippek kartya grid layoutban

### 9.3 Felhasznaloi Profil
Rendelesek, kedvencek, beallitasok

### 9.4 Multi-step Checkout Oldal
3 lepcsos penztar (cim, fizetes, osszegzes) -- bar a Shopify checkout mar kezelni tudja ezt

---

## Javasolt Vegrehajtas Sorrendje

```text
+--------------------------------------------------+
|  1. Design Finomhangolas (szinek, radius, font)   |
+--------------------------------------------------+
          |
          v
+--------------------------------------------------+
|  2. Hero Szekció Fejlesztes (parallax, scroll)    |
+--------------------------------------------------+
          |
          v
+--------------------------------------------------+
|  3. Termek Kartyak Ujratervezese                   |
+--------------------------------------------------+
          |
          v
+--------------------------------------------------+
|  4. Termekoldal Fejlesztes (tabok, ertekelesek)   |
+--------------------------------------------------+
          |
          v
+--------------------------------------------------+
|  5. Doboz Osszeallitas Bovites                     |
+--------------------------------------------------+
          |
          v
+--------------------------------------------------+
|  6. Footer Bovites (social, fizetes, hirlevel)     |
+--------------------------------------------------+
          |
          v
+--------------------------------------------------+
|  7. Kereso Funkcio Megvalositasa                   |
+--------------------------------------------------+
          |
          v
+--------------------------------------------------+
|  8. SEO, Teljesitmeny, Mobil Teszteles             |
+--------------------------------------------------+
          |
          v
+--------------------------------------------------+
|  9. Publikalas + Domain Csatlakoztatasa             |
+--------------------------------------------------+
```

## Ajanlasok

1. **Fazisokban haladj** -- Ne kerd az egeszet egyszerre. Minden fazist kulon uzenetkent kuldd el, varj az eredmenyre, teszteld, majd lepj tovabbre.

2. **Brand identitas megorzese** -- A jelenlegi arany + fekete szinpaletta es a Playfair Display + Manrope betutipus paros mar jol mukodik. A PRD altal javasolt Cormorant Garamond + Inter csere opcionalis.

3. **Shopify admin beallitasok** -- A fejlesztessel parhuzamosan allitsd be a Shopify admin feluleten:
   - Fizetesi modok (Settings / Payments)
   - Szallitasi dijak Magyarorszagra (Settings / Shipping)
   - Adok beallitasa (Settings / Taxes)

4. **Teszteles** -- Minden fazis utan teszteld a teljes vasarlasi folyamatot: bongeszés -> kosar -> checkout.

5. **Mobil elso** -- Minden modositasnal ellenorizd a mobil nezetet is, mivel a vasarlok jelentos resze mobilrol erkezik.

## Technikai Reszletek

| Technologia | Hasznalat |
|---|---|
| React 18 + Vite | Frontend keretrendszer |
| Tailwind CSS | Stilusok |
| Framer Motion | Animaciok |
| Zustand | Kosar allapotkezeles |
| Shopify Storefront API | Termekek, kosar, checkout |
| Lovable Cloud (Supabase) | Backend (hirlevel, kedvencek, jovo) |
| React Router v6 | Navigacio |
| TanStack Query | Adat lekerdezesek |
