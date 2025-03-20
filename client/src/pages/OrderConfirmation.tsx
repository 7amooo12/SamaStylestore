import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/hooks/use-cart";
import { motion } from "framer-motion";

export default function OrderConfirmation() {
  const [location] = useLocation();
  const { emptyCart } = useCart();
  
  // Check for payment_intent and payment_intent_client_secret parameters in URL
  const urlParams = new URLSearchParams(window.location.search);
  const paymentIntentParam = urlParams.get("payment_intent");
  const paymentSuccess = urlParams.get("redirect_status") === "succeeded";

  useEffect(() => {
    // If payment successful, clear the cart
    if (paymentSuccess) {
      emptyCart();
    }
  }, [paymentSuccess, emptyCart]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-12 px-4"
    >
      <div className="max-w-3xl mx-auto text-center">
        {paymentSuccess ? (
          <div className="space-y-6">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Order Confirmed!
            </h1>
            
            <p className="text-gray-300 text-lg max-w-lg mx-auto">
              Thank you for your purchase! Your order has been confirmed and is now being processed.
            </p>
            
            {paymentIntentParam && (
              <div className="bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm border border-gray-700/50 max-w-md mx-auto">
                <p className="text-gray-400 text-sm mb-1">Order Reference</p>
                <p className="font-mono text-sm">{paymentIntentParam}</p>
              </div>
            )}
            
            <div className="pt-8 space-y-4">
              <p className="text-gray-300">
                We've sent a confirmation email with all the details of your order.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <Link href="/">
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300"
                  >
                    Return to Home
                  </motion.a>
                </Link>
                
                <Link href="/shop">
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-block px-6 py-3 rounded-lg bg-gray-800 text-white font-semibold border border-gray-700 hover:bg-gray-700 transition-all duration-300"
                  >
                    Continue Shopping
                  </motion.a>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Payment Incomplete
            </h1>
            
            <p className="text-gray-300 text-lg max-w-lg mx-auto">
              It seems there was an issue with your payment. Your order has not been confirmed.
            </p>
            
            <div className="pt-8 space-y-4">              
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <Link href="/checkout">
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300"
                  >
                    Try Again
                  </motion.a>
                </Link>
                
                <Link href="/shop">
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-block px-6 py-3 rounded-lg bg-gray-800 text-white font-semibold border border-gray-700 hover:bg-gray-700 transition-all duration-300"
                  >
                    Return to Shop
                  </motion.a>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}