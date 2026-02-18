import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SupportHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const SupportHero = ({ searchQuery, onSearchChange }: SupportHeroProps) => {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20 noise-texture">
      <div className="container text-center max-w-3xl mx-auto">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="badge-gold inline-block mb-6"
        >
          Segítség Központ
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-display text-foreground"
        >
          Hogyan segíthetünk?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-muted-foreground text-lg"
        >
          Keress a tudásbázisunkban vagy böngéssz a kategóriák között
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 max-w-xl mx-auto relative"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Keresés a válaszok között..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 h-14 text-base bg-card border-border/50 focus:border-primary/50 rounded-xl"
          />
        </motion.div>
      </div>
    </section>
  );
};
