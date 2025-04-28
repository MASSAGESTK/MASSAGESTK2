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
        <DialogContent className="bg-white rounded-lg max-w-lg w-full overflow-hidden max-h-[90vh] flex flex-col sm:max-w-lg">
          <DialogHeader className="border-b p-3 flex justify-between items-center">
            <DialogTitle className="text-base font-medium">{service.name}</DialogTitle>
          </DialogHeader>
          
          <div className="overflow-y-auto flex-grow p-3">
            <img 
              src={service.image} 
              alt={service.name} 
              className="w-full h-48 object-cover rounded-lg mb-3"
            />
            <p className="text-[#FF6B35] font-medium text-lg mb-2">{service.price}</p>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium mb-1 text-sm">Описание</h3>
                <p className="text-xs text-gray-600">{service.description}</p>
              </div>
              <div>
                <h3 className="font-medium mb-1 text-sm">Эффект</h3>
                <ul className="text-xs text-gray-600 list-disc pl-4 space-y-0.5">
                  {service.effects.map((effect, index) => (
                    <li key={index}>{effect}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-1 text-sm">Продолжительность</h3>
                <p className="text-xs text-gray-600">{service.duration}</p>
              </div>
            </div>
          </div>
          
          <DialogFooter className="p-3 border-t">
            <Button 
              className="w-full bg-primary hover:bg-primary/80 text-white"
              onClick={handleBooking}
            >
              Записаться
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Модальное окно с предупреждением о Telegram */}
      <Dialog open={showTelegramModal} onOpenChange={() => setShowTelegramModal(false)}>
        <DialogContent className="bg-white rounded-lg max-w-md w-full p-4">
          <DialogHeader>
            <DialogTitle className="text-center text-base">Запись на услугу</DialogTitle>
          </DialogHeader>
          
          <div className="py-3">
            <p className="text-sm text-center">
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
