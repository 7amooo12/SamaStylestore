import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] pt-16 pb-8 border-t border-gray-800/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="text-2xl font-bold tracking-wider flex items-center mb-4">
              <span className="bg-gradient-to-r from-[#8A2BE2] via-[#1E90FF] to-[#FF1493] bg-clip-text text-transparent">SAMA</span>
            </Link>
            <p className="text-white/70 text-sm mb-6">
              Elevate your space with our designer lighting solutions. Modern, elegant, and energy-efficient options for every interior.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-[#8A2BE2] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-[#8A2BE2] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-[#8A2BE2] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-[#8A2BE2] transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-sm text-white/70 hover:text-[#8A2BE2] transition-colors">All Products</Link></li>
              <li><Link href="#" className="text-sm text-white/70 hover:text-[#8A2BE2] transition-colors">Chandeliers</Link></li>
              <li><Link href="#" className="text-sm text-white/70 hover:text-[#8A2BE2] transition-colors">Pendant Lights</Link></li>
              <li><Link href="#" className="text-sm text-white/70 hover:text-[#8A2BE2] transition-colors">Wall Sconces</Link></li>
              <li><Link href="#" className="text-sm text-white/70 hover:text-[#8A2BE2] transition-colors">Floor Lamps</Link></li>
              <li><Link href="#" className="text-sm text-white/70 hover:text-[#8A2BE2] transition-colors">Table Lamps</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-white/70 hover:text-[#8A2BE2] transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-sm text-white/70 hover:text-[#8A2BE2] transition-colors">Design Studio</Link></li>
              <li><Link href="#" className="text-sm text-white/70 hover:text-[#8A2BE2] transition-colors">Sustainability</Link></li>
              <li><Link href="#" className="text-sm text-white/70 hover:text-[#8A2BE2] transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-sm text-white/70 hover:text-[#8A2BE2] transition-colors">Press</Link></li>
              <li><Link href="#" className="text-sm text-white/70 hover:text-[#8A2BE2] transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-white/70 hover:text-[#8A2BE2] transition-colors">Help Center</Link></li>
              <li><Link href="#" className="text-sm text-white/70 hover:text-[#8A2BE2] transition-colors">Shipping & Returns</Link></li>
              <li><Link href="#" className="text-sm text-white/70 hover:text-[#8A2BE2] transition-colors">Warranty</Link></li>
              <li><Link href="#" className="text-sm text-white/70 hover:text-[#8A2BE2] transition-colors">Care & Maintenance</Link></li>
              <li><Link href="#" className="text-sm text-white/70 hover:text-[#8A2BE2] transition-colors">FAQs</Link></li>
              <li><Link href="#" className="text-sm text-white/70 hover:text-[#8A2BE2] transition-colors">Track Order</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800/30 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-white/50 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Sama Lighting. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-xs text-white/50 hover:text-[#8A2BE2] transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-white/50 hover:text-[#8A2BE2] transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-xs text-white/50 hover:text-[#8A2BE2] transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
