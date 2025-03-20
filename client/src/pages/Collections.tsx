import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Category } from "@shared/schema";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/use-language-new";

export default function Collections() {
  const { t, isRTL } = useLanguage();
  const { data: categories, isLoading, error } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-20 min-h-screen flex justify-center items-center">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (error || !categories) {
    return (
      <div className="container mx-auto py-20 min-h-screen">
        <h1 className="text-3xl font-bold text-center">Error loading collections</h1>
        <p className="text-center mt-4">Please try again later</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-12 px-4"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500">
          {t("nav.collections")}
        </h1>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          {t("categories.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group"
          >
            <Link href={`/categories/${category.slug}`}>
              <div className="overflow-hidden rounded-xl bg-gray-800/50 shadow-xl shadow-gray-900/20 backdrop-blur-sm border border-gray-700/50 cursor-pointer relative">
                <div className="h-72 overflow-hidden">
                  <img
                    src={category.image || '/placeholder-category.jpg'}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="p-6 absolute bottom-0 left-0 right-0">
                  <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-gray-300 mb-4 line-clamp-2">{category.description}</p>
                  <motion.div 
                    className="inline-flex items-center gap-2 text-primary"
                    whileHover={{ x: isRTL ? -5 : 5 }}
                  >
                    {t("categories.explore")} <span className="text-lg">{isRTL ? "←" : "→"}</span>
                  </motion.div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}