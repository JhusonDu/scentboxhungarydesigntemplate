import { motion } from "framer-motion";
import { BookOpen, Video, MessageSquare, BarChart3, Code, Smartphone, GraduationCap, Newspaper } from "lucide-react";

const links = [
  { icon: BookOpen, label: "Dokumentáció", emoji: "📚" },
  { icon: Video, label: "Video Útmutatók", emoji: "🎥" },
  { icon: MessageSquare, label: "Közösségi Fórum", emoji: "💬" },
  { icon: BarChart3, label: "Rendszer Állapot", emoji: "📊" },
  { icon: Code, label: "API Dokumentáció", emoji: "🔄" },
  { icon: Smartphone, label: "Mobilalkalmazás Útmutató", emoji: "📱" },
  { icon: GraduationCap, label: "Webináriumok", emoji: "🎓" },
  { icon: Newspaper, label: "Blog és Hírek", emoji: "📰" },
];

export const SupportKnowledgeBase = () => {
  return (
    <section className="pb-20">
      <div className="container max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-display text-foreground text-center mb-10"
        >
          Tudásbázis
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {links.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card-luxury p-5 text-center cursor-pointer group"
            >
              <span className="text-2xl mb-2 block">{link.emoji}</span>
              <p className="text-sm text-foreground group-hover:text-primary transition-colors font-medium">{link.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
