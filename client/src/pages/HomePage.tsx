import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ServiceCard";
import ServiceModal, { ServiceDetails } from "@/components/ServiceModal";
import { imageUrls } from "@/lib/utils";

const popularServices = [
  {
    id: 1,
    name: "Комбинированная чистка лица",
    price: "2700₽",
    image: imageUrls.beautyServices[0],
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
  { id: 1, title: "Уход за кожей", icon: "spa" },
  { id: 2, title: "Мужской уход", icon: "face" },
  { id: 3, title: "SPA-программы", icon: "self_improvement" },
  { id: 4, title: "Коррекция фигуры", icon: "auto_awesome" },
];

// Полные данные о всех услугах с эффектами
const serviceDetailsMap: Record<number, ServiceDetails> = {
  1: {
    id: 1,
    name: "Комбинированная чистка лица",
    price: "2700₽",
    description: "Комбинированная чистка лица - это процедура глубокого очищения кожи, которая сочетает в себе механическое удаление загрязнений и использование специальных средств для более эффективного результата.",
    image: imageUrls.beautyServices[0],
    duration: "60 минут",
    effects: [
      "Глубокое очищение пор",
      "Удаление комедонов и загрязнений",
      "Выравнивание текстуры кожи",
      "Улучшение цвета лица",
      "Подготовка кожи к дальнейшим процедурам"
    ]
  },
  2: {
    id: 2,
    name: "Пилинг омолаживающий",
    price: "2500₽",
    description: "Омолаживающий пилинг помогает отшелушить верхний слой клеток кожи, стимулируя обновление и регенерацию тканей для более молодого и свежего вида.",
    image: imageUrls.beautyServices[1],
    duration: "45 минут",
    effects: [
      "Омоложение кожи",
      "Уменьшение морщин",
      "Выравнивание тона кожи",
      "Стимуляция выработки коллагена",
      "Улучшение текстуры кожи"
    ]
  },
  3: {
    id: 3,
    name: "Антицеллюлитный массаж",
    price: "1200₽",
    description: "Интенсивный массаж, направленный на разбивание жировых отложений и улучшение кровообращения в проблемных зонах.",
    image: imageUrls.massageTherapy[0],
    duration: "45 минут",
    effects: [
      "Уменьшение целлюлита",
      "Улучшение кровообращения",
      "Повышение упругости кожи",
      "Выведение лишней жидкости",
      "Улучшение обмена веществ в тканях"
    ]
  },
  4: {
    id: 4,
    name: "Спа массаж",
    price: "2000₽",
    description: "Расслабляющий массаж с использованием ароматических масел для полного расслабления тела и разума.",
    image: imageUrls.spaServices[1],
    duration: "60 минут",
    effects: [
      "Снятие стресса",
      "Глубокое расслабление",
      "Улучшение сна",
      "Снятие мышечного напряжения",
      "Повышение общего тонуса организма"
    ]
  },
  5: {
    id: 5,
    name: "Микротоковая терапия",
    price: "3200₽",
    description: "Аппаратная процедура, при которой используются слабые электрические импульсы для стимуляции клеток кожи и мышц лица.",
    image: imageUrls.beautyServices[2],
    duration: "40 минут",
    effects: [
      "Лифтинг-эффект",
      "Улучшение тонуса кожи",
      "Уменьшение отечности",
      "Разглаживание мелких морщин",
      "Стимуляция обменных процессов"
    ]
  },
  6: {
    id: 6,
    name: "Антицеллюлитный массаж",
    price: "1200₽",
    description: "Интенсивный массаж, направленный на разбивание жировых отложений и улучшение кровообращения в проблемных зонах.",
    image: imageUrls.massageTherapy[0],
    duration: "45 минут",
    effects: [
      "Уменьшение целлюлита",
      "Улучшение кровообращения",
      "Повышение упругости кожи",
      "Выведение лишней жидкости",
      "Улучшение обмена веществ в тканях"
    ]
  },
  7: {
    id: 7,
    name: "Расслабляющий спа массаж",
    price: "2000₽",
    description: "Расслабляющий массаж с использованием ароматических масел для полного расслабления тела и разума.",
    image: imageUrls.spaServices[1],
    duration: "60 минут",
    effects: [
      "Снятие стресса",
      "Глубокое расслабление",
      "Улучшение сна",
      "Снятие мышечного напряжения",
      "Повышение общего тонуса организма"
    ]
  },
  8: {
    id: 8,
    name: "Мужской уход за лицом",
    price: "2300₽",
    description: "Специальная программа ухода за мужской кожей, учитывающая особенности и потребности мужской кожи.",
    image: imageUrls.spaServices[0],
    duration: "50 минут",
    effects: [
      "Глубокое очищение",
      "Увлажнение кожи",
      "Снятие раздражения",
      "Тонизация кожи",
      "Защита от негативных внешних факторов"
    ]
  }
};

const HomePage = () => {
  const [, navigate] = useLocation();
  const [selectedService, setSelectedService] = useState<ServiceDetails | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleServiceClick = (id: number) => {
    // Получаем данные об услуге из нашей карты serviceDetailsMap
    setSelectedService(serviceDetailsMap[id]);
    setModalOpen(true);
  };

  const handleComplexServiceClick = (id: number) => {
    navigate("/services");
  };

  return (
    <div className="p-4 md:p-8">
      {/* Главный баннер */}
      <div className="rounded-lg overflow-hidden shadow-md mb-8">
        <img 
          src={imageUrls.salonInterior[1]} 
          alt="Natali Secrets Spa" 
          className="w-full h-48 md:h-64 object-cover"
        />
        <div className="bg-white p-4 relative">
          <h2 className="text-lg font-medium">Добро пожаловать в мир красоты и релаксации</h2>
          <p className="text-sm text-gray-600 mt-1">Профессиональные услуги для вашего совершенства</p>
          <Button className="mt-3 bg-[#FF6B35] hover:bg-[#FF6B35]/80 text-white">
            Записаться
          </Button>
        </div>
      </div>

      {/* Популярные услуги */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Популярные услуги</h2>
          <a href="/services" className="text-primary text-sm font-medium">Смотреть все</a>
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
        <h2 className="text-lg font-semibold mb-4">Комплексные программы</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {complexServices.map((service) => (
            <div 
              key={service.id}
              className="bg-primary rounded-lg p-4 text-white flex flex-col items-center justify-center aspect-square shadow-md cursor-pointer"
              onClick={() => handleComplexServiceClick(service.id)}
            >
              <span className="material-icons text-3xl mb-2">{service.icon}</span>
              <h3 className="text-center font-medium">{service.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Специальные предложения */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Специальные предложения</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src={imageUrls.beautyServices[2]} 
            alt="Специальное предложение" 
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-lg">Программа похудения: 10 сеансов</h3>
              <p className="font-medium text-[#FF6B35]">35000₽</p>
            </div>
            <p className="text-sm text-gray-600 mt-1">Комплексная программа включает прессотерапию, вибро-прессо-роликовый массаж и антицеллюлитный массаж</p>
            <div className="flex justify-end mt-3">
              <Button 
                className="bg-primary hover:bg-primary/80 text-white"
                onClick={() => navigate("/services")}
              >
                Подробнее
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно услуги */}
      <ServiceModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        service={selectedService} 
      />
    </div>
  );
};

export default HomePage;
