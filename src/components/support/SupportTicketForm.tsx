import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

const ticketSchema = z.object({
  name: z.string().trim().min(1, "A név megadása kötelező").max(100),
  email: z.string().trim().email("Érvényes e-mail címet adj meg").max(255),
  category: z.string().min(1, "Válassz egy kategóriát"),
  subject: z.string().trim().min(1, "A tárgy megadása kötelező").max(200),
  message: z.string().trim().min(1, "Az üzenet megadása kötelező").max(2000),
});

type TicketFormValues = z.infer<typeof ticketSchema>;

export const SupportTicketForm = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const form = useForm<TicketFormValues>({
    resolver: zodResolver(ticketSchema),
    defaultValues: { name: "", email: "", category: "", subject: "", message: "" },
  });

  const onSubmit = (_data: TicketFormValues) => {
    toast.success("Köszönjük! Hamarosan válaszolunk.");
    form.reset();
    setFileName(null);
  };

  return (
    <section className="pb-20">
      <div className="container max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-luxury p-8"
        >
          <h2 className="text-2xl font-display text-foreground text-center mb-2">
            Nem találod amit keresel?
          </h2>
          <p className="text-muted-foreground text-center text-sm mb-8">Küldj nekünk egy jegyet és felvesszük veled a kapcsolatot.</p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Név *</FormLabel>
                    <FormControl><Input placeholder="Teljes neved" {...field} className="bg-secondary border-border/50" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Email *</FormLabel>
                    <FormControl><Input placeholder="email@example.com" {...field} className="bg-secondary border-border/50" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="category" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Kategória *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-secondary border-border/50">
                          <SelectValue placeholder="Válassz..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="technical">Technikai</SelectItem>
                        <SelectItem value="billing">Számlázás</SelectItem>
                        <SelectItem value="general">Általános</SelectItem>
                        <SelectItem value="feature">Funkció Kérés</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="subject" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Tárgy *</FormLabel>
                    <FormControl><Input placeholder="Miben segíthetünk?" {...field} className="bg-secondary border-border/50" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Üzenet *</FormLabel>
                  <FormControl><Textarea placeholder="Írd le részletesen a problémádat..." rows={5} {...field} className="bg-secondary border-border/50" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div>
                <input type="file" ref={fileRef} className="hidden" accept="image/*,.pdf" onChange={(e) => setFileName(e.target.files?.[0]?.name || null)} />
                <Button type="button" variant="outline" className="border-border/50 text-muted-foreground" onClick={() => fileRef.current?.click()}>
                  <Upload className="h-4 w-4 mr-2" />
                  {fileName || "Fájl csatolása (opcionális)"}
                </Button>
              </div>

              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Jegy Beküldése
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  );
};
