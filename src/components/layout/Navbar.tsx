
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { products } from '@/data/products';

export function Navbar() {
  const { items, toggleCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchQuery('');
    setSearchResults([]);
  };

  // Handle click outside to close search
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = products.filter(
      product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
    );
    
    setSearchResults(filtered.slice(0, 5)); // Limit to top 5 results
  }, [searchQuery]);
  
  const handleProductSelect = (productId: string) => {
    setIsSearchOpen(false);
    navigate(`/product/${productId}`);
  };
  
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold">ShopOasis</Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-primary">Home</Link>
          <Link to="/products" className="text-sm font-medium hover:text-primary">Shop</Link>
          <Link to="/new-arrivals" className="text-sm font-medium hover:text-primary">New Arrivals</Link>
          <Link to="/trending" className="text-sm font-medium hover:text-primary">Trending</Link>
        </nav>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={toggleSearch} aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" onClick={toggleCart} aria-label="Cart">
            <div className="relative">
              <ShoppingCart className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </div>
          </Button>
          
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu} aria-label="Menu">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-background border-b animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-sm font-medium hover:text-primary">Home</Link>
            <Link to="/products" className="text-sm font-medium hover:text-primary">Shop</Link>
            <Link to="/new-arrivals" className="text-sm font-medium hover:text-primary">New Arrivals</Link>
            <Link to="/trending" className="text-sm font-medium hover:text-primary">Trending</Link>
          </nav>
        </div>
      )}
      
      {/* Search Overlay with Command Menu */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/30 z-50 animate-fade-in" onClick={toggleSearch}>
          <div 
            ref={searchRef}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-background p-4 rounded-lg shadow-lg z-50 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <Command className="rounded-lg border shadow-md">
              <CommandInput
                placeholder="Search for products..."
                value={searchQuery}
                onValueChange={setSearchQuery}
                autoFocus
              />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Products">
                  {searchResults.map((product) => (
                    <CommandItem
                      key={product.id}
                      onSelect={() => handleProductSelect(product.id)}
                      className="flex items-center py-2 cursor-pointer"
                    >
                      <div className="h-10 w-10 rounded overflow-hidden mr-2 flex-shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100';
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{product.name}</p>
                        <p className="text-xs text-muted-foreground truncate">${product.price.toFixed(2)}</p>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
            <Button
              className="absolute top-2 right-2"
              size="sm"
              variant="ghost"
              onClick={toggleSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
