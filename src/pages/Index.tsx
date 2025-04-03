
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ProductCarousel } from '@/components/products/ProductCarousel';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { getFeaturedProducts, getTrendingProducts, getNewArrivals } from '@/data/products';
import { CartProvider } from '@/hooks/use-cart';

export default function Index() {
  const featuredProducts = getFeaturedProducts();
  const trendingProducts = getTrendingProducts();
  const newArrivals = getNewArrivals();
  
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1470" 
              alt="Hero" 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/1800x1200?text=ShopOasis';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Discover Quality Products
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Shop the latest trends and must-have items with our curated collection of premium products.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link to="/products">Shop Now</Link>
                </Button>
                <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white/20" asChild>
                  <Link to="/new-arrivals">Explore Collections</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/products?category=Electronics" className="block relative h-64 rounded-lg overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=989" 
                  alt="Electronics" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=Electronics';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Electronics</h3>
                    <span className="text-white/90 hover:text-white inline-flex items-center">
                      Shop Now
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
              
              <Link to="/products?category=Home" className="block relative h-64 rounded-lg overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=870" 
                  alt="Home" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=Home';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Home</h3>
                    <span className="text-white/90 hover:text-white inline-flex items-center">
                      Shop Now
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
              
              <Link to="/products?category=Clothing" className="block relative h-64 rounded-lg overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=870" 
                  alt="Clothing" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=Clothing';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Clothing</h3>
                    <span className="text-white/90 hover:text-white inline-flex items-center">
                      Shop Now
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Featured Products */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <ProductCarousel title="Featured Products" products={featuredProducts} />
          </div>
        </section>
        
        {/* Banner */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Summer Sale</h2>
            <p className="text-xl text-white/90 mb-8">Up to 50% off on selected items</p>
            <Button 
              size="lg" 
              variant="secondary"
              asChild
            >
              <Link to="/products">Shop Now</Link>
            </Button>
          </div>
        </section>
        
        {/* New Arrivals */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">New Arrivals</h2>
              <Button variant="outline" asChild>
                <Link to="/new-arrivals">View All</Link>
              </Button>
            </div>
            <ProductCarousel products={newArrivals} />
          </div>
        </section>
        
        {/* Trending Products */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Trending Now</h2>
              <Button variant="outline" asChild>
                <Link to="/trending">View All</Link>
              </Button>
            </div>
            <ProductCarousel products={trendingProducts} />
          </div>
        </section>
        
        {/* Features */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Quality Products</h3>
                <p className="text-muted-foreground">We ensure that all our products meet the highest quality standards.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
                <p className="text-muted-foreground">Get your products delivered to your doorstep in record time.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Secure Checkout</h3>
                <p className="text-muted-foreground">Shop with confidence with our secure payment options.</p>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
