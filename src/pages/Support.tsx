import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SupportHero } from "@/components/support/SupportHero";
import { SupportStats } from "@/components/support/SupportStats";
import { SupportFAQ } from "@/components/support/SupportFAQ";
import { SupportContact } from "@/components/support/SupportContact";
import { SupportTicketForm } from "@/components/support/SupportTicketForm";
import { SupportKnowledgeBase } from "@/components/support/SupportKnowledgeBase";
import { SupportArticles } from "@/components/support/SupportArticles";
import { SupportCTA } from "@/components/support/SupportCTA";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

const Support = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SupportHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <SupportStats />
      <SupportFAQ searchQuery={searchQuery} />
      <SupportContact />
      <SupportTicketForm />
      <SupportKnowledgeBase />
      <SupportArticles />
      <SupportCTA />
      <Footer />

      {showBackToTop && (
        <Button
          size="icon"
          className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full shadow-lg"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default Support;
