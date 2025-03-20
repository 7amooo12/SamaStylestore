import { ReactNode, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartSidebar from "./CartSidebar";
import LanguageSwitcher from "./LanguageSwitcher";
import { useCart } from "@/hooks/use-cart";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();
  
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    if (!isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onCartClick={toggleCart} cartItemsCount={cart?.items.length || 0} />
      <main className="flex-grow">{children}</main>
      <Footer />
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
      <div className="fixed bottom-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
    </div>
  );
}
