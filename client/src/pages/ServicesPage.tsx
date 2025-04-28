import { useState } from "react";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ServiceCard";
import ProgramCard from "@/components/ProgramCard";
import ServiceModal, { ServiceDetails } from "@/components/ServiceModal";
import { imageUrls } from "@/lib/utils";

type ServiceCategory = "all" | "cosmetology" | "massage" | "bodyCorrection" | "men";

const categories = [
  { id: "all", label: "Все" },
  { id: "cosmetology", label: "Косметология" },
  { id: "massage", label: "Массаж" },
  { id: "bodyCorrection", label: "Коррекция фигуры" },
  { id: "men", label: "Для мужчин" },
];

const cosmetologyServices = [
  { id: 1, name: "Комбинированная чистка лица", duration: "60 минут", price: "2700₽", category: "cosmetology" },
  { id: 2, name: "Пилинг омолаживающий", duration: "45 минут", price: "2500₽", category: "cosmetology" },
  { id: 3, name: "Уходовая процедура для проблемной кожи", duration: "60 минут", price: "2800₽", category: "cosmetology" },
  { id: 4, name: "Уходовая процедура для чувствительной кожи", duration: "50 минут", price: "2600₽", category: "cosmetology" },
  { id: 5, name: "Anti-age (омолаживающая, уходовая процедура)", duration: "75 минут", price: "3000₽", category: "cosmetology" },
];

const massageServices = [
  { id: 6, name: "Антицеллюлитный массаж", duration: "45 минут", price: "1200₽", category: "massage" },
  { id: 7, name: "Спа массаж", duration: "60 минут", price: "2000₽", category: "massage" },
  { id: 8, name: "Скульптурно-буккальный массаж", duration: "45 минут", price: "1800₽", category: "massage" },
  { id: 9, name: "Классический массаж спины", duration: "30 минут", price: "900₽", category: "massage" },
];

const bodyCorrectionServices = [
  { id: 10, name: "Прессотерапия", duration: "40 минут", price: "1200₽", category: "bodyCorrection" },
  { id: 11, name: "Вибро-прессо-роликовый массаж", duration: "50 минут", price: "1600₽", category: "bodyCorrection" },
];

const menServices = [
  { id: 12, name: "Комбинированная чистка лица", duration: "60 минут", price: "3000₽", category: "men" },
  { id: 13, name: "Уходовая процедура для лица", duration: "50 минут", price: "2800₽", category: "men" },
  { id: 14, name: "Спортивный массаж", duration: "45 минут", price: "1300₽", category: "men" },
  { id: 15, name: "Анистресс-массаж", duration: "60 минут", price: "2000₽", category: "men" },
  { id: 16, name: "Массаж спины, шеи, рук", duration: "40 минут", price: "1000₽", category: "men" },
];

const allServices = [
  ...cosmetologyServices,
  ...massageServices,
  ...bodyCorrectionServices,
  ...menServices,
];

const complexPrograms = [
  { 
    id: 1, 
    title: "Коррекция фигуры: 5 сеансов", 
    price: "17000₽", 
    features: [
      "прессотерапия",
      "вибро-прессо-роликовый массаж",
      "массаж антицеллюлитный"
    ]
  },
  { 
    id: 2, 
    title: "Программа похудения: 10 сеансов", 
    price: "35000₽", 
    features: [
      "прессотерапия",
      "вибро-прессо-роликовый массаж",
      "массаж антицеллюлитный"
    ]
  },
  { 
    id: 3, 
    title: "Программа для тела: 1 сеанс", 
    price: "4000₽", 
    features: [
      "массаж",
      "аппаратные процедуры",
      "вспомогательные процедуры",
      "майдеротерапия",
      "обёртывание"
    ]
  },
  { 
    id: 4, 
    title: "Программа для лица: 1 сеанс", 
    price: "4000₽", 
    features: [
      "массаж лица",
      "уходовые процедуры",
      "аппаратная процедура",
      "маска",
      "парафин рук"
    ]
  },
];

