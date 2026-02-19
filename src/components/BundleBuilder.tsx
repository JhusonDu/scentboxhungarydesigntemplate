import { useState, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { ShopifyProduct } from "@/lib/shopify";
import { supabase } from "@/integrations/supabase/client";
import { DecantingPopover } from "./bundle-builder/DecantingPopover";
import { StepProgress } from "./bundle-builder/StepProgress";
import { SizeStep } from "./bundle-builder/SizeStep";
import { PerfumeStep } from "./bundle-builder/PerfumeStep";
import { ReviewStep } from "./bundle-builder/ReviewStep";
import { SuccessStep } from "./bundle-builder/SuccessStep";
import { toast } from "sonner";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? 200 : -200,
    opacity: 0,
  }),
};

export const BundleBuilder = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<ShopifyProduct[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");

  const { data: products = [], isLoading } = useProducts(50);

  const goTo = useCallback((step: number) => {
    setDirection(step > currentStep ? 1 : -1);
    setCurrentStep(step);
  }, [currentStep]);

  const goNext = () => goTo(currentStep + 1);
  const goBack = () => goTo(currentStep - 1);

  const toggleProduct = (product: ShopifyProduct) => {
    setSelectedProducts((prev) => {
      const exists = prev.find((p) => p.node.id === product.node.id);
      if (exists) return prev.filter((p) => p.node.id !== product.node.id);
      return [...prev, product];
    });
  };

  const handleSubmitInquiry = async () => {
    if (!selectedSize || !inquiryName.trim() || !inquiryEmail.trim()) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("bundle_inquiries" as any).insert({
        name: inquiryName.trim(),
        email: inquiryEmail.trim(),
        selected_size: selectedSize,
        selected_products: selectedProducts.map(p => ({
          id: p.node.id,
          title: p.node.title,
          vendor: p.node.vendor,
        })),
      } as any);
      if (error) throw error;
      goTo(4);
    } catch (e) {
      console.error("Failed to submit inquiry:", e);
      toast.error("Hiba történt az elküldés során. Kérjük próbáld újra.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    if (currentStep === 1) return !!selectedSize;
    if (currentStep === 2) return selectedProducts.length > 0;
    if (currentStep === 3) return inquiryName.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiryEmail);
    return false;
  };

  const handleScrollUp = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    setCurrentStep(1);
    setSelectedSize(null);
    setSelectedProducts([]);
    setInquiryName("");
    setInquiryEmail("");
    setDirection(1);
  };

  return (
    <section ref={sectionRef} id="bundle-builder" className="py-20 md:py-28 section-elevated relative">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 30% at 50% 20%, hsl(43 65% 52% / 0.04) 0%, transparent 70%)" }} />
      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-6 animate-fade-in">
          <span className="badge-gold mb-4 inline-block">Hamarosan Érkezik</span>
          <div className="flex items-center justify-center gap-2 mb-4">
            <h2 className="text-h2 font-display font-bold text-foreground">
              Ismerd Meg az Illatokat Mini Kiszerelésben
            </h2>
            <DecantingPopover />
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Válaszd ki a neked tetsző illatokat és jelezd az érdeklődésedet – amint elindul a szolgáltatás, elsőként értesítünk!
          </p>
        </div>

        {/* Discount info box */}
        <div className="max-w-lg mx-auto mb-10">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
            <p className="text-sm text-foreground">
              Jelezd az érdeklődésedet és <strong className="text-primary">2 000 Ft kedvezményt kapsz</strong> az induláskor!
            </p>
          </div>
        </div>

        <StepProgress currentStep={currentStep} />

        {/* Step Content */}
        <div className="max-w-4xl mx-auto overflow-hidden">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {currentStep === 1 && (
                <SizeStep
                  selectedSize={selectedSize}
                  onSelect={(size) => {
                    setSelectedSize(size);
                    setSelectedProducts([]);
                  }}
                  products={products}
                />
              )}

              {currentStep === 2 && selectedSize && (
                <PerfumeStep
                  selectedSize={selectedSize}
                  selectedProducts={selectedProducts}
                  onToggle={toggleProduct}
                  products={products}
                  isLoading={isLoading}
                />
              )}

              {currentStep === 3 && selectedSize && (
                <ReviewStep
                  selectedSize={selectedSize}
                  selectedProducts={selectedProducts}
                  onEditStep={goTo}
                  name={inquiryName}
                  email={inquiryEmail}
                  onNameChange={setInquiryName}
                  onEmailChange={setInquiryEmail}
                />
              )}

              {currentStep === 4 && (
                <SuccessStep onScrollUp={handleScrollUp} />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {currentStep < 4 && (
            <div className="flex justify-between mt-12">
              <Button
                variant="outline"
                onClick={goBack}
                disabled={currentStep === 1}
                className="border-border hover:border-primary"
              >
                Vissza
              </Button>

              {currentStep === 3 ? (
                <Button
                  onClick={handleSubmitInquiry}
                  disabled={!canProceed() || isSubmitting}
                  className="bg-primary text-primary-foreground hover:bg-accent"
                >
                  {isSubmitting ? "Küldés..." : "Érdeklődés Beküldése"}
                </Button>
              ) : (
                <Button
                  onClick={goNext}
                  disabled={!canProceed()}
                  className="bg-primary text-primary-foreground hover:bg-accent"
                >
                  Tovább
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
