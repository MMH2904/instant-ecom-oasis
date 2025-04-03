
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Facebook, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">ShopOasis</h3>
            <p className="text-muted-foreground">
              Discover quality products with a seamless shopping experience.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-muted-foreground hover:text-primary">All Products</Link></li>
              <li><Link to="/new-arrivals" className="text-muted-foreground hover:text-primary">New Arrivals</Link></li>
              <li><Link to="/trending" className="text-muted-foreground hover:text-primary">Trending</Link></li>
              <li><Link to="/sales" className="text-muted-foreground hover:text-primary">Sales</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
              <li><Link to="/shipping" className="text-muted-foreground hover:text-primary">Shipping Information</Link></li>
              <li><Link to="/returns" className="text-muted-foreground hover:text-primary">Returns & Exchanges</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary">Our Story</Link></li>
              <li><Link to="/sustainability" className="text-muted-foreground hover:text-primary">Sustainability</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ShopOasis. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
