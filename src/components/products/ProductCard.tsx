
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };
  
  return (
    <div className="product-card group">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="product-card-image"
          />
          
          {product.stock < 5 && product.stock > 0 && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-md">
              Low Stock
            </div>
          )}
          
          {product.stock === 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
              Out of Stock
            </div>
          )}
          
          {product.newArrival && (
            <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-md">
              New
            </div>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                className="flex-1"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button size="icon" variant="secondary">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-lg truncate">{product.name}</h3>
          <div className="flex justify-between items-center mt-2">
            <span className="font-bold">${product.price.toFixed(2)}</span>
            <div className="flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 15.585l-6.327 3.323 1.209-7.047-5.118-4.989 7.075-1.027L10 0l3.162 6.846 7.075 1.027-5.118 4.989 1.209 7.047L10 15.585z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-muted-foreground ml-1">({product.rating})</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
