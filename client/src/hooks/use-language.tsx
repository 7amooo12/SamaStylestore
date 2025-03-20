import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "ar" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
  isRTL: boolean;
}

// Arabic translations
const arTranslations: Record<string, string> = {
  // Navbar
  "nav.home": "الرئيسية",
  "nav.shop": "المتجر",
  "nav.collections": "المجموعات",
  "nav.about": "من نحن",
  "nav.contact": "اتصل بنا",
  "nav.cart": "عربة التسوق",
  "nav.search": "بحث...",
  
  // Home page
  "home.hero.title": "إضاءة استثنائية لمساحات استثنائية",
  "home.hero.subtitle": "اكتشف تشكيلتنا الحصرية من الثريات والإضاءات المعاصرة",
  "home.hero.cta": "تسوق الآن",
  "home.featured.title": "منتجات مميزة",
  "home.featured.subtitle": "استكشف أحدث منتجاتنا وأكثرها مبيعًا",
  "home.categories.title": "تصفح حسب الفئة",
  "home.categories.subtitle": "اختر من بين مجموعتنا الواسعة من أنماط الإضاءة",
  "home.promo.title": "إنارة منزلك بأسلوب",
  "home.promo.text": "استمتع بخصم 20% على مجموعتنا الجديدة من الإضاءات المعاصرة. أضف لمسة من الأناقة إلى مساحتك",
  "home.promo.cta": "تسوق العروض",
  "home.newsletter.title": "انضم إلى نشرتنا البريدية",
  "home.newsletter.text": "اشترك للحصول على آخر الأخبار والعروض الحصرية والإلهام التصميمي",
  "home.newsletter.placeholder": "أدخل بريدك الإلكتروني",
  "home.newsletter.button": "اشترك",
  
  // Contact page
  "contact.title": "اتصل بنا",
  "contact.subtitle": "هل لديك أسئلة حول منتجاتنا أو تحتاج للمساعدة؟ نحن هنا للمساعدة. املأ النموذج وسنرد عليك في أقرب وقت ممكن.",
  "contact.location": "موقعنا",
  "contact.phone": "رقم الهاتف",
  "contact.email": "البريد الإلكتروني",
  "contact.hours": "ساعات العمل",
  "contact.connect": "تواصل معنا",
  "contact.form.name": "الاسم",
  "contact.form.email": "البريد الإلكتروني",
  "contact.form.phone": "الهاتف (اختياري)",
  "contact.form.message": "الرسالة",
  "contact.form.submit": "إرسال الرسالة",
  
  // About page
  "about.title": "عن سما",
  "about.subtitle": "إضاءة المساحات بأناقة وابتكار منذ عام 2010",
  "about.story.title": "قصتنا",
  "about.mission.title": "مهمتنا",
  "about.values.title": "قيمنا",
  "about.craftsmanship.title": "الحرفية",
  "about.sustainability.title": "الاستدامة",
  "about.innovation.title": "الابتكار",
  "about.team.title": "فريقنا",
  
  // Products page
  "products.title": "منتجاتنا",
  "products.filter": "تصفية",
  "products.sort": "ترتيب حسب",
  "products.currency": "د.إ",
  "products.addToCart": "أضف إلى السلة",
  
  // Collections page
  "collections.title": "المجموعات",
  "collections.subtitle": "استكشف مجموعاتنا المختارة بعناية، المصممة لتحويل أي مساحة بحلول إضاءة أنيقة ومعاصرة.",
  "collections.explore": "استكشف المجموعة",
  
  // Cart
  "cart.title": "عربة التسوق",
  "cart.empty": "عربة التسوق فارغة",
  "cart.continue": "متابعة التسوق",
  "cart.subtotal": "المجموع الفرعي",
  "cart.shipping": "الشحن",
  "cart.tax": "الضريبة",
  "cart.total": "المجموع الكلي",
  "cart.checkout": "إتمام الشراء",
  
  // Checkout
  "checkout.title": "إتمام الشراء",
  "checkout.contact": "معلومات التواصل",
  "checkout.shipping": "عنوان الشحن",
  "checkout.payment": "معلومات الدفع",
  "checkout.submit": "إتمام الطلب",
  
  // Language
  "language.switch": "English",
};

