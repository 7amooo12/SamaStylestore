import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCartItemSchema, insertSubscriberSchema } from "@shared/schema";
import { z } from "zod";
import { nanoid } from "nanoid";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes prefix
  const API_PREFIX = "/api";
  
  // Get all categories
  app.get(`${API_PREFIX}/categories`, async (req: Request, res: Response) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });
  
  // Get category by slug
  app.get(`${API_PREFIX}/categories/:slug`, async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const category = await storage.getCategoryBySlug(slug);
      
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });
  
  // Get all products
  app.get(`${API_PREFIX}/products`, async (req: Request, res: Response) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });
  
  // Get featured products
  app.get(`${API_PREFIX}/products/featured`, async (req: Request, res: Response) => {
    try {
      const products = await storage.getFeaturedProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured products" });
    }
  });
  
  // Get product by id
  app.get(`${API_PREFIX}/products/:id`, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      
      const product = await storage.getProductById(id);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });
  
  // Get products by category
  app.get(`${API_PREFIX}/categories/:id/products`, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
      
      const products = await storage.getProductsByCategory(id);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products for category" });
    }
  });
  
  // Cart routes
  
  // Helper function to get or create session ID
  const getSessionId = (req: Request): string => {
    if (!req.headers.sessionid) {
      return nanoid();
    }
    return req.headers.sessionid as string;
  };
  
  // Get cart items
  app.get(`${API_PREFIX}/cart`, async (req: Request, res: Response) => {
    try {
      const sessionId = getSessionId(req);
      const cartItems = await storage.getCartItemsWithProducts(sessionId);
      
      // Calculate cart totals
      const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      const tax = subtotal * 0.09; // 9% tax
      const total = subtotal + tax;
      
      res.json({
        items: cartItems,
        sessionId,
        subtotal,
        tax,
        shipping: 0,
        total
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart items" });
    }
  });
  
  // Add item to cart
  app.post(`${API_PREFIX}/cart`, async (req: Request, res: Response) => {
    try {
      const sessionId = getSessionId(req);
      
      // Validate request body
      const validationResult = insertCartItemSchema.safeParse({
        ...req.body,
        sessionId
      });
      
      if (!validationResult.success) {
        return res.status(400).json({ message: "Invalid cart item data", errors: validationResult.error.errors });
      }
      
      const cartItemData = validationResult.data;
      
      // Check if product exists
      const product = await storage.getProductById(cartItemData.productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      // Check if item already exists in cart
      const existingItem = await storage.getCartItemByProductAndSession(cartItemData.productId, sessionId);
      
      if (existingItem) {
        // Update quantity instead of creating new item
        const updatedItem = await storage.updateCartItemQuantity(
          existingItem.id, 
          existingItem.quantity + (cartItemData.quantity || 1)
        );
        
        if (!updatedItem) {
          return res.status(500).json({ message: "Failed to update cart item" });
        }
        
        const cartItems = await storage.getCartItemsWithProducts(sessionId);
        
        // Calculate cart totals
        const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        const tax = subtotal * 0.09; // 9% tax
        const total = subtotal + tax;
        
        return res.json({
          items: cartItems,
          sessionId,
          subtotal,
          tax,
          shipping: 0,
          total
        });
      }
      
      // Create new cart item
      await storage.createCartItem(cartItemData);
      
      const cartItems = await storage.getCartItemsWithProducts(sessionId);
      
      // Calculate cart totals
      const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      const tax = subtotal * 0.09; // 9% tax
      const total = subtotal + tax;
      
      res.status(201).json({
        items: cartItems,
        sessionId,
        subtotal,
        tax,
        shipping: 0,
        total
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to add item to cart" });
    }
  });
  
  // Update cart item quantity
  app.patch(`${API_PREFIX}/cart/:id`, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const sessionId = getSessionId(req);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid cart item ID" });
      }
      
      // Validate request body
      const schema = z.object({
        quantity: z.number().int().positive()
      });
      
      const validationResult = schema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ message: "Invalid quantity", errors: validationResult.error.errors });
      }
      
      const { quantity } = validationResult.data;
      
      // Get cart item
      const cartItem = await storage.getCartItem(id);
      
      if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      // Ensure the cart item belongs to the session
      if (cartItem.sessionId !== sessionId) {
        return res.status(403).json({ message: "Not authorized to update this cart item" });
      }
      
      // Update quantity
      const updatedItem = await storage.updateCartItemQuantity(id, quantity);
      
      if (!updatedItem) {
        return res.status(500).json({ message: "Failed to update cart item" });
      }
      
      const cartItems = await storage.getCartItemsWithProducts(sessionId);
      
      // Calculate cart totals
      const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      const tax = subtotal * 0.09; // 9% tax
      const total = subtotal + tax;
      
      res.json({
        items: cartItems,
        sessionId,
        subtotal,
        tax,
        shipping: 0,
        total
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });
  
  // Remove item from cart
  app.delete(`${API_PREFIX}/cart/:id`, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const sessionId = getSessionId(req);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid cart item ID" });
      }
      
      // Get cart item
      const cartItem = await storage.getCartItem(id);
      
      if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      // Ensure the cart item belongs to the session
      if (cartItem.sessionId !== sessionId) {
        return res.status(403).json({ message: "Not authorized to remove this cart item" });
      }
      
      // Remove item
      const removed = await storage.removeCartItem(id);
      
      if (!removed) {
        return res.status(500).json({ message: "Failed to remove cart item" });
      }
      
      const cartItems = await storage.getCartItemsWithProducts(sessionId);
      
      // Calculate cart totals
      const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      const tax = subtotal * 0.09; // 9% tax
      const total = subtotal + tax;
      
      res.json({
        items: cartItems,
        sessionId,
        subtotal,
        tax,
        shipping: 0,
        total
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove cart item" });
    }
  });
  
  // Clear cart
  app.delete(`${API_PREFIX}/cart`, async (req: Request, res: Response) => {
    try {
      const sessionId = getSessionId(req);
      
      // Clear cart
      await storage.clearCart(sessionId);
      
      res.json({
        items: [],
        sessionId,
        subtotal: 0,
        tax: 0,
        shipping: 0,
        total: 0
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });
  
  // Subscribe to newsletter
  app.post(`${API_PREFIX}/subscribe`, async (req: Request, res: Response) => {
    try {
      // Validate email
      const validationResult = insertSubscriberSchema.safeParse({
        ...req.body,
        createdAt: new Date().toISOString()
      });
      
      if (!validationResult.success) {
        return res.status(400).json({ message: "Invalid email address", errors: validationResult.error.errors });
      }
      
      const subscriber = await storage.addSubscriber(validationResult.data);
      
      res.status(201).json({
        message: "Successfully subscribed to newsletter",
        email: subscriber.email
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  // Stripe payment route for one-time payments
  app.post(`${API_PREFIX}/create-payment-intent`, async (req: Request, res: Response) => {
    try {
      const { amount } = req.body;
      
      if (!amount || typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ message: "Invalid amount" });
      }
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      console.error("Stripe error:", error);
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
