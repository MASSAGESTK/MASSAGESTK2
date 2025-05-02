import { useState } from "react";
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

// Типы сертификатов
export interface Certificate {
  id: number;
  title: string;
  description: string;
  price: string;
  type: "service" | "amount" | "program";
}

// Данные о доступных сертификатах
export const certificates: Certificate[] = [
  {
    id: 1,
    title: "Сертификат на уходовые процедуры",
    description: "Подарочный сертификат на любую уходовую процедуру для лица",
    price: "3000₽",
    type: "service"
  },
  {
    id: 2,
    title: "Сертификат на SPA-массаж",
    description: "Подарочный сертификат на расслабляющий спа-массаж",
    price: "2500₽",
    type: "service"
  },
  {
    id: 3,
    title: "Сертификат на 5000₽",
    description: "Подарочный сертификат номиналом 5000₽ на любые услуги салона",
    price: "5000₽",
    type: "amount"
  },
  {
    id: 4,
    title: "Сертификат на 10000₽",
    description: "Подарочный сертификат номиналом 10000₽ на любые услуги салона",
    price: "10000₽",
    type: "amount"
  },
  {
    id: 5,
    title: "Сертификат на программу коррекции фигуры",
    description: "Подарочный сертификат на комплексную программу коррекции фигуры (5 сеансов)",
    price: "17000₽",
    type: "program"
  }
];

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CertificateModal = ({ isOpen, onClose }: CertificateModalProps) => {
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [showTelegramModal, setShowTelegramModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  const filteredCertificates = selectedTab === "all" 
    ? certificates 
    : certificates.filter(cert => cert.type === selectedTab);

  const handleCertificateSelect = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setShowTelegramModal(true);
  };

  const handleConfirmTelegram = () => {
    // Простое открытие Telegram бота без кодировки параметров
    window.open("https://t.me/Natali_Secrets_bot", "_blank");
    setShowTelegramModal(false);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen && !showTelegramModal} onOpenChange={onClose}>
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
      <Dialog open={showTelegramModal} onOpenChange={() => setShowTelegramModal(false)}>
        <DialogContent className="bg-card text-card-foreground rounded-lg max-w-md w-full p-4 shadow-xl dark:shadow-white/10 transition-all duration-200">
          <DialogHeader>
            <DialogTitle className="text-center text-base">Приобретение сертификата</DialogTitle>
          </DialogHeader>
          
          <div className="py-3">
            {selectedCertificate && (
              <div className="mb-4 text-center">
                <p className="font-medium text-sm mb-1">{selectedCertificate.title}</p>
                <p className="text-[#FF6B35] font-semibold">{selectedCertificate.price}</p>
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