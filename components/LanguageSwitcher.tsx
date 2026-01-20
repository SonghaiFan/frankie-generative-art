import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import i18n from '../i18n';

const LanguageSwitcher: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };

  const currentLang = i18n.language || 'zh';

  return (
    <div className="fixed top-6 right-6 z-[100]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm border border-white/20 text-white hover:bg-white/5 transition-all"
        aria-label="Switch language"
      >
        <Globe size={16} />
        <span className="font-ui text-[10px] tracking-[0.2em] uppercase">
          {currentLang === 'zh' ? '中文' : 'EN'}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 mt-2 bg-black border border-white/20 shadow-lg overflow-hidden"
          >
            <button
              onClick={() => toggleLanguage('zh')}
              className={`w-full px-6 py-3 text-left font-ui text-[10px] tracking-[0.2em] uppercase transition-colors ${
                currentLang === 'zh'
                  ? 'bg-white text-black'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              中文
            </button>
            <button
              onClick={() => toggleLanguage('en')}
              className={`w-full px-6 py-3 text-left font-ui text-[10px] tracking-[0.2em] uppercase transition-colors ${
                currentLang === 'en'
                  ? 'bg-white text-black'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              ENGLISH
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
