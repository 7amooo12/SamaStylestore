import { 
  users, type User, type InsertUser,
  categories, type Category, type InsertCategory,
  products, type Product, type InsertProduct,
  cartItems, type CartItem, type InsertCartItem,
  subscribers, type Subscriber, type InsertSubscriber
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Category methods
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Product methods
  getProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getFeaturedProducts(): Promise<Product[]>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Cart methods
  getCartItems(sessionId: string): Promise<CartItem[]>;
  getCartItemsWithProducts(sessionId: string): Promise<(CartItem & { product: Product })[]>;
  getCartItem(id: number): Promise<CartItem | undefined>;
  getCartItemByProductAndSession(productId: number, sessionId: string): Promise<CartItem | undefined>;
  createCartItem(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined>;
  removeCartItem(id: number): Promise<boolean>;
  clearCart(sessionId: string): Promise<boolean>;
  
  // Newsletter subscribers
  addSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private products: Map<number, Product>;
  private cartItems: Map<number, CartItem>;
  private subscribers: Map<number, Subscriber>;
  
  private userCurrentId: number;
  private categoryCurrentId: number;
  private productCurrentId: number;
  private cartItemCurrentId: number;
  private subscriberCurrentId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.subscribers = new Map();
    
    this.userCurrentId = 1;
    this.categoryCurrentId = 1;
    this.productCurrentId = 1;
    this.cartItemCurrentId = 1;
    this.subscriberCurrentId = 1;
    
    // Add seed data
    this.seedData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug,
    );
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryCurrentId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }
  
  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      (product) => product.slug === slug,
    );
  }
  
  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.featured,
    );
  }
  
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.categoryId === categoryId,
    );
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productCurrentId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }
  
  // Cart methods
  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      (item) => item.sessionId === sessionId,
    );
  }
  
  async getCartItemsWithProducts(sessionId: string): Promise<(CartItem & { product: Product })[]> {
    const items = await this.getCartItems(sessionId);
    return items.map(item => {
      const product = this.products.get(item.productId);
      if (!product) {
        throw new Error(`Product with id ${item.productId} not found`);
      }
      return {
        ...item,
        product,
      };
    });
  }
  
  async getCartItem(id: number): Promise<CartItem | undefined> {
    return this.cartItems.get(id);
  }
  
  async getCartItemByProductAndSession(productId: number, sessionId: string): Promise<CartItem | undefined> {
    return Array.from(this.cartItems.values()).find(
      (item) => item.productId === productId && item.sessionId === sessionId,
    );
  }
  
  async createCartItem(insertCartItem: InsertCartItem): Promise<CartItem> {
    const id = this.cartItemCurrentId++;
    const cartItem: CartItem = { ...insertCartItem, id };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }
  
  async updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined> {
    const cartItem = this.cartItems.get(id);
    if (!cartItem) return undefined;
    
    const updatedItem = { ...cartItem, quantity };
    this.cartItems.set(id, updatedItem);
    return updatedItem;
  }
  
  async removeCartItem(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }
  
  async clearCart(sessionId: string): Promise<boolean> {
    const items = await this.getCartItems(sessionId);
    items.forEach(item => this.cartItems.delete(item.id));
    return true;
  }
  
  // Newsletter subscribers
  async addSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const id = this.subscriberCurrentId++;
    const subscriber: Subscriber = { ...insertSubscriber, id };
    this.subscribers.set(id, subscriber);
    return subscriber;
  }
  
  // Seed initial data
  private seedData() {
    // Seed categories
    const categories: InsertCategory[] = [
      {
        name: "Pendant Lights",
        description: "Elegant overhead lighting solutions",
        slug: "pendant-lights",
        image: ""
      },
      {
        name: "Chandeliers",
        description: "Statement pieces for any space",
        slug: "chandeliers",
        image: ""
      },
      {
        name: "Wall Sconces",
        description: "Stylish wall-mounted options",
        slug: "wall-sconces",
        image: ""
      },
      {
        name: "Floor Lamps",
        description: "Statement standing lights",
        slug: "floor-lamps",
        image: ""
      }
    ];
    
    categories.forEach(category => {
      this.createCategory(category);
    });
    
    // Seed products
    const products: InsertProduct[] = [
      {
        name: "Nova Pendant Light",
        description: "Modern geometric pendant with LED",
        slug: "nova-pendant-light",
        price: 249.99,
        categoryId: 1,
        image: "",
        rating: 4.8,
        featured: true
      },
      {
        name: "Orbital Chandelier",
        description: "Circular modern design with 8 lights",
        slug: "orbital-chandelier",
        price: 399.99,
        categoryId: 2,
        image: "",
        rating: 4.9,
        featured: true
      },
      {
        name: "Lunar Wall Sconce",
        description: "Minimalist swing arm wall light",
        slug: "lunar-wall-sconce",
        price: 129.99,
        categoryId: 3,
        image: "",
        rating: 4.7,
        featured: true
      },
      {
        name: "Astra Floor Lamp",
        description: "Adjustable angle modern floor lamp",
        slug: "astra-floor-lamp",
        price: 179.99,
        categoryId: 4,
        image: "",
        rating: 4.6,
        featured: true
      },
      {
        name: "Stellar Pendant",
        description: "Star-inspired hanging light fixture",
        slug: "stellar-pendant",
        price: 219.99,
        categoryId: 1,
        image: "",
        rating: 4.5,
        featured: false
      },
      {
        name: "Cosmos Chandelier",
        description: "Galaxy-themed chandelier with multiple lights",
        slug: "cosmos-chandelier",
        price: 499.99,
        categoryId: 2,
        image: "",
        rating: 4.8,
        featured: false
      },
      {
        name: "Eclipse Sconce",
        description: "Modern wall light with ambient glow",
        slug: "eclipse-sconce",
        price: 149.99,
        categoryId: 3,
        image: "",
        rating: 4.6,
        featured: false
      },
      {
        name: "Nebula Floor Lamp",
        description: "Cloud-like diffused lighting floor lamp",
        slug: "nebula-floor-lamp",
        price: 239.99,
        categoryId: 4,
        image: "",
        rating: 4.7,
        featured: false
      }
    ];
    
    products.forEach(product => {
      this.createProduct(product);
    });
  }
}

export const storage = new MemStorage();
