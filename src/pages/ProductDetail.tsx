
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ProductCarousel } from '@/components/products/ProductCarousel';
import { Button } from '@/components/ui/button';
import { CartProvider, useCart } from '@/hooks/use-cart';
import { getProductById, getRelatedProducts } from '@/data/products';
import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingCart, Heart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ProductDetail() {
  return (
    <CartProvider>
      <ProductDetailContent />
    </CartProvider>
  );
}

function ProductDetailContent() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const product = id ? getProductById(id) : null;
  const relatedProducts = id ? getRelatedProducts(id) : [];
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Product Not Found</h1>
            <p className="text-muted-foreground mt-2">The product you're looking for doesn't exist.</p>
            <Button className="mt-4" onClick={() => navigate('/products')}>
              View All Products
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleAddToCart = () => {
    addItem(product, quantity);
  };
  
  const nextImage = () => {
    setActiveImageIndex((activeImageIndex + 1) % product.images.length);
  };
  
  const prevImage = () => {
    setActiveImageIndex((activeImageIndex - 1 + product.images.length) % product.images.length);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Images */}
            <div className="lg:w-1/2">
              <div className="relative rounded-lg overflow-hidden aspect-square mb-4">
                <img 
                  src={product.images[activeImageIndex]} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
                
                {product.images.length > 1 && (
                  <>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </>
                )}
              </div>
              
              {product.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      className={`w-20 h-20 rounded-md overflow-hidden flex-shrink-0 ${
                        activeImageIndex === index ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <img 
                        src={image} 
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Details */}
            <div className="lg:w-1/2">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              
              <div className="flex items-center mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
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
                <span className="text-muted-foreground ml-2">{product.rating} stars</span>
              </div>
              
              <div className="mt-4">
                <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                {product.stock < 5 && product.stock > 0 && (
                  <span className="ml-3 text-yellow-600">Only {product.stock} left in stock</span>
                )}
                {product.stock === 0 && (
                  <span className="ml-3 text-red-600">Out of stock</span>
                )}
              </div>
              
              <p className="mt-6 text-muted-foreground">{product.description}</p>
              
              <div className="mt-6">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">Category:</span>
                  <span>{product.category}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {product.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="bg-muted px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-8">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded-md">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-10 text-center">{quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={incrementQuantity}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <Button 
                    size="lg" 
                    className="flex-1"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  
                  <Button variant="outline" size="icon" className="h-11 w-11">
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div className="mt-10">
                <Tabs defaultValue="description">
                  <TabsList className="w-full">
                    <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
                    <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                    <TabsTrigger value="shipping" className="flex-1">Shipping</TabsTrigger>
                  </TabsList>
                  <TabsContent value="description" className="mt-4">
                    <div className="prose max-w-none">
                      <p>{product.description}</p>
                      <p className="mt-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fermentum
                        auctor eros eu pulvinar. Sed vitae urna a odio porttitor fringilla.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="details" className="mt-4">
                    <div className="space-y-2">
                      <div className="flex">
                        <span className="font-medium w-32">Material:</span>
                        <span>Premium Quality</span>
                      </div>
                      <div className="flex">
                        <span className="font-medium w-32">Dimensions:</span>
                        <span>10" x 8" x 4"</span>
                      </div>
                      <div className="flex">
                        <span className="font-medium w-32">Weight:</span>
                        <span>1.2 lbs</span>
                      </div>
                      <div className="flex">
                        <span className="font-medium w-32">Made in:</span>
                        <span>USA</span>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="shipping" className="mt-4">
                    <div className="prose max-w-none">
                      <p>Free shipping on all domestic orders over $50.</p>
                      <p className="mt-4">International shipping available at checkout.</p>
                      <p className="mt-4">Standard delivery: 3-5 business days</p>
                      <p className="mt-2">Express delivery: 1-2 business days</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <ProductCarousel title="You May Also Like" products={relatedProducts} />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      <CartDrawer />
    </div>
  );
}
