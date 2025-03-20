import { useLanguage } from "@/hooks/use-language-2";
import { motion } from "framer-motion";
import { FaGlobe } from "react-icons/fa";

export default function LanguageSwitcher() {
  const { toggleLanguage, t, isRTL } = useLanguage();

  return (
    <motion.button
      className="lang-switcher"
      dir={isRTL ? "rtl" : "ltr"}
      onClick={toggleLanguage}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <FaGlobe className="text-lg" />
      <span className="font-medium">{t("language.switch")}</span>
    </motion.button>
  );
}