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

// Sample service details for demonstration
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
  // Add more service details as needed
};

const ServicesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>("all");
  const [selectedService, setSelectedService] = useState<ServiceDetails | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredServices = selectedCategory === "all" 
    ? allServices 
    : allServices.filter(service => service.category === selectedCategory);

  const handleServiceClick = (id: number) => {
    // In a real app, you would fetch the service details from an API
    setSelectedService(serviceDetailsMap[id] || {
      ...serviceDetailsMap[1],
      id,
      name: allServices.find(s => s.id === id)?.name || "",
      price: allServices.find(s => s.id === id)?.price || "",
    });
    setModalOpen(true);
  };

  const handleProgramClick = (id: number) => {
    // Handle program click, perhaps open a modal with program details
    console.log("Program clicked:", id);
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-xl font-semibold mb-6">Услуги</h1>
      
      {/* Category Filters */}
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
      
      {/* Services List */}
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

      {/* Service Modal */}
      <ServiceModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        service={selectedService} 
      />
    </div>
  );
};

export default ServicesPage;
