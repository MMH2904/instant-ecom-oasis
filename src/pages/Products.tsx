
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductFilters } from '@/components/products/ProductFilters';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter, Search, SlidersHorizontal, X } from 'lucide-react';
import { CartProvider } from '@/hooks/use-cart';

export default function Products() {
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [showFilters, setShowFilters] = useState(false);
  
  const minPrice = 0;
  const maxPrice = 500;
  
  useEffect(() => {
    // Parse category from URL if provided
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
  }, [location.search]);
  
  useEffect(() => {
    // Apply filters
    let filtered = [...products];
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.category)
      );
    }
    
    // Tags filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(product => 
        product.tags.some(tag => selectedTags.includes(tag))
      );
    }
    
    // Price range filter
    filtered = filtered.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategories, selectedTags, priceRange]);
  
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedTags([]);
    setPriceRange([minPrice, maxPrice]);
  };
  
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <h1 className="text-3xl font-bold mb-4 md:mb-0">All Products</h1>
              
              <div className="w-full md:w-auto flex gap-3">
                <div className="relative flex-1 md:w-64">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  {searchQuery && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-0 top-0 h-10 w-10"
                      onClick={() => setSearchQuery('')}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <Button 
                  variant="outline" 
                  className="md:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-8">
              <div className={`
                lg:w-64 lg:block
                ${showFilters ? 'block' : 'hidden'}
              `}>
                <div className="sticky top-20">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Filters</h2>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={resetFilters}>
                        Reset
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="md:hidden"
                        onClick={() => setShowFilters(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <ProductFilters 
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                  />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-center mb-6">
                  <p className="text-muted-foreground">
                    Showing {filteredProducts.length} of {products.length} products
                  </p>
                  
                  <div className="flex items-center space-x-2">
                    <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                    <select className="text-sm p-1 border rounded-md">
                      <option>Featured</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Newest</option>
                    </select>
                  </div>
                </div>
                
                <ProductGrid products={filteredProducts} />
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
