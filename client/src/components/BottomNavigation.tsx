import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useCallback, useMemo } from "react";
import { navigationItems } from "@/data/navigation";

interface BottomNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomNavigation = ({ activeTab, setActiveTab }: BottomNavigationProps) => {
  const [, navigate] = useLocation();

  // Используем useMemo для предотвращения лишних перерисовок
  const navItems = useMemo(() => navigationItems, []);

  // Оптимизированная функция навигации с useCallback
  const handleNavigation = useCallback((id: string, path: string) => {
    setActiveTab(id);
    navigate(path);
  }, [setActiveTab, navigate]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 py-5">
      <nav className="rounded-2xl bg-card/80 text-card-foreground backdrop-blur-md shadow-lg dark:shadow-white/5 w-full max-w-6xl mx-auto transition-colors duration-200">
        <div className="flex justify-between">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={cn(
                "nav-item flex flex-col items-center justify-center py-3 flex-1 transition-colors duration-200",
                activeTab === item.id ? "active" : ""
              )}
              onClick={() => handleNavigation(item.id, item.path)}
            >
              <span className="material-icons">{item.icon}</span>
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default BottomNavigation;
