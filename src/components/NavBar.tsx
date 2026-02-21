import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Folder, X, Home, Package, ArrowUpRight, Phone, Heart } from 'lucide-react';

interface NavBarProps {
  onMenuClick: () => void;
  isNegative: boolean;
  onToggleNegative: () => void;
  currentPage: string;
  onNavigate: (page: 'general' | 'contacts' | 'hub' | 'services') => void;
}

const NavBar: React.FC<NavBarProps> = ({
  onMenuClick,
  isNegative,
  onToggleNegative,
  currentPage,
  onNavigate
}) => {
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

  const projects = [
    { id: 'hub', label: 'Хаб', description: 'Образовательные ресурсы', url: 'https://hub.opensophy.com' }
  ];

  const handleNavigation = (page: string, url?: string) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      onNavigate(page as any);
    }
    setIsProjectsOpen(false);
  };

  const inactiveColor = isNegative ? 'text-white/50 hover:text-white' : 'text-black/40 hover:text-black';
  const borderColor = isNegative ? 'border-white/10' : 'border-black/10';
  const bgColor = isNegative ? 'bg-[#0a0a0a]/95' : 'bg-[#E8E7E3]/95';
  const modalBg = isNegative ? 'bg-[#0a0a0a] border-white/10' : 'bg-[#E8E7E3] border-black/10';
  const activeColor = isNegative ? 'text-white' : 'text-black';

  const MobileNavItem = ({
    icon,
    label,
    onClick,
  }: {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 transition-colors duration-200 ${inactiveColor}`}
    >
      <div className="w-5 h-5">{icon}</div>
      <span className="text-[9px] font-medium whitespace-nowrap">{label}</span>
    </button>
  );

  const DesktopNavItem = ({
    icon,
    label,
    onClick,
  }: {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 py-2 rounded-xl transition-colors duration-200 w-24 ${inactiveColor}`}
    >
      <div className="w-6 h-6">{icon}</div>
      <span className="text-xs font-medium whitespace-nowrap">{label}</span>
    </button>
  );

  const ProjectsModal = () => (
    <AnimatePresence>
      {isProjectsOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className={`fixed inset-0 ${isNegative ? 'bg-black/50' : 'bg-white/50'} backdrop-blur-sm`}
            onClick={() => setIsProjectsOpen(false)}
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="projects-modal-title"
            className={`relative w-full max-w-sm rounded-2xl border ${modalBg}`}
          >
            <div className={`flex items-center justify-between p-5 border-b ${borderColor}`}>
              <h3 id="projects-modal-title" className={`text-lg font-bold ${activeColor}`}>
                Проекты
              </h3>
              <button
                onClick={() => setIsProjectsOpen(false)}
                className={`p-2 rounded-lg transition-colors ${
                  isNegative
                    ? 'text-white/70 hover:text-white active:bg-white/10'
                    : 'text-black/70 hover:text-black active:bg-black/10'
                }`}
                aria-label="Закрыть проекты"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-3">
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => handleNavigation(project.id, project.url)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-colors text-left border ${
                    isNegative
                      ? 'text-white/70 hover:text-white active:bg-white/5 border-white/10'
                      : 'text-black/70 hover:text-black active:bg-black/5 border-black/10'
                  }`}
                >
                  <Package className="w-5 h-5" />
                  <div className="flex-1">
                    <div className="font-semibold text-base">{project.label}</div>
                    <div className={`text-xs mt-0.5 ${isNegative ? 'text-white/50' : 'text-black/50'}`}>
                      {project.description}
                    </div>
                  </div>
                  {project.url && (
                    <ArrowUpRight className={`w-4 h-4 ${isNegative ? 'text-white/50' : 'text-black/40'}`} />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <nav
        className={`fixed bottom-0 left-0 right-0 z-50 border-t transition-all duration-500 backdrop-blur-sm flex md:hidden
          ${bgColor} ${borderColor}`}
      >
        <div className="w-full flex items-center justify-around px-1 py-1">
          <MobileNavItem
            icon={<Home className="w-5 h-5" />}
            label="Главная"
            onClick={() => handleNavigation('general')}
          />
          <MobileNavItem
            icon={isNegative ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            label="Тема"
            onClick={onToggleNegative}
          />
          <MobileNavItem
            icon={<Folder className="w-5 h-5" />}
            label="Проекты"
            onClick={() => setIsProjectsOpen(!isProjectsOpen)}
          />
          <MobileNavItem
            icon={<Phone className="w-5 h-5" />}
            label="Контакты"
            onClick={() => handleNavigation('contacts')}
          />
          <MobileNavItem
            icon={<Heart className="w-5 h-5" />}
            label="Услуги"
            onClick={() => handleNavigation('services')}
          />
        </div>
      </nav>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 backdrop-blur-sm hidden md:block
          ${bgColor} ${borderColor}`}
      >
        <div className="w-full px-6 py-2 flex items-center justify-center gap-2">
          <DesktopNavItem
            icon={<Home className="w-6 h-6" />}
            label="Главная"
            onClick={() => handleNavigation('general')}
          />
          <DesktopNavItem
            icon={isNegative ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            label="Тема"
            onClick={onToggleNegative}
          />
          <DesktopNavItem
            icon={<Folder className="w-6 h-6" />}
            label="Проекты"
            onClick={() => setIsProjectsOpen(!isProjectsOpen)}
          />
          <DesktopNavItem
            icon={<Phone className="w-6 h-6" />}
            label="Контакты"
            onClick={() => handleNavigation('contacts')}
          />
          <DesktopNavItem
            icon={<Heart className="w-6 h-6" />}
            label="Услуги"
            onClick={() => handleNavigation('services')}
          />
        </div>
      </nav>

      <ProjectsModal />
    </>
  );
};

export default NavBar;
