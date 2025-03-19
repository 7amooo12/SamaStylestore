import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Cart, getCart, addItemToCart, updateItemQuantity, removeItemFromCart, clearCart } from '@/lib/cart';

interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  updateCartItem: (itemId: number, quantity: number) => Promise<void>;
  removeCartItem: (itemId: number) => Promise<void>;
  emptyCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Get cart data
  const { data: cart, isLoading } = useQuery<Cart>({
    queryKey: ['/api/cart'],
    queryFn: getCart,
    enabled: mounted, // Only run after component has mounted (to access localStorage)
  });
  
  // Add to cart mutation
  const { mutateAsync: addToCartMutation } = useMutation({
    mutationFn: ({ productId, quantity }: { productId: number, quantity?: number }) => 
      addItemToCart(productId, quantity || 1),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    },
  });
  
  // Update cart item mutation
  const { mutateAsync: updateCartItemMutation } = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: number, quantity: number }) => 
      updateItemQuantity(itemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    },
  });
  
  // Remove cart item mutation
  const { mutateAsync: removeCartItemMutation } = useMutation({
    mutationFn: (itemId: number) => removeItemFromCart(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    },
  });
  
  // Clear cart mutation
  const { mutateAsync: clearCartMutation } = useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    },
  });
  
  // Wrapper functions
  const addToCart = async (productId: number, quantity?: number) => {
    await addToCartMutation({ productId, quantity });
  };
  
  const updateCartItem = async (itemId: number, quantity: number) => {
    await updateCartItemMutation({ itemId, quantity });
  };
  
  const removeCartItem = async (itemId: number) => {
    await removeCartItemMutation(itemId);
  };
  
  const emptyCart = async () => {
    await clearCartMutation();
  };
  
  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        addToCart,
        updateCartItem,
        removeCartItem,
        emptyCart,
      }}
    >
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
