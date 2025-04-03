
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { CartProvider } from '@/hooks/use-cart';

export default function OrderConfirmation() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  const orderNumber = Math.floor(100000 + Math.random() * 900000);
  
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 flex items-center justify-center py-16">
          <div className="container max-w-2xl mx-auto px-4">
            <div className="bg-white p-8 rounded-lg border text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </div>
              
              <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
              <p className="text-muted-foreground mb-6">
                Your order has been received and is now being processed. You will receive an order 
                confirmation email shortly.
              </p>
              
              <div className="bg-muted p-6 rounded-md mb-8">
                <h2 className="font-bold text-lg mb-4">Order Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-sm text-muted-foreground">Order Number:</p>
                    <p className="font-medium">{orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date:</p>
                    <p className="font-medium">{new Date().toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Method:</p>
                    <p className="font-medium">Credit Card (****1234)</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Shipping Method:</p>
                    <p className="font-medium">Standard Shipping</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => navigate('/products')}>
                  Continue Shopping
                </Button>
                <Button variant="outline">
                  Track Your Order
                </Button>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </CartProvider>
  );
}
