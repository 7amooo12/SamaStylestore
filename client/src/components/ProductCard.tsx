import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, RefreshCw, Expand, Star } from 'lucide-react';
import { Product } from '@shared/schema';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    setIsAdding(true);
    
    addToCart(product.id);
    
    onAddToCart();
    
    setTimeout(() => {
      setIsAdding(false);
    }, 1500);
  };
  
  // Determine product visualization based on category
  const renderProductVisualization = () => {
    switch (product.categoryId) {
      case 1: // Pendant Light
        return (
          <div className="w-40 h-40 relative transform transition-transform duration-500 group-hover:scale-110">
            {/* Simplified pendant light shape */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-12 bg-white/70"></div>
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/70"></div>
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#8A2BE2]/40"></div>
            
            {/* Light elements */}
            <div className="absolute top-12 left-4 w-1 h-16 bg-white/70"></div>
            <div className="absolute top-12 left-12 w-1 h-16 bg-white/70"></div>
            <div className="absolute top-12 right-12 w-1 h-16 bg-white/70"></div>
            <div className="absolute top-12 right-4 w-1 h-16 bg-white/70"></div>
            
            {/* Light bulbs */}
            <div className="absolute bottom-12 left-4 w-3 h-3 rounded-full bg-[#1E90FF]/80 blur-[2px]"></div>
            <div className="absolute bottom-12 left-12 w-3 h-3 rounded-full bg-[#8A2BE2]/80 blur-[2px]"></div>
            <div className="absolute bottom-12 right-12 w-3 h-3 rounded-full bg-[#FF1493]/80 blur-[2px]"></div>
            <div className="absolute bottom-12 right-4 w-3 h-3 rounded-full bg-[#1E90FF]/80 blur-[2px]"></div>
          </div>
        );
      case 2: // Chandelier
        return (
          <div className="w-40 h-40 relative transform transition-transform duration-500 group-hover:scale-110">
            {/* Simplified chandelier shape */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-white/70"></div>
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full border-2 border-white/30"></div>
            
            {/* Light elements in circular pattern */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#8A2BE2]/40"></div>
            
            {/* 8 hanging elements evenly spaced in a circle */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-16 bg-white/70"></div>
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-16 h-1 bg-white/70"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-16 bg-white/70"></div>
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-16 h-1 bg-white/70"></div>
              
              {/* Light bulbs */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3 w-3 h-3 rounded-full bg-[#FF1493]/80 blur-[2px]"></div>
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-3 w-3 h-3 rounded-full bg-[#1E90FF]/80 blur-[2px]"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3 w-3 h-3 rounded-full bg-[#8A2BE2]/80 blur-[2px]"></div>
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-3 w-3 h-3 rounded-full bg-[#FF1493]/80 blur-[2px]"></div>
            </div>
          </div>
        );
      case 3: // Wall Sconce
        return (
          <div className="w-40 h-40 relative transform transition-transform duration-500 group-hover:scale-110">
            {/* Simplified wall sconce shape */}
            <div className="absolute left-1/3 top-1/2 transform -translate-y-1/2 w-8 h-16 bg-gray-500/50 rounded-l"></div>
            <div className="absolute left-1/3 top-1/2 transform -translate-y-1/2 translate-x-8 w-16 h-1 bg-white/70"></div>
            <div className="absolute left-1/3 top-1/2 transform -translate-y-1/2 translate-x-24 w-6 h-6 rounded-full bg-[#1E90FF]/40"></div>
            <div className="absolute left-1/3 top-1/2 transform -translate-y-1/2 translate-x-24 w-8 h-8 rounded-full bg-[#1E90FF]/20 animate-pulse blur-[4px]"></div>
          </div>
        );
      case 4: // Floor Lamp
      default:
        return (
          <div className="w-40 h-40 relative transform transition-transform duration-500 group-hover:scale-110">
            {/* Simplified floor lamp shape */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-2 bg-gray-500/50 rounded"></div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-28 bg-white/70"></div>
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-1 h-10 bg-white/70 rotate-45 origin-bottom"></div>
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 translate-x-7 w-6 h-6 rounded-full bg-[#FF1493]/40"></div>
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 translate-x-7 w-8 h-8 rounded-full bg-[#FF1493]/20 animate-pulse blur-[4px]"></div>
          </div>
        );
    }
  };
  
  return (
    <motion.div 
      className="group relative bg-gray-800/10 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg product-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="relative pt-[100%] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-br from-[#8A2BE2]/5 to-[#1E90FF]/5"></div>
          {/* Mock chandelier image */}
          <div className="absolute inset-0 flex items-center justify-center">
            {renderProductVisualization()}
          </div>
        </div>
        
        {/* Quick actions */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 transform translate-x-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <button className="w-8 h-8 bg-[#121212] rounded-full flex items-center justify-center text-white hover:text-[#8A2BE2] transition-colors">
            <Heart className="h-4 w-4" />
          </button>
          <button className="w-8 h-8 bg-[#121212] rounded-full flex items-center justify-center text-white hover:text-[#8A2BE2] transition-colors">
            <RefreshCw className="h-4 w-4" />
          </button>
          <button className="w-8 h-8 bg-[#121212] rounded-full flex items-center justify-center text-white hover:text-[#8A2BE2] transition-colors">
            <Expand className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-sm">{product.name}</h3>
          <div className="flex items-center">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-xs ml-1">{product.rating.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-xs text-white/70 mb-3">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-[#1E90FF]">{formatPrice(product.price)}</span>
          <button 
            onClick={handleAddToCart}
            className={`bg-[#121212] hover:bg-[#8A2BE2] text-xs py-2 px-3 rounded-lg transition-colors duration-200 ${isAdding ? 'bg-[#8A2BE2]' : ''}`}
            disabled={isAdding}
          >
            {isAdding ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
