
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/data/products';
import { toast } from 'sonner';

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  closeCart: () => void;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Load cart from localStorage on initial load
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse saved cart:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);
  
  const addItem = (product: Product, quantity = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        
        // Check if adding more would exceed stock
        if (newQuantity > product.stock) {
          toast.error(`Sorry, only ${product.stock} items available`);
          return prevItems;
        }
        
        const updatedItems = prevItems.map(item => 
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        );
        
        toast.success(`Updated ${product.name} quantity (${newQuantity})`);
        return updatedItems;
      } else {
        // Check if adding would exceed stock
        if (quantity > product.stock) {
          toast.error(`Sorry, only ${product.stock} items available`);
          return prevItems;
        }
        
        toast.success(`Added ${product.name} to cart`);
        return [...prevItems, { ...product, quantity }];
      }
    });
  };
  
  const removeItem = (id: string) => {
    setItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === id);
      if (itemToRemove) {
        toast.success(`Removed ${itemToRemove.name} from cart`);
      }
      return prevItems.filter(item => item.id !== id);
    });
  };
  
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    
    setItems(prevItems => {
      const product = prevItems.find(item => item.id === id);
      
      if (!product) return prevItems;
      
      // Check if updating would exceed stock
      if (quantity > product.stock) {
        toast.error(`Sorry, only ${product.stock} items available`);
        return prevItems;
      }
      
      return prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      );
    });
  };
  
  const clearCart = () => {
    setItems([]);
    toast.success('Cart cleared');
  };
  
  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };
  
  const closeCart = () => {
    setIsCartOpen(false);
  };
  
  const getCartTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isCartOpen,
      toggleCart,
      closeCart,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
}
