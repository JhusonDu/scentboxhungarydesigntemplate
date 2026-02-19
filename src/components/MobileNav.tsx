import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronDown, Phone, Mail } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SUBMENU_ITEMS = [
  { label: "Férfi Illatok", path: "/termekek?gender=Férfi" },
  { label: "Női Illatok", path: "/termekek?gender=Női" },
  { label: "Unisex Illatok", path: "/termekek?gender=Uniszex" },
  { label: "Kedvenceink", scrollTo: "#bestsellers" },
];

const MENU_ITEMS = [
  { label: "Termékek", path: "/termekek", hasSubmenu: true },
  { label: "Rólunk", path: "/rolunk" },
  { label: "Kapcsolat", path: "/tamogatas" },
  { label: "Segítség", path: "/tamogatas" },
];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  hidden: { scale: 0.85, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring" as const, damping: 25, stiffness: 350 },
  },
  exit: {
    scale: 0.9,
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" as const },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.06, duration: 0.35, ease: "easeOut" as const },
  }),
};

export const MobileNav = ({ open, onOpenChange }: MobileNavProps) => {
  const navigate = useNavigate();
  const [productsOpen, setProductsOpen] = useState(false);

  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setProductsOpen(false);
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, close]);

  const goTo = (path: string) => { navigate(path); close(); };

  const scrollTo = (id: string) => {
    close();
    setTimeout(() => {
      const el = document.getElementById(id.replace("#", "")) ?? document.querySelector(id);
      el?.scrollIntoView({ behavior: "smooth" });
    }, 350);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={close}
            aria-hidden="true"
          />

          {/* Pop-up Panel */}
          <motion.div
            key="panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Navigációs menü"
            className="relative z-[1001] w-[90vw] max-w-[380px] max-h-[85vh] rounded-2xl border border-primary/20 flex flex-col overflow-hidden"
            style={{
              background: "#0c0c0c",
              boxShadow: "0 0 60px rgba(212,175,55,0.08), 0 25px 50px rgba(0,0,0,0.5)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-primary/15 shrink-0">
              <div className="flex items-center gap-2.5">
                <img src={logoIcon} alt="ScentBox" className="h-8 w-8 object-contain" />
                <span className="text-foreground text-lg font-bold tracking-tight">
                  ScentBox Hungary
                </span>
              </div>
              <button
                onClick={close}
                aria-label="Menü bezárása"
                className="p-2 -mr-2 rounded-full hover:bg-primary/10 transition-colors group"
              >
                <X className="h-5 w-5 text-foreground/70 group-hover:text-primary transition-colors" />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 overflow-y-auto px-6 py-5">
              <div className="space-y-0">
                {MENU_ITEMS.map((item, i) => (
                  <motion.div key={item.label} custom={i} variants={itemVariants} initial="hidden" animate="visible">
                    {item.hasSubmenu ? (
                      <>
                        <button
                          onClick={() => setProductsOpen(!productsOpen)}
                          className="flex items-center justify-center gap-2 w-full py-3.5 text-center text-xl font-medium tracking-wide text-foreground/90 transition-all hover:text-primary active:scale-[0.98]"
                        >
                          {item.label}
                          <motion.span
                            animate={{ rotate: productsOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="h-5 w-5 text-primary/70" />
                          </motion.span>
                        </button>
                        <AnimatePresence>
                          {productsOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="py-2 space-y-0.5">
                                {SUBMENU_ITEMS.map((sub) => (
                                  <button
                                    key={sub.label}
                                    onClick={() => sub.scrollTo ? scrollTo(sub.scrollTo) : goTo(sub.path!)}
                                    className="block w-full text-center py-2.5 text-base text-foreground/50 hover:text-primary transition-all active:scale-[0.98]"
                                  >
                                    {sub.label}
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <button
                        onClick={() => goTo(item.path)}
                        className="w-full py-3.5 text-center text-xl font-medium tracking-wide text-foreground/90 transition-all hover:text-primary hover:-translate-y-px active:scale-[0.98]"
                      >
                        {item.label}
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Gold Divider */}
              <motion.div
                custom={MENU_ITEMS.length}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="my-5 h-px"
                style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent)" }}
              />

              {/* Contact */}
              <motion.div
                custom={MENU_ITEMS.length + 1}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="space-y-3"
              >
                <a href="tel:+3612345678" className="flex items-center justify-center gap-3 text-foreground/50 hover:text-primary transition-colors py-1.5">
                  <Phone className="h-4 w-4 text-primary/70" />
                  <span className="text-sm">+36 1 234 5678</span>
                </a>
                <a href="mailto:info@scentbox.hu" className="flex items-center justify-center gap-3 text-foreground/50 hover:text-primary transition-colors py-1.5">
                  <Mail className="h-4 w-4 text-primary/70" />
                  <span className="text-sm">info@scentbox.hu</span>
                </a>
              </motion.div>
            </nav>

            {/* CTA Button */}
            <motion.div
              custom={MENU_ITEMS.length + 2}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="shrink-0 px-5 pb-5 pt-2"
            >
              <button
                onClick={() => goTo("/termekek")}
                className="group w-full relative overflow-hidden rounded-xl py-3.5 px-6 text-sm font-semibold tracking-widest uppercase transition-all duration-300 active:scale-[0.97]"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.85) 100%)",
                  boxShadow: "0 4px 20px hsl(var(--primary) / 0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
                  color: "#0a0a0a",
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Böngészd az Illatokat
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
