import { motion } from "framer-motion";
import { MessageCircle, Mail, Phone, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const contacts = [
  {
    icon: MessageCircle,
    title: "Élő Chat",
    desc: "Csevegj velünk most",
    detail: "Átlagos várakozás: 3 perc",
    button: "Chat Indítása",
  },
  {
    icon: Mail,
    title: "Email Támogatás",
    desc: "info@scentbox.hu",
    detail: "Válasz 4 órán belül",
    button: "Email Küldése",
  },
  {
    icon: Phone,
    title: "Telefonos Támogatás",
    desc: "+36 1 234 5678",
    detail: "Hétfő–Péntek: 9:00–18:00",
    button: "Hívás Most",
  },
  {
    icon: BookOpen,
    title: "Súgó Központ",
    desc: "Böngéssz a dokumentációban",
    detail: "500+ cikk",
    button: "Súgó Központ",
  },
];

export const SupportContact = () => {
  return (
    <section className="pb-20">
      <div className="container max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-display text-foreground text-center mb-10"
        >
          Lépj Kapcsolatba Velünk
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contacts.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-luxury p-6 text-center flex flex-col"
            >
              <c.icon className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-display text-lg text-foreground mb-1">{c.title}</h3>
              <p className="text-sm text-foreground/80 mb-1">{c.desc}</p>
              <p className="text-xs text-muted-foreground mb-4">{c.detail}</p>
              <Button variant="outline" className="mt-auto border-primary/30 text-primary hover:bg-primary/10">
                {c.button}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
