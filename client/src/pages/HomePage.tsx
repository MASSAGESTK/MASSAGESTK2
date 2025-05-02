import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import ServiceCard from "@/components/ServiceCard";
import ServiceModal, { ServiceDetails } from "@/components/ServiceModal";
import { imageUrls } from "@/lib/utils";

const popularServices = [
  {
    id: 1,
    name: "Комбинированная чистка лица",
    price: "2700₽",
    image: imageUrls.beautyServices[1],
  },
  {
    id: 6,
    name: "Антицеллюлитный массаж",
    price: "1200₽",
    image: imageUrls.massageTherapy[0],
  },
  {
    id: 7,
    name: "Расслабляющий спа массаж",
    price: "2000₽",
    image: imageUrls.spaServices[1],
  },
];

const complexServices = [
  { id: 1, title: "Уход за кожей", icon: "spa", category: "cosmetology" },
  { id: 2, title: "Мужской уход", icon: "face", category: "men" },
  {
    id: 3,
    title: "SPA-программы",
    icon: "self_improvement",
    category: "massage",
  },
  {
    id: 4,
    title: "Коррекция фигуры",
    icon: "auto_awesome",
    category: "bodyCorrection",
  },
  {
    id: 5,
    title: "Комплексные программы",
    icon: "dashboard",
    category: "complex",
  },
  {
    id: 6,
    title: "Абонементы",
    icon: "card_membership",
    category: "memberships",
  },
];

// Полные данные о всех услугах с эффектами
const serviceDetailsMap: Record<number, ServiceDetails> = {
  1: {
    id: 1,
    name: "Комбинированная чистка лица",
    price: "2700₽",
    description:
      "Комбинированная чистка лица - это процедура глубокого очищения кожи, которая сочетает в себе механическое удаление загрязнений и использование специальных средств для более эффективного результата.",
    image: imageUrls.beautyServices[0],
    duration: "60 минут",
    effects: [
      "Глубокое очищение пор",
      "Удаление комедонов и загрязнений",
      "Выравнивание текстуры кожи",
      "Улучшение цвета лица",
      "Подготовка кожи к дальнейшим процедурам",
    ],
  },
  2: {
    id: 2,
    name: "Пилинг омолаживающий",
    price: "2500₽",
    description:
      "Омолаживающий пилинг помогает отшелушить верхний слой клеток кожи, стимулируя обновление и регенерацию тканей для более молодого и свежего вида.",
    image: imageUrls.beautyServices[1],
    duration: "45 минут",
    effects: [
      "Омоложение кожи",
      "Уменьшение морщин",
      "Выравнивание тона кожи",
      "Стимуляция выработки коллагена",
      "Улучшение текстуры кожи",
    ],
  },
  3: {
    id: 3,
    name: "Антицеллюлитный массаж",
    price: "1200₽",
    description:
      "Интенсивный массаж, направленный на разбивание жировых отложений и улучшение кровообращения в проблемных зонах.",
    image: imageUrls.massageTherapy[0],
    duration: "45 минут",
    effects: [
      "Уменьшение целлюлита",
      "Улучшение кровообращения",
      "Повышение упругости кожи",
      "Выведение лишней жидкости",
      "Улучшение обмена веществ в тканях",
    ],
  },
  4: {
    id: 4,
    name: "Спа массаж",
    price: "2000₽",
    description:
      "Расслабляющий массаж с использованием ароматических масел для полного расслабления тела и разума.",
    image: imageUrls.spaServices[1],
    duration: "60 минут",
    effects: [
      "Снятие стресса",
      "Глубокое расслабление",
      "Улучшение сна",
      "Снятие мышечного напряжения",
      "Повышение общего тонуса организма",
    ],
  },
  5: {
    id: 5,
    name: "Микротоковая терапия",
    price: "3200₽",
    description:
      "Аппаратная процедура, при которой используются слабые электрические импульсы для стимуляции клеток кожи и мышц лица.",
    image: imageUrls.beautyServices[2],
    duration: "40 минут",
    effects: [
      "Лифтинг-эффект",
      "Улучшение тонуса кожи",
      "Уменьшение отечности",
      "Разглаживание мелких морщин",
      "Стимуляция обменных процессов",
    ],
  },
  6: {
    id: 6,
    name: "Антицеллюлитный массаж",
    price: "1200₽",
    description:
      "Интенсивный массаж, направленный на разбивание жировых отложений и улучшение кровообращения в проблемных зонах.",
    image: imageUrls.massageTherapy[0],
    duration: "45 минут",
    effects: [
      "Уменьшение целлюлита",
      "Улучшение кровообращения",
      "Повышение упругости кожи",
      "Выведение лишней жидкости",
      "Улучшение обмена веществ в тканях",
    ],
  },
  7: {
    id: 7,
    name: "Расслабляющий спа массаж",
    price: "2000₽",
    description:
      "Расслабляющий массаж с использованием ароматических масел для полного расслабления тела и разума.",
    image: imageUrls.spaServices[1],
    duration: "60 минут",
    effects: [
      "Снятие стресса",
      "Глубокое расслабление",
      "Улучшение сна",
      "Снятие мышечного напряжения",
      "Повышение общего тонуса организма",
    ],
  },
  8: {
    id: 8,
    name: "Мужской уход за лицом",
    price: "2300₽",
    description:
      "Специальная программа ухода за мужской кожей, учитывающая особенности и потребности мужской кожи.",
    image: imageUrls.spaServices[0],
    duration: "50 минут",
    effects: [
      "Глубокое очищение",
      "Увлажнение кожи",
      "Снятие раздражения",
      "Тонизация кожи",
      "Защита от негативных внешних факторов",
    ],
  },
};

