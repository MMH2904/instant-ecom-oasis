
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ProductGrid } from '@/components/products/ProductGrid';
import { getNewArrivals } from '@/data/products';
import { CartProvider } from '@/hooks/use-cart';

export default function NewArrivals() {
  const [newArrivalsProducts, setNewArrivalsProducts] = useState(getNewArrivals(12));
  
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <h1 className="text-3xl font-bold mb-4 md:mb-0">New Arrivals</h1>
            </div>
            
            <div className="mt-8">
              <ProductGrid products={newArrivalsProducts} />
            </div>
          </div>
        </main>
        
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
