import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, Package, ArrowUpRight } from 'lucide-react';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onNavigate: (page: 'general' | 'contacts' | 'services' | 'others' | 'status' | 'ui-components' | 'hub' | 'about') => void;
  isNegative: boolean;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose, currentPage, onNavigate, isNegative }) => {
  const menuItems = [
    {
      id: 'main',
      label: 'Главная',
      icon: <Home className="w-6 h-6" />,
      description: 'Основные разделы',
      submenu: [
        { id: 'general', label: 'Общая информация', description: 'О проекте Opensophy' },
        { id: 'contacts', label: 'Контакты', description: 'Связаться со мной' },
        { id: 'services', label: 'Услуги', description: 'Наши услуги' }
      ]
    },
    {
      id: 'products',
      label: 'Проекты',
      icon: <Package className="w-6 h-6" />,
      description: 'Наши проекты',
      submenu: [
        { id: 'hub', label: 'Хаб', description: 'Образовательные ресурсы', url: 'https://hub.opensophy.com' }
      ]
    }
  ];

  const handleItemClick = (page: string, url?: string) => {
    if (url) {
      window.open(url, '_blank');
      onClose();
      return;
    }
    onNavigate(page as any);
    onClose();
  };

  const getMenuItemStyle = (isCurrentPage: boolean) => {
    if (isCurrentPage) {
      return isNegative ? 'bg-white/10 text-white' : 'bg-black/10 text-black';
    }
    return isNegative
      ? 'text-white/70 hover:text-white active:bg-white/5'
      : 'text-black/70 hover:text-black active:bg-black/5';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-40 backdrop-blur-sm ${
              isNegative ? 'bg-black/50' : 'bg-white/50'
            }`}
            onClick={onClose}
            aria-hidden="true"
          />
          
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 z-50 pb-20"
            role="dialog"
            aria-modal="true"
            aria-labelledby="menu-title"
          >
            <div className={`rounded-t-2xl border-t max-h-[80vh] overflow-y-auto ${
              isNegative 
                ? 'bg-[#0a0a0a] border-white/10' 
                : 'bg-[#E8E7E3] border-black/10'
            }`}>
              <div className={`sticky top-0 flex items-center justify-between p-4 border-b backdrop-blur-sm ${
                isNegative 
                  ? 'bg-[#0a0a0a]/95 border-white/10' 
                  : 'bg-[#E8E7E3]/95 border-black/10'
              }`}>
                <div>
                  <h2 id="menu-title" className={`text-xl font-bold ${
                    isNegative ? 'text-white' : 'text-black'
                  }`}>Навигация</h2>
                  <p className={`text-xs ${
                    isNegative ? 'text-white/50' : 'text-black/50'
                  }`}>Выберите раздел</p>
                </div>
                <button
                  onClick={onClose}
                  className={`p-2 rounded-lg transition-colors ${
                    isNegative 
                      ? 'text-white/70 hover:text-white active:bg-white/10' 
                      : 'text-black/70 hover:text-black active:bg-black/10'
                  }`}
                  aria-label="Закрыть меню"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-4 space-y-6">
                {menuItems.map((section) => (
                  <div key={section.id}>
                    <div className={`flex items-center gap-2 mb-3 px-2 ${
                      isNegative ? 'text-white/50' : 'text-black/50'
                    }`}>
                      {section.icon}
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        {section.label}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {section.submenu.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleItemClick(item.id, item.url)}
                          className={`w-full flex items-center gap-4 px-4 py-4 rounded-lg transition-colors text-left ${getMenuItemStyle(currentPage === item.id)}`}
                        >
                          <div className="flex-1">
                            <div className="font-semibold text-sm">{item.label}</div>
                            <div className={`text-xs ${
                              isNegative ? 'text-white/50' : 'text-black/50'
                            }`}>{item.description}</div>
                          </div>
                          {item.url && (
                            <ArrowUpRight className={`w-4 h-4 ${
                              isNegative ? 'text-white/50' : 'text-black/40'
                            }`} />
                          )}
                          {currentPage === item.id && !item.url && (
                            <div className={`w-2 h-2 rounded-full ${
                              isNegative ? 'bg-white' : 'bg-black'
                            }`} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className={`p-4 pt-2 border-t ${
                isNegative ? 'border-white/10' : 'border-black/10'
              }`}>
                <div className="text-center">
                  <p className={`text-sm font-semibold ${
                    isNegative ? 'text-white/70' : 'text-black/70'
                  }`}>Opensophy</p>
                  <p className={`text-xs ${
                    isNegative ? 'text-white/40' : 'text-black/40'
                  }`}>Open-source проекты и ресурсы для IT</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Menu;
