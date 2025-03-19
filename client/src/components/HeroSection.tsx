import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'wouter';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    controls.start("visible");
  }, [controls]);
  
  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, delay: 0.3 } 
    }
  };
  
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, delay: 0.6 } 
    }
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, delay: 0.9 } 
    }
  };
  
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 1.2, delay: 1.2 } 
    }
  };
  
  const scrollIndicatorVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.8, delay: 1.8 } 
    }
  };
  
  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#8A2BE2]/20 via-[#1E90FF]/10 to-[#FF1493]/20"
    >
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <motion.h1
              initial="hidden"
              animate={controls}
              variants={titleVariants}
              className="font-bold text-4xl md:text-5xl lg:text-6xl mb-4"
            >
              Illuminate Your Space <br />
              <span className="bg-gradient-to-r from-[#8A2BE2] via-[#1E90FF] to-[#FF1493] bg-clip-text text-transparent">
                Brilliantly
              </span>
            </motion.h1>
            
            <motion.p
              initial="hidden"
              animate={controls}
              variants={textVariants}
              className="text-white/80 text-lg mb-8 max-w-lg"
            >
              Discover our collection of modern, stylish chandeliers and lighting solutions designed to transform your space.
            </motion.p>
            
            <motion.div
              initial="hidden"
              animate={controls}
              variants={buttonVariants}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start"
            >
              <Link href="/products" className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#8A2BE2] to-[#1E90FF] rounded-lg opacity-100 group-hover:opacity-90 transition-opacity duration-300"></div>
                <span className="relative block text-white font-medium py-3 px-8 rounded-lg transform transition-transform duration-300 group-hover:-translate-y-1">
                  Shop Now
                </span>
              </Link>
              
              <Link href="#" className="relative group">
                <div className="absolute inset-0 rounded-lg bg-[#121212] opacity-100 transition-opacity duration-300 
                  after:absolute after:inset-0 after:rounded-lg after:p-px
                  after:bg-gradient-to-r after:from-[#8A2BE2] after:via-[#1E90FF] after:to-[#FF1493]
                  after:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]
                  after:[mask-composite:exclude]"></div>
                <span className="relative block text-white font-medium py-3 px-8 rounded-lg transform transition-transform duration-300 group-hover:-translate-y-1">
                  Our Collections
                </span>
              </Link>
            </motion.div>
          </div>
          
          <motion.div
            initial="hidden"
            animate={controls}
            variants={imageVariants}
            className="md:w-1/2 flex justify-center relative"
          >
            <div className="w-64 h-64 md:w-96 md:h-96 relative">
              {/* Stylized 3D chandelier */}
              <div className="absolute inset-0 animate-rotate-slow flex items-center justify-center">
                <div className="w-full h-full relative">
                  {/* Chandelier central element */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-[#8A2BE2]/30 to-[#1E90FF]/30 rounded-full backdrop-blur-md"></div>
                  
                  {/* Chandelier rings */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-4 border-[#1E90FF]/40 rounded-full animate-pulse-slow"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-[#8A2BE2]/30 rounded-full animate-pulse-slow" style={{ animationDelay: "0.5s" }}></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-[#FF1493]/20 rounded-full animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
                  
                  {/* Light points */}
                  <div className="absolute top-1/4 left-1/2 w-4 h-4 bg-[#1E90FF] rounded-full blur-sm animate-float" style={{ animationDelay: "0.2s" }}></div>
                  <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-[#8A2BE2] rounded-full blur-sm animate-float" style={{ animationDelay: "0.5s" }}></div>
                  <div className="absolute bottom-1/4 right-1/4 w-5 h-5 bg-[#FF1493] rounded-full blur-sm animate-float" style={{ animationDelay: "0.8s" }}></div>
                  <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-[#1E90FF] rounded-full blur-sm animate-float" style={{ animationDelay: "1.1s" }}></div>
                  <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-[#8A2BE2] rounded-full blur-sm animate-float" style={{ animationDelay: "1.4s" }}></div>
                  
                  {/* Light rays */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1/3 bg-gradient-to-b from-[#8A2BE2]/80 to-transparent"></div>
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent to-[#1E90FF]/80"></div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1/3 bg-gradient-to-t from-[#FF1493]/80 to-transparent"></div>
                    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-1/3 h-1 bg-gradient-to-l from-transparent to-[#8A2BE2]/80"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <motion.div
        initial="hidden"
        animate={controls}
        variants={scrollIndicatorVariants}
        className="absolute bottom-10 left-0 right-0 flex justify-center"
      >
        <div className="animate-bounce flex flex-col items-center">
          <span className="text-sm tracking-widest text-white/70">SCROLL</span>
          <ChevronDown className="h-6 w-6" />
        </div>
      </motion.div>
    </section>
  );
}
