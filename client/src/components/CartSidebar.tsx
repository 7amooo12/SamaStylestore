import { X, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, updateCartItem, removeCartItem } = useCart();
  
  const handleContinueShopping = () => {
    onClose();
  };
  
  const handleQuantityChange = (id: number, quantity: number) => {
    updateCartItem(id, quantity);
  };
  
  const handleRemoveItem = (id: number) => {
    removeCartItem(id);
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          
          {/* Cart sidebar */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-[#0A0A0A] shadow-xl z-50"
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-800/30">
                <h3 className="font-semibold">Your Cart ({cart?.items.length || 0})</h3>
                <button 
                  onClick={onClose} 
                  className="text-white hover:text-[#8A2BE2] transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              {/* Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cart?.items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="mb-4">
                      <svg className="h-16 w-16 text-gray-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                    <p className="text-white/70 mb-4">Looks like you haven't added any products to your cart yet.</p>
                    <button 
                      onClick={handleContinueShopping}
                      className="bg-[#8A2BE2] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cart?.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 bg-gray-800/10 p-3 rounded-lg">
                      <div className="w-16 h-16 bg-gray-800/20 rounded-lg flex items-center justify-center">
                        {/* Simplified chandelier visualization based on category */}
                        <div className="w-10 h-10 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            {item.product.categoryId === 1 && ( // Pendant light
                              <>
                                <div className="w-1 h-6 bg-white/50"></div>
                                <div className="absolute bottom-0 w-6 h-6 rounded-full bg-[#8A2BE2]/40"></div>
                                <div className="absolute bottom-0 w-8 h-8 rounded-full bg-[#8A2BE2]/20 animate-pulse blur-[2px]"></div>
                              </>
                            )}
                            {item.product.categoryId === 2 && ( // Chandelier
                              <>
                                <div className="w-8 h-8 border border-[#1E90FF]/40 rounded-full"></div>
                                <div className="w-6 h-6 bg-[#1E90FF]/20 rounded-full animate-pulse blur-[2px]"></div>
                              </>
                            )}
                            {item.product.categoryId === 3 && ( // Wall sconce
                              <>
                                <div className="absolute left-0 w-4 h-8 bg-gray-500/50 rounded-l"></div>
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-1 bg-white/50"></div>
                                <div className="absolute right-0 w-4 h-4 rounded-full bg-[#FF1493]/40"></div>
                                <div className="absolute right-0 w-6 h-6 rounded-full bg-[#FF1493]/20 animate-pulse blur-[2px]"></div>
                              </>
                            )}
                            {item.product.categoryId === 4 && ( // Floor lamp
                              <>
                                <div className="w-1 h-8 bg-white/50"></div>
                                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-gray-500/50 rounded"></div>
                                <div className="absolute top-0 w-6 h-6 bg-[#1E90FF]/20 rounded-full animate-pulse blur-[2px]"></div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{item.product.name}</h4>
                        <p className="text-xs text-white/70">{item.product.description}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-sm font-semibold text-[#1E90FF]">
                            {formatPrice(item.product.price)}
                          </span>
                          <div className="flex items-center space-x-2">
                            <button 
                              className="w-5 h-5 flex items-center justify-center bg-gray-800/30 rounded text-xs"
                              onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                            >
                              -
                            </button>
                            <span className="text-xs w-4 text-center">{item.quantity}</span>
                            <button 
                              className="w-5 h-5 flex items-center justify-center bg-gray-800/30 rounded text-xs"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <button 
                        className="text-white/70 hover:text-[#FF1493] transition-colors"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
              
              {/* Summary & Actions */}
              {cart?.items.length > 0 && (
                <div className="p-4 border-t border-gray-800/30 bg-gray-800/5">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Subtotal</span>
                      <span className="font-medium">{formatPrice(cart?.subtotal || 0)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Shipping</span>
                      <span className="font-medium">{formatPrice(cart?.shipping || 0)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Tax</span>
                      <span className="font-medium">{formatPrice(cart?.tax || 0)}</span>
                    </div>
                    <div className="flex justify-between font-semibold pt-2 border-t border-gray-800/30">
                      <span>Total</span>
                      <span className="bg-gradient-to-r from-[#8A2BE2] via-[#1E90FF] to-[#FF1493] bg-clip-text text-transparent">
                        {formatPrice(cart?.total || 0)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <button className="w-full bg-gradient-to-r from-[#8A2BE2] to-[#1E90FF] text-white font-medium py-3 rounded-lg hover:opacity-90 transition-all duration-200">
                      Checkout
                    </button>
                    <button 
                      onClick={handleContinueShopping} 
                      className="w-full bg-gray-800/20 text-white font-medium py-3 rounded-lg hover:bg-gray-800/30 transition-colors duration-200"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
