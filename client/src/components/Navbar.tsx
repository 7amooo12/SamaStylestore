import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, Search, User, ShoppingBag, X } from "lucide-react";
import { useLanguage } from "@/hooks/use-language-new";

interface NavbarProps {
  onCartClick: () => void;
  cartItemsCount: number;
}

export default function Navbar({ onCartClick, cartItemsCount }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, isRTL } = useLanguage();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#0A0A0A] shadow-md" : "bg-opacity-80 backdrop-blur-md"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wider flex items-center">
          <span className="bg-gradient-to-r from-[#8A2BE2] via-[#1E90FF] to-[#FF1493] bg-clip-text text-transparent">SAMA</span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          onClick={toggleMobileMenu} 
          className="block md:hidden text-white text-xl focus:outline-none p-2"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
        
        {/* Desktop Navigation */}
        <nav className={`hidden md:flex items-center ${isRTL ? "space-x-reverse" : ""} space-x-8`}>
          <Link href="/" className="text-white font-medium tracking-wide hover:text-[#8A2BE2] transition-all duration-200">
            {t("nav.home")}
          </Link>
          <Link href="/products" className="text-white font-medium tracking-wide hover:text-[#8A2BE2] transition-all duration-200">
            {t("nav.shop")}
          </Link>
          <Link href="/collections" className="text-white font-medium tracking-wide hover:text-[#8A2BE2] transition-all duration-200">
            {t("nav.collections")}
          </Link>
          <Link href="/about" className="text-white font-medium tracking-wide hover:text-[#8A2BE2] transition-all duration-200">
            {t("nav.about")}
          </Link>
          <Link href="/contact" className="text-white font-medium tracking-wide hover:text-[#8A2BE2] transition-all duration-200">
            {t("nav.contact")}
          </Link>
        </nav>
        
        {/* Actions */}
        <div className={`flex items-center ${isRTL ? "space-x-reverse" : ""} space-x-4`}>
          <button className="text-white hover:text-[#8A2BE2] transition-colors duration-200 hidden md:block">
            <Search />
          </button>
          <button className="text-white hover:text-[#8A2BE2] transition-colors duration-200">
            <User />
          </button>
          <button 
            onClick={onCartClick} 
            className="text-white hover:text-[#8A2BE2] transition-colors duration-200 relative"
          >
            <ShoppingBag />
            {cartItemsCount > 0 && (
              <span className={`absolute -top-1 ${isRTL ? "-left-1" : "-right-1"} bg-[#FF1493] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center`}>
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="bg-[#0A0A0A] absolute top-full left-0 right-0 p-4 shadow-lg animate-fadeIn md:hidden">
          <nav className="flex flex-col space-y-4">
            <Link href="/" className="text-white font-medium tracking-wide py-2 border-b border-gray-800">
              {t("nav.home")}
            </Link>
            <Link href="/products" className="text-white font-medium tracking-wide py-2 border-b border-gray-800">
              {t("nav.shop")}
            </Link>
            <Link href="/collections" className="text-white font-medium tracking-wide py-2 border-b border-gray-800">
              {t("nav.collections")}
            </Link>
            <Link href="/about" className="text-white font-medium tracking-wide py-2 border-b border-gray-800">
              {t("nav.about")}
            </Link>
            <Link href="/contact" className="text-white font-medium tracking-wide py-2">
              {t("nav.contact")}
            </Link>
          </nav>
          <div className="mt-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder={t("search.placeholder")} 
                className="w-full bg-gray-800 bg-opacity-50 rounded-lg py-2 px-4 text-white focus:outline-none"
              />
              <button className={`absolute ${isRTL ? "left-2" : "right-2"} top-1/2 transform -translate-y-1/2 text-white`}>
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
