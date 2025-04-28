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
    <nav className="fixed bottom-0 w-full bg-white shadow-lg border-t border-gray-100 z-40">
      <div className="flex justify-between max-w-screen-lg mx-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={cn(
              "nav-item flex flex-col items-center justify-center py-2 flex-1",
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
  );
};

export default BottomNavigation;
