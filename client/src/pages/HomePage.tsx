import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import ServiceCard from "@/components/ServiceCard";
import ServiceModal from "@/components/ServiceModal";
import { imageUrls } from "@/lib/utils";
import { useModal } from "@/hooks/use-modal";
import { useSafeNavigate } from "@/hooks/use-safe-navigate";
import { popularServices } from "@/data/services";
import { complexServices } from "@/data/navigation";

interface HomePageProps {
  setActiveTab: (tab: string) => void;
}

const HomePage = ({ setActiveTab }: HomePageProps) => {
  // Используем кастомные хуки
  const { navigateWithData } = useSafeNavigate();
  const telegramModal = useModal();
  
  /**
   * Обработчик клика по услуге
   */
  const handleServiceClick = useCallback((id: number) => {
    // Переход к странице услуг с сохранением ID выбранной услуги
    setActiveTab("services");
    navigateWithData("/services", { selectedServiceId: id.toString() });
  }, [setActiveTab, navigateWithData]);

  /**
   * Обработчик клика по комплексной услуге
   */
  const handleComplexServiceClick = useCallback((id: number) => {
    // Находим категорию для выбранной услуги
    const selectedService = complexServices.find(service => service.id === id);

    // Проверяем, выбраны ли абонементы
    if (selectedService?.category === "memberships") {
      setActiveTab("memberships");
      navigateWithData("/memberships");
      return;
    }

    // Для остальных категорий
    setActiveTab("services");
    
    // Передаем информацию о выбранной категории
    if (selectedService && selectedService.category) {
      navigateWithData("/services", { 
        selectedServiceCategory: selectedService.category 
      });
    } else {
      navigateWithData("/services");
    }
  }, [setActiveTab, navigateWithData]);

  /**
   * Обработчик клика по кнопке записи
   */
  const handleBooking = useCallback(() => {
    telegramModal.open();
  }, [telegramModal]);

  /**
   * Обработчик подтверждения перехода в Telegram
   */
  const handleConfirmTelegram = useCallback(() => {
    try {
      // Кодируем информацию для безопасной передачи
      const source = btoa(encodeURIComponent("main_banner"));
      const description = btoa(encodeURIComponent("Запись на консультацию"));
      
      // Безопасное открытие Telegram бота с параметрами
      window.open(
        `https://vk.com/natalisecretstop${source}_${description}`, 
        "_blank",
        "noopener,noreferrer"
      );
    } catch (error) {
      console.error("Ошибка при открытии Telegram:", error);
    }
    
    telegramModal.close();
  }, [telegramModal]);

  return (
    <div className="p-4 md:p-8">
      {/* Главный баннер */}
      <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl dark:shadow-white/15 mb-3 transition-all duration-200 transform hover:-translate-y-0">
        <img
          src={imageUrls.salonInterior[1]}
          alt="Natali Secrets Spa"
          className="w-full h-48 md:h-64 object-cover"
          loading="eager" // Приоритетная загрузка главного изображения
        />
        <div className="bg-card text-card-foreground p-4 relative transition-colors duration-200">
          <h2 className="text-lg font-medium">
            Добро пожаловать в мир красоты и релаксации
          </h2>
          <p className="text-sm text-muted-foreground mt-3">
            Профессиональные услуги для вашего здоровья и совершенства
          </p>
        </div>
      </div>

      {/* Популярные услуги */}
      <div className="mb-2">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Популярные услуги</h2>
          <span
            onClick={() => handleComplexServiceClick(1)} // 1 соответствует services в навигации
            className="text-primary text-sm font-medium cursor-pointer hover:drop-shadow-md transition-all"
          >
            Смотреть все
          </span>
        </div>

        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex space-x-4 pb-2">
            {popularServices.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                name={service.name}
                price={service.price}
                image={service.image}
                onClick={handleServiceClick}
                featured={true}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Комплексные услуги */}
      <div className="mb-0">
        <h2 className="text-lg font-semibold mb-3">Спектр услуг</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mx-auto">
          {complexServices.map((service) => (
            <div
              key={service.id}
              className="bg-primary rounded-lg p-2 text-white flex flex-col items-center justify-center w-full max-w-[120px] mx-auto aspect-square shadow-md hover:shadow-lg dark:shadow-white/10 cursor-pointer transition-all duration-200 transform hover:-translate-y-1"
              onClick={() => handleComplexServiceClick(service.id)}
            >
              <span className="material-icons text-lg mb-1 drop-shadow-sm">
                {service.icon}
              </span>
              <h3 className="text-center font-medium text-xs leading-tight">
                {service.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Модальное окно с предупреждением о Telegram */}
      <Dialog open={telegramModal.isOpen} onOpenChange={telegramModal.close}>
        <DialogContent className="bg-card text-card-foreground rounded-lg max-w-md w-full p-4 shadow-xl dark:shadow-white/10 transition-all duration-200">
          <DialogHeader>
            <DialogTitle className="text-center text-base">
              Запись на услугу
            </DialogTitle>
          </DialogHeader>

          <div className="py-3">
            <p className="text-sm text-center text-muted-foreground">
              Для записи на услугу вы будете перенаправлены в ВК, где
              сможете выбрать удобное время и оформить запись.
            </p>
          </div>

          <DialogFooter className="flex justify-center">
            <Button
              className="bg-primary hover:bg-primary/90 text-white w-full shadow-sm hover:shadow-md transition-all"
              onClick={handleConfirmTelegram}
            >
              Перейти в ВК
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomePage;
