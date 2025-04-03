
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { CartProvider, useCart } from '@/hooks/use-cart';
import { Check, CreditCard, Truck } from 'lucide-react';

export default function Checkout() {
  return (
    <CartProvider>
      <CheckoutContent />
    </CartProvider>
  );
}

function CheckoutContent() {
  const { items, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });
  
  const [step, setStep] = useState(1);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      // Validate shipping info
      if (!formData.firstName || !formData.lastName || !formData.email || 
          !formData.address || !formData.city || !formData.state || 
          !formData.zipCode || !formData.country) {
        toast.error('Please fill in all shipping information');
        return;
      }
      
      setStep(2);
      return;
    }
    
    // Validate payment info
    if (!formData.cardNumber || !formData.cardName || !formData.expiry || !formData.cvv) {
      toast.error('Please fill in all payment information');
      return;
    }
    
    // Process order
    toast.success('Order placed successfully!');
    clearCart();
    navigate('/order-confirmation');
  };
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Your Cart is Empty</h1>
            <p className="text-muted-foreground mt-2">Add some products to your cart before checking out.</p>
            <Button className="mt-4" onClick={() => navigate('/products')}>
              Continue Shopping
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="mb-6">
                <div className="flex items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center mr-2
                    ${step >= 1 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}
                  `}>
                    {step > 1 ? <Check className="h-5 w-5" /> : '1'}
                  </div>
                  <span className="font-medium">Shipping Information</span>
                  
                  <Separator className="flex-1 mx-4" />
                  
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center mr-2
                    ${step >= 2 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}
                  `}>
                    2
                  </div>
                  <span className="font-medium">Payment</span>
                </div>
              </div>
              
              <form onSubmit={handleCheckout}>
                {step === 1 ? (
                  <div className="bg-white p-6 rounded-lg border">
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                      <Truck className="mr-2 h-5 w-5" />
                      Shipping Information
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          name="firstName" 
                          value={formData.firstName} 
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          name="lastName" 
                          value={formData.lastName} 
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={formData.email} 
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address" 
                          name="address" 
                          value={formData.address} 
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input 
                          id="city" 
                          name="city" 
                          value={formData.city} 
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="state">State/Province</Label>
                        <Input 
                          id="state" 
                          name="state" 
                          value={formData.state} 
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">Zip/Postal Code</Label>
                        <Input 
                          id="zipCode" 
                          name="zipCode" 
                          value={formData.zipCode} 
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input 
                          id="country" 
                          name="country" 
                          value={formData.country} 
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Button type="submit">Continue to Payment</Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white p-6 rounded-lg border">
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                      <CreditCard className="mr-2 h-5 w-5" />
                      Payment Details
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input 
                          id="cardNumber" 
                          name="cardNumber" 
                          placeholder="1234 5678 9012 3456" 
                          value={formData.cardNumber} 
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input 
                          id="cardName" 
                          name="cardName" 
                          placeholder="John Doe" 
                          value={formData.cardName} 
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input 
                            id="expiry" 
                            name="expiry" 
                            placeholder="MM/YY" 
                            value={formData.expiry} 
                            onChange={handleChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input 
                            id="cvv" 
                            name="cvv" 
                            placeholder="123" 
                            value={formData.cvv} 
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setStep(1)}>
                        Back
                      </Button>
                      <Button type="submit">Complete Order</Button>
                    </div>
                  </div>
                )}
              </form>
            </div>
            
            <div className="lg:w-1/3">
              <div className="bg-white p-6 rounded-lg border sticky top-20">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={item.images[0]} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <div className="flex justify-between mt-1">
                          <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${(getCartTotal() + (getCartTotal() * 0.08)).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
