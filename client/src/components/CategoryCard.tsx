import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import { Category } from '@shared/schema';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  return (
    <div
      ref={cardRef}
      className="category-card group relative h-60 overflow-hidden rounded-xl cursor-pointer"
    >
      <Link href={`/products?category=${category.slug}`} className="absolute inset-0">
          {/* Background layer with gradient and parallax effect */}
          <div className="absolute inset-0 bg-gray-800/30 parallax-bg transform transition-transform duration-500 group-hover:scale-110">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent"></div>
          </div>
          
          {/* Content */}
          <div className="relative h-full flex flex-col justify-end p-6 transition-all duration-300 group-hover:p-8">
            <motion.h3 
              className="font-bold text-lg mb-1 group-hover:bg-gradient-to-r group-hover:from-[#8A2BE2] group-hover:via-[#1E90FF] group-hover:to-[#FF1493] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {category.name}
            </motion.h3>
            
            <motion.p 
              className="text-white/70 text-sm mb-3 transition-all duration-300 group-hover:text-white/90"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {category.description}
            </motion.p>
            
            <motion.div 
              className="flex items-center text-xs transform translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0 }} // Keep it hidden initially, only show on hover
              viewport={{ once: true }}
            >
              <span className="font-medium text-[#1E90FF] mr-2">Shop Now</span>
              <ChevronRight className="h-3 w-3" />
            </motion.div>
          </div>
          
          {/* After element for gradient border */}
          <div className="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-r from-[#8A2BE2]/30 via-[#1E90FF]/30 to-[#FF1493]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </Link>
    </div>
  );
}
