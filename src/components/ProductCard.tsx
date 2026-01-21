import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Loader2 } from "lucide-react";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  
  const { node } = product;
  const image = node.images?.edges?.[0]?.node;
  const price = node.priceRange.minVariantPrice;
  const firstVariant = node.variants?.edges?.[0]?.node;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!firstVariant) return;
    
    await addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || []
    });
    
    toast.success("Added to cart", {
      description: node.title,
    });
  };

  return (
    <Link to={`/product/${node.handle}`} className="group block">
      <div className="relative overflow-hidden rounded-xl bg-secondary/30 aspect-square mb-4">
        {image ? (
          <img 
            src={image.url} 
            alt={image.altText || node.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary">
            <ShoppingBag className="w-12 h-12 text-muted-foreground" />
          </div>
        )}
        <Button 
          onClick={handleAddToCart}
          disabled={isLoading || !firstVariant?.availableForSale}
          size="sm"
          className="absolute bottom-4 right-4 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 bg-primary text-primary-foreground shadow-lg"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ShoppingBag className="w-4 h-4 mr-2" />Add</>}
        </Button>
      </div>
      <h3 className="font-medium text-lg mb-1 group-hover:text-accent transition-colors">{node.title}</h3>
      <p className="text-muted-foreground text-sm line-clamp-2 mb-2">{node.description}</p>
      <p className="font-semibold text-lg">{price.currencyCode} {parseFloat(price.amount).toFixed(2)}</p>
    </Link>
  );
};
