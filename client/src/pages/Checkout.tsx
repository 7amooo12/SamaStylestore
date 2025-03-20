import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { motion } from "framer-motion";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const { cart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order-confirmation`,
        },
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Payment Successful",
          description: "Thank you for your purchase!",
        });
      }
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={!stripe || isProcessing}
        className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 disabled:opacity-70"
      >
        {isProcessing ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Processing...
          </div>
        ) : (
          "Complete Payment"
        )}
      </motion.button>
    </form>
  );
};

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const { cart } = useCart();

  useEffect(() => {
    if (cart && cart.total > 0) {
      // Create PaymentIntent as soon as the page loads
      apiRequest("POST", "/api/create-payment-intent", { amount: cart.total })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);
        })
        .catch((error) => {
          console.error("Error creating payment intent:", error);
        });
    }
  }, [cart]);

  if (!cart) {
    return (
      <div className="container mx-auto py-12 px-4 min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-400 mb-6">Add some items to your cart before checking out</p>
        <a href="/shop" className="inline-flex items-center text-primary hover:underline">
          Continue Shopping
        </a>
      </div>
    );
  }

  if (!clientSecret && cart.total > 0) {
    return (
      <div className="container mx-auto py-12 px-4 min-h-[60vh] flex justify-center items-center">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-12 px-4"
    >
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 mb-8">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={item.product.image || '/placeholder-product.jpg'} 
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.product.name}</h3>
                      <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                      <p className="text-primary text-sm">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-700 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span>{formatPrice(cart.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span>{formatPrice(cart.shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tax</span>
                  <span>{formatPrice(cart.tax)}</span>
                </div>
                <div className="flex justify-between font-semibold pt-2 border-t border-gray-700">
                  <span>Total</span>
                  <span className="text-lg">{formatPrice(cart.total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50 shadow-lg">
              <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
              
              {clientSecret ? (
                <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'night' } }}>
                  <CheckoutForm />
                </Elements>
              ) : (
                <p className="text-center text-gray-400 py-8">
                  No items in cart or payment could not be initialized
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}