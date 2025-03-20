import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define possible languages
export type Language = "ar" | "en";

// Define translation dictionary type
interface TranslationsType {
  [key: string]: {
    [key: string]: string;
  };
}

// Create translations
const translations: TranslationsType = {
  ar: {
    "nav.home": "الرئيسية",
    "nav.shop": "المتجر",
    "nav.collections": "المجموعات",
    "nav.about": "عن سما",
    "nav.contact": "اتصل بنا",
    "search.placeholder": "ابحث هنا...",
    "language.switch": "English",
    "hero.title": "إضاءة فاخرة لمساحات استثنائية",
    "hero.subtitle": "ثريات عصرية وإضاءة مبتكرة",
    "hero.cta": "تسوق الآن",
    "featured.title": "منتجات مميزة",
    "featured.subtitle": "تصاميم فاخرة مختارة خصيصاً لك",
    "categories.title": "المجموعات",
    "categories.subtitle": "استكشف مجموعاتنا المتنوعة",
    "categories.explore": "استكشف المجموعة",
    "promo.title": "خصم 20% على مجموعة الثريات الفاخرة",
    "promo.subtitle": "استخدم الكود: SAMA20",
    "newsletter.title": "اشترك في نشرتنا البريدية",
    "newsletter.subtitle": "كن أول من يعلم عن أحدث منتجاتنا وعروضنا الحصرية",
    "newsletter.placeholder": "أدخل بريدك الإلكتروني",
    "newsletter.button": "اشترك",
    "newsletter.success": "تم الاشتراك بنجاح!",
    "footer.about": "عن سما",
    "footer.about.text": "سما هي علامة تجارية رائدة في مجال الإضاءة العصرية والثريات الفاخرة، نقدم تصاميم فريدة تجمع بين الأناقة والابتكار.",
    "footer.categories": "الفئات",
    "footer.links": "روابط مهمة",
    "footer.contact": "تواصل معنا",
    "footer.rights": "جميع الحقوق محفوظة © سما للإضاءة 2025",
    "product.addToCart": "أضف إلى السلة",
    "product.outOfStock": "نفذت الكمية",
    "cart.title": "عربة التسوق",
    "cart.empty": "عربة التسوق فارغة",
    "cart.subtotal": "المجموع الفرعي",
    "cart.checkout": "إتمام الشراء",
    "cart.continue": "مواصلة التسوق",
    "about.title": "عن سما للإضاءة",
    "about.subtitle": "قصة تميز وإبداع",
    "about.history": "تاريخنا",
    "about.mission": "مهمتنا",
    "about.vision": "رؤيتنا",
    "contact.title": "اتصل بنا",
    "contact.subtitle": "نحن هنا للإجابة على استفساراتك",
    "contact.form.name": "الاسم",
    "contact.form.email": "البريد الإلكتروني",
    "contact.form.message": "الرسالة",
    "contact.form.submit": "إرسال",
    "contact.address": "العنوان",
    "contact.phone": "الهاتف",
    "contact.email": "البريد الإلكتروني",
    "contact.whatsapp": "واتساب",
    "contact.facebook": "فيسبوك",
    "contact.success": "تم إرسال رسالتك بنجاح!",
  },
  en: {
    "nav.home": "Home",
    "nav.shop": "Shop",
    "nav.collections": "Collections",
    "nav.about": "About",
    "nav.contact": "Contact",
    "search.placeholder": "Search...",
    "language.switch": "العربية",
    "hero.title": "Luxury Lighting for Exceptional Spaces",
    "hero.subtitle": "Contemporary Chandeliers & Innovative Lighting",
    "hero.cta": "Shop Now",
    "featured.title": "Featured Products",
    "featured.subtitle": "Curated luxury designs selected for you",
    "categories.title": "Collections",
    "categories.subtitle": "Explore our diverse collections",
    "categories.explore": "Explore collection",
    "promo.title": "20% OFF Luxury Chandeliers Collection",
    "promo.subtitle": "Use code: SAMA20",
    "newsletter.title": "Subscribe to Our Newsletter",
    "newsletter.subtitle": "Be the first to know about our latest products and exclusive offers",
    "newsletter.placeholder": "Enter your email",
    "newsletter.button": "Subscribe",
    "newsletter.success": "Successfully subscribed!",
    "footer.about": "About Sama",
    "footer.about.text": "Sama is a leading brand in modern lighting and luxury chandeliers, offering unique designs that combine elegance and innovation.",
    "footer.categories": "Categories",
    "footer.links": "Important Links",
    "footer.contact": "Contact Us",
    "footer.rights": "All Rights Reserved © Sama Lighting 2025",
    "product.addToCart": "Add to Cart",
    "product.outOfStock": "Out of Stock",
    "cart.title": "Shopping Cart",
    "cart.empty": "Your cart is empty",
    "cart.subtotal": "Subtotal",
    "cart.checkout": "Checkout",
    "cart.continue": "Continue Shopping",
    "about.title": "About Sama Lighting",
    "about.subtitle": "A Story of Excellence and Creativity",
    "about.history": "Our History",
    "about.mission": "Our Mission",
    "about.vision": "Our Vision",
    "contact.title": "Contact Us",
    "contact.subtitle": "We're here to answer your questions",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.message": "Message",
    "contact.form.submit": "Submit",
    "contact.address": "Address",
    "contact.phone": "Phone",
    "contact.email": "Email",
    "contact.whatsapp": "WhatsApp",
    "contact.facebook": "Facebook",
    "contact.success": "Your message has been sent successfully!",
  }
};

interface LanguageContextType {
  language: Language;
  isRTL: boolean;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'ar';
  });

  const isRTL = language === 'ar';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    if (isRTL) {
      document.body.classList.add('font-tajawal');
    } else {
      document.body.classList.remove('font-tajawal');
    }
  }, [language, isRTL]);

  const toggleLanguage = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const t = (key: string): string => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, isRTL, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}