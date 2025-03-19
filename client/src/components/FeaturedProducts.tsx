import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Category, Product } from '@shared/schema';
import ProductCard from './ProductCard';
import { useToast } from '@/hooks/use-toast';

export default function FeaturedProducts() {
  const [categoryFilter, setCategoryFilter] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState('newest');
  const { toast } = useToast();
  
  // Fetch featured products
  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/featured'],
  });
  
  // Fetch all categories for filtering
  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });
  
  // Filter and sort products
  const filteredProducts = products?.filter(product => 
    categoryFilter === null || product.categoryId === categoryFilter
  ) || [];
  
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
      default:
        return b.id - a.id;
    }
  });
  
  return (
    <section id="products" className="py-16 bg-[#121212]">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-bold text-3xl md:text-4xl mb-3">
            Featured <span className="bg-gradient-to-r from-[#8A2BE2] via-[#1E90FF] to-[#FF1493] bg-clip-text text-transparent">Products</span>
          </h2>
          <p className="text-white/70 max-w-xl mx-auto">
            Explore our selection of premium lighting fixtures
          </p>
        </div>
        
        <div className="mb-8 flex justify-center sm:justify-between items-center flex-wrap gap-4">
          <div className="flex flex-wrap gap-2">
            <button 
              className={`text-sm py-2 px-4 rounded-full transition-colors duration-200 ${
                categoryFilter === null 
                  ? 'bg-[#8A2BE2]/20 hover:bg-[#8A2BE2]/30 text-white' 
                  : 'bg-gray-800/20 hover:bg-gray-800/30 text-white'
              }`}
              onClick={() => setCategoryFilter(null)}
            >
              All
            </button>
            
            {categoriesLoading ? (
              <div className="h-8 w-24 bg-gray-800/20 animate-pulse rounded-full"></div>
            ) : (
              categories?.map(category => (
                <button 
                  key={category.id}
                  className={`text-sm py-2 px-4 rounded-full transition-colors duration-200 ${
                    categoryFilter === category.id
                      ? 'bg-[#8A2BE2]/20 hover:bg-[#8A2BE2]/30 text-white' 
                      : 'bg-gray-800/20 hover:bg-gray-800/30 text-white'
                  }`}
                  onClick={() => setCategoryFilter(category.id)}
                >
                  {category.name}
                </button>
              ))
            )}
          </div>
          
          <div className="flex items-center">
            <span className="text-white/70 text-sm mr-2">Sort by:</span>
            <select 
              className="bg-gray-800/20 text-white text-sm py-2 px-4 rounded-lg focus:outline-none"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Most Popular</option>
            </select>
          </div>
        </div>
        
        <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productsLoading ? (
            // Loading skeletons
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-gray-800/10 rounded-xl overflow-hidden">
                <div className="pt-[100%] relative">
                  <div className="absolute inset-0 bg-gray-800/20 animate-pulse"></div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-800/20 animate-pulse rounded"></div>
                  <div className="h-3 bg-gray-800/10 animate-pulse rounded w-3/4"></div>
                  <div className="flex justify-between pt-2">
                    <div className="h-5 bg-gray-800/20 animate-pulse rounded w-1/4"></div>
                    <div className="h-8 bg-gray-800/20 animate-pulse rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            ))
          ) : sortedProducts.length === 0 ? (
            <div className="col-span-full text-center py-10">
              <p className="text-white/70">No products found for the selected filter.</p>
            </div>
          ) : (
            sortedProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={() => {
                  toast({
                    title: "Added to cart",
                    description: `${product.name} has been added to your cart.`
                  });
                }}
              />
            ))
          )}
        </div>
        
        <div className="flex justify-center mt-12">
          <Link href="/products" className="relative group">
            <div className="absolute inset-0 rounded-lg bg-[#121212] 
              after:absolute after:inset-0 after:rounded-lg after:p-px
              after:bg-gradient-to-r after:from-[#8A2BE2] after:via-[#1E90FF] after:to-[#FF1493]
              after:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]
              after:[mask-composite:exclude]"></div>
            <span className="relative block text-white font-medium py-3 px-8 rounded-lg transform transition-transform duration-300 group-hover:-translate-y-1">
              View All Products
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
