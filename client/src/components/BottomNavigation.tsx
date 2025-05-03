import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useCallback, useMemo } from "react";
import { navigationItems } from "@/data/navigation";
import { useAuth } from "@/hooks/use-auth";

interface BottomNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomNavigation = ({ activeTab, setActiveTab }: BottomNavigationProps) => {
  const [, navigate] = useLocation();
  const { user } = useAuth();

  // Публичные навигационные элементы
  const publicNavItems = useMemo(() => 
    navigationItems.filter(item => item.id !== 'settings'), 
    []
  );

  // Оптимизированная функция навигации с useCallback
  const handleNavigation = useCallback((id: string, path: string) => {
    setActiveTab(id);
    navigate(path);
  }, [setActiveTab, navigate]);
  
  // Обработчик авторизации/профиля
  const handleAuthNavigation = useCallback(() => {
    if (user) {
      setActiveTab('settings');
      navigate('/settings');
    } else {
      setActiveTab('auth');
      navigate('/auth');
    }
  }, [user, setActiveTab, navigate]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 py-5">
      <nav className="rounded-2xl bg-card/80 text-card-foreground backdrop-blur-md shadow-lg dark:shadow-white/5 w-full max-w-6xl mx-auto transition-colors duration-200">
        <div className="flex justify-between">
          {/* Публичные элементы навигации */}
          {publicNavItems.map((item) => (
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
          
          {/* Кнопка профиля/авторизации */}
          <button
            className={cn(
              "nav-item flex flex-col items-center justify-center py-3 flex-1 transition-colors duration-200",
              (activeTab === 'settings' || activeTab === 'auth') ? "active" : ""
            )}
            onClick={handleAuthNavigation}
          >
            <span className="material-icons">
              {user ? "account_circle" : "login"}
            </span>
            <span className="text-xs mt-1">
              {user ? "Профиль" : "Войти"}
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default BottomNavigation;
