import { useState } from "react";
import { motion } from "framer-motion";
import { ThumbsUp, ThumbsDown, CreditCard, Rocket, Wrench, Settings, Shield, Truck } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const categories = [
  {
    id: "billing",
    label: "Fiók és Számlázás",
    icon: CreditCard,
    faqs: [
      { q: "Hogyan hozok létre fiókot?", a: "Kattints a 'Regisztráció' gombra a főoldalon, add meg az e-mail címed és a jelszavad, majd erősítsd meg az e-mail fiókodban kapott linkkel." },
      { q: "Hogyan állíthatom vissza a jelszavamat?", a: "A bejelentkezési oldalon kattints az 'Elfelejtett jelszó' linkre. Add meg a regisztrált e-mail címed, és küldünk egy jelszó-visszaállítási linket." },
      { q: "Hogyan frissíthetem a fizetési módszeremet?", a: "Lépj be a fiókodba, navigálj a 'Számlázás' menüponthoz, és kattints a 'Fizetési mód módosítása' gombra." },
      { q: "Milyen fizetési módokat fogadnak el?", a: "Elfogadjuk a Visa, Mastercard bankkártyákat, banki átutalást és utánvétes fizetést is (+ 500 Ft kezelési költség)." },
      { q: "Hogyan mondhatom le az előfizetésemet?", a: "A fiókbeállításokban az 'Előfizetés' menüpont alatt találod a lemondás lehetőségét. A lemondás az aktuális számlázási időszak végén lép érvénybe." },
      { q: "Kaphatok visszatérítést?", a: "Igen, a vásárlástól számított 14 napon belül kérhetsz visszatérítést, amennyiben a termék bontatlan és sértetlen állapotban van." },
      { q: "Hogyan tekinthetem meg a számlázási előzményeimet?", a: "A fiókod 'Számlák' menüpontjában megtalálod az összes korábbi számlád PDF formátumban letölthető változatát." },
    ],
  },
  {
    id: "start",
    label: "Első Lépések",
    icon: Rocket,
    faqs: [
      { q: "Hogyan kezdjem el használni a szolgáltatást?", a: "Regisztrálj egy ingyenes fiókot, böngéssz a termékeink között, és válaszd ki az első illatodat. Az útmutatónk végigvezet a folyamaton." },
      { q: "Mik a rendszerkövetelmények?", a: "Webshopunk bármely modern böngészőben működik (Chrome, Firefox, Safari, Edge). Mobilon is teljes funkcionalitást biztosítunk." },
      { q: "Van mobilalkalmazás?", a: "Jelenleg nincs dedikált mobilalkalmazásunk, de weboldalunk teljesen reszponzív, mobilon is kényelmesen használható." },
      { q: "Hogyan hívhatok meg csapattagokat?", a: "A fiókbeállításoknál a 'Csapat' menüpont alatt adhatsz hozzá új tagokat e-mail cím megadásával." },
      { q: "Hol találok oktatóanyagokat?", a: "A Tudásbázis szekcióban videós útmutatókat és cikkeket találsz a szolgáltatásunk használatáról." },
      { q: "Kínálnak bevezetési támogatást?", a: "Igen! Új ügyfeleink számára ingyenes bevezetési konzultációt kínálunk, ahol segítünk az első lépésekben." },
    ],
  },
  {
    id: "tech",
    label: "Technikai Problémák",
    icon: Wrench,
    faqs: [
      { q: "Miért nem tudok bejelentkezni?", a: "Ellenőrizd, hogy a helyes e-mail címet és jelszót adtad-e meg. Ha elfelejtettad a jelszavad, használd a jelszó-visszaállítás funkciót." },
      { q: "Az oldal nem töltődik be rendesen, mit tegyek?", a: "Próbáld frissíteni az oldalt (Ctrl+F5), töröld a böngésző gyorsítótárát, vagy próbálj meg egy másik böngészőt használni." },
      { q: "Hogyan törölhetem a gyorsítótárat?", a: "Chrome: Ctrl+Shift+Delete → Válaszd a 'Gyorsítótárazott képek és fájlok' lehetőséget → Kattints az 'Adatok törlése' gombra." },
      { q: "Hibaüzenetet kapok, mit jelent?", a: "Jegyzd fel a hibaüzenet szövegét és a hibakódot, majd küld el nekünk az ügyfélszolgálati jegyben. Csapatunk gyorsan megvizsgálja." },
      { q: "Hogyan jelenthetek be hibát?", a: "Használd az alábbi 'Jegy Beküldése' űrlapot a 'Technikai' kategória kiválasztásával, és részletesen írd le a problémát." },
      { q: "Miért lassú az alkalmazás?", a: "Ellenőrizd az internetkapcsolatod sebességét. Ha a probléma továbbra is fennáll, töröld a böngésző gyorsítótárát és a cookie-kat." },
    ],
  },
  {
    id: "features",
    label: "Funkciók és Használat",
    icon: Settings,
    faqs: [
      { q: "Milyen funkciók tartoznak az egyes csomagokhoz?", a: "Az Alap csomag tartalmazza a böngészést és vásárlást. A Prémium csomag exkluzív illatokat, korai hozzáférést és ingyenes szállítást biztosít." },
      { q: "Hogyan válthatok magasabb vagy alacsonyabb csomagra?", a: "A fiókbeállításokban az 'Előfizetés' menüpont alatt választhatsz a rendelkezésre álló csomagok közül." },
      { q: "Integrálhatok más eszközökkel?", a: "Igen, API-nkon keresztül számos harmadik féltől származó eszközzel integrálhatsz." },
      { q: "Hogyan exportálhatom az adataimat?", a: "A fiókbeállításoknál az 'Adatok' menüpont alatt találod az exportálási lehetőséget CSV vagy JSON formátumban." },
      { q: "Van API elérhető?", a: "Igen, REST API-t biztosítunk fejlesztők számára. A dokumentáció a Tudásbázisban elérhető." },
      { q: "Mi a különbség a csomagok között?", a: "Az Alap csomag a standard funkciókat tartalmazza, míg a Prémium hozzáférést ad exkluzív illatokhoz, kedvezményekhez és prioritásos kiszolgáláshoz." },
    ],
  },
  {
    id: "privacy",
    label: "Adatvédelem és Biztonság",
    icon: Shield,
    faqs: [
      { q: "Hogyan védik az adataimat?", a: "256-bites SSL titkosítást használunk, és adataidat EU-n belüli szervereken tároljuk, a legmagasabb biztonsági szabványok szerint." },
      { q: "Titkosítva vannak az információim?", a: "Igen, minden személyes adat és fizetési információ titkosítva van mind átvitel, mind tárolás során." },
      { q: "Megosztják harmadik felekkel az adataimat?", a: "Nem, személyes adataidat soha nem adjuk el vagy osztjuk meg harmadik felekkel marketing célokra." },
      { q: "Hogyan törölhetem véglegesen a fiókomat?", a: "Írj nekünk az info@scentbox.hu címre a fiók törlési kérelmeddel. A törlés 30 napon belül megtörténik." },
      { q: "GDPR megfelelőek?", a: "Igen, teljes mértékben megfelelünk a GDPR előírásainak. Adatvédelmi tisztviselőnk elérhető az adatvedelem@scentbox.hu címen." },
      { q: "Hogyan engedélyezhetem a kétfaktoros hitelesítést?", a: "A fiókbeállításoknál a 'Biztonság' menüpont alatt engedélyezheted a kétfaktoros hitelesítést SMS vagy hitelesítő alkalmazás segítségével." },
    ],
  },
  {
    id: "shipping",
    label: "Szállítás és Visszaküldés",
    icon: Truck,
    faqs: [
      { q: "Milyen szállítási lehetőségek vannak?", a: "GLS futárszolgálattal szállítunk. Standard szállítás 1-3 munkanap, expressz szállítás másnapi kézbesítéssel." },
      { q: "Mennyi ideig tart a kiszállítás?", a: "Standard szállítás 1-3 munkanap. Expressz szállítás esetén másnap megérkezik a csomagod." },
      { q: "Szállítanak külföldre is?", a: "Jelenleg Magyarország és a szomszédos országok (SK, RO, HR, SRB, AT) területére szállítunk." },
      { q: "Mi a visszaküldési szabályzat?", a: "14 napos elállási joggal rendelkezel. A terméknek bontatlannak és sértetlennek kell lennie. A visszaküldés költségét a vásárló viseli." },
      { q: "Hogyan követhetem nyomon a rendelésemet?", a: "A megrendelés feladása után e-mailben küldünk egy GLS nyomkövetési linket, amivel valós időben követheted a csomagod útját." },
    ],
  },
];

