import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SupportCTA = () => {
  return (
    <section className="pb-20">
      <div className="container max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-luxury p-10 text-center noise-texture"
        >
          <h2 className="text-3xl font-display text-foreground mb-3">
            Még mindig segítségre van szükséged?
          </h2>
          <p className="text-muted-foreground mb-6">
            Ügyfélszolgálati csapatunk itt van neked
          </p>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 mb-4">
            Kapcsolatfelvétel
          </Button>
          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <span className="ml-2">4.9/5 csillag értékelés</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
