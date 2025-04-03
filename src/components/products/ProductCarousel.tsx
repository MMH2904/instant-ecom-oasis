
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/data/products';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/button';

interface ProductCarouselProps {
  title: string;
  products: Product[];
}

export function ProductCarousel({ title, products }: ProductCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const scrollLeft = () => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth * 0.75;
      containerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth * 0.75;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={scrollLeft}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" onClick={scrollRight}>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div 
        ref={containerRef} 
        className="flex space-x-6 overflow-x-auto pb-4 hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map(product => (
          <div key={product.id} className="min-w-[250px] sm:min-w-[280px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