interface SupportFAQProps {
  searchQuery: string;
}

export const SupportFAQ = ({ searchQuery }: SupportFAQProps) => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  const handleFeedback = (helpful: boolean) => {
    toast.success(helpful ? "Köszönjük a visszajelzést! 👍" : "Köszönjük! Megpróbálunk javítani. 🙏");
  };

  const filteredCategories = searchQuery.trim()
    ? categories.map((cat) => ({
        ...cat,
        faqs: cat.faqs.filter(
          (faq) =>
            faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.a.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter((cat) => cat.faqs.length > 0)
    : categories.filter((cat) => cat.id === activeCategory);

  return (
    <section className="pb-20">
      <div className="container max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-display text-foreground text-center mb-10"
        >
          Gyakran Ismételt Kérdések
        </motion.h2>

        {/* Category tabs */}
        {!searchQuery.trim() && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                <cat.icon className="h-4 w-4" />
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* FAQ accordions */}
        {filteredCategories.map((cat) => (
          <div key={cat.id} className="mb-8">
            {searchQuery.trim() && (
              <div className="flex items-center gap-2 mb-4">
                <cat.icon className="h-5 w-5 text-primary" />
                <h3 className="font-display text-lg text-foreground">{cat.label}</h3>
              </div>
            )}
            <Accordion type="single" collapsible className="space-y-3">
              {cat.faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <AccordionItem
                    value={`${cat.id}-${i}`}
                    className="border border-border/50 rounded-lg px-5 bg-card"
                  >
                    <AccordionTrigger className="text-foreground font-medium text-sm hover:no-underline hover:text-primary transition-colors">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                      <p className="mb-4">{faq.a}</p>
                      <div className="flex items-center gap-2 pt-2 border-t border-border/30">
                        <span className="text-xs text-muted-foreground mr-2">Hasznos volt?</span>
                        <Button variant="ghost" size="sm" className="h-7 px-2" onClick={() => handleFeedback(true)}>
                          <ThumbsUp className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 px-2" onClick={() => handleFeedback(false)}>
                          <ThumbsDown className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        ))}

        {filteredCategories.length === 0 && searchQuery.trim() && (
          <p className="text-center text-muted-foreground py-10">
            Nincs találat a(z) „{searchQuery}" keresésre. Próbálj más kulcsszavakat!
          </p>
        )}
      </div>
    </section>
  );
};
