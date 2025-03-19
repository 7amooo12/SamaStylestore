import { apiRequest } from "./queryClient";
import { Product, CartItem } from "@shared/schema";

// Cart state interface
export interface Cart {
  items: (CartItem & { product: Product })[];
  sessionId: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

// Get cart
export async function getCart(): Promise<Cart> {
  const response = await fetch('/api/cart', {
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'sessionid': getSessionId()
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch cart');
  }
  
  const cart = await response.json();
  return cart;
}

// Add product to cart
export async function addItemToCart(productId: number, quantity: number = 1): Promise<Cart> {
  const response = await apiRequest('POST', '/api/cart', {
    productId,
    quantity,
    sessionId: getSessionId()
  });
  
  const cart = await response.json();
  return cart;
}

// Update cart item quantity
export async function updateItemQuantity(itemId: number, quantity: number): Promise<Cart> {
  const response = await apiRequest('PATCH', `/api/cart/${itemId}`, {
    quantity
  });
  
  const cart = await response.json();
  return cart;
}

// Remove item from cart
export async function removeItemFromCart(itemId: number): Promise<Cart> {
  const response = await apiRequest('DELETE', `/api/cart/${itemId}`);
  
  const cart = await response.json();
  return cart;
}

// Clear cart
export async function clearCart(): Promise<Cart> {
  const response = await apiRequest('DELETE', '/api/cart');
  
  const cart = await response.json();
  return cart;
}

// Helper function to get or create session ID
function getSessionId(): string {
  let sessionId = localStorage.getItem('cart_session_id');
  
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem('cart_session_id', sessionId);
  }
  
  return sessionId;
}

function generateSessionId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}
