import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProductByHandle } from "@/hooks/useProducts";
import { useCartStore } from "@/stores/cartStore";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  ArrowLeft, 
  Minus, 
  Plus, 
  ShoppingBag, 
  Loader2, 
  PackageOpen, 
  Check,
  Shield,
  Truck,
  RefreshCcw,
  Sparkles,
  Droplets,
  Clock,
  Award
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading, error } = useProductByHandle(handle || "");
  const addItem = useCartStore(state => state.addItem);
  const isAddingToCart = useCartStore(state => state.isLoading);
  
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24">
          <div className="container py-12">
            <Skeleton className="h-6 w-32 mb-10" />
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div className="space-y-4">
                <Skeleton className="aspect-square rounded-3xl" />
                <div className="flex gap-3">
                  {[1,2,3].map(i => <Skeleton key={i} className="w-24 h-24 rounded-xl" />)}
                </div>
              </div>
              <div className="space-y-6">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-14 w-3/4" />
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-16 w-full rounded-2xl" />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24">
          <div className="container py-24">
            <div className="flex flex-col items-center justify-center text-center animate-fade-in">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-8">
                <PackageOpen className="w-14 h-14 text-primary" />
              </div>
              <h1 className="text-4xl font-display font-bold mb-4">Termék nem található</h1>
              <p className="text-muted-foreground mb-8 max-w-md text-lg">
                A keresett termék nem létezik vagy eltávolításra került.
              </p>
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/termekek"><ArrowLeft className="mr-2 h-4 w-4" />Vissza a Termékekhez</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const images = product.images?.edges || [];
  const variants = product.variants?.edges || [];
  const selectedVariant = variants.find(v => v.node.id === selectedVariantId)?.node || variants[0]?.node;
  const price = selectedVariant?.price || product.priceRange.minVariantPrice;

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions || []
    });
    
    toast.success("Kosárba helyezve!", {
      description: `${quantity}x ${product.title}`,
    });
  };

  // Extract brand from vendor or title
  const brand = product.vendor || product.title.split(' ')[0];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        {/* Breadcrumb */}
        <div className="bg-card/50 border-b border-border">
          <div className="container py-4">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Főoldal
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link to="/termekek" className="text-muted-foreground hover:text-foreground transition-colors">
                Termékek
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium truncate max-w-[200px]">{product.title}</span>
            </nav>
          </div>
        </div>

        <div className="container py-10 md:py-16">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Images Section */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-secondary to-card border border-border group">
                {/* Loading shimmer */}
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary via-muted to-secondary animate-image-shimmer bg-[length:200%_100%]" />
                )}
                
                {images[selectedImage]?.node ? (
                  <motion.img
                    key={selectedImage}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: imageLoaded ? 1 : 0, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    src={images[selectedImage].node.url}
                    alt={images[selectedImage].node.altText || product.title}
                    onLoad={() => setImageLoaded(true)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Droplets className="w-24 h-24 text-primary/20" />
                  </div>
                )}

                {/* Brand Badge */}
                <div className="absolute top-4 left-4 px-4 py-2 bg-background/90 backdrop-blur-sm rounded-full border border-border">
                  <span className="text-xs font-semibold tracking-wider uppercase text-foreground">{brand}</span>
                </div>

                {/* Authenticity Badge */}
                <div className="absolute top-4 right-4 px-3 py-2 bg-primary/90 backdrop-blur-sm rounded-full">
                  <span className="text-xs font-semibold text-primary-foreground flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    100% Eredeti
                  </span>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {images.map((img, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedImage(idx);
                        setImageLoaded(false);
                      }}
                      className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                        idx === selectedImage 
                          ? "border-primary ring-4 ring-primary/20" 
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <img
                        src={img.node.url}
                        alt={img.node.altText || `${product.title} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Details */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col"
            >
              {/* Brand Label */}
              <div className="flex items-center gap-2 mb-3">
                <span className="badge-gold">{brand}</span>
                <span className="text-xs text-muted-foreground">• {product.productType || 'Dekant'}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight mb-6 leading-tight text-foreground">
                {product.title}
              </h1>
              
              {/* Price */}
              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-4xl font-bold text-primary">
                  {parseFloat(price.amount).toLocaleString('hu-HU')} {price.currencyCode}
                </span>
                <span className="text-sm text-muted-foreground">/ {selectedVariant?.title || 'db'}</span>
              </div>
              
              {/* Description */}
              <div className="mb-8">
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {product.description || 'Prémium minőségű parfüm dekant, gondosan kiválasztott eredeti illatból.'}
                </p>
              </div>

              {/* Fragrance Notes (visual placeholder) */}
              <div className="grid grid-cols-3 gap-4 mb-8 p-5 rounded-2xl bg-card border border-border">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground block">Fejjegyek</span>
                  <span className="text-sm font-semibold text-foreground">Bergamot, Citrus</span>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <Droplets className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground block">Szívjegyek</span>
                  <span className="text-sm font-semibold text-foreground">Jázmin, Rózsa</span>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground block">Alapjegyek</span>
                  <span className="text-sm font-semibold text-foreground">Szantálfa, Vanília</span>
                </div>
              </div>

              {/* Variants */}
              {product.options && product.options.length > 0 && product.options[0].name !== "Title" && (
                <div className="space-y-4 mb-8">
                  {product.options.map((option) => (
                    <div key={option.name}>
                      <label className="text-sm font-semibold mb-3 block text-foreground">
                        {option.name === 'Size' ? 'Méret' : option.name}
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {option.values.map((value) => {
                          const matchingVariant = variants.find(v => 
                            v.node.selectedOptions.some(opt => opt.name === option.name && opt.value === value)
                          );
                          const isSelected = selectedVariant?.selectedOptions.some(
                            opt => opt.name === option.name && opt.value === value
                          );
                          const isAvailable = matchingVariant?.node.availableForSale;
                          
                          return (
                            <motion.button
                              key={value}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => matchingVariant && setSelectedVariantId(matchingVariant.node.id)}
                              disabled={!isAvailable}
                              className={`h-14 px-8 rounded-xl font-semibold transition-all border-2 ${
                                isSelected 
                                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20" 
                                  : "bg-card text-foreground border-border hover:border-primary/50"
                              } ${!isAvailable ? "opacity-40 cursor-not-allowed line-through" : ""}`}
                            >
                              {value}
                              {isSelected && <Check className="ml-2 h-4 w-4 inline" />}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="text-sm font-semibold mb-3 block text-foreground">
                  Mennyiség
                </label>
                <div className="inline-flex items-center gap-1 bg-card border border-border rounded-xl p-1.5">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 rounded-lg hover:bg-primary/10"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-16 text-center font-bold text-xl">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 rounded-lg hover:bg-primary/10"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || !selectedVariant?.availableForSale}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-16 text-lg font-semibold rounded-2xl shadow-xl shadow-primary/30 transition-all hover:shadow-2xl hover:shadow-primary/40"
                >
                  {isAddingToCart ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      <ShoppingBag className="mr-3 h-6 w-6" />
                      Kosárba — {(parseFloat(price.amount) * quantity).toLocaleString('hu-HU')} {price.currencyCode}
                    </>
                  )}
                </Button>
              </motion.div>

              {!selectedVariant?.availableForSale && (
                <p className="text-sm text-destructive mt-4 text-center font-medium">
                  Ez a változat jelenleg nem elérhető
                </p>
              )}

              {/* Trust Badges */}
              <div className="mt-10 pt-8 border-t border-border">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col items-center text-center p-4 rounded-xl bg-card border border-border">
                    <Shield className="w-6 h-6 text-primary mb-2" />
                    <span className="text-xs font-semibold text-foreground">100% Eredeti</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 rounded-xl bg-card border border-border">
                    <Truck className="w-6 h-6 text-primary mb-2" />
                    <span className="text-xs font-semibold text-foreground">Ingyenes Szállítás</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 rounded-xl bg-card border border-border">
                    <RefreshCcw className="w-6 h-6 text-primary mb-2" />
                    <span className="text-xs font-semibold text-foreground">14 Nap Garancia</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 rounded-xl bg-card border border-border">
                    <Award className="w-6 h-6 text-primary mb-2" />
                    <span className="text-xs font-semibold text-foreground">Prémium Minőség</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
