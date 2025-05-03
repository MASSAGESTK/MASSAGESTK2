import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useModal } from "@/hooks/use-modal";
import { certificates } from "@/data/certificates";

// Типы сертификатов
export interface Certificate {
  id: number;
  title: string;
  description: string;
  price: string;
  type: "service" | "amount" | "program";
}

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CertificateModal = ({ isOpen, onClose }: CertificateModalProps) => {
  // Состояние вкладки
  const [selectedTab, setSelectedTab] = useState<string>("all");
  
  // Используем хук для управления модальным окном Telegram
  const telegramModal = useModal<Certificate>();
  
  // Фильтрация сертификатов по выбранной вкладке с помощью useMemo для оптимизации
  const filteredCertificates = useMemo(() => 
    selectedTab === "all" 
      ? certificates 
      : certificates.filter(cert => cert.type === selectedTab),
    [selectedTab]
  );

  // Обработчик выбора сертификата с оптимизацией через useCallback
  const handleCertificateSelect = useCallback((certificate: Certificate) => {
    telegramModal.open(certificate);
  }, [telegramModal]);

  // Обработчик подтверждения перехода в Telegram с оптимизацией через useCallback
  const handleConfirmTelegram = useCallback(() => {
    // Безопасное открытие Telegram бота
    if (telegramModal.data) {
      try {
        // Использование безопасного метода открытия URL с настройками безопасности
        const telegramUrl = "https://t.me/Natali_Secrets_bot";
        window.open(telegramUrl, "_blank", "noopener,noreferrer");
      } catch (error) {
        console.error("Ошибка при открытии Telegram:", error);
      }
    }
    telegramModal.close();
    onClose();
  }, [telegramModal, onClose]);

  return (
    <>
      <Dialog open={isOpen && !telegramModal.isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-card text-card-foreground rounded-lg max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden shadow-xl dark:shadow-white/10 transition-all duration-200">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="text-center text-lg font-semibold">
              Подарочные сертификаты
            </DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab} className="w-full flex-shrink-0">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="service">На услуги</TabsTrigger>
              <TabsTrigger value="amount">На сумму</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="overflow-y-auto flex-grow pr-1 scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
            <div className="space-y-4 pb-2">
              {filteredCertificates.map((certificate) => (
                <div 
                  key={certificate.id} 
                  className="bg-background rounded-lg p-4 shadow-md hover:shadow-lg dark:shadow-white/5 transition-all duration-200 transform hover:-translate-y-0.5 border border-border"
                >
                  <div className="flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-sm">{certificate.title}</h3>
                      <Badge variant="secondary" className="ml-2">
                        {certificate.price}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{certificate.description}</p>
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="bg-primary hover:bg-primary/90 text-white w-full shadow-sm hover:shadow-md transition-all"
                      onClick={() => handleCertificateSelect(certificate)}
                    >
                      Выбрать
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Модальное окно с предупреждением о Telegram */}
      <Dialog open={telegramModal.isOpen} onOpenChange={telegramModal.close}>
        <DialogContent className="bg-card text-card-foreground rounded-lg max-w-md w-full p-4 shadow-xl dark:shadow-white/10 transition-all duration-200">
          <DialogHeader>
            <DialogTitle className="text-center text-base">Приобретение сертификата</DialogTitle>
          </DialogHeader>
          
          <div className="py-3">
            {telegramModal.data && (
              <div className="mb-4 text-center">
                <p className="font-medium text-sm mb-1">{telegramModal.data.title}</p>
                <p className="text-[#FF6B35] font-semibold">{telegramModal.data.price}</p>
              </div>
            )}
            <p className="text-sm text-center text-muted-foreground">
              Для приобретения подарочного сертификата вы будете перенаправлены в Telegram бот, 
              где сможете оформить заказ и получить электронный или физический сертификат.
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

export default CertificateModal;