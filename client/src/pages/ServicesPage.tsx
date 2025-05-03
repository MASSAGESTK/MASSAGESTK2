import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ServiceCard";
import ProgramCard from "@/components/ProgramCard";
import ServiceModal, { ServiceDetails } from "@/components/ServiceModal";
import ProgramModal, { ProgramDetails } from "@/components/ProgramModal";
import Breadcrumb from "@/components/Breadcrumb";
import { Helmet } from "react-helmet";
import { generateServiceSchema } from "@/utils/seoUtils";
import { useModal } from "@/hooks/use-modal";
import { imageUrls } from "@/lib/utils";

// Импорт данных из структурированных файлов
import { 
  categories, 
  allServices, 
  cosmetologyServices, 
  massageServices, 
  bodyCorrectionServices, 
  menServices,
  serviceDetailsMap 
} from "@/data/services";

import {
  complexServicesPrograms,
  programDetailsMap
} from "@/data/programs";

type ServiceCategory = "all" | "complex" | "cosmetology" | "massage" | "bodyCorrection" | "men";

const ServicesPage = () => {
  // Проверяем, есть ли в sessionStorage сохраненная категория
  const initialCategory = (): ServiceCategory => {
    if (typeof window !== 'undefined') {
      const savedCategory = sessionStorage.getItem('selectedServiceCategory');
      if (savedCategory && ['all', 'complex', 'cosmetology', 'massage', 'bodyCorrection', 'men'].includes(savedCategory)) {
        // Очищаем сохраненную категорию после использования
        sessionStorage.removeItem('selectedServiceCategory');
        return savedCategory as ServiceCategory;
      }
    }
    return "all";
  };

  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>(initialCategory());
  const [selectedService, setSelectedService] = useState<ServiceDetails | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<ProgramDetails | null>(null);
  const [programModalOpen, setProgramModalOpen] = useState(false);

  // Проверяем наличие ID выбранной услуги в sessionStorage при загрузке компонента
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const selectedServiceId = sessionStorage.getItem('selectedServiceId');
      if (selectedServiceId) {
        const serviceId = parseInt(selectedServiceId);
        // Получаем данные выбранной услуги
        if (serviceDetailsMap[serviceId]) {
          setSelectedService(serviceDetailsMap[serviceId]);
          setModalOpen(true);
        }
        // Очищаем sessionStorage после использования
        sessionStorage.removeItem('selectedServiceId');
      }
    }
  }, []);

  const filteredServices = selectedCategory === "all" 
    ? allServices 
    : allServices.filter(service => service.category === selectedCategory);

  const handleServiceClick = (id: number) => {
    // Получаем данные об услуге из маппинга
    setSelectedService(serviceDetailsMap[id] || null);
    setModalOpen(true);
  };

  const handleProgramClick = (id: number) => {
    // Получаем данные о программе из нашей карты programDetailsMap
    setSelectedProgram(programDetailsMap[id]);
    setProgramModalOpen(true);
  };

  // Структурированные данные для услуг
  const servicesSchemaData = [
    serviceDetailsMap[1],
    serviceDetailsMap[6],
    serviceDetailsMap[7]
  ].map(service => generateServiceSchema({
    name: service.name,
    description: service.description,
    price: service.price,
    image: service.image,
    category: "Beauty Service"
  }));

  return (
    <div className="p-4 md:p-8 pt-0">
      {/* SEO - структурированные данные Schema.org */}
      <Helmet>
        {servicesSchemaData.map((schema, index) => (
          <script key={`service-schema-${index}`} type="application/ld+json">
            {schema}
          </script>
        ))}
      </Helmet>
      
      {/* Хлебные крошки */}
      <Breadcrumb 
        items={[
          { name: 'Главная', url: '/' },
          { name: 'Услуги', url: '/services' }
        ]}
        className="mb-0 text-sm"
      />
      
      {/* Фильтры категорий - закреплены при прокрутке */}
      <div className="sticky top-0 bg-background z-50 pt-3 pb-2 mb-4 -mx-4 px-4 shadow-md dark:shadow-white/10 transition-colors duration-200">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex space-x-2 pb-1">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={
                  selectedCategory === category.id
                    ? "bg-primary text-white"
                    : "bg-card text-foreground"
                }
                onClick={() => setSelectedCategory(category.id as ServiceCategory)}
              >
                {category.label}
              </Button>
            ))}
          </div>
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
                  image={service.image}
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
                  image={service.image}
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
                  image={service.image}
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
                  image={service.image}
                  onClick={handleServiceClick}
                />
              ))}
          </div>
        </div>
      )}
      
      {/* КОМПЛЕКСНЫЕ ПРОГРАММЫ */}
      {(selectedCategory === "all" || selectedCategory === "complex") && (
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4 text-primary">КОМПЛЕКСНЫЕ ПРОГРАММЫ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {complexServicesPrograms.map((program) => (
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
      
      {/* Модальное окно программы */}
      <ProgramModal
        isOpen={programModalOpen}
        onClose={() => setProgramModalOpen(false)}
        program={selectedProgram}
      />
    </div>
  );
};

export default ServicesPage;