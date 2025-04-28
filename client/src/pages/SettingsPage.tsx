import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [language, setLanguage] = useState("russian");

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-xl font-semibold mb-6">Настройки</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="font-medium">Профиль</h2>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Уведомления</h3>
              <p className="text-sm text-gray-500">Получать уведомления о новых акциях и предложениях</p>
            </div>
            <Switch 
              checked={notifications}
              onCheckedChange={setNotifications}
              className="data-[state=checked]:bg-primary"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Напоминания</h3>
              <p className="text-sm text-gray-500">Напоминать о предстоящих записях</p>
            </div>
            <Switch 
              checked={reminders}
              onCheckedChange={setReminders}
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
        <div className="p-4 border-b">
          <h2 className="font-medium">Приложение</h2>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Язык</h3>
              <p className="text-sm text-gray-500">Выбор языка интерфейса</p>
            </div>
            <Select 
              value={language}
              onValueChange={setLanguage}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="russian">Русский</SelectItem>
                <SelectItem value="english">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Связаться с поддержкой</h3>
            <Button className="w-full bg-primary hover:bg-primary/80 text-white">
              Написать
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
