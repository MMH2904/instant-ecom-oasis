
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/use-cart';
import { Link } from 'react-router-dom';

export function CartDrawer() {
  const { 
    items, 
    isCartOpen, 
    closeCart, 
    removeItem, 
    updateQuantity, 
    getCartTotal 
  } = useCart();
  
  if (!isCartOpen) return null;
  
  return (
    <>
      <div className="cart-overlay animate-fade-in" onClick={closeCart}></div>
      <div className="cart-drawer animate-slide-in-right">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <Button variant="ghost" size="icon" onClick={closeCart}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 p-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">Your cart is empty</p>
              <p className="text-muted-foreground text-center mb-6">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Button onClick={closeCart}>Continue Shopping</Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto p-4">
                {items.map(item => (
                  <div key={item.id} className="flex py-4 border-b">
                    <div className="h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={item.images[0]} 
                        alt={item.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">${item.price.toFixed(2)}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => removeItem(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center mt-3">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-10 text-center">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <Button 
                    className="w-full" 
                    size="lg"
                    asChild
                    onClick={closeCart}
                  >
                    <Link to="/checkout">Proceed to Checkout</Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    size="lg"
                    onClick={closeCart}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
