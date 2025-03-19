import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Category, Product } from '@shared/schema';
import ProductCard from '@/components/ProductCard';
import { useToast } from '@/hooks/use-toast';
import { Filter, Search, ChevronDown, ChevronUp } from 'lucide-react';

export default function Products() {
  const [location] = useLocation();
  const [categoryFilter, setCategoryFilter] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { toast } = useToast();
  
  // Parse URL params
  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1]);
    const categorySlug = params.get('category');
    
    if (categorySlug) {
      // Find category ID from slug
      const category = categories?.find(c => c.slug === categorySlug);
      if (category) {
        setCategoryFilter(category.id);
      }
    }
  }, [location]);
  
  // Fetch all products
  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });
  
  // Fetch all categories for filtering
  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });
  
  // Filter products
  const filteredProducts = products?.filter(product => {
    const matchesCategory = categoryFilter === null || product.categoryId === categoryFilter;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesPrice && matchesSearch;
  }) || [];
  
  // Sort products
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
  
  // Get current category name
  const currentCategoryName = categoryFilter !== null
    ? categories?.find(c => c.id === categoryFilter)?.name || 'Products'
    : 'All Products';
  
  return (
    <div className="pt-24 pb-16 bg-[#121212] min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h1 className="font-bold text-3xl md:text-4xl mb-3">{currentCategoryName}</h1>
          <p className="text-white/70">
            Explore our collection of premium lighting solutions designed to elevate your space.
          </p>
        </div>
        
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Mobile filter toggle */}
          <div className="mb-4 lg:hidden">
            <button 
              className="w-full flex items-center justify-between bg-gray-800/20 p-3 rounded-lg"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                <span>Filters & Search</span>
              </div>
              {isFilterOpen ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
          </div>
          
          {/* Filters sidebar */}
          <div className={`lg:block ${isFilterOpen ? 'block' : 'hidden'}`}>
            <div className="bg-gray-800/10 rounded-lg p-6 sticky top-24">
              {/* Search */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Search</h3>
                <div className="relative">
                  <input 
                    type="text"
                    placeholder="Search products..."
                    className="w-full bg-gray-800/20 border border-gray-800/30 rounded-lg py-2 px-4 pr-9 text-white focus:outline-none focus:border-[#8A2BE2]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  <div 
                    className={`flex items-center cursor-pointer ${categoryFilter === null ? 'text-[#8A2BE2]' : 'text-white/70'}`}
                    onClick={() => setCategoryFilter(null)}
                  >
                    <span className={`block h-2 w-2 rounded-full mr-2 ${categoryFilter === null ? 'bg-[#8A2BE2]' : 'bg-gray-500'}`}></span>
                    <span>All Products</span>
                  </div>
                  
                  {categoriesLoading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="h-6 bg-gray-800/20 animate-pulse rounded w-3/4"></div>
                    ))
                  ) : (
                    categories?.map(category => (
                      <div 
                        key={category.id}
                        className={`flex items-center cursor-pointer ${categoryFilter === category.id ? 'text-[#8A2BE2]' : 'text-white/70'}`}
                        onClick={() => setCategoryFilter(category.id)}
                      >
                        <span className={`block h-2 w-2 rounded-full mr-2 ${categoryFilter === category.id ? 'bg-[#8A2BE2]' : 'bg-gray-500'}`}></span>
                        <span>{category.name}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input 
                    type="range"
                    min="0"
                    max="1000"
                    step="50"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-[#8A2BE2]"
                  />
                </div>
              </div>
              
              {/* Sort (Mobile Only) */}
              <div className="mb-6 lg:hidden">
                <h3 className="font-medium mb-3">Sort By</h3>
                <select 
                  className="w-full bg-gray-800/20 border border-gray-800/30 rounded-lg py-2 px-4 text-white focus:outline-none"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Most Popular</option>
                </select>
              </div>
              
              {/* Reset Filters */}
              <button 
                className="w-full bg-gray-800/30 text-white py-2 rounded-lg hover:bg-gray-800/50 transition-colors"
                onClick={() => {
                  setCategoryFilter(null);
                  setPriceRange([0, 1000]);
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Sort (Desktop) */}
            <div className="hidden lg:flex justify-end mb-6">
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
            
            {/* Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {productsLoading ? (
                // Loading skeletons
                Array.from({ length: 6 }).map((_, index) => (
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
                  <div className="mb-4">
                    <Search className="h-16 w-16 text-gray-500 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No products found</h3>
                  <p className="text-white/70 mb-4">Try adjusting your search or filter criteria.</p>
                  <button 
                    className="bg-[#8A2BE2] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                    onClick={() => {
                      setCategoryFilter(null);
                      setPriceRange([0, 1000]);
                      setSearchQuery('');
                    }}
                  >
                    Reset Filters
                  </button>
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
          </div>
        </div>
      </div>
    </div>
  );
}