interface HomePageProps {
  setActiveTab: (tab: string) => void;
}

const HomePage = ({ setActiveTab }: HomePageProps) => {
  const [, navigate] = useLocation();
  const [selectedService, setSelectedService] = useState<ServiceDetails | null>(
    null,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [showTelegramModal, setShowTelegramModal] = useState(false);

  const handleServiceClick = (id: number) => {
    // Переход к странице услуг и передача ID выбранной услуги
    setActiveTab("services");
    
    // Сохраняем ID выбранной услуги в sessionStorage, чтобы открыть её на странице услуг
    sessionStorage.setItem("selectedServiceId", id.toString());
    
    // Переходим на страницу услуг
    navigate("/services");
  };

  const handleComplexServiceClick = (id: number) => {
    // Находим категорию для выбранной услуги
    const selectedService = complexServices.find(
      (service) => service.id === id,
    );

    // Проверяем, выбраны ли абонементы
    if (selectedService?.category === "memberships") {
      // Для абонементов переходим на специальную страницу
      setActiveTab("memberships");
      navigate("/memberships");
      return;
    }

    // Для остальных категорий
    // Устанавливаем активную вкладку "services" и перенаправляем на страницу услуг
    setActiveTab("services");

    // Передаем информацию о выбранной категории через sessionStorage
    if (selectedService && selectedService.category) {
      sessionStorage.setItem(
        "selectedServiceCategory",
        selectedService.category,
      );
    }

    navigate("/services");
  };

  const handleBooking = () => {
    setShowTelegramModal(true);
  };

  const handleConfirmTelegram = () => {
    // Кодируем простую информацию для главного баннера
    const source = btoa(encodeURIComponent("main_banner"));
    const description = btoa(encodeURIComponent("Запись на консультацию"));
    
    // Открываем Telegram бот с закодированной информацией
    window.open(`https://t.me/Natali_Secrets_bot?start=main_${source}_${description}`, "_blank");
    setShowTelegramModal(false);
  };

  return (
    <div className="p-4 md:p-8">
      {/* Главный баннер */}
      <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl dark:shadow-white/10 mb-8 transition-all duration-200 transform hover:-translate-y-1">
        <img
          src={imageUrls.salonInterior[1]}
          alt="Natali Secrets Spa"
          className="w-full h-48 md:h-64 object-cover"
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
        <div className="flex items-center justify-between mb-4">
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
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Спектр услуг</h2>
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

      {/* Модальное окно услуги */}
      <ServiceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        service={selectedService}
      />

      {/* Модальное окно с предупреждением о Telegram */}
      <Dialog
        open={showTelegramModal}
        onOpenChange={() => setShowTelegramModal(false)}
      >
        <DialogContent className="bg-card text-card-foreground rounded-lg max-w-md w-full p-4 shadow-xl dark:shadow-white/10 transition-all duration-200">
          <DialogHeader>
            <DialogTitle className="text-center text-base">
              Запись на услугу
            </DialogTitle>
          </DialogHeader>

          <div className="py-3">
            <p className="text-sm text-center text-muted-foreground">
              Для записи на услугу вы будете перенаправлены в Telegram бот, где
              сможете выбрать удобное время и оформить запись.
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

export default HomePage;
