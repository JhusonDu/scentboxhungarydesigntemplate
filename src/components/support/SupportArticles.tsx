import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const articles = [
  { title: "Hogyan válaszd ki a tökéletes illatot", badge: "Legnépszerűbb", views: 12430, category: "Útmutató" },
  { title: "Szállítási útmutató – Minden amit tudnod kell", badge: "Leghasznosabb", views: 9870, category: "Szállítás" },
  { title: "Parfüm tárolási tippek és trükkök", badge: "Legnépszerűbb", views: 8540, category: "Tippek" },
  { title: "Visszaküldés lépésről lépésre", badge: "Leghasznosabb", views: 7230, category: "Visszaküldés" },
  { title: "Fiókbeállítások részletes útmutató", badge: null, views: 5670, category: "Fiók" },
  { title: "Kétfaktoros hitelesítés beállítása", badge: null, views: 4320, category: "Biztonság" },
  { title: "API integráció fejlesztőknek", badge: null, views: 3890, category: "Fejlesztés" },
  { title: "Csomagváltás és előfizetés kezelése", badge: "Leghasznosabb", views: 6150, category: "Számlázás" },
];

export const SupportArticles = () => {
  return (
    <section className="pb-20">
      <div className="container max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-display text-foreground text-center mb-10"
        >
          Népszerű Cikkek
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {articles.map((article, i) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card-luxury p-5 cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {article.title}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="badge-gold text-[10px]">{article.category}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Eye className="h-3 w-3" />
                      {article.views.toLocaleString("hu-HU")}
                    </span>
                  </div>
                </div>
                {article.badge && (
                  <Badge variant="outline" className="text-[10px] border-primary/30 text-primary shrink-0">
                    {article.badge}
                  </Badge>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
