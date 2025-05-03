import { useState, useCallback } from "react";
import PromotionCard from "@/components/PromotionCard";
import CertificateModal from "@/components/CertificateModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import { promotions } from "@/data/promotions";

const PromotionsPage = () => {
  // Используем наш хук для управления модальными окнами
  const { isOpen: showCertificateModal, open: openCertificateModal, close: closeCertificateModal } = useModal();
  const { 
    isOpen: showTelegramModal, 
    open: openTelegramModal, 
    close: closeTelegramModal, 
    data: selectedPromoId 
  } = useModal<number | null>(null);

  // Мемоизированная функция обработки клика по акции
  const handlePromotionClick = useCallback((id: number) => {    
    // Если это сертификаты (id = 3), открываем модальное окно с сертификатами
    if (id === 3) {
      openCertificateModal();
    } else {
      // Для других акций открываем Телеграм-модальное окно
      openTelegramModal(id);
    }
  }, [openCertificateModal, openTelegramModal]);

  // Мемоизированная функция обработки подтверждения перехода в Telegram
  const handleConfirmTelegram = useCallback(() => {
    // Простое открытие Telegram бота без кодировки параметров
    window.open("https://t.me/Natali_Secrets_bot", "_blank");
    closeTelegramModal();
  }, [closeTelegramModal]);

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
        onClose={closeCertificateModal} 
      />

      {/* Модальное окно с предупреждением о Telegram для других акций */}
      <Dialog open={showTelegramModal} onOpenChange={closeTelegramModal}>
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
