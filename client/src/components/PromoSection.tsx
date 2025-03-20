import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

export default function PromoSection() {
  const featureItems = [
    {
      title: "Smart Lighting",
      description: "App-controlled brightness and color",
      color: "text-[#8A2BE2]"
    },
    {
      title: "Energy Efficient",
      description: "LED technology saves power",
      color: "text-[#1E90FF]"
    },
    {
      title: "Designer Crafted",
      description: "Exclusive designs you won't find elsewhere",
      color: "text-[#FF1493]"
    },
    {
      title: "5-Year Warranty",
      description: "Quality guaranteed for peace of mind",
      color: "text-[#8A2BE2]"
    }
  ];

  return (
    <section className="py-16 bg-[#121212] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-[#8A2BE2]/20 via-transparent to-transparent opacity-70"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h2 className="font-bold text-3xl md:text-4xl mb-4">
              Transform Your Space with <span className="bg-gradient-to-r from-[#8A2BE2] via-[#1E90FF] to-[#FF1493] bg-clip-text text-transparent">Light</span>
            </h2>
            <p className="text-white/80 mb-6 max-w-lg">
              Our designer lighting solutions combine form and function to elevate any interior. Create the perfect ambiance with our curated collection.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {featureItems.map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={`mr-3 ${item.color} text-xl mt-1`}>
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-white/70">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <Link href="/products" className="inline-block bg-gradient-to-r from-[#8A2BE2] to-[#1E90FF] text-white font-medium py-3 px-8 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:-translate-y-1">
              Explore Collection
            </Link>
          </div>
          
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <motion.div 
              className="relative w-full max-w-md"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {/* Stylized room scene */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-800/10 shadow-lg">
                {/* Room elements */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="w-full h-full relative">
                    {/* Wall */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] to-[#121212]"></div>
                    
                    {/* Floor */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gray-800/20"></div>
                    
                    {/* Center chandelier */}
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
                      <div className="w-1 h-12 bg-white/50"></div>
                      <div className="w-32 h-32 relative">
                        {/* Chandelier rings */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 border-2 border-[#8A2BE2]/40 rounded-full"></div>
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 border-2 border-[#1E90FF]/40 rounded-full"></div>
                        
                        {/* Light points */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#8A2BE2]/60 rounded-full blur-sm"></div>
                        <div className="absolute top-4 left-4 w-3 h-3 bg-[#1E90FF]/60 rounded-full blur-sm"></div>
                        <div className="absolute top-8 left-8 w-2 h-2 bg-[#FF1493]/60 rounded-full blur-sm"></div>
                        <div className="absolute top-12 left-12 w-3 h-3 bg-[#8A2BE2]/60 rounded-full blur-sm"></div>
                        
                        {/* Light glow */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-[#8A2BE2]/30 via-transparent to-transparent rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    
                    {/* Furniture silhouettes */}
                    <div className="absolute bottom-0 left-10 w-20 h-12 bg-gray-800/30 rounded-t-lg"></div>
                    <div className="absolute bottom-0 right-10 w-20 h-12 bg-gray-800/30 rounded-t-lg"></div>
                    <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-gray-800/30 rounded-lg"></div>
                    
                    {/* Wall sconces */}
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-4 h-8 bg-gray-800/40 rounded-l"></div>
                      <div className="absolute top-4 left-4 w-3 h-3 bg-[#1E90FF]/60 rounded-full blur-sm"></div>
                    </div>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-4 h-8 bg-gray-800/40 rounded-r"></div>
                      <div className="absolute top-4 right-4 w-3 h-3 bg-[#1E90FF]/60 rounded-full blur-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating accent elements */}
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-[#8A2BE2]/20 rounded-full blur-xl"></div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#1E90FF]/20 rounded-full blur-xl"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
