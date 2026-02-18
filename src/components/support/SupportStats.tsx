import { motion } from "framer-motion";
import { Clock, Headphones, Users, Star } from "lucide-react";

const stats = [
  { icon: Clock, label: "Átlagos válaszidő", value: "2 óra" },
  { icon: Headphones, label: "Ügyfélszolgálat", value: "24/7" },
  { icon: Users, label: "Elégedett Ügyfél", value: "15 000+" },
  { icon: Star, label: "Elégedettség", value: "99.9%" },
];

export const SupportStats = () => {
  return (
    <section className="pb-16">
      <div className="container max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-luxury p-6 text-center"
            >
              <stat.icon className="h-6 w-6 text-primary mx-auto mb-3" />
              <p className="text-2xl font-display text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
