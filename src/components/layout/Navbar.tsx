
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';

export function Navbar() {
  const { items, toggleCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  
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
      
      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="search-overlay animate-fade-in" onClick={toggleSearch}>
          <div 
            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-background p-4 rounded-lg shadow-lg z-50 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search for products..." 
                className="w-full p-3 border rounded-md pl-10"
                autoFocus
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
