import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Product } from "@shared/schema";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/hooks/use-cart";
import { motion } from "framer-motion";

export default function Shop() {
  const { addToCart } = useCart();
  
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-20 min-h-screen flex justify-center items-center">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (error || !products) {
    return (
      <div className="container mx-auto py-20 min-h-screen">
        <h1 className="text-3xl font-bold text-center">Error loading products</h1>
        <p className="text-center mt-4">Please try again later</p>
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
      <div className="flex flex-col gap-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500">
            Our Collection
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Explore our exclusive collection of premium lighting solutions designed to transform any space into a masterpiece of illumination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ProductCard
                product={product}
                onAddToCart={() => addToCart(product.id)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}