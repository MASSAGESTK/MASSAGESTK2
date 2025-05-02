import { useState } from "react";
import { imageUrls } from "@/lib/utils";
import PromotionCard from "@/components/PromotionCard";
import CertificateModal from "@/components/CertificateModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Данные о акциях и специальных предложениях
const promotions = [
  {
    id: 1,
    title: "Скидка 10% на первое посещение",
    description: "Получите скидку 10% на любую услугу при первом посещении нашего салона. Предложение действует для новых клиентов.",
    image: imageUrls.beautyServices[0],
    badge: "Актуально",
    buttonText: "Выбрать",
  },
  {
    id: 2,
    title: "Абонемент на массаж спины",
    description: "10 сеансов классического массажа спины по специальной цене. Срок действия абонемента - 3 месяца.",
    image: imageUrls.massageTherapy[4],
    badge: "Выгода 10%",
    price: "8200₽",
    buttonText: "Приобрести",
  },
  {
    id: 3,
    title: "Подарочные сертификаты",
    description: "Порадуйте близких подарочным сертификатом на услуги нашего салона. Доступны сертификаты различного номинала.",
    image: imageUrls.massageTherapy[3],
    badge: "Актуально",
    buttonText: "Выбрать сертификат",
  },
];

const PromotionsPage = () => {
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showTelegramModal, setShowTelegramModal] = useState(false);
  const [selectedPromoId, setSelectedPromoId] = useState<number | null>(null);

  const handlePromotionClick = (id: number) => {
    setSelectedPromoId(id);
    
    // Если это сертификаты (id = 3), открываем модальное окно с сертификатами
    if (id === 3) {
      setShowCertificateModal(true);
    } else {
      // Для других акций просто открываем Телеграм-модальное окно
      setShowTelegramModal(true);
    }
  };

  const handleConfirmTelegram = () => {
    // Простое открытие Telegram бота без кодировки параметров
    window.open("https://t.me/Natali_Secrets_bot", "_blank");
    setShowTelegramModal(false);
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-xl font-semibold mb-6">Акции и предложения</h1>
      
      {/* Список акций */}
      <div className="space-y-4">
        {promotions.map((promo) => (
          <PromotionCard
            key={promo.id}
            title={promo.title}
            description={promo.description}
            image={promo.image}
            badge={promo.badge}
            price={promo.price}
            buttonText={promo.buttonText}
            onButtonClick={() => handlePromotionClick(promo.id)}
          />
        ))}
      </div>

      {/* Модальное окно с сертификатами */}
      <CertificateModal 
        isOpen={showCertificateModal} 
        onClose={() => setShowCertificateModal(false)} 
      />

      {/* Модальное окно с предупреждением о Telegram для других акций */}
      <Dialog open={showTelegramModal} onOpenChange={() => setShowTelegramModal(false)}>
        <DialogContent className="bg-card text-card-foreground rounded-lg max-w-md w-full p-4 shadow-xl dark:shadow-white/10 transition-all duration-200">
          <DialogHeader>
            <DialogTitle className="text-center text-base">
              {selectedPromoId === 1 ? "Скидка 10% на первое посещение" : "Приобретение абонемента"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-3">
            <p className="text-sm text-center text-muted-foreground">
              {selectedPromoId === 1 
                ? "Для получения скидки 10% на первое посещение вы будете перенаправлены в Telegram бот, где сможете оформить запись со скидкой."
                : "Для приобретения абонемента вы будете перенаправлены в Telegram бот, где сможете оформить покупку и получить всю необходимую информацию."}
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
    </div>
  );
};

export default PromotionsPage;
