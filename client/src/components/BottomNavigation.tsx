import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

interface BottomNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomNavigation = ({ activeTab, setActiveTab }: BottomNavigationProps) => {
  const [location, navigate] = useLocation();

  const navItems = [
    { id: "home", label: "Главная", icon: "home", path: "/" },
    { id: "promotions", label: "Акции", icon: "card_giftcard", path: "/promotions" },
    { id: "services", label: "Услуги", icon: "spa", path: "/services" },
    { id: "settings", label: "Настройки", icon: "settings", path: "/settings" },
    { id: "about", label: "О нас", icon: "info", path: "/about" },
  ];

  const handleNavigation = (id: string, path: string) => {
    setActiveTab(id);
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3">
      <nav className="rounded-2xl bg-card/80 text-card-foreground backdrop-blur-md shadow-lg dark:shadow-white/5 w-full max-w-screen-lg mx-auto transition-colors duration-200">
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