// Полные данные обо всех услугах с эффектами
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
    name: "Уходовая процедура для проблемной кожи",
    price: "2800₽",
    description: "Комплексный уход за проблемной кожей с использованием специализированных средств для нормализации работы сальных желез и уменьшения воспалений.",
    image: imageUrls.beautyServices[2],
    duration: "60 минут",
    effects: [
      "Уменьшение воспалений",
      "Нормализация работы сальных желез",
      "Сужение пор",
      "Увлажнение кожи без жирного блеска",
      "Устранение покраснений"
    ]
  },
  4: {
    id: 4,
    name: "Уходовая процедура для чувствительной кожи",
    price: "2600₽",
    description: "Деликатная процедура для чувствительной кожи с использованием успокаивающих и увлажняющих компонентов, не вызывающих раздражения.",
    image: imageUrls.beautyServices[0],
    duration: "50 минут",
    effects: [
      "Снятие раздражения",
      "Укрепление защитного барьера кожи",
      "Интенсивное увлажнение",
      "Уменьшение покраснений",
      "Повышение устойчивости кожи к внешним факторам"
    ]
  },
  5: {
    id: 5,
    name: "Anti-age (омолаживающая, уходовая процедура)",
    price: "3000₽",
    description: "Интенсивная омолаживающая процедура, направленная на борьбу с признаками старения кожи с использованием высококонцентрированных активных компонентов.",
    image: imageUrls.beautyServices[1],
    duration: "75 минут",
    effects: [
      "Разглаживание морщин",
      "Повышение упругости кожи",
      "Улучшение овала лица",
      "Интенсивное питание и увлажнение",
      "Активация процессов регенерации"
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
  8: {
    id: 8,
    name: "Скульптурно-буккальный массаж",
    price: "1800₽",
    description: "Специальная техника массажа лица, включающая как внешнее воздействие на кожу и мышцы, так и работу изнутри ротовой полости.",
    image: imageUrls.beautyServices[2],
    duration: "45 минут",
    effects: [
      "Моделирование овала лица",
      "Разглаживание морщин",
      "Улучшение тонуса мышц лица",
      "Активация лимфодренажа",
      "Улучшение цвета лица"
    ]
  },
  9: {
    id: 9,
    name: "Классический массаж спины",
    price: "900₽",
    description: "Традиционный массаж, направленный на расслабление мышц спины, снятие напряжения и улучшение общего самочувствия.",
    image: imageUrls.massageTherapy[1],
    duration: "30 минут",
    effects: [
      "Снятие мышечного напряжения",
      "Улучшение кровообращения",
      "Снятие болевых ощущений",
      "Улучшение осанки",
      "Общее расслабление"
    ]
  },
  10: {
    id: 10,
    name: "Прессотерапия",
    price: "1200₽",
    description: "Аппаратная методика, основанная на сжатии тканей при помощи специального костюма, создающего давление в различных зонах.",
    image: imageUrls.spaServices[0],
    duration: "40 минут",
    effects: [
      "Выведение лишней жидкости",
      "Уменьшение отеков",
      "Улучшение лимфотока",
      "Коррекция фигуры",
      "Уменьшение эффекта 'апельсиновой корки'"
    ]
  },
  11: {
    id: 11,
    name: "Вибро-прессо-роликовый массаж",
    price: "1600₽",
    description: "Процедура, сочетающая в себе роликовый массаж и прессотерапию, а также вибрационное воздействие для более эффективной коррекции фигуры.",
    image: imageUrls.beautyServices[2],
    duration: "50 минут",
    effects: [
      "Разрушение жировых клеток",
      "Улучшение кровообращения",
      "Стимуляция обмена веществ",
      "Моделирование силуэта",
      "Повышение упругости кожи"
    ]
  },
  12: {
    id: 12,
    name: "Комбинированная чистка лица",
    price: "3000₽",
    description: "Процедура глубокого очищения кожи, адаптированная специально для мужчин, учитывающая особенности мужской кожи.",
    image: imageUrls.beautyServices[0],
    duration: "60 минут",
    effects: [
      "Глубокое очищение пор",
      "Удаление комедонов и загрязнений",
      "Снятие раздражения после бритья",
      "Выравнивание текстуры кожи",
      "Сужение пор"
    ]
  },
  13: {
    id: 13,
    name: "Уходовая процедура для лица",
    price: "2800₽",
    description: "Комплексный уход за мужской кожей с учетом ее особенностей: большей толщины, повышенной жирности и склонности к раздражениям.",
    image: imageUrls.beautyServices[1],
    duration: "50 минут",
    effects: [
      "Глубокое увлажнение",
      "Снятие раздражения",
      "Уменьшение воспалений",
      "Матирование кожи",
      "Повышение упругости"
    ]
  },
  14: {
    id: 14,
    name: "Спортивный массаж",
    price: "1300₽",
    description: "Интенсивный массаж для восстановления после физических нагрузок, снятия мышечного напряжения и подготовки тела к тренировкам.",
    image: imageUrls.massageTherapy[0],
    duration: "45 минут",
    effects: [
      "Снятие мышечной усталости",
      "Ускорение восстановления",
      "Профилактика травм",
      "Улучшение кровообращения",
      "Повышение эластичности мышц"
    ]
  },
  15: {
    id: 15,
    name: "Анистресс-массаж",
    price: "2000₽",
    description: "Специальная техника массажа, направленная на глубокое расслабление и снятие стресса, улучшение общего самочувствия.",
    image: imageUrls.spaServices[1],
    duration: "60 минут",
    effects: [
      "Снятие психоэмоционального напряжения",
      "Улучшение качества сна",
      "Снижение уровня стресса",
      "Расслабление мышц",
      "Общее восстановление организма"
    ]
  },
  16: {
    id: 16,
    name: "Массаж спины, шеи, рук",
    price: "1000₽",
    description: "Комбинированный массаж, охватывающий основные зоны напряжения у мужчин: спину, шею и руки, особенно актуальный при сидячей работе.",
    image: imageUrls.massageTherapy[1],
    duration: "40 минут",
    effects: [
      "Снятие напряжения в зоне шеи и плеч",
      "Улучшение кровообращения",
      "Профилактика остеохондроза",
      "Снижение болевых ощущений",
      "Расслабление мышц спины"
    ]
  }
};

const ServicesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>("all");
  const [selectedService, setSelectedService] = useState<ServiceDetails | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredServices = selectedCategory === "all" 
    ? allServices 
    : allServices.filter(service => service.category === selectedCategory);

  const handleServiceClick = (id: number) => {
    // В реальном приложении здесь был бы запрос к API для получения данных об услуге
    setSelectedService(serviceDetailsMap[id] || {
      ...serviceDetailsMap[1],
      id,
      name: allServices.find(s => s.id === id)?.name || "",
      price: allServices.find(s => s.id === id)?.price || "",
    });
    setModalOpen(true);
  };

  const handleProgramClick = (id: number) => {
    // Обработка клика по программе, возможно открытие модального окна с подробностями о программе
    console.log("Program clicked:", id);
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-xl font-semibold mb-6">Услуги</h1>
      
      {/* Фильтры категорий */}
      <div className="mb-6 overflow-x-auto scrollbar-hide -mx-4 px-4">
        <div className="flex space-x-2 pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={
                selectedCategory === category.id
                  ? "bg-primary text-white"
                  : "bg-white text-dark"
              }
              onClick={() => setSelectedCategory(category.id as ServiceCategory)}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Список услуг */}
      {(selectedCategory === "all" || selectedCategory === "cosmetology") && (
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4 text-primary">КОСМЕТОЛОГИЯ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cosmetologyServices
              .filter(service => 
                selectedCategory === "all" || service.category === selectedCategory
              )
              .map((service) => (
                <ServiceCard
                  key={service.id}
                  id={service.id}
                  name={service.name}
                  price={service.price}
                  duration={service.duration}
                  onClick={handleServiceClick}
                />
              ))}
          </div>
        </div>
      )}
      
      {/* МАССАЖ */}
      {(selectedCategory === "all" || selectedCategory === "massage") && (
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4 text-primary">МАССАЖ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {massageServices
              .filter(service => 
                selectedCategory === "all" || service.category === selectedCategory
              )
              .map((service) => (
                <ServiceCard
                  key={service.id}
                  id={service.id}
                  name={service.name}
                  price={service.price}
                  duration={service.duration}
                  onClick={handleServiceClick}
                />
              ))}
          </div>
        </div>
      )}
      
      {/* КОРРЕКЦИЯ ФИГУРЫ */}
      {(selectedCategory === "all" || selectedCategory === "bodyCorrection") && (
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4 text-primary">КОРРЕКЦИЯ ФИГУРЫ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bodyCorrectionServices
              .filter(service => 
                selectedCategory === "all" || service.category === selectedCategory
              )
              .map((service) => (
                <ServiceCard
                  key={service.id}
                  id={service.id}
                  name={service.name}
                  price={service.price}
                  duration={service.duration}
                  onClick={handleServiceClick}
                />
              ))}
          </div>
        </div>
      )}
      
      {/* УСЛУГИ ДЛЯ МУЖЧИН */}
      {(selectedCategory === "all" || selectedCategory === "men") && (
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4 text-primary">УСЛУГИ ДЛЯ МУЖЧИН</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menServices
              .filter(service => 
                selectedCategory === "all" || service.category === selectedCategory
              )
              .map((service) => (
                <ServiceCard
                  key={service.id}
                  id={service.id}
                  name={service.name}
                  price={service.price}
                  duration={service.duration}
                  onClick={handleServiceClick}
                />
              ))}
          </div>
        </div>
      )}
      
      {/* КОМПЛЕКСНЫЕ ПРОГРАММЫ */}
      {selectedCategory === "all" && (
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4 text-primary">КОМПЛЕКСНЫЕ ПРОГРАММЫ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {complexPrograms.map((program) => (
              <ProgramCard
                key={program.id}
                id={program.id}
                title={program.title}
                price={program.price}
                features={program.features}
                onClick={handleProgramClick}
              />
            ))}
          </div>
        </div>
      )}

      {/* Модальное окно услуги */}
      <ServiceModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        service={selectedService} 
      />
    </div>
  );
};

export default ServicesPage;
