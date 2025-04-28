import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export interface ProgramDetails {
  id: number;
  title: string;
  price: string;
  description: string;
  image: string;
  duration?: string;
  features: string[];
  sessions?: string;
  additionalInfo?: string[];
}

interface ProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  program: ProgramDetails | null;
}

const ProgramModal = ({ isOpen, onClose, program }: ProgramModalProps) => {
  const [showTelegramModal, setShowTelegramModal] = useState(false);

  if (!program) return null;

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
        <DialogContent className="bg-card text-card-foreground rounded-lg max-w-md w-full shadow-xl dark:shadow-white/10 transition-all duration-200">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-semibold">
              {program.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="overflow-hidden rounded-md mb-3 shadow-md">
            <img 
              src={program.image} 
              alt={program.title} 
              className="w-full h-48 object-cover"
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                {program.duration && (
                  <Badge variant="outline" className="bg-muted/50 shadow-sm">
                    <span className="material-icons text-sm mr-1">schedule</span>
                    {program.duration}
                  </Badge>
                )}
                {program.sessions && (
                  <Badge variant="outline" className="bg-muted/50 ml-2 shadow-sm">
                    <span className="material-icons text-sm mr-1">repeat</span>
                    {program.sessions}
                  </Badge>
                )}
              </div>
              <span className="font-semibold text-[#FF6B35] text-lg drop-shadow-sm">{program.price}</span>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">{program.description}</p>
            </div>
            
            <div className="pt-2">
              <h4 className="text-sm font-medium mb-2">Процедуры включены в программу:</h4>
              <div className="space-y-1">
                {program.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <span className="material-icons text-primary text-sm mr-2 drop-shadow-sm">check_circle</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {program.additionalInfo && program.additionalInfo.length > 0 && (
              <div className="pt-2">
                <h4 className="text-sm font-medium mb-2">Дополнительно:</h4>
                <div className="space-y-1">
                  {program.additionalInfo.map((info, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <span className="material-icons text-primary text-sm mr-2 drop-shadow-sm">info</span>
                      <span>{info}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter className="flex justify-center pt-2">
            <Button 
              className="bg-primary hover:bg-primary/90 text-white w-full shadow-sm hover:shadow-md transition-all"
              onClick={handleBooking}
            >
              Получить консультацию
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Модальное окно с предупреждением о Telegram */}
      <Dialog open={showTelegramModal} onOpenChange={() => setShowTelegramModal(false)}>
        <DialogContent className="bg-card text-card-foreground rounded-lg max-w-md w-full p-4 shadow-xl dark:shadow-white/10 transition-all duration-200">
          <DialogHeader>
            <DialogTitle className="text-center text-base">Консультация по программе</DialogTitle>
          </DialogHeader>
          
          <div className="py-3">
            <p className="text-sm text-center text-muted-foreground">
              Для получения консультации и записи на программу вы будете перенаправлены в Telegram бот, 
              где сможете задать интересующие вопросы и оформить запись.
            </p>
          </div>
          
          <DialogFooter className="flex justify-center">
            <Button 
              className="bg-primary hover:bg-primary/90 text-white w-full shadow-sm hover:shadow-md transition-all"
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

export default ProgramModal;