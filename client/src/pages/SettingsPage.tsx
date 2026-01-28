import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Предотвращаем рендеринг компонента до монтирования на клиенте
  // Это нужно для предотвращения расхождений с сервером
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  if (!mounted) return null;

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-xl font-semibold mb-6">Настройки</h1>
      
      <div className="bg-card rounded-lg shadow-md dark:shadow-white/5 overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="font-medium">Профиль</h2>
        </div>
      </div>
      
      <div className="bg-card rounded-lg shadow-md dark:shadow-white/5 overflow-hidden mt-6">
        <div className="p-4 border-b border-border">
          <h2 className="font-medium">Приложение</h2>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Тёмная тема</h3>
              <p className="text-sm text-muted-foreground">Включить тёмный интерфейс</p>
            </div>
            <Switch 
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