// English translations
const enTranslations: Record<string, string> = {
  // Navbar
  "nav.home": "Home",
  "nav.shop": "Shop",
  "nav.collections": "Collections",
  "nav.about": "About",
  "nav.contact": "Contact",
  "nav.cart": "Cart",
  "nav.search": "Search...",
  
  // Home page
  "home.hero.title": "Exceptional Lighting for Exceptional Spaces",
  "home.hero.subtitle": "Discover our exclusive collection of contemporary chandeliers and lighting fixtures",
  "home.hero.cta": "Shop Now",
  "home.featured.title": "Featured Products",
  "home.featured.subtitle": "Explore our latest and best-selling designs",
  "home.categories.title": "Browse by Category",
  "home.categories.subtitle": "Choose from our wide range of lighting styles",
  "home.promo.title": "Illuminate Your Home with Style",
  "home.promo.text": "Enjoy 20% off our new collection of contemporary lighting. Add a touch of elegance to your space",
  "home.promo.cta": "Shop the Sale",
  "home.newsletter.title": "Join Our Newsletter",
  "home.newsletter.text": "Subscribe for the latest news, exclusive offers, and design inspiration",
  "home.newsletter.placeholder": "Enter your email",
  "home.newsletter.button": "Subscribe",
  
  // Contact page
  "contact.title": "Contact Us",
  "contact.subtitle": "Have questions about our products or need assistance? We're here to help. Fill out the form and we'll get back to you as soon as possible.",
  "contact.location": "Our Location",
  "contact.phone": "Phone Number",
  "contact.email": "Email",
  "contact.hours": "Store Hours",
  "contact.connect": "Connect With Us",
  "contact.form.name": "Name",
  "contact.form.email": "Email",
  "contact.form.phone": "Phone (Optional)",
  "contact.form.message": "Message",
  "contact.form.submit": "Send Message",
  
  // About page
  "about.title": "About Sama",
  "about.subtitle": "Illuminating spaces with elegance and innovation since 2010",
  "about.story.title": "Our Story",
  "about.mission.title": "Our Mission",
  "about.values.title": "Our Values",
  "about.craftsmanship.title": "Craftsmanship",
  "about.sustainability.title": "Sustainability",
  "about.innovation.title": "Innovation",
  "about.team.title": "Our Team",
  
  // Products page
  "products.title": "Our Products",
  "products.filter": "Filter",
  "products.sort": "Sort by",
  "products.currency": "AED",
  "products.addToCart": "Add to Cart",
  
  // Collections page
  "collections.title": "Collections",
  "collections.subtitle": "Explore our carefully curated collections, designed to transform any space with elegant and contemporary lighting solutions.",
  "collections.explore": "Explore collection",
  
  // Cart
  "cart.title": "Shopping Cart",
  "cart.empty": "Your cart is empty",
  "cart.continue": "Continue Shopping",
  "cart.subtotal": "Subtotal",
  "cart.shipping": "Shipping",
  "cart.tax": "Tax",
  "cart.total": "Total",
  "cart.checkout": "Checkout",
  
  // Checkout
  "checkout.title": "Checkout",
  "checkout.contact": "Contact Information",
  "checkout.shipping": "Shipping Address",
  "checkout.payment": "Payment Information",
  "checkout.submit": "Complete Order",
  
  // Language
  "language.switch": "العربية",
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language");
    return (savedLanguage as Language) || "ar"; // Arabic is default
  });
  
  const isRTL = language === "ar";
  
  useEffect(() => {
    // Update HTML lang attribute
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    
    // Save to localStorage
    localStorage.setItem("language", language);
  }, [language, isRTL]);
  
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };
  
  const toggleLanguage = () => {
    setLanguageState(prev => prev === "ar" ? "en" : "ar");
  };
  
  // Translation function
  const t = (key: string): string => {
    const translations = language === "ar" ? arTranslations : enTranslations;
    return translations[key] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}