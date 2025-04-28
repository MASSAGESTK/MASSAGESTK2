import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface ServiceDetails {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  duration: string;
  effects: string[];
}

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceDetails | null;
}

const ServiceModal = ({ isOpen, onClose, service }: ServiceModalProps) => {
  const [showTelegramModal, setShowTelegramModal] = useState(false);
  
  if (!service) return null;

  const handleBooking = () => {
    setShowTelegramModal(true);
  };

  const handleConfirmTelegram = () => {
    // Здесь можно добавить перенаправление на Telegram бота
    // window.open('https://t.me/your_bot_name', '_blank');
    setShowTelegramModal(false);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen && !showTelegramModal} onOpenChange={onClose}>
        <DialogContent className="bg-card text-card-foreground rounded-lg max-w-lg w-full overflow-hidden max-h-[90vh] flex flex-col sm:max-w-lg transition-all duration-200 shadow-xl dark:shadow-white/10">
          <DialogHeader className="border-b border-border p-3 flex justify-between items-center">
            <DialogTitle className="text-base font-medium">{service.name}</DialogTitle>
          </DialogHeader>
          
          <div className="overflow-y-auto flex-grow p-3">
            <img 
              src={service.image} 
              alt={service.name} 
              className="w-full h-48 object-cover rounded-lg mb-3 shadow-md"
            />
            <p className="text-[#FF6B35] font-semibold text-lg mb-2 drop-shadow-sm">{service.price}</p>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium mb-1 text-sm">Описание</h3>
                <p className="text-xs text-muted-foreground">{service.description}</p>
              </div>
              <div>
                <h3 className="font-medium mb-1 text-sm">Эффект</h3>
                <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-0.5">
                  {service.effects.map((effect, index) => (
                    <li key={index} className="drop-shadow-xs">{effect}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-1 text-sm">Продолжительность</h3>
                <p className="text-xs text-muted-foreground">{service.duration}</p>
              </div>
            </div>
          </div>
          
          <DialogFooter className="p-3 border-t border-border">
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-white shadow-sm hover:shadow-md transition-all"
              onClick={handleBooking}
            >
              Записаться
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Модальное окно с предупреждением о Telegram */}
      <Dialog open={showTelegramModal} onOpenChange={() => setShowTelegramModal(false)}>
        <DialogContent className="bg-card text-card-foreground rounded-lg max-w-md w-full p-4 transition-colors duration-200">
          <DialogHeader>
            <DialogTitle className="text-center text-base">Запись на услугу</DialogTitle>
          </DialogHeader>
          
          <div className="py-3">
            <p className="text-sm text-center text-muted-foreground">
              Для записи на услугу вы будете перенаправлены в Telegram бот, 
              где сможете выбрать удобное время и оформить запись.
            </p>
          </div>
          
          <DialogFooter className="flex justify-center">
            <Button 
              className="bg-primary hover:bg-primary/80 text-white w-full"
              onClick={handleConfirmTelegram}
            >
              Перейти в Telegram
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ServiceModal;
