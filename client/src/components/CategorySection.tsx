import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import CategoryCard from './CategoryCard';
import { Category } from '@shared/schema';

export default function CategorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { data: categories, isLoading, error } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });
  
  // Parallax effect handler
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const categoryCards = sectionRef.current.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
      const parallaxBg = card.querySelector('.parallax-bg');
      if (!parallaxBg) return;
      
      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = (x / rect.width - 0.5) * 10;
        const yPercent = (y / rect.height - 0.5) * 10;
        
        (parallaxBg as HTMLElement).style.transform = `translate(${xPercent}px, ${yPercent}px) scale(1.1)`;
      };
      
      const handleMouseLeave = () => {
        (parallaxBg as HTMLElement).style.transform = 'translate(0, 0) scale(1.1)';
      };
      
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, [categories]);
  
  return (
    <section ref={sectionRef} className="py-16 bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-bold text-3xl md:text-4xl mb-3">
            Our <span className="bg-gradient-to-r from-[#8A2BE2] via-[#1E90FF] to-[#FF1493] bg-clip-text text-transparent">Categories</span>
          </h2>
          <p className="text-white/70 max-w-xl mx-auto">
            Browse our extensive collection of modern lighting solutions for every space
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-60 bg-gray-800/20 animate-pulse rounded-xl"></div>
            ))
          ) : error ? (
            <div className="col-span-4 text-center py-10">
              <p className="text-red-400">Failed to load categories. Please try again later.</p>
            </div>
          ) : (
            categories?.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
